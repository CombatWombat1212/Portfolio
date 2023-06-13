import Graphic from "./graphic/Graphic";
import { addClassToJsxObj } from "./sections_utilities/ClassUtilities";
import { getSectionChildren } from "./sections_utilities/GetSectionChildren";
import MAKERIGHT_IMGS from "@/data/MAKERIGHT_IMGS";
import Section from "./Sections";
import React, { useEffect, useRef, useState } from "react";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { clamp, ClassList, cooldown, createUpdateConditions, RESIZE_TIMEOUT, splitPx, splitRem } from "@/scripts/GlobalUtilities";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import usePropModifier from "@/scripts/hooks/usePropModifier";
import swipeEventsInit from "@/scripts/SwipeEvents";
import useListener from "@/scripts/hooks/useListener";
import useScrollDirection from "@/scripts/hooks/useScrollDirection";
import useScrollType from "@/scripts/useScrollType";
import useDeviceDetect from "@/scripts/hooks/useDetectDevice";
import Tag from "../elements/Tag";
import { arrow_down } from "@/data/ICONS";
import ResponsiveText from "../global/ResponsiveText";
import useInView from "@/scripts/hooks/useInView";
import useInOut from "@/scripts/hooks/useInOut";
import useAttrObserver from "@/scripts/hooks/useAttrObserver";
import { lock, unlock } from "tua-body-scroll-lock";
import useBrowser from "@/scripts/hooks/useBrowser";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import useIsScrolling from "@/scripts/hooks/useIsScrolling";

const laptop_frame = MAKERIGHT_IMGS.pitch_laptop_frame;

// TODO: i think you should do the same animation on the description side to make it have smooth scrolling transitions too? Or maybe something to lock it in place better next to the screen? might not be priority though
// TODO: how tf is this gonna be responsive?? LOL good luck with that (nah u got this)

// TODO:something i think in this code is causing a violation warning

var pitches = [];

function PitchItem(pitch) {
  this.ref = pitch;
  this.elem = pitch.current ? pitch.current : pitch;
  this.inView = false;
  this.frame = {
    height: 0,
    width: 0,
    elem: this.elem.querySelector(".pitch--laptop"),
  };
  this.screens = {
    height: 0,
    width: 0,
    elem: this.elem.querySelector(".pitch--screens"),
  };
  this.rows = {
    elems: Array.from(this.ref.current.querySelectorAll(".pitch--placeholder")),
    current: 0,
    progress: 0,
  };
  this.captions = {
    elems: Array.from(this.ref.current.querySelectorAll(".pitch--body")),
    sizes: [],
    vectorSizes: [],
  };
  this.starting = {
    row: 0,
    set: 0,
  };

  this.scrollStatus = {
    above: 1,
    below: 1,
  };
}

function pitchGetVectorSize(pitch) {
  for (var i = 0; i < pitch.captions.elems.length; i++) {
    var caption = pitch.captions.elems[i];

    var vector = caption.querySelector(".mask");
    var computedStyle = window.getComputedStyle(vector);
    var width = splitPx(computedStyle.width);
    var marginRight = splitPx(computedStyle.marginRight);
    var marginLeft = splitPx(computedStyle.marginLeft);
    var totalWidth = width + marginRight + marginLeft;

    pitch.captions.vectorSizes[i] = totalWidth;
  }
}

function pitchSetVectorSize(pitch) {
  var vectorWidth = Math.max(...pitch.captions.vectorSizes);
  pitch.elem.style.setProperty("--pitch-vector-width", vectorWidth + "px");
}

function pitchGetCaptionSize(pitch) {
  for (var i = 0; i < pitch.captions.elems.length; i++) {
    var caption = pitch.captions.elems[i];
    var captionHeight = 0;
    var captionChildren = caption.children;
    var captionComputedStyle = window.getComputedStyle(caption);

    for (var j = 0; j < captionChildren.length; j++) {
      var captionChild = captionChildren[j];
      var computedStyle = window.getComputedStyle(captionChild);

      // Skip the child if its display is set to "none"
      if (computedStyle.display === "none") continue;

      var height = splitPx(computedStyle.height);
      var marginTop = splitPx(computedStyle.marginTop);
      var marginBottom = splitPx(computedStyle.marginBottom);
      var totalHeight = height + marginTop + marginBottom;

      if (captionComputedStyle.flexDirection === "column") {
        captionHeight += totalHeight;
      } else if (captionComputedStyle.flexDirection === "row") {
        captionHeight = Math.max(captionHeight, totalHeight);
      }
    }
    pitch.captions.sizes[i] = captionHeight;
  }
}

