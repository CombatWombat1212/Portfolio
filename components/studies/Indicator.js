import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";

// TODO: fix scss system so theres no gaps between chapters

var globChapters;

function Chapter(elem, index, chapters, setChapters) {
  this.elem = elem;
  this.height = splitPx(window.getComputedStyle(elem).height);
  this.index = index;
  this.name = elem.getAttribute("name");

  this.observer = new ResizeObserver((entries) => {
    let resizeTimer;
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      const updatedHeight = splitPx(window.getComputedStyle(elem).height);
      this.height = updatedHeight;
      setChapters((prevChapters) => {
        const updatedChapters = [...prevChapters.chapters];
        updatedChapters[this.index].height = this.height;
        return { ...prevChapters, chapters: updatedChapters };
      });
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



function namesGet(chapters){
  var n = [];
  chapters.chapters.forEach((chapter) => {
    var name = new Name(chapter.elem);
    name.index = chapter.index;
    n.push(name);
  });
  return n;
}



function namesInit(chapters, setNames, setNamesInitialized){
  var n = namesGet(chapters);
  setNames(n);
  setNamesInitialized(true);
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
  obj.chapters = obj.elems.map((elem, index) => new Chapter(elem, index, chapters, setChapters));

  window.removeEventListener("scroll", indicatorOnScroll);
  window.addEventListener("scroll", indicatorOnScroll);
  window.removeEventListener("resize", () => indicatorOnResize(obj, setChapters));
  window.addEventListener("resize", () => indicatorOnResize(obj, setChapters));
}


function indicatorInit(indicator, chapters, setChapters) {
  var obj = {};
  chaptersInit(obj, chapters, setChapters);
  setChapters(obj);

  // indicatorOnResizeFunctions(obj, setChapters)
}

function Indicator({}) {
  const [chapters, setChapters] = useState({});
  const [names, setNames] = useState([]);
  const [namesInitialized, setNamesInitialized] = useState(false);

  var indicator = useRef(null);

  useMountEffect(() => {
    indicatorInit(indicator, chapters, setChapters);
  });

  useEffect(() => {
    globChapters = chapters;
    if (!chapters.chapters || namesInitialized) return;
    namesInit(chapters, setNames, setNamesInitialized);
  }, [chapters, namesInitialized]);


  useEffect(() => {
    if (!namesInitialized) return;
    var n = namesAddElems(names);
    setNames(n);
  }, [namesInitialized]);


  useEffect(() => {
    console.log(names);
  }, [names]);

  
  return (
    <div className="indicator--wrapper" ref={indicator}>
      <div className="indicator">
        <div className="name">
          <span className="name--empty"></span>
          {namesInitialized && names.map((n) => {
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



function indicatorOnScroll(e) {
  // TODO: These calculations are honestly so extra, you don't need to do this based on the exact position of the chapter, and whether or not its overlapping text, you could probably just do it based on the chapter's position on screen i think?  like the whole idea of it needing to be an exact float seems like much

  if (!globChapters) return;
  if (!globChapters.chapters) return;
  if (!globChapters.chapters[0].elem) return;

  var chapters = globChapters;
  var name = document.querySelector(".indicator .name");
  var touching = indicatorGetTouching(chapters, name);
  var progress = indicatorGetProgress(touching);
  name.style.setProperty("--chapter-progress", progress);
  
  

}

var indicatorIsResizing;

function indicatorOnResize(obj, setChapters) {
  window.clearTimeout(indicatorIsResizing);
  indicatorIsResizing = setTimeout(() => indicatorOnResizeFunctions(obj, setChapters), RESIZE_TIMEOUT);
}

function indicatorOnResizeFunctions(obj, setChapters) {
  const updatedChapters = obj.chapters.map((chapter) => {
    const newHeight = splitPx(window.getComputedStyle(chapter.elem).height);
    return { ...chapter, height: newHeight };
  });
  setChapters({ ...obj, chapters: updatedChapters });
}

export default Indicator;
