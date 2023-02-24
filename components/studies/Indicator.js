import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
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
  this.progress = 0;
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
}

function indicatorNamesGetSizes(indicator) {
  indicator.names.forEach((name) => {
    console.log(name);
    var width = splitPx(window.getComputedStyle(name.elem).width);
    name.width = width;
  });
  console.log(indicator);
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
  indicator.label.elem.style.setProperty("--chapter-progress", indicator.progress);
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
  indicator.progress = progress;
}

function chaptersInit(indicator) {
  var all = Array.from(document.querySelectorAll(".chapter--wrapper"));
  indicator.chapters = all.map((elem, index) => new Chapter(elem, index));

  window.removeEventListener("scroll", indicatorOnScroll);
  window.addEventListener("scroll", indicatorOnScroll);
  window.removeEventListener("resize", indicatorOnResize);
  window.addEventListener("resize", indicatorOnResize);
}


// TODO: this is where you're at, good luck this week! 
// TODO: make sure this only runs when the value changes not every time
function indicatorWidthSet(indicator) {
  // if indicator, or indicator names is empty then return
  // run this function only when indicator.progress changes to a new value
  // first, using progress get the index of the current chapter
  // progress can be a float when you are crossing over into the next chapter, so round it down
  // store just the decimal part of progress as we will need it later.
  // using progress which you've now rounded down, find indicator.names[progressRounded] and get the width of that element
  // that info can be found at indicator.names[progressRounded].width
  // finally, set the width of indicator.label.elem to the width of the current chapter name
}







function indicatorSetSize(indicator) {
  indicator.elem.style.setProperty("--indicator-width", `${indicator.width}px`);
  indicator.elem.style.setProperty("--indicator-height", `${indicator.height}px`);
}

function indicatorGetSize(indicator) {
  indicator.width = splitPx(window.getComputedStyle(indicator.elem).width);
  indicator.height = splitPx(window.getComputedStyle(indicator.elem).height);
}

function chapterGetSize(chapter) {
  chapter.height = splitPx(window.getComputedStyle(chapter.elem).height);
}

function indicatorInit(indicator) {
  chaptersInit(indicator);
  labelInit(indicator);
  indicatorOnScroll();
  indicatorOnResizeFunctions();
}

function Indicator({}) {
  const [names, setNames] = useState([]);
  var indicator = useRef(null);

  useMountEffect(() => {
    var indicatorObj = new IndicatorItem(indicator);
    if (indicators.length == 0 || indicators[indicators.length - 1].elem != indicatorObj.elem) {
      indicators.push(indicatorObj);
    }
    indicators.forEach((indicator) => {
      indicatorInit(indicator);
      namesInit(indicator, setNames);
    });
  });

  useEffect(() => {
    if (names.length < 1) return;
    indicators.forEach((indicator) => {
      indicatorNamesGet(indicator);
      indicatorNamesGetSizes(indicator);
    });
  }, [names]);

  return (
    <div className="indicator--wrapper" ref={indicator}>
      <div className="indicator">
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
    indicatorGetProgress(indicator);
    labelStyleSet(indicator);
    indicatorWidthSet(indicator);
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
    indicatorNamesGetSizes(indicator);
    indicator.chapters.forEach((chapter) => {
      chapterGetSize(chapter);
    });
  });
}

export default Indicator;
