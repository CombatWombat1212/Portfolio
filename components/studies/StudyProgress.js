import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useState } from "react";

function Chapter(elem) {
  this.elem = elem;
  this.height = 0;
  this.index = 0;
  this.observer = null;
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
          var newHeight = splitPx(window.getComputedStyle(chapter.elem).height);
          console.log(`Chapter ${chapter.index}: height changed from ${prevHeight}px to ${newHeight}px`);
          prevHeight = newHeight;
  
          const updatedChapters = [...obj.chapters];
          updatedChapters[chapter.index].height = newHeight;
  
          const updatedObj = { ...obj, chapters: updatedChapters }; // create a new object with updated chapters and existing elems
          setChapters(updatedObj); // set the state to the updated chapters object
  
        }, RESIZE_TIMEOUT);
      });
      chapter.observer.observe(chapter.elem);
    });
  }
  
function chaptersGetHeight(obj) {
  obj.chapters.forEach((chapter) => {
    chapter.height = splitPx(window.getComputedStyle(chapter.elem).height);
  });
}

function progressInit(chapters, setChapters) {
  var chaps = {};
  chaptersInit(chaps, setChapters);
  chaptersGetHeight(chaps);

  setChapters(chaps);

  window.removeEventListener("scroll", progressScroll, false);
  window.addEventListener("scroll", progressScroll, false);
}

function StudyProgress({}) {
  const [chapters, setChapters] = useState([]);

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

function progressScroll(e) {}

export default StudyProgress;
