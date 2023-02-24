import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";

// TODO: fix scss system so theres no gaps between chapters

var globChapters;

var indicators = [];

function IndicatorItem(indicator) {
  this.elem = indicator.current ? indicator.current : indicator;
  this.chapters = [];
  this.names = [];
  this.width = 0;
  this.height = 0;
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
  this.name = elem?.getAttribute("name") || "";
}

function namesAddElems(names) {
  var nameElems = document.querySelectorAll(".indicator .name--chapter");
  nameElems = Array.from(nameElems);
  var n = [...names];
  n.forEach((name, index) => {
    name.elem = nameElems[index];
  });
  return n;
}

function namesGet(chapters) {
  var n = [];
  chapters.chapters.forEach((chapter) => {
    var name = new Name(chapter.elem);
    name.index = chapter.index;
    n.push(name);
  });
  return n;
}

function namesInit(indicator, setNames, setNamesInitialized) {
  // console.log(indicator);
  // var n = namesGet(chapters);
  // setNames(n);
  // setNamesInitialized(true);
}

function indicatorGetTouching(chapters, text) {
  var touching = [];

  chapters.chapters.forEach((chapter) => {
    var textRect = text.getBoundingClientRect();
    var chapterRect = chapter.elem.getBoundingClientRect();

    var textTop = textRect.top;
    var textBottom = textRect.bottom;

    var chapterTop = chapterRect.top;
    var chapterBottom = chapterRect.bottom;

    var progress = 0;

    if (chapterTop >= textTop && chapterBottom <= textBottom) {
      progress = 1;
    } else if (chapterTop < textTop && chapterBottom <= textBottom) {
      progress = (chapterBottom - textTop) / textRect.height;
    } else if (chapterTop >= textTop && chapterBottom > textBottom) {
      progress = (textBottom - chapterTop) / textRect.height;
    } else if (chapterTop < textTop && chapterBottom > textBottom) {
      progress = 1;
    }

    if (progress > 0) {
      touching.push({ chapter: chapter, progress: progress });
    }
  });

  return touching;
}

function indicatorGetProgress(touching) {
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
  return progress;
}

function chaptersInit(indicator) {
  var all = Array.from(document.querySelectorAll(".chapter--wrapper"));
  indicator.chapters = all.map((elem, index) => new Chapter(elem, index));

  window.removeEventListener("scroll", indicatorOnScroll);
  window.addEventListener("scroll", indicatorOnScroll);
  window.removeEventListener("resize", indicatorOnResize);
  window.addEventListener("resize", indicatorOnResize);
}

function indicatorSetVisibility(progress) {
  var indicator = document.querySelector(".indicator--wrapper");
  if (!indicator) return;
}

function indicatorSetSize(indicator) {
  indicator.elem.style.setProperty("--indicator-width", `${indicator.width}px`);
  indicator.elem.style.setProperty("--indicator-height", `${indicator.height}px`);
}

function indicatorGetSize(indicator) {
  indicator.width = splitPx(window.getComputedStyle(indicator.elem).width);
  indicator.height = splitPx(window.getComputedStyle(indicator.elem).height);
}

function chapterSetSize(chapter) {
  // chapter.elem.style.setProperty("--chapter-width", `${chapter.width}px`);
  // chapter.elem.style.setProperty("--chapter-height", `${chapter.height}px`);
}

function chapterGetSize(chapter) {
  // chapter.width = splitPx(window.getComputedStyle(chapter.elem).width);
  chapter.height = splitPx(window.getComputedStyle(chapter.elem).height);
}

function indicatorInit(indicator) {
  chaptersInit(indicator);
  // setChapters(obj);

  // indicatorOnScroll();
  // indicatorOnResizeFunctions();
}

function Indicator({}) {
  const [names, setNames] = useState([]);
  const [namesInitialized, setNamesInitialized] = useState(false);

  var indicator = useRef(null);

  useMountEffect(() => {
    var indicatorObj = new IndicatorItem(indicator);
    indicators.push(indicatorObj);

    indicators.forEach((indicator) => {
      indicatorInit(indicator);
    });
  });

  useEffect(() => {
    if (namesInitialized) return;
    if (indicators.length == 0) return;
    indicators.forEach((indicator) => {
      namesInit(indicator, setNames, setNamesInitialized);
    });
  }, [namesInitialized]);

  useEffect(() => {
    if (!namesInitialized) return;
    var n = namesAddElems(names);
    setNames(n);
  }, [namesInitialized]);

  useEffect(() => {
    console.log(names);
  }, [names]);

  return (
    <div className="indicator--wrapper indicator--wrapper__off" ref={indicator}>
      <div className="indicator indicator__hidden">
        <div className="name">
          <span className="name--empty"></span>
          {namesInitialized &&
            names.map((n) => {
              return (
                <span
                  key={n.index}
                  className="name--chapter"
                  style={{
                    "--name-index": n.index,
                  }}>
                  {n.name}
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

  if (!globChapters) return;
  if (!globChapters.chapters) return;
  if (!globChapters.chapters[0].elem) return;

  var chapters = globChapters;
  var name = document.querySelector(".indicator .name");
  var touching = indicatorGetTouching(chapters, name);
  var progress = indicatorGetProgress(touching);
  name.style.setProperty("--chapter-progress", progress);

  indicatorSetVisibility(progress);
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

    indicator.chapters.forEach((chapter) => {
      chapterGetSize(chapter);
    });
  });
}

export default Indicator;
