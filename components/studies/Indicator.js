import toggle from "@/scripts/AnimationTools";
import { getColors, RESIZE_TIMEOUT, splitPx, splitS } from "@/scripts/GlobalUtilities";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import useListener from "@/scripts/hooks/useListener";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";

// TODO: work on the interactive progress thingy before you work on the color changing backgrounds of the indicator

// TODO: update the way progress is being calculated.  Right now it happens at the border of every chapter, we need that data but we also need the border of every section. hoverever these need to be made from the same data so that we arent calculating too much.  So do it based on section, then mark the chapter divisions based on how many sections are in that chapter and how many have been scrolled past.  That way progress is only calculated once.  Then use that to affect the color and update the label when it pases the halfway point

// TODO: why do we need to be storing the height of chapters and sections?  its calculated everytime we use rect anyways? there's probably a reason, but if not we could save some memory by not storing it

// TODO: Add the chapter selection menu on hover

var indicators = [];

function IndicatorItem(indicator) {
  this.elem = indicator.current ? indicator.current : indicator;
  this.chapters = [];
  this.label = { elem: null };
  this.names = [];
  this.width = 0;
  this.height = 0;
  this.touching = { chapters: [], sections: [] };
  this.progress = { chapter: { current: null, previous: null }, section: { current: null, previous: null } };
  this.visible = { set: false, applied: false };
  this.init = false;
  // this.nearBorder = false;
  // this.previousNearBorder = false;
  this.border = {
    current: false,
    previous: false,
    timeout: null,
  };
}

function Chapter(elem, index) {
  this.elem = elem;
  this.height = chapterGetSize(this);
  this.index = index;
  this.name = elem.getAttribute("name");
  this.sections = [];
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

function Section(elem, chapter, chapIndex, secIndex) {
  this.elem = elem;
  this.index = { chapter: chapIndex, section: secIndex };
  this.chapter = chapter;
  this.color = {
    theme: null,
    background: null,
  };
}

function Name(elem) {
  this.chapter = elem;
  this.index = 0;
  this.text = elem.getAttribute("name");
  this.width = 0;
  this.elem = null;
  this.background = null;
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
        // indicatorGetSize(indicator);
        // indicatorSetSize(indicator);
      });
    }, RESIZE_TIMEOUT);
  });
  this.observer.observe(elem);
}

function namesGetSizes(name) {
  if (!name.elem) return;
  var width = name.elem.getBoundingClientRect().width;
  name.width = width;
}

function indicatorGetVisibility(indicator) {
  // indicator.visible.set = indicator.progress.chapter.current > 0;
  indicator.visible.set = indicator.progress.chapter.current > 0 && indicator.border.current;
}

