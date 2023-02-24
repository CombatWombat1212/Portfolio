import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useState } from "react";


// TODO: fix scss system so theres no gaps between chapters

var globChapters;

function Chapter(elem) {
  this.elem = elem;
  this.height = 0;
  this.index = 0;
  this.observer = null;
  this.name = elem.getAttribute("name");
}

function chapterUpdateHeight(obj, chapter) {
  var newHeight = splitPx(window.getComputedStyle(chapter.elem).height);
  //   console.log(`Chapter ${chapter.index}: height changed to ${newHeight}px`);

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

        const updatedObj = chapterUpdateHeight(obj, chapter);
        setChapters(updatedObj);
      }, RESIZE_TIMEOUT);
    });
    chapter.observer.observe(chapter.elem);
  });

  window.removeEventListener("scroll", progressScroll);
  window.addEventListener("scroll", progressScroll);
  window.removeEventListener("resize", () => progressResize(obj, setChapters));
  window.addEventListener("resize", () => progressResize(obj, setChapters));
}

function progressInit(chapters, setChapters) {
  var chaps = {};

  chaptersInit(chaps, chapters, setChapters);

  setChapters(chaps);
}

var namesSet = false;
function StudyProgress({}) {
  const [chapters, setChapters] = useState({});
  const [names, setNames] = useState([]);

  useMountEffect(() => {
    progressInit(chapters, setChapters);
  });

  useEffect(() => {
    globChapters = chapters;
    console.log(chapters);

    if (chapters.chapters && !namesSet) {
      setNames(chapters.chapters.map((chapter) => chapter.name));
      namesSet = true;
    }
  }, [chapters]);

  return (
    <div className="chapter-indicator--wrapper">
      <div className="chapter-indicator">
        <div className="chapter-indicator--name">
          {names &&
            names.map((name, index) => {
              return (
                <span
                  key={index}
                  className=""
                  style={{
                    "--chapter-name-index": index,
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

// function progressScroll(e) {
//   if (!globChapters) return;
//   if (!globChapters.chapters) return;

//   var chapters = globChapters;
//   var wrapper = document.querySelector(".chapter-indicator--wrapper");
//   var text = document.querySelector(".chapter-indicator--name");

//   var touching = getTouchingChapters(chapters, text);

//   var chapterProgress = getChapterProgress(chapters, touching, text);

//   var chapterNames = document.querySelectorAll(".chapter-indicator--name span");

//   chapterNames.forEach((name, index) => {

//     name.style.setProperty("--chapter-name-progress", chapterProgress[index]);

//   });

// }

function progressScroll(e) {
  if (!globChapters) return;
  if (!globChapters.chapters) return;

  var chapters = globChapters;
  var wrapper = document.querySelector(".chapter-indicator--wrapper");
  var text = document.querySelector(".chapter-indicator--name");

  var touching = getTouchingChapters(chapters, text);

  var progress = getChapterProgress(touching);

  var name = document.querySelector(".chapter-indicator--name");

    name.style.setProperty("--chapter-progress", progress);
}

// function getTouchingChapters(chapters, text) {
//   var touching = [];

//   chapters.chapters.forEach((chapter) => {
//     var textRect = text.getBoundingClientRect();
//     var chapterRect = chapter.elem.getBoundingClientRect();

//     var textTop = textRect.top;
//     var textBottom = textRect.bottom;

//     var chapterTop = chapterRect.top;
//     var chapterBottom = chapterRect.bottom;

//     var progress = 0;

//     if (chapterTop >= textTop && chapterBottom <= textBottom) {
//       progress = 1;
//     } else if (chapterTop < textTop && chapterBottom <= textBottom) {
//       progress = (chapterBottom - textTop) / textRect.height;
//     } else if (chapterTop >= textTop && chapterBottom > textBottom) {
//       progress = (textBottom - chapterTop) / textRect.height;
//     } else if (chapterTop < textTop && chapterBottom > textBottom) {
//       progress = 1;
//     }

//     if (progress > 0) {
//       touching.push({ chapter: chapter, progress: progress });
//     }
//   });

//   return touching;
// }
function getTouchingChapters(chapters, text) {
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

// function getChapterProgress(chapters, touching, text) {
//   var chapterProgress = chapters.chapters.map((chapter) => {
//     var chapterRect = chapter.elem.getBoundingClientRect();
//     var chapterTop = chapterRect.top;
//     var progress = chapterTop < text.getBoundingClientRect().top ? 1 : 0;

//     if (progress === 0 && touching.length > 0) {
//       var chapterIndex = touching.findIndex((c) => c.chapter === chapter);

//       if (chapterIndex >= 0) {
//         progress = touching[chapterIndex].progress;
//       } else {
//         var totalProgress = touching.reduce((acc, t) => acc + t.progress, 0);
//         var totalHeight = touching.reduce((acc, t) => acc + t.chapter.height, 0);

//         if (totalHeight > 0 && chapter.height > 0) {
//           progress = Math.min(totalProgress / totalHeight, 1);
//         }
//       }
//     }

//     return progress;
//   });

//   var ind = chapterProgress.lastIndexOf(1);
//   for (var i = 0; i < chapterProgress.length; i++) {
//     if (chapterProgress[i] === 1) {
//       chapterProgress[i] = ind - i+1;
//     } else if (chapterProgress[i] > 0) {
//       chapterProgress[i] = ind - i + chapterProgress[i]+1;
//     } else {
//       chapterProgress[i] = -(i - ind)+1;
//     }
//   }

//   console.log(chapterProgress);
//   return chapterProgress;
// }

function getChapterProgress(touching) {
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
