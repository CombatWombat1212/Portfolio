import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useState } from "react";

function Chapter(elem) {
  this.elem = elem;
  this.height = 0;
  this.index = 0;
  this.observer = null;
}

function chapterUpdateHeight(obj, chapter) {
  var newHeight = splitPx(window.getComputedStyle(chapter.elem).height);
  console.log(`Chapter ${chapter.index}: height changed to ${newHeight}px`);

  const updatedChapters = [...obj.chapters];
  updatedChapters[chapter.index].height = newHeight;

  const updatedObj = { ...obj, chapters: updatedChapters };
  obj.chapters = updatedChapters;
  return updatedObj;
}

function chaptersInit(obj, setChapters) {
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

        const updatedObj = chapterUpdateHeight(obj, chapter);
        setChapters(updatedObj);
      }, RESIZE_TIMEOUT);
    });
    chapter.observer.observe(chapter.elem);
  });

  window.removeEventListener("resize", () => progressResize(obj, setChapters));
  window.addEventListener("resize", () => progressResize(obj, setChapters));
}

function progressInit(chapters, setChapters) {
  var chaps = {};

  chaptersInit(chaps, setChapters);

  setChapters(chaps);
}

function StudyProgress({}) {
  const [chapters, setChapters] = useState({});

  useMountEffect(() => {
    progressInit(chapters, setChapters);
  });

  useEffect(() => {
    console.log(chapters);
  }, [chapters]);

  return (
    <div className="chapter-indicator--wrapper">
      <div className="chapter-indicator">
        <span className="chapter-indicator--name">Enter</span>
      </div>
    </div>
  );
}



var progressIsResizing;

function progressResize(obj, setChapters) {
  window.clearTimeout(progressIsResizing);
  progressIsResizing = setTimeout(() => progressResizeFunctions(obj, setChapters), RESIZE_TIMEOUT);
}

function progressResizeFunctions(obj, setChapters) {
  const updatedChapters = obj.chapters.map((chapter) => chapterUpdateHeight(obj, chapter));
  const updatedObj = { ...obj, chapters: updatedChapters };
  setChapters(updatedObj);
}




export default StudyProgress;