function indicatorSetVisibility(indicator) {
  if (!indicator.init) return;
  var elem = indicator.elem.querySelector(".indicator");
  var transition = splitS(window.getComputedStyle(elem).getPropertyValue("--indicator-transition"));

  if (indicator.visible.set !== indicator.visible.applied) {
    if (indicator.visible.set) {
      elem.classList.remove("indicator__hidden");
      elem.classList.remove("indicator__unloaded");
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
  indicator.elem.style.setProperty("--chapter-progress", indicator.progress.chapter.current);
  indicator.elem.style.setProperty("--section-progress", indicator.progress.section.current);

  var chapterIndex = Math.round(indicator.progress.chapter.current) - 1;
  if (chapterIndex < 0) chapterIndex = 0;

  var sectionIndex = Math.round(indicator.progress.section.current) - 1;
  if (sectionIndex < 0) sectionIndex = 0;

  var theme;
  var sections = [];
  indicator.chapters.forEach((chapter) => {
    chapter.sections.forEach((section) => {
      sections.push(section);
    });
  });

  var section = sections[sectionIndex];

  if (!section) theme = "theme";
  else theme = section.color.theme;

  var classes = indicator.elem.classList;
  classes.forEach((className) => {
    if (className.includes("theme")) {
      indicator.elem.classList.remove(className);
    }
  });

  indicator.elem.classList.add(`indicator--wrapper__${theme}`);

  // indicator.elem.querySelector('.empty').style.setProperty('background-color', section.color.background);
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
  indicator.touching.chapters = [];
  indicator.touching.sections = [];

  indicator.chapters.forEach((chapter) => {
    chapter.sections.forEach((section, index) => {
      var elem = section.elem;
      var targetElem = indicator.elem.querySelector(".indicator");
      var targetRect = targetElem.getBoundingClientRect();
      var sectionRect = elem.getBoundingClientRect();
      var targetTop = targetRect.top;
      var targetBottom = targetRect.bottom;

      var sectionTop = sectionRect.top;
      var sectionBottom = sectionRect.bottom;

      var progress = 0;

      if (sectionTop >= targetTop && sectionBottom <= targetBottom) {
        progress = 1;
      } else if (sectionTop < targetTop && sectionBottom <= targetBottom) {
        progress = (sectionBottom - targetTop) / targetRect.height;
      } else if (sectionTop >= targetTop && sectionBottom > targetBottom) {
        progress = (targetBottom - sectionTop) / targetRect.height;
      } else if (sectionTop < targetTop && sectionBottom > targetBottom) {
        progress = 1;
      }

      if (progress > 0) {
        indicator.touching.sections.push({ section: section, progress: progress });
      }
    });
  });

  var border = false;

  if (indicator.touching.sections.length == 1) {
    var sectionObj = indicator.touching.sections[0];
    var chapter = sectionObj.section.chapter;
    var isLastSection = sectionObj.section.index.chapter == chapter.sections.length - 1;
    var isFirstSection = sectionObj.section.index.chapter == 0;

    if (isLastSection || isFirstSection) {
      border = true;
    }
  } else if (indicator.touching.sections.length > 1) {
    var firstSectionObj = indicator.touching.sections[0];
    var secondSectionObj = indicator.touching.sections[1];

    var firstChapter = firstSectionObj.section.chapter;
    var secondChapter = secondSectionObj.section.chapter;

    if (firstChapter != secondChapter) {
      border = true;
    }
  }

  for (var i = 0; i < indicator.touching.sections.length; i++) {
    var sectionObj = indicator.touching.sections[i];
    var chapter = sectionObj.section.chapter;
    var chapterProgress = 0;

    if (border) {
      chapterProgress = sectionObj.progress;
    } else {
      chapterProgress = 1;
    }

    if (indicator.touching.chapters.filter((obj) => obj.chapter == chapter).length == 0) {
      indicator.touching.chapters.push({ chapter: chapter, progress: chapterProgress });
    }
    indicator.touching.chapters.sort((a, b) => a.chapter.index - b.chapter.index);
  }
}

function indicatorGetProgress(indicator) {
  var touching = indicator.touching.chapters;
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
  indicator.progress.chapter.current = progress;
  if (progress != indicator.progress.chapter.previous) {
    indicator.progress.chapter.previous = progress;
    indicator.progress.chapter.current = progress;
  }

  var touching = indicator.touching.sections;
  var nextSection = touching[touching.length - 1];
  var index, p;
  if (nextSection == undefined) {
    index = 0;
    p = 0;
  } else {
    index = nextSection.section.index.section;
    p = nextSection.progress;
  }
  var progress = index + p;
  indicator.progress.section.current = progress;

  if (progress != indicator.progress.section.previous) {
    indicator.progress.section.previous = progress;
    indicator.progress.section.current = progress;
    return true;
  } else {
    return false;
  }
}

function indicatorGetNearBorder(indicator, desktop) {
  const INTRO_CHAPTER = !(indicator.progress.chapter.current > 0);

  const BORDER_BUFFER = (() => {
    if (desktop) return 300;
    else return 1;
  })();
  const MIN_VISIBILITY = (() => {
    if (desktop) return 3000;
    else return 3000;
  })();

  const targetElem = indicator.elem.querySelector(".indicator");
  const targetRect = targetElem.getBoundingClientRect();
  const targetTop = targetRect.top;
  const targetBottom = targetRect.bottom;

  const apply = () => {
    const run = () => {
      indicatorGetVisibility(indicator);
      indicatorSetVisibility(indicator);
    };

    if ((indicator.border.current && !indicator.border.previous) || INTRO_CHAPTER) {
      run();
    } else if (!indicator.border.current && indicator.border.previous) {
      if (indicator.border.timeout) clearTimeout(indicator.border.timeout);
      indicator.border.timeout = setTimeout(() => {
        run();
      }, MIN_VISIBILITY);
    }
  };

  const set = (bool) => {
    indicator.border.previous = indicator.border.current;
    indicator.border.current = bool;
    apply();
  };

  indicator.touching.chapters.forEach((chapterObj) => {
    // chapter height from top of screen
    const chapterElem = chapterObj.chapter.elem;
    const chapterRect = chapterElem.getBoundingClientRect();
    const chapterTop = chapterRect.top;
    const chapterBottom = chapterRect.bottom;

    const WITHIN_BUFFER = chapterTop - targetTop >= -BORDER_BUFFER || targetBottom - chapterBottom >= -BORDER_BUFFER;
    if (WITHIN_BUFFER) {
      set(true);
    } else {
      set(false);
    }
  });

  if (INTRO_CHAPTER) {
    set(false);
  }
}

// function indicatorGetNearBorder(indicator) {
//   const INTRO_CHAPTER = !(indicator.progress.chapter.current > 0);
//   const BORDER_BUFFER = 500;
//   const MIN_VISIBILITY = 2500;
//   const targetElem = indicator.elem.querySelector(".indicator");
//   const targetRect = targetElem.getBoundingClientRect();
//   const targetTop = targetRect.top;
//   const targetBottom = targetRect.bottom;

//   const apply = () => {
//     const run = () => {
//       indicator.checkingNearBorder = false;
//       indicatorGetVisibility(indicator);
//       indicatorSetVisibility(indicator);
//     };

//     if (indicator.checkingNearBorder) return;
//     if ((indicator.border.current && !indicator.border.previous) || INTRO_CHAPTER) {
//       indicator.checkingNearBorder = true;
//       run();
//     } else if (!indicator.border.current && indicator.border.previous) {
//       setTimeout(() => {
//         indicator.checkingNearBorder = true;
//         run();
//       }, MIN_VISIBILITY);
//     }
//   };

//   const set = (bool) => {
//     indicator.border.previous = indicator.border.current;
//     indicator.border.current = bool;
//     apply();
//   };

//   indicator.touching.chapters.forEach((chapterObj) => {
//     // chapter height from top of screen
//     const chapterElem = chapterObj.chapter.elem;
//     const chapterRect = chapterElem.getBoundingClientRect();
//     const chapterTop = chapterRect.top;
//     const chapterBottom = chapterRect.bottom;

//     const WITHIN_BUFFER = chapterTop - targetTop >= -BORDER_BUFFER || targetBottom - chapterBottom >= -BORDER_BUFFER;
//     if (WITHIN_BUFFER) {
//       set(true);
//     } else {
//       set(false);
//     }
//   });

//   if (INTRO_CHAPTER) {
//     set(false);
//   }
// }

function sectionGetBackgroundColors(section) {
  var list = section.elem.classList.value;
  var background = list.match(/background\S*/g)?.join(" ");

  // TODO: Support is needed for image backgrounds, you should be able to add them in as a custom prop in the section element, otherwise default is tertiary, default being tertiary is how it currently is.

  if (!background) {
    section.color.background = "background__background";
  } else {
    if (background.includes("background__background") && background.trim().includes(" ")) {
      section.color.background = background.replace("background__background", "").trim();
    } else {
      section.color.background = background;
    }
  }
  section.color.background = section.color.background.split("__")[1];
}

function sectionGetColors(section) {
  var colors = [
    ["primary", "theme-light"],
    ["primary-hovered", "theme-light"],
    ["secondary", "theme-light"],
    ["secondary-hovered", "theme-light"],
    ["tertiary-light", "theme-light"],
    ["tertiary", "theme-light"],
    ["tertiary-makeright", "theme-light"],
    ["background", "theme-dark"],
    ["background-darker", "theme-dark"],
    ["background-darkest", "theme-dark"],
    ["image", "theme-dark"],
  ];

  // var background = section.color.background;
  // for (var i = 0; i < colors.length; i++) {
  //   var color = colors[i];
  //   if (color[0] == background) {
  //     section.color.theme = color[1];
  //     break;
  //   }
  // }

  const colorMapping = new Map(colors);
  section.color.theme = colorMapping.get(section.color.background) || "";
}

function sectionsInit(indicator, sections, setSections) {
  indicator.chapters.forEach((chapter) => {
    chapter.sections = [];
  });

  var secIndex = 0;
  var sec = [];

  indicator.chapters.forEach((chapter) => {
    var all = Array.from(chapter.elem.querySelectorAll(".section--wrapper"));
    all.forEach((elem, chapIndex) => {
      var newSection = new Section(elem, chapter, chapIndex, secIndex++);
      sectionGetBackgroundColors(newSection);
      sectionGetColors(newSection);
      chapter.sections.push(newSection);
      if (sec.filter((obj) => obj.elem == newSection.elem).length == 0) {
        sec.push(newSection);
      }
    });
  });

  if (sections.length > 0) return;
  setSections(sec);
  indicator.elem.style.setProperty("--section-count", `${secIndex}`);
}

function chaptersInit(indicator) {
  var all = Array.from(document.querySelectorAll(".chapter--wrapper"));

  all.forEach((elem, index) => {
    var newChapter = new Chapter(elem, index);
    if (indicator.chapters.filter((obj) => obj.elem == newChapter.elem).length == 0) {
      indicator.chapters.push(newChapter);
    }
  });
}

function indicatorNameWidthSet(indicator) {
  if (!indicator) return;
  var progress = indicator.progress.chapter.current;

  if (progress < 1) {
    indicator.elem.style.setProperty("--label-width", `${indicator.names[0]?.width}px`);
    return;
  } else {
    progress = progress - 1;
    var currentChapter = Math.round(progress);
    var decimal = progress - currentChapter;
    var chapterNameWidth = indicator.names[currentChapter].width;
    indicator.elem.style.setProperty("--label-width", `${chapterNameWidth}px`);
  }
}

// function indicatorSetSize(indicator) {
//   indicator.elem.style.setProperty("--indicator-width", `${indicator.width}px`);
//   indicator.elem.style.setProperty("--indicator-height", `${indicator.height}px`);
// }

// function indicatorGetSize(indicator) {
//   var ind = indicator.elem.querySelector(".indicator");
//   var width =
//     splitPx(window.getComputedStyle(ind).width) +
//     splitPx(window.getComputedStyle(ind).paddingLeft) +
//     splitPx(window.getComputedStyle(ind).paddingRight);
//   var height =
//     splitPx(window.getComputedStyle(ind).height) +
//     splitPx(window.getComputedStyle(ind).paddingTop) +
//     splitPx(window.getComputedStyle(ind).paddingBottom);
//   indicator.width = width;
//   indicator.height = height;
// }

function chapterGetSize(chapter) {
  chapter.height = splitPx(window.getComputedStyle(chapter.elem).height);
}

function indicatorInit(indicator, sections, setSections, desktop, indicatorOnScroll, indicatorOnResizeFunctions) {
  chaptersInit(indicator);
  sectionsInit(indicator, sections, setSections);
  labelInit(indicator);
  indicatorOnScroll();
  indicatorOnResizeFunctions();

  setTimeout(() => {
    indicator.init = true;
    indicator.elem.classList.remove("indicator--wrapper__hidden");
    indicatorGetNearBorder(indicator, desktop);
    // indicatorGetVisibility(indicator);
    // indicatorSetVisibility(indicator);

    indicatorOnScroll();
    indicatorOnResizeFunctions();
  }, 1000);
}

function Indicator({}) {
  const [names, setNames] = useState([]);
  const [sections, setSections] = useState([]);
  var indicator = useRef(null);

  const { desktop } = useResponsive();

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
      indicatorInit(indicator, sections, setSections, desktop, indicatorOnScroll, indicatorOnResizeFunctions);
    });
  }, [names]);

  useListener("scroll", indicatorOnScroll);
  useListener("resize", indicatorOnResize);

  function indicatorOnScroll() {
    // TODO: These calculations are honestly so extra, you don't need to do this based on the exact position of the chapter, and whether or not its overlapping text, you could probably just do it based on the chapter's position on screen i think?  like the whole idea of it needing to be an exact float seems like much

    if (!indicators) return;

    indicators.forEach((indicator) => {
      var chapters = indicator.chapters;
      var label = indicator.label;
      indicatorGetTouching(indicator);
      var changed = indicatorGetProgress(indicator);
      indicatorGetNearBorder(indicator, desktop);
      // indicatorGetVisibility(indicator);
      // indicatorSetVisibility(indicator);
      if (!changed) return;
      indicatorNameWidthSet(indicator);
      // indicatorGetSize(indicator);
      // indicatorSetSize(indicator);
      labelStyleSet(indicator);
    });
  }

  var indicatorIsResizing;

  function indicatorOnResize() {
    window.clearTimeout(indicatorIsResizing);
    indicatorIsResizing = setTimeout(indicatorOnResizeFunctions, RESIZE_TIMEOUT);
  }

  function indicatorOnResizeFunctions() {
    indicators.forEach((indicator) => {
      // indicatorGetSize(indicator);
      // indicatorSetSize(indicator);
      indicator.names.forEach((name) => {
        namesGetSizes(name);
      });
      indicator.chapters.forEach((chapter) => {
        chapterGetSize(chapter);
      });
    });
  }

  return (
    <div className="indicator--wrapper indicator--wrapper__hidden" ref={indicator}>
      <div className="indicator--inner">
        <div
          className="indicator indicator__unloaded indicator__hidden indicator__off"
          // onMouseEnter={indicatorOnHover} onMouseLeave={indicatorOnMouseLeave}
        >
          <div className="indicator--back">
            {sections &&
              sections.map((s, i) => {
                return (
                  <div
                    className={`indicator--background indicator--background__${s.color.theme}`}
                    key={i}
                    style={{
                      "--indicator-background-index": i,
                      // "--indicator-background-color": `var(--col-${s.color.contrast})`,
                    }}></div>
                );
              })}
          </div>
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
    </div>
  );
}

export default Indicator;