function pitchSetCaptionSize(pitch) {
  // take the greatest pitch caption height and set it as --pitch-caption-height on pitch .elem
  var captionHeight = Math.max(...pitch.captions.sizes);
  pitch.elem.style.setProperty("--pitch-caption-height", captionHeight + "px");
}

function pitchSetCurrentRow(pitch) {
  var { current, previous } = pitch.rows;
  if (current !== previous) {
    pitch.rows.previous = current;
    var elem = pitch.elem;
    elem.style.setProperty("--pitch-current-row", pitch.rows.current);
  }
}

let pitchSetRowProgressCounter = 0;

function pitchSetRowProgress(pitch) {
  pitchSetRowProgressCounter++;

  if (pitchSetRowProgressCounter % 5 === 0) {
    pitch.elem.style.setProperty("--pitch-row-progress", pitch.rows.progress);
  }
}

function pitchGetRowProgress(pitch) {
  const additionalHeight = splitRem(getComputedStyle(pitch.elem).getPropertyValue("--pitch-additional-height"));

  const captions = pitch.elem.querySelector(".pitch--captions");
  const captionsRect = captions.getBoundingClientRect();
  const captionsCenterY = (captionsRect.top + captionsRect.bottom) / 2;
  const currentRow = pitch.rows.elems[pitch.rows.current];
  const currentRowRect = currentRow.getBoundingClientRect();
  const currentRowCenterY = (currentRowRect.top + currentRowRect.bottom) / 2;

  const distance = (captionsCenterY - currentRowCenterY) / (pitch.frame.height / 2 + additionalHeight);

  if (distance > 1) {
    pitch.rows.progress = 1;
  } else if (distance < -1) {
    pitch.rows.progress = -1;
  } else {
    pitch.rows.progress = distance;
  }
}

function pitchGetCurrentRow(pitch) {
  // Get the rows array and the current row index
  const { elems, current, previous } = pitch.rows;

  // Check if the current row is in view
  const currentRowRect = elems[current].getBoundingClientRect();
  const currentRowInView = currentRowRect.top >= 0 && currentRowRect.bottom <= window.innerHeight;

  // If the current row is not in view, find the row taking up the most space in the viewport
  if (!currentRowInView) {
    let maxArea = 0;
    let maxIndex = current;
    for (let i = 0; i < elems.length; i++) {
      const rect = elems[i].getBoundingClientRect();
      const area = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (area > maxArea) {
        maxArea = area;
        maxIndex = i;
      }
    }
    pitch.rows.current = maxIndex;
  }

  // Check if the viewport is underneath the whole element and set the current row to the last row
  const lastRowRect = elems[elems.length - 1].getBoundingClientRect();
  if (lastRowRect.bottom < 0) {
    pitch.rows.current = elems.length - 1;
  }
}

function pitchGetInView(pitch) {
  var elem = pitch.elem;
  var rect = elem.getBoundingClientRect();
  var inView = rect.top < window.innerHeight && rect.bottom > 0;
  pitch.inView = inView;

  var within = rect.top <= 0 && rect.bottom >= window.innerHeight; // not just in view, but fully within the viewport, used for the indicator
  if (within) {
    elem.setAttribute("data-inview", true);
  } else {
    elem.setAttribute("data-inview", false);
  }

  if (inView && pitch.starting.set == 0) {
    pitch.starting.set++;
    pitch.starting.row = pitch.rows.current;
  }

  if (!inView) {
    pitch.starting.set = 0;
  }
}

function pitchSetRowSize(pitch) {
  var elem = pitch.elem;
  var height = pitch.frame.height;
  var width = pitch.frame.width;

  // Set the row height and width
  elem.style.setProperty("--pitch-row-height", height + "px");
  elem.style.setProperty("--pitch-row-width", width + "px");

  // Set the row overflow buffer
  elem.style.setProperty("--pitch-overflow-buffer-x", height - pitch.screens.height + "px");
  elem.style.setProperty("--pitch-overflow-buffer-y", width - pitch.screens.width + "px");

  elem.style.setProperty("--pitch-screen-width", pitch.screens.width + "px");
}

function pitchGetRowSize(pitch) {
  var elem = pitch.elem;
  var frame = elem.querySelector(".pitch--laptop");

  // get the height and width of the frame
  var height = splitPx(window.getComputedStyle(frame).height);
  var width = splitPx(window.getComputedStyle(frame).width);
  pitch.frame.height = height;
  pitch.frame.width = width;

  // get width and height of the screens
  var screens = pitch.screens.elem;

  var screensHeight = splitPx(window.getComputedStyle(screens).height);
  var screensWidth = splitPx(window.getComputedStyle(screens).width);

  pitch.screens.height = screensHeight;
  pitch.screens.width = screensWidth;
}

