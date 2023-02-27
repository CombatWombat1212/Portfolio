import toggle from "@/scripts/AnimationTools";
import { RESIZE_TIMEOUT, splitPx, splitS } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";

// TODO: fix scss system so theres no gaps between chapters

var indicators = [];

function IndicatorItem(indicator) {
  this.elem = indicator.current ? indicator.current : indicator;
  this.chapters = [];
  this.label = { elem: null };
  this.names = [];
  this.width = 0;
  this.height = 0;
  this.touching = [];
  this.progress = { current: null, previous: null };
  this.visible = {set: false, applied: false};
  this.init = false;
}

function Chapter(elem, index) {
  this.elem = elem;
  this.height = chapterGetSize(this);
  this.index = index;
  this.name = elem.getAttribute("name");
  let resizeTimer;
  this.observer = new ResizeObserver((entries) => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      chapterGetSize(this);
    }, RESIZE_TIMEOUT);
  });
  this.observer.observe(elem);
}

function Name(elem) {
  this.chapter = elem;
  this.index = 0;
  this.text = elem.getAttribute("name");
  this.width = 0;
  this.elem = null;
  let resizeTimer;
  this.observer = new ResizeObserver((entries) => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      namesGetSizes(this);
      indicators.forEach((indicator) => {
        indicatorNameWidthSet(indicator);
        indicatorGetSize(indicator);
        indicatorSetSize(indicator);
      });
    }, RESIZE_TIMEOUT);
  });
  this.observer.observe(elem);
}

function namesGetSizes(name) {
  var width = name.elem.getBoundingClientRect().width;
  name.width = width;
}

function indicatorGetVisibility(indicator) {
  indicator.visible.set = indicator.progress.current > 0;
}

function indicatorSetVisibility(indicator) {

  if (!indicator.init) return;
  var elem = indicator.elem.querySelector(".indicator");
  var transition = splitS(window.getComputedStyle(elem).getPropertyValue("--indicator-transition"));

  
  if (indicator.visible.set !== indicator.visible.applied) {
    if (indicator.visible.set) {
      elem.classList.remove("indicator__hidden");
      elem.style.setProperty("transition", `${transition}ms`);
      elem.classList.remove("indicator__off");
      elem.classList.add("indicator__on");
    } else {
      elem.classList.remove("indicator__on");
      elem.classList.add("indicator__off");
      elem.classList.add("indicator__hidden");
    }
    indicator.visible.applied = indicator.visible.set;
  }
}

function indicatorNamesGet(indicator) {
  var arr = Array.from(document.querySelectorAll(".chapter--wrapper"));
  var names = arr.map((elem) => {
    var newName = new Name(elem);
    var index = arr.indexOf(elem);
    newName.elem = Array.from(indicator.elem.querySelectorAll(".label--name"))[index];
    newName.index = index;
    indicator.names.push(newName);
  });
}

function namesGet() {
  var arr = Array.from(document.querySelectorAll(".chapter--wrapper"));
  var names = arr.map((elem, i) => {
    return elem.getAttribute("name");
  });
  return names;
}

function labelStyleSet(indicator) {
  indicator.label.elem.style.setProperty("--chapter-progress", indicator.progress.current);
}

function labelInit(indicator) {
  var label = indicator.elem.querySelector(".label");
  indicator.label.elem = label;
}

function namesInit(indicator, setNames) {
  var names = namesGet(indicator);
  setNames(names);
}

function indicatorGetTouching(indicator) {
  indicator.touching = [];

  indicator.chapters.forEach((chapter) => {
    var labelRect = indicator.label.elem.getBoundingClientRect();
    var chapterRect = chapter.elem.getBoundingClientRect();

    var labelTop = labelRect.top;
    var labelBottom = labelRect.bottom;

    var chapterTop = chapterRect.top;
    var chapterBottom = chapterRect.bottom;

    var progress = 0;

    if (chapterTop >= labelTop && chapterBottom <= labelBottom) {
      progress = 1;
    } else if (chapterTop < labelTop && chapterBottom <= labelBottom) {
      progress = (chapterBottom - labelTop) / labelRect.height;
    } else if (chapterTop >= labelTop && chapterBottom > labelBottom) {
      progress = (labelBottom - chapterTop) / labelRect.height;
    } else if (chapterTop < labelTop && chapterBottom > labelBottom) {
      progress = 1;
    }

    if (progress > 0) {
      indicator.touching.push({ chapter: chapter, progress: progress });
    }
  });
}

function indicatorGetProgress(indicator) {
  var touching = indicator.touching;
  var nextChapter = touching[touching.length - 1];
  var index, p;
  if (nextChapter == undefined) {
    index = 0;
    p = 0;
  } else {
    index = nextChapter.chapter.index;
    p = nextChapter.progress;
  }
  var progress = index + p;
  indicator.progress.current = progress;
  if (progress != indicator.progress.previous) {
    indicator.progress.previous = progress;
    indicator.progress.current = progress;
    return true;
  } else {
    return false;
  }
}

