import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import useListener from "@/scripts/hooks/useListener";
import { useEffect, useLayoutEffect, useRef } from "react";

function ColLine(elem) {
  this.elem = elem.querySelector(".col-line--wrapper");
  this.section = elem.closest(".section--wrapper");
  this.targets = [];
  this.parent = {
    elem: null,
  };
  this.rows = [];
  this.data = {
    target: null,
    parent: null,
  };
}

function Row(targets) {
  this.midpoint = 0;
  this.targets = targets;
  this.uniform = false;
  this.columns = {
    total: 0,
    filled: 0,
  };
}

function Target(elem) {
  this.elem = elem;
  this.top = 0;
  this.bottom = 0;
  this.midpoint = 0;
}

function updateRows(lines) {
  lines.forEach((line) => {
    line.rows = []; // Clear previous rows
    colLineGetRows(line); // Recalculate rows
  });
}

function colLineGetRows(line) {
  var parent = line.section.querySelector(`.${line.data.parent}`);

  var rows = 0;
  var columns = 0;
  var children = 0;
  var gap = 0;

  if (getComputedStyle(parent).getPropertyValue("display") == "grid") {
    columns = getComputedStyle(parent).getPropertyValue("grid-template-columns").split(" ").length;

    var childs = Array.from(parent.children);
    childs = childs.filter((child) => {
      return child.classList.contains(line.data.target) || child.querySelector(`.${line.data.target}`);
    });
    children = childs.length;
    rows = Math.ceil(children / columns);
    gap = splitPx(getComputedStyle(parent).getPropertyValue("gap") || getComputedStyle(parent).getPropertyValue("column-gap") || "0px");
  } else {
    // TODO: support non-grids
    console.error("colLineGetRows: parent is not a grid, non-grids aren't supported yet :(");
  }

  for (var i = 0; i < rows; i++) {
    var row = line.targets.slice(i * columns, (i + 1) * columns);
    var rowObj = new Row(row);
    rowObj.columns.total = columns;
    rowObj.columns.filled = row.length;
    rowObj.gap = gap;
    line.rows.push(rowObj);
  }
}

function colLineGetData(line) {
  var data = line.section.getAttribute("data-line").trim();

  function getDefaultParent(line) {
    if (line.section.querySelector(".section--main")) return "section--main";
    else return "section--container";
  }

  if (data == "true") {
    line.data.target = "graphic--panel";
    line.data.parent = getDefaultParent(line);
  } else {
    if (data.includes(" ")) {
      var arr = data.split(" ");
      line.data.target = arr[0];
      line.data.parent = arr[1];
    } else {
      line.data.target = data;
      line.data.parent = getDefaultParent(line);
    }
  }
}

function colLineGetTargets(line) {
  var arr = [];

  var elems = Array.from(line.section.querySelectorAll(`.${line.data.target}`));

  for (var i = 0; i < elems.length; i++) {
    var target = new Target(elems[i]);
    arr.push(target);
  }

  line.targets = arr;
  line.parent.elem = line.section.querySelector(`.${line.data.parent}`);
}

function colLineGet(lines) {
  var arr = [];
  var elems = Array.from(document.querySelectorAll("[data-line]"));

  for (var i = 0; i < elems.length; i++) {
    elems[i] = elems[i].closest(".section--wrapper");
    if (elems[i].classList.contains("section--wrapper")) arr.push(elems[i]);
  }

  for (var i = 0; i < arr.length; i++) {
    var line = new ColLine(arr[i]);
    colLineGetData(line);
    colLineGetTargets(line);
    colLineGetRows(line);
    lines.push(line);
  }
}

function colLineCreateLines(line) {
  var wrapper = line.elem;

  if (wrapper.children.length != line.rows.length) {
    wrapper.innerHTML = "";

    for (var j = 0; j < line.rows.length; j++) {
      var row = line.rows[j];

      var lineElem = document.createElement("div");
      lineElem.classList.add("col-line");

      wrapper.appendChild(lineElem);
    }
  }
}