function pitchInit(pitch) {
  pitch = pitch.current ? pitch.current : pitch;

  pitchResize(pitch);
  pitchScroll(null, true);
}

// TODO: is giving the laptop the onLoad thing working well in practice? The other option is giving it priority.  Or both.

function Laptop({ rows }) {
  return (
    <>
      <div className="pitch--graphics">
        <Graphic img={laptop_frame} className={`pitch--row pitch--image pitch--laptop`} onLoad={pitchResize} />
        <div className="pitch--screens">
          {rows.map((row, i) => {
            var { mockup } = formatRow(row);
            var mockupProps = mockup.props;
            var graphicClassName = mockupProps.className ? mockupProps.className : "";

            return (
              <Graphic key={i} {...mockupProps} className={`pitch--row pitch--image pitch--mockup`} style={{ "--pitch-row-index": i }} lazy={false} />
            );
          })}
        </div>
      </div>
    </>
  );
}

function Pitch({ children }) {
  const [withinPitch, setWithinPitch] = useState(false);
  const [lockScroll, setLockScroll] = useState(false);
  const [lastTouchY, setLastTouchY] = useState(null);

  useEffect(() => {
    swipeEventsInit();
  }, []);

  var rows = [];

  for (var i = 0; i < children.length; i++) {
    rows.push({ childs: getSectionChildren(children[i].props.children), props: children[i].props });
  }

  const pitch = useRef(null);

  const { desktop, isBpAndDown, bp, loading } = useResponsive();
  const { isMobileDevice } = useDeviceDetect();
  const lgAndDown = !(!isBpAndDown("lg") || loading);
  const mdAndDown = !(!isBpAndDown("md") || loading);
  const smAndDown = !(!isBpAndDown("sm") || loading);

  useMountEffect(() => {
    var pitchObj = new PitchItem(pitch);
    pitches.push(pitchObj);
    pitchInit(pitchObj);

    // TODO: there are 2 pitch items inside pitches after mount so certain things must be running twice.
    // if (indicators.length == 0 || indicators[indicators.length - 1].elem != indicatorObj.elem) {
    //   indicators.push(indicatorObj);
    // }
    // I fixed it like this in indicator
  });

  useListener("resize", pitchResize, { passive: true });
  useListener("scroll", pitchScroll, { passive: true });
  useListener("scroll", handleScroll, { passive: true });
  useListener("scroll", atTopOfNextSection, { passive: true });
  useListener("touchmove", handleScroll, { passive: true });

  useListener("scroll", preventScroll, { enabled: lockScroll });
  useListener("touchstart", preventScroll, { enabled: lockScroll });
  // useListener("swiped-down", swipedDownHandler, { ref: pitch, enabled: lockScroll });
  // useListener("swiped-up", swipedUpHandler, { ref: pitch, enabled: lockScroll });
  useListener("touchend", () => setLastTouchY(null));

  useEffect(() => {
    if (!pitch.current) return;
    pitch.current.addEventListener("swiped-down", swipedDownHandler);
    pitch.current.addEventListener("swiped-up", swipedUpHandler);
    return () => {
      if (!pitch.current) return;
      pitch.current.removeEventListener("swiped-down", swipedDownHandler);
      pitch.current.removeEventListener("swiped-up", swipedUpHandler);
    };
  }, [pitch]);

  // if mdAndDown is true do the following:
  // cancel all scrolling once the top of .pitch (including its padding-top) has reached the top of the screen, from there listen for swipes and with every swipe up, scroll to the top of the next .pitch--placeholder, you know which one is the current placeholder based on pitch.rows.current that is set on scroll and resize

  const scrollType = useScrollType();

  function handleScroll(e) {
    if (!(mdAndDown && pitches.find((pitch) => pitch.inView) && isMobileDevice)) {
      setLockScroll(false);
      return;
    }

    const pitchObj = pitches.find((p) => p.elem == pitch.current);
    const pitchRect = pitchObj.elem.getBoundingClientRect();
    const topOffset = pitchObj.frame.height;

    const atFirstRow = pitchObj.rows.current == 0;
    const atLastRow = pitchObj.rows.current == pitchObj.rows.elems.length - 1;
    const withinFirstOrLastRow = atFirstRow || atLastRow;

    const pastPitchTop = pitchRect.top <= 0;
    const beforePitchBottom = pitchRect.bottom >= window.innerHeight;
    const withinPitch = pastPitchTop && beforePitchBottom;

    setWithinPitch(withinPitch);

    const scrollTouch = scrollType == "touch";
    const set = withinPitch && scrollTouch && !withinFirstOrLastRow;
    setLockScroll(set);
  }

  function atTopOfNextSection(e) {
    if (scrollType != "touch") return;
    if (!(mdAndDown && pitches.find((p) => p.elem == pitch.current))) return;
    const pitchObj = pitches.find((p) => p.elem == pitch.current);

    const navHeight = splitRem(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"));

    var parentSection = pitchObj.elem.closest(".section--wrapper");
    var nextSection = parentSection.nextElementSibling;
    var prevSection = parentSection.previousElementSibling;

    if (!nextSection || !prevSection) return;

    var nextSectionRect = nextSection.getBoundingClientRect();
    var prevSectionRect = prevSection.getBoundingClientRect();
    var nextSectionTop = nextSectionRect.top;
    var prevSectionTop = prevSectionRect.top;

    if (nextSectionTop < navHeight && pitchObj.scrollStatus.below == 0) {
      pitchObj.scrollStatus.below++;
      stopMomentum();
    }

    if (prevSectionTop > navHeight && pitchObj.scrollStatus.above == 0) {
      pitchObj.scrollStatus.above++;
      stopMomentum();
    }
  }

  useEffect(() => {
    if (lockScroll || withinPitch) {
      stopMomentum();
    }
  }, [lockScroll, withinPitch]);

  useEffect(() => {
    if (lockScroll) {
      const pitchObj = pitches.find((p) => p.elem == pitch.current);
      pitchObj.scrollStatus.below = 0;
      pitchObj.scrollStatus.above = 0;
    }
  }, [lockScroll]);

  function swipedUpHandlerRun(e) {
    pitchSkipToRow(1);
  }

  function swipedDownHandlerRun(e) {
    pitchSkipToRow(-1);
  }

  const swipedUpHandlerThrottled = cooldown(swipedUpHandlerRun, 100);
  const swipedDownHandlerThrottled = cooldown(swipedDownHandlerRun, 100);

  function swipedUpHandler(e) {
    swipedUpHandlerThrottled(e);
    console.log("swiped up");
  }

  function swipedDownHandler(e) {
    swipedDownHandlerThrottled(e);
    console.log("swiped down");
  }


  return (
    <>
      <div className="pitch" ref={pitch}>
        <div className="pitch--column pitch--graphics-wrapper">
          <Laptop rows={rows} pitch={pitch}  />
        </div>

        <div className="pitch--column pitch--captions-wrapper">
          <div className="pitch--captions">
            {rows.map((row, i) => {
              var { description, heading, vector } = formatRow(row);
              var vectorProps = vector.props;

              return <PitchBody key={i} index={i} vectorProps={vectorProps} heading={heading} description={description} />;
            })}
          </div>

          <div className="pitch--empties">
            {rows.map((row, i) => {
              return <div key={i} className="pitch--row pitch--placeholder"></div>;
            })}
          </div>
        </div>
        <Indicator pitch={pitch} />
      </div>
    </>
  );
}

function Indicator({ pitch }) {

  const MINIMUM_READY_DURATION = 500;

  const [count, setCount] = useState(0);
  const [delayedReady, setDelayedReady] = useState(false);
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  
  const readyStartTimestamp = useRef(null);
  
  const insidePitch = useAttrObserver(pitch, "data-inview");
  const currentRow = useAttrObserver(pitch, "--pitch-current-row", {bool:false});
  const indicatorClassState = useInOut(show);
  const isScrolling = useIsScrolling({debounce: 2650});
  
  useEffect(() => {
    const firstRun = insidePitch && currentRow == 0;
    const stoppedScrolling = insidePitch && !isScrolling;
    if (firstRun || stoppedScrolling) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [insidePitch, isScrolling, currentRow]);
  
  useEffect(() => {
    if(ready){
      readyStartTimestamp.current = Date.now();
      setDelayedReady(true);
      setCount(count + 1);
    } else {
      const readyDuration = Date.now() - readyStartTimestamp.current;
      if (readyDuration < MINIMUM_READY_DURATION) {
        setTimeout(() => {
          setDelayedReady(false);
        }, MINIMUM_READY_DURATION - readyDuration);
      } else {
        setDelayedReady(false);
      }
    }
  }, [ready]);
  
  useEffect(() => {
    if(ready){
      setCount(count + 1);
    }
  }, [ready]);

  useEffect(() => {
    if(!insidePitch){
      setCount(0);
    }
  }, [insidePitch]);

  useEffect(() => {
    if((delayedReady && insidePitch) || ( currentRow == 0 && insidePitch)){
      setShow(true);
    } else {
      setShow(false);
    }
  }, [delayedReady, insidePitch, currentRow]);
  

  const list = new ClassList("pitch--indicator-arrow");
  list.addIf("animate", show);
  const classes = list.get();

  return (
    <div className={`pitch--indicator-wrapper pitch--indicator-wrapper__${indicatorClassState}`}>
      {/* <Tag className="pitch--indicator" variant="tool" color="inverted"> */}
        <div className="pitch--indicator">
        {/* <ResponsiveText tag="Fragment">
          <xxl>Scroll</xxl>
          <md>Swipe</md>
        </ResponsiveText> */}
        <Graphic type="mask" className={classes} img={arrow_down} />
        </div>
      {/* </Tag> */}
    </div>
  );
}

function PitchBody({ index, vectorProps, heading, description }) {
  return (
    <div className="pitch--row pitch--body" key={index} style={{ "--pitch-row-index": index }}>
      <Graphic {...vectorProps} />

      {heading && <>{addClassToJsxObj(heading, "d-block d-lg-none d-sm-block")}</>}
      {description && <>{addClassToJsxObj(description, "d-block d-lg-none d-sm-block")}</>}

      <div className="pitch--body-inner d-none d-lg-block d-sm-none">
        {heading && <>{heading}</>}
        {description && <>{description}</>}
      </div>
    </div>
  );
}

function formatRow(row) {
  var { description, title, heading, graphic, other } = row.childs;
  description = addClassToJsxObj(description, "pitch--description");
  title = addClassToJsxObj(title, "pitch--title");
  heading = addClassToJsxObj(heading, "pitch--heading");
  var vector = addClassToJsxObj(graphic[0], "pitch--vector");
  var mockup = addClassToJsxObj(graphic[1], "pitch--mockup");

  return {
    description,
    title,
    heading,
    graphic,
    other,
    vector,
    mockup,
  };
}

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
}

function stopMomentum() {
  document.body.classList.add("noscroll");
  setTimeout(() => {
    document.body.classList.remove("noscroll");
  }, 100);
}

function pitchSkipToRow(delta) {
  const pitchObj = pitches.find((pitch) => pitch.inView);
  if (!pitchObj) return;

  const newRow = pitchObj.rows.current + delta;
  if (newRow < 0 || newRow >= pitchObj.rows.elems.length) return;

  const targetRow = pitchObj.rows.elems[newRow];
  const targetTop = targetRow.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: targetTop, behavior: "smooth" });
  pitchObj.rows.current = newRow;
}