function chaptersInit(indicator) {
  var all = Array.from(document.querySelectorAll(".chapter--wrapper"));
  indicator.chapters = all.map((elem, index) => new Chapter(elem, index));

  window.removeEventListener("scroll", indicatorOnScroll);
  window.addEventListener("scroll", indicatorOnScroll);
  window.removeEventListener("resize", indicatorOnResize);
  window.addEventListener("resize", indicatorOnResize);
}

function indicatorNameWidthSet(indicator) {
  if (!indicator) return;
  var progress = indicator.progress.current;

  if (progress < 1) {
    indicator.label.elem.style.setProperty("--label-width", `${indicator.names[0].width}px`);
    return;
  } else {
    progress = progress - 1;
    var currentChapter = Math.round(progress);
    var decimal = progress - currentChapter;
    var chapterNameWidth = indicator.names[currentChapter].width;
    indicator.label.elem.style.setProperty("--label-width", `${chapterNameWidth}px`);
  }
}

function indicatorSetSize(indicator) {
  indicator.elem.style.setProperty("--indicator-width", `${indicator.width}px`);
  indicator.elem.style.setProperty("--indicator-height", `${indicator.height}px`);
}

function indicatorGetSize(indicator) {
  var width = splitPx(window.getComputedStyle(indicator.elem.querySelector(".indicator")).width) + splitPx(window.getComputedStyle(indicator.elem.querySelector(".indicator")).paddingLeft) + splitPx(window.getComputedStyle(indicator.elem.querySelector(".indicator")).paddingRight);
  var height = splitPx(window.getComputedStyle(indicator.elem.querySelector(".indicator")).height) + splitPx(window.getComputedStyle(indicator.elem.querySelector(".indicator")).paddingTop) + splitPx(window.getComputedStyle(indicator.elem.querySelector(".indicator")).paddingBottom);
  indicator.width = width;
  indicator.height = height;
}

function chapterGetSize(chapter) {
  chapter.height = splitPx(window.getComputedStyle(chapter.elem).height);
}

function indicatorInit(indicator) {
  chaptersInit(indicator);
  labelInit(indicator);
  indicatorOnScroll();
  indicatorOnResizeFunctions();

  setTimeout(() => {
    indicator.init = true;
    indicator.elem.classList.remove("indicator--wrapper__hidden");
    indicatorGetVisibility(indicator);
    indicatorSetVisibility(indicator);

    indicatorOnScroll();
    indicatorOnResizeFunctions();
  }, 1000);
}

function Indicator({}) {
  const [names, setNames] = useState([]);
  var indicator = useRef(null);

  useMountEffect(() => {
    var indicatorObj = new IndicatorItem(indicator);
    if (indicators.length == 0 || indicators[indicators.length - 1].elem != indicatorObj.elem) {
      indicators.push(indicatorObj);
    }
    indicatorObj.elem.querySelector(".indicator").classList.add("indicator__off");
    indicatorObj.elem.querySelector(".indicator").classList.add("indicator__hidden");
    indicators.forEach((indicator) => {
      namesInit(indicator, setNames);
    });
  });

  useEffect(() => {
    if (names.length < 1) return;
    indicators.forEach((indicator) => {
      indicatorNamesGet(indicator);
      namesGetSizes(indicator);
      indicatorInit(indicator);
    });
  }, [names]);

  return (
    <div className="indicator--wrapper indicator--wrapper__hidden" ref={indicator}>
      <div className="indicator indicator__hidden indicator__off">
        <div className="label">
          <span className="label--empty"></span>
          {names &&
            names.map((n, i) => {
              return (
                <span
                  key={i}
                  className="label--name"
                  style={{
                    "--label-index": i,
                  }}>
                  {n}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function indicatorOnScroll() {
  // TODO: These calculations are honestly so extra, you don't need to do this based on the exact position of the chapter, and whether or not its overlapping text, you could probably just do it based on the chapter's position on screen i think?  like the whole idea of it needing to be an exact float seems like much

  if (!indicators) return;

  indicators.forEach((indicator) => {
    var chapters = indicator.chapters;
    var label = indicator.label;
    indicatorGetTouching(indicator);
    var changed = indicatorGetProgress(indicator);
    if (!changed) return;
    indicatorNameWidthSet(indicator);
    indicatorGetSize(indicator);
    indicatorSetSize(indicator);
    labelStyleSet(indicator);

    indicatorGetVisibility(indicator);
    indicatorSetVisibility(indicator);
  });
}

var indicatorIsResizing;

function indicatorOnResize() {
  window.clearTimeout(indicatorIsResizing);
  indicatorIsResizing = setTimeout(indicatorOnResizeFunctions, RESIZE_TIMEOUT);
}

function indicatorOnResizeFunctions() {
  indicators.forEach((indicator) => {
    indicatorGetSize(indicator);
    indicatorSetSize(indicator);
    indicator.names.forEach((name) => {
      namesGetSizes(name);
    });
    indicator.chapters.forEach((chapter) => {
      chapterGetSize(chapter);
    });
  });
}

export default Indicator;
