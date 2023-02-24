import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useState } from "react";

// TODO: fix scss system so theres no gaps between chapters

var globChapters;
var names = [];
var namesSet = false;

function Chapter(elem) {
  this.elem = elem;
  this.height = 0;
  this.index = 0;
  this.observer = null;
  this.name = elem.getAttribute("name");
}

function Name(elem) {
  this.elem = elem;
  this.height = 0;
  this.index = 0;
  this.name = elem.getAttribute("name");
}

function namesInit() {}

function chapterGetTouching(chapters, text) {
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

function chapterGetProgress(touching) {
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

function chaptersGetUpdatedHeights(obj, chapter) {
  var newHeight = splitPx(window.getComputedStyle(chapter.elem).height);
  const updatedChapters = [...obj.chapters];
  updatedChapters[chapter.index].height = newHeight;
  const updatedObj = { ...obj, chapters: updatedChapters };
  obj.chapters = updatedChapters;
  return updatedObj;
}

function chaptersInit(obj, chapters, setChapters) {
  var all = document.querySelectorAll(".chapter--wrapper");
  obj.elems = Array.from(all);
  obj.chapters = obj.elems.map((elem) => new Chapter(elem));

  obj.chapters.forEach((chapter, index) => {
    chapter.index = index;
  });

  var resizeTimer;

  obj.chapters.forEach((chapter) => {
    var prevHeight = splitPx(window.getComputedStyle(chapter.elem).height);
    chapter.observer = new ResizeObserver((entries) => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        resizeTimer = null;
        const updatedObj = chaptersGetUpdatedHeights(obj, chapter);
        setChapters(updatedObj);
      }, RESIZE_TIMEOUT);
    });
    chapter.observer.observe(chapter.elem);
  });

  window.removeEventListener("scroll", indicatorOnScroll);
  window.addEventListener("scroll", indicatorOnScroll);
  window.removeEventListener("resize", () => indicatorOnResize(obj, setChapters));
  window.addEventListener("resize", () => indicatorOnResize(obj, setChapters));
}

function indicatorInit(chapters, setChapters) {
  var obj = {};
  chaptersInit(obj, chapters, setChapters);
  setChapters(obj);
  namesInit(chapters);
}

function Indicator({}) {
  const [chapters, setChapters] = useState({});
  const [names, setNames] = useState([]);

  useMountEffect(() => {
    indicatorInit(chapters, setChapters);
  });

  useEffect(() => {
    globChapters = chapters;

    if (!chapters.chapters || namesSet) return;
    setNames(chapters.chapters.map((chapter) => chapter.name));
    namesSet = true;
  }, [chapters]);

  return (
    <div className="indicator--wrapper">
      <div className="indicator">
        <div className="indicator--name">
          {names &&
            names.map((name, index) => {
              return (
                <span
                  key={index}
                  className=""
                  style={{
                    "--name-index": index,
                  }}>
                  {name}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function indicatorOnScroll(e) {
  // TODO: These calculations are honestly so extra, you don't need to do this based on the exact position of the chapter, and whether or not its overlapping text, you could probably just do it based on the chapter's position on screen i think?  like the whole idea of it needing to be an exact float seems like much

  if (!globChapters) return;
  if (!globChapters.chapters) return;
  if (!globChapters.chapters[0].elem) return;

  var chapters = globChapters;
  var wrapper = document.querySelector(".indicator--wrapper");
  var text = document.querySelector(".indicator--name");
  var touching = chapterGetTouching(chapters, text);
  var progress = chapterGetProgress(touching);
  var name = document.querySelector(".indicator--name");
  name.style.setProperty("--chapter-progress", progress);
}

var indicatorIsResizing;

function indicatorOnResize(obj, setChapters) {
  window.clearTimeout(indicatorIsResizing);
  indicatorIsResizing = setTimeout(() => indicatorOnResizeFunctions(obj, setChapters), RESIZE_TIMEOUT);
}

function indicatorOnResizeFunctions(obj, setChapters) {
  const updatedChapters = obj.chapters.map((chapter) => chaptersGetUpdatedHeights(obj, chapter));
  const updatedObj = { ...obj, chapters: updatedChapters };
  setChapters(updatedObj);
}

export default Indicator;