function isScrollUp(e, lastTouchY, setLastTouchY) {
  // if (scrollDir === "up") {
  // if (scrollType === "touch") {
  if (e.type === "touchmove" && e.touches.length > 0) {
    const touch = e.touches[0];
    const isSwipingDown = lastTouchY !== null && touch.clientY > lastTouchY;
    setLastTouchY(touch.clientY);
    return isSwipingDown;
  }
  // } else {
  // return true;
  // }
  // }
  return false;
}

var scrolls = 0;
function pitchScroll(e, force) {
  scrolls++;
  force = force ? force : false;
  if (scrolls < 20) force = true;

  // detect if pitch.elem is in view and console log it
  pitches.forEach((pitch) => {
    pitchGetInView(pitch);
    if (pitch.inView || force) {
      pitchGetCurrentRow(pitch);
      pitchSetCurrentRow(pitch);
      pitchGetRowProgress(pitch);
      pitchSetRowProgress(pitch);
    }
  });
}

var pitchIsResizing;

function pitchResize() {
  window.clearTimeout(pitchIsResizing);
  pitchIsResizing = setTimeout(pitchResizeFunctions, RESIZE_TIMEOUT);
}

function pitchResizeFunctions() {
  pitches.forEach((pitch) => {
    pitchGetRowSize(pitch);
    pitchSetRowSize(pitch);
    pitchGetCaptionSize(pitch);
    pitchSetCaptionSize(pitch);
    pitchGetVectorSize(pitch);
    pitchSetVectorSize(pitch);
  });
}

Laptop.displayName = "Laptop";
Pitch.displayName = "Pitch";
PitchBody.displayName = "PitchBody";

export default Pitch;