function colLineGetMidpoints(line) {
  for (var j = 0; j < line.rows.length; j++) {
    var row = line.rows[j];

    for (var k = 0; k < row.targets.length; k++) {
      var target = row.targets[k];
      target.top = target.elem.getBoundingClientRect().top - line.parent.elem.getBoundingClientRect().top;
      target.bottom = target.top + target.elem.getBoundingClientRect().height;
      target.midpoint = (target.top + target.bottom) / 2;
    }

    // if all midpoints are the same, set uniform to true
    var midpoints = row.targets.map((target) => {
      return target.midpoint;
    });

    var uniform = midpoints.every((midpoint) => {
      return midpoint == midpoints[0];
    });

    row.uniform = uniform;

    // if uniform, set midpoint to the midpoint of the first target, else set it to the average of all midpoints
    if (row.uniform) {
      row.midpoint = row.targets[0].midpoint;
    } else {
      row.midpoint = midpoints.reduce((a, b) => a + b, 0) / midpoints.length;
    }
  }
}

function colLineStyle(line) {
  var wrapper = line.elem;
  var lines = wrapper.children;

  for (var j = 0; j < lines.length; j++) {
    var lineElem = lines[j];
    var row = line.rows[j];

    const isIncomplete = row.columns.filled == row.columns.total ? 0 : 1;
    lineElem.style.setProperty("--line-top", row.midpoint + "px");
    lineElem.style.setProperty("--columns-total", row.columns.total);
    lineElem.style.setProperty("--columns-filled", row.columns.filled);
    lineElem.style.setProperty("--column-gap", row.gap + "px");
    lineElem.style.setProperty("--row-is-incomplete", isIncomplete);

    // avoids an error where calc tries to divide by 0
    if (!isIncomplete) lineElem.style.setProperty("--columns-in-row", 1);

    if (j == 0) {
      lineElem.style.setProperty("--line-left-offset", 1);
      lineElem.style.setProperty("--line-isnt-middle", 1);
      lineElem.style.setProperty("--line-is-first", 1);
    } else if (typeof line.rows[j - 1] != "undefined" && typeof line.rows[j + 1] != "undefined") {
      lineElem.style.setProperty("--line-left-offset", 0);
      lineElem.style.setProperty("--line-isnt-middle", 0);
      lineElem.style.setProperty("--line-is-first", 0);
    } else if (j == lines.length - 1) {
      lineElem.style.setProperty("--line-left-offset", 0);
      lineElem.style.setProperty("--line-isnt-middle", 1);
      lineElem.style.setProperty("--line-is-first", 0);
    }
  }
}

function colLineDraw(line) {
  colLineCreateLines(line);
  colLineGetMidpoints(line);
  colLineStyle(line);
}

function useColLine(hasColLine, { update = null } = {}) {
  const handleResizeRef = useRef(null);

  const colLineInit = () => {
    if (typeof window == "undefined") return;

    var lines = [];
    var previousWidth = window.innerWidth;

    colLineGet(lines);
    run();

    function run() {
      updateRows(lines);
      lines.forEach((line) => {
        colLineDraw(line);
      });
    }

    function ran() {
      window.clearTimeout(isResizing);
      isResizing = setTimeout(function () {
        var currentWidth = window.innerWidth;
        if (currentWidth !== previousWidth) {
          run();
          previousWidth = currentWidth;
        }
      }, RESIZE_TIMEOUT);
    }

    function isHorizontalResize(event) {
      return event.target.innerWidth !== previousWidth;
    }

    function handleResize(event) {
      if (isHorizontalResize(event)) {
        ran();
      }
    }

    handleResizeRef.current = handleResize;

    var isResizing;
  };

  useLayoutEffect(() => {
    if (hasColLine) {
        colLineInit();
    }
  }, [hasColLine]);


  useHorizontalResize(colLineInit);


  useEffect(() => {
    if (hasColLine) {
        colLineInit();
    }
  }, [update]);

  useListener("resize", handleResizeRef.current, {enabled: hasColLine});
}

export { useColLine };
