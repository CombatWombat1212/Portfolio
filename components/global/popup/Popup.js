// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it


// TODO: Fix interactive popup's zoom, the close button isn't sticky, and it needs the styled scrollbar
// TODO: custom image ordering on the explorations page
// TODO: add icons for videos and groups of images to explorations page listings
// TODO: video thumbnails and in general custom thumbnails for the explorations page
// TODO: thats it, thats all for explorations!!

import toggle, { simpleToggleOn } from "@/scripts/AnimationTools";
import Image from "next/image";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import { loading_white } from "@/data/ICONS";
import { RESIZE_TIMEOUT, createUpdateConditions, cssVarToPixels, splitPx, splitRem } from "@/scripts/GlobalUtilities";
import {
  canvasDrawImage,
  canvasImageSizeInit,
  canvasInit,
  canvasOnResize,
  canvasSetSize,
  canvasZoom,
  setCanvasImageLoaded,
} from "./popup_utilities/CanvasUtilities";
import { galleryInit, getImgGroup, imgLoading, lightboxInit, seekHandler, setPopupGroup, updatePopupNav } from "./popup_utilities/LightboxUtilities";
// import { catchKeys, closePopup, setSetPopupGlobal } from "./popup_utilities/PopupUtilities";
import { Graphic, Heading } from "@/components/sections/Sections";
import useBodyClass from "@/scripts/hooks/useBodyClass";
import useListener from "@/scripts/hooks/useListener";
import { AnimatePresence, motion, useAnimation, useIsPresent } from "framer-motion";
import useMouseMoving from "@/scripts/hooks/useMouseMoving";
import useHoverAndFocus from "@/scripts/hooks/useHoverAndFocus";
import useInputDown from "@/scripts/hooks/useInputDown";
import useElementWidth from "@/scripts/hooks/useElementWidth";
import useElementHeight from "@/scripts/hooks/useElementHeight";
import AnimPres from "../AnimPres";
import { GalInfo } from "./popup_components/GalleryInfo";
import popAnims, { popLayoutTransition, popSeekDuration } from "./popup_utilities/PopupAnimations";

//no more than 2 decimals
const startZoom = 0.95;
const minZoom = 0.95;
const maxZoom = 7.5;

const classAnims = {
  hideBtns: {
    in: "popup--seek__on",
    out: "popup--seek__off",
  },
};

function getPopupClasses(pop) {
  // Initialize arrays for class names

  var popclass = {
    header: [],
    content: [],
    media: [],
    mediaWrapper: [],
    container: [],
    desc: [],
    inner: [],
    background: [],
    close: [],
    containerStyle: {},
  };

  // Case 1: type is "lightbox"
  if (pop.type === "lightbox") {
    popclass.header.push("popup--header__condensed", "popup--nav__on");
    popclass.close.push("popup--close__lightbox");

    // Nested Case 1.1: zoom is true
    if (pop.zoom) {
      popclass.media.push("popup--img__lightbox-zoom");
      popclass.content.push("popup--content__lightbox-zoom");
      popclass.container.push("popup__lightbox-zoom");
    }
    // Nested Case 1.2: zoom is false
    if (!pop.zoom) {
      popclass.content.push("popup--content__lightbox");
      popclass.container.push("popup__lightbox");
    }

    // Nested Case 1.3: group is true
    if (pop.group) {
      popclass.container.push("popup__lightbox-group");
      popclass.content.push("popup--content__lightbox-group");
    }
    // Nested Case 1.4: group is false
    if (!pop.group) {
    }

    // Update popclass.containerStyle for type "lightbox"
    popclass.containerStyle = { "--img-aspect-width": pop.img.width, "--img-aspect-height": pop.img.height };
  }

  if (pop.type === "gallery") {
    popclass.content.push("popup--content__gallery");
    popclass.container.push("popup__gallery");
    popclass.desc.push("popup--description__gallery");
    popclass.background.push("popup--background__gallery");
    popclass.inner.push("popup--inner__gallery");
    popclass.close.push("popup--close__gallery");

    // Nested Case 2.1: zoom is true
    if (pop.zoom) {
      popclass.media.push("popup--media__gallery-zoom");
      popclass.mediaWrapper.push("popup--media-wrapper__gallery-zoom");
    }
    // Nested Case 2.2: zoom is false
    if (!pop.zoom) {
      popclass.mediaWrapper.push("popup--media-wrapper__gallery");
      popclass.media.push("popup--media__gallery");
      // popclass.container.push("popup__lightbox");
    }
    // Nested Case 2.3: group is true
    if (pop.group) {
      popclass.content.push("popup--content__gallery-group");
      popclass.mediaWrapper.push("popup--media-wrapper__gallery-group");
    }
    // Nested Case 2.4: group is false
    if (!pop.group) {
    }
    // // Update popclass.containerStyle for type "lightbox"
    // popclass.containerStyle = { "--img-aspect-width": pop.img.width, "--img-aspect-height": pop.img.height };
  }

  // Case 2: type is "interactive"
  else if (pop.type == "interactive") {
    popclass.header.push("popup--header__full");

    popclass.content.push("popup--content__interactive");
    popclass.container.push("popup__interactive");
  }

  // Join the arrays to form final class strings
  for (var key in popclass) {
    if (Array.isArray(popclass[key])) {
      popclass[key] = popclass[key].join(" ");
    }
  }

  return popclass;
}

function Popup({ pop }) {
  const poptransition = 0.15;

  useEffect(() => {
    pop.onRef.current = pop.on; // Update the ref value whenever pop.on changes
  }, [pop.on]);

  const popAnimCompleteHandler = useCallback(() => {
    pop.setDrawn(pop.onRef.current ? true : false);
  }, []);

  return (
    <>
      <AnimPres
        animation={popAnims.fade}
        duration={poptransition}
        condition={pop.on}
        className={"popup--wrapper"}
        onAnimationComplete={popAnimCompleteHandler}>
        <Wrapper pop={pop} />
      </AnimPres>
    </>
  );
}

function Wrapper({ pop }) {
  var popclass = getPopupClasses(pop);

  useBodyClass("noscroll", pop.on);
  useListener("resize", popupResize, pop.on);
  useListener("keydown", seekHandlerWithKeydown, pop.on);
  useListener("keydown", closeHandlerWithKeydown, pop.on);

  const nav = useNavControls();
  const mouseMoving = useMouseMoving(null, 1000);
  const closeHovered = useHoverAndFocus(nav.close.ref);
  const input = useInputDown(["ArrowRight", "ArrowLeft", "LeftMouse", "RightMouse", "Scroll"]);

  const interaction = useMemo(() => {
    return mouseMoving || closeHovered || input;
  }, [mouseMoving, closeHovered, input]);

  useEffect(() => {
    if (interaction) {
      pop.ui.setVisible(true);
    } else {
      const timeoutId = setTimeout(() => {
        pop.ui.setVisible(false);
      }, 80000);
      return () => clearTimeout(timeoutId);
    }
  }, [interaction]);

  useEffect(() => {
    if (pop.on) {
      if (pop.type == "interactive") canvasInit(pop);
      if (pop.type == "lightbox") lightboxInit(pop);
      if (pop.type == "gallery") galleryInit(pop);
    } else {
      setCanvasImageLoaded(false);
      pop.setGroup(false);
      pop.setIndex(false);
      pop.setImgLoaded(false);
    }
  }, [pop.on]);

  useEffect(() => {
    updatePopupNav(pop, nav);
  }, [pop.img, pop.group, pop.index]);

  const imgRef = useRef(null);
  const imgHeight = useElementHeight(imgRef, { observer: true });
  const popRef = useRef(null);
  const popHeight = useElementHeight(popRef);
  const popWidth = useElementWidth(popRef);
  const descRef = useRef(null);

  const [lightboxImgMaxHeight, setLightboxImgMaxHeight] = useState(false);
  const [lightboxImgMaxWidth, setLightboxImgMaxWidth] = useState(false);
  const [lightboxImgAvailHeight, setLightboxImgAvailHeight] = useState(false);
  const [lightboxImgAvailWidth, setLightboxImgAvailWidth] = useState(false);

  const elems = {
    img: {
      ref: imgRef,
      height: imgHeight,
      setMaxHeight: setLightboxImgMaxHeight,
      setMaxWidth: setLightboxImgMaxWidth,
      maxHeight: lightboxImgMaxHeight,
      maxWidth: lightboxImgMaxWidth,
      setAvailHeight: setLightboxImgAvailHeight,
      setAvailWidth: setLightboxImgAvailWidth,
      availHeight: lightboxImgAvailHeight,
      availWidth: lightboxImgAvailWidth,
    },
    popup: {
      ref: popRef,
      height: popHeight,
      width: popWidth,
    },
    desc: {
      ref: descRef,
    },
  };


  const canInteract = useRef(true);

  const debounceInteraction = () => {
    if (!canInteract.current) return false;
  
    canInteract.current = false;
    setTimeout(() => {
      canInteract.current = true;
    }, (popSeekDuration*1000*2)*1.15);
  
    return true;
  };
  
  const closeHandler = useCallback(() => {
    if (!debounceInteraction()) return;

    pop.setOn(false);
    pop.setImgLoaded(false);
    pop.setDrawn(false);
    pop.setImgDrawn(false);
    pop.setInfoDrawn(false);
    pop.setImgReady(false);
    pop.setFirstImgReady(false);
    pop.setFirstImgDrawn(false);
  }, [pop]);

  const seekHandler = useCallback(
    (e, direction) => {
      if (!debounceInteraction()) return;

      var button;

      if (!pop.group) return;

      if (e.type === "click") {
        button = e.target;
        while (!button.classList.contains("popup--seek")) {
          button = button.parentElement;
        }
        direction = direction ? direction : button.classList.contains("popup--seek__right") ? 1 : -1;
      }

      var length = pop.group.imgs.length;

      var ind = pop.index;
      ind += direction;

      if (ind >= length) ind = 0;
      if (ind < 0) ind = length - 1;

      pop.setIndex(ind);
      var img = pop.group.imgs[ind].lightboxImg ? pop.group.imgs[ind].lightboxImg : pop.group.imgs[ind];
      pop.setImg(img);
      pop.setZoom(img.zoom ? img.zoom : false);
      pop.setImgLoaded(false);
      pop.setImgReady(false);
      pop.setImgDrawn(false);
    },
    [pop]
  );

  const paginationHandler = useCallback(
    (img, i) => {
      if (!debounceInteraction()) return;

      pop.setIndex(i);
      pop.setImg(pop.group.imgs[i]);
      pop.setZoom(img.zoom ? img.zoom : false);
      pop.setImgLoaded(false);
      pop.setImgReady(false);
      pop.setImgDrawn(false);
    },
    [pop]
  );

  function seekHandlerWithKeydown(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      seekHandler(e, e.key === "ArrowRight" ? 1 : -1);
    }
  }

  function closeHandlerWithKeydown(e) {
    if (e.key === "Escape" || e.key === " ") {
      closeHandler();
    }
  }

  const handles = {
    close: closeHandler,
    seek: seekHandler,
    pagination: paginationHandler,
    seekKeydown: seekHandlerWithKeydown,
    closeKeydown: closeHandlerWithKeydown,
  };

  return (
    <>
      <Background handles={handles} popclass={popclass} />
      <div className={`popup container ${popclass.container}`} style={popclass.containerStyle} ref={popRef}>
        <div className={`popup--inner ${popclass.inner}`}>
          <div className={`popup--content popup--content__on ${popclass.content}`}>
            {pop.type != "gallery" && <Head pop={pop} nav={nav} popclass={popclass} handles={handles} />}

            {pop.type == "interactive" && <canvas className="popup--canvas popup--canvas__off" />}

            {pop.type == "lightbox" && (
              <>
                <Lightbox pop={pop} nav={nav} handles={handles} popclass={popclass} elems={elems} />
              </>
            )}

            {pop.type == "gallery" && (
              <>
                <Lightbox pop={pop} popclass={popclass} elems={elems} nav={nav} handles={handles} />
                <GalInfo pop={pop} popclass={popclass} elems={elems} nav={nav} handles={handles} />
              </>
            )}

            {pop.type == "interactive" && <ScaleWrapper pop={pop} nav={nav} />}
          </div>

          {pop.type == "lightbox" && pop.group && pop.firstImgDrawn && <Controls pop={pop} nav={nav} handles={handles} />}
        </div>
      </div>
    </>
  );

  var isResizing;

  function popupResize() {
    window.clearTimeout(isResizing);
    isResizing = setTimeout(popupResizeFunctions, RESIZE_TIMEOUT);
  }

  function popupResizeFunctions() {
    if (pop.type == "interactive") canvasOnResize();
  }
}

function Lightbox({ pop, nav, handles, popclass, elems }) {
  const [timeoutId, setTimeoutId] = useState(null); // Add this state variable

  const handleImgLoad = () => {
    const id = setTimeout(() => {
      pop.setImgLoaded(true);
    }, 0);
    setTimeoutId(id); // Update the timeoutId state
  };

  // Add this useEffect to clear the timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  function updateAvailHeightAndWidth() {
    var popupElem = elems.popup.ref.current;
    var descElem = elems.desc.ref.current;

    var gapWidth = splitRem(window.getComputedStyle(popupElem).getPropertyValue("--popup-gap"));
    var scrollbarWidth = descElem.offsetWidth - descElem.clientWidth;
    var descWidth =
      splitPx(window.getComputedStyle(descElem).width) +
      splitPx(window.getComputedStyle(descElem).paddingLeft) +
      splitPx(window.getComputedStyle(descElem).paddingRight) +
      scrollbarWidth;

    // var availHeight = cssVarToPixels(popupElem, "--popup-height-offset");
    // var availHeight = splitPx(window.getComputedStyle(popupElem.querySelector(".popup--inner")).height);
    // var availWidth = splitPx(window.getComputedStyle(popupElem.querySelector(".popup--inner")).width) - gapWidth - descWidth;

    var availHeight = popupElem.offsetHeight;
    var availWidth = popupElem.offsetWidth - gapWidth - descWidth;

    if (availHeight !== elems.img.availHeight) {
      elems.img.setAvailHeight(availHeight);
    }
    if (availWidth !== elems.img.availWidth) {
      elems.img.setAvailWidth(availWidth);
    }

    return { availHeight, availWidth };
  }

  function updateMaxHeightAndWidth(availHeight, availWidth) {
    var aspectWidth = pop.img.width;
    var aspectHeight = pop.img.height;

    // Calculate aspect ratio
    var aspectRatio = aspectWidth / aspectHeight;

    // Calculate scaled dimensions based on aspect ratio
    var scaledWidth = availHeight * aspectRatio;
    var scaledHeight = availWidth / aspectRatio;

    // Check which dimension should be adjusted based on available dimensions
    if (scaledWidth <= availWidth) {
      var maxHeight = availHeight;
      var maxWidth = scaledWidth;
    } else {
      var maxHeight = scaledHeight;
      var maxWidth = availWidth;
    }

    // Update maxHeight and maxWidth state only if their values have changed
    if (maxHeight !== elems.img.maxHeight) {
      elems.img.setMaxHeight(maxHeight);
    }
    if (maxWidth !== elems.img.maxWidth) {
      elems.img.setMaxWidth(maxWidth);
    }

    if (availHeight !== elems.img.availHeight) {
      elems.img.setAvailHeight(availHeight);
    }
    if (availWidth !== elems.img.availWidth) {
      elems.img.setAvailWidth(availWidth);
    }

    return { maxHeight, maxWidth };
  }

  useLayoutEffect(() => {
    if (!elems.popup.ref.current || !elems.desc.ref.current) return;
    if (elems.popup.height == 0 || elems.popup.width == 0) return;
    if (!pop.drawn) return;

    // used by gallery zoom images but also when the pop.imgLoaded is false, so instead of doing it conditionally we just do it every time cause life is too short
    var { availHeight, availWidth } = updateAvailHeightAndWidth();

    if (!pop.imgLoaded) {
      var { maxHeight, maxWidth } = updateMaxHeightAndWidth(availHeight, availWidth);
    }

    pop.setImgReady(true);

    if (!pop.firstImgReady) {
      pop.setFirstImgReady(true);
    }
  }, [elems.popup.height, elems.popup.width, pop.img, pop.drawn]);

  // useLayoutEffect(() => {
  //   if (!elems.popup.ref.current || !elems.desc.ref.current) return;
  //   if (elems.popup.height == 0 || elems.popup.width == 0) return;
  //   if (!pop.drawn) return;
  //   if (!pop.imgLoaded) {
  //     var popupElem = elems.popup.ref.current;
  //     var descElem = elems.desc.ref.current;

  //     var gapWidth = splitRem(window.getComputedStyle(popupElem).getPropertyValue("--popup-gap"));
  //     var scrollbarWidth = descElem.offsetWidth - descElem.clientWidth;
  //     var descWidth =
  //       splitPx(window.getComputedStyle(descElem).width) +
  //       splitPx(window.getComputedStyle(descElem).paddingLeft) +
  //       splitPx(window.getComputedStyle(descElem).paddingRight) +
  //       scrollbarWidth;

  //     // var availHeight = cssVarToPixels(popupElem, "--popup-height-offset");

  //     var availHeight = popupElem.offsetHeight;
  //     var availWidth = popupElem.offsetWidth - gapWidth - descWidth;

  //     // var availHeight = splitPx(window.getComputedStyle(popupElem.querySelector(".popup--inner")).height);
  //     // var availWidth = splitPx(window.getComputedStyle(popupElem.querySelector(".popup--inner")).width) - gapWidth - descWidth;

  //     var aspectWidth = pop.img.width;
  //     var aspectHeight = pop.img.height;

  //     // Calculate aspect ratio
  //     var aspectRatio = aspectWidth / aspectHeight;

  //     // Calculate scaled dimensions based on aspect ratio
  //     var scaledWidth = availHeight * aspectRatio;
  //     var scaledHeight = availWidth / aspectRatio;

  //     // Check which dimension should be adjusted based on available dimensions
  //     if (scaledWidth <= availWidth) {
  //       var newMaxHeight = availHeight;
  //       var newMaxWidth = scaledWidth;
  //     } else {
  //       var newMaxHeight = scaledHeight;
  //       var newMaxWidth = availWidth;
  //     }

  //     // Update maxHeight and maxWidth state only if their values have changed
  //     if (newMaxHeight !== elems.img.maxHeight) {
  //       elems.img.setMaxHeight(newMaxHeight);
  //     }
  //     if (newMaxWidth !== elems.img.maxWidth) {
  //       elems.img.setMaxWidth(newMaxWidth);
  //     }

  //     if (availHeight !== elems.img.availHeight) {
  //       elems.img.setAvailHeight(availHeight);
  //     }
  //     if (availWidth !== elems.img.availWidth) {
  //       elems.img.setAvailWidth(availWidth);
  //     }
  //   }

  //   pop.setImgReady(true);

  //   if (!pop.firstImgReady) {
  //     pop.setFirstImgReady(true);
  //   }
  // }, [elems.popup.height, elems.popup.width, pop.img, pop.drawn, pop.zoom]);

  return (
    <>
      <AnimPres
        mode="wait"
        animation={popAnims.slideFade}
        condition={true}
        className={`popup--media-wrapper ${popclass.mediaWrapper}
           ${!pop.imgLoaded ? "popup--media-wrapper__loading" : ""}`}
        style={{ "--aspect-width": pop.img.width, "--aspect-height": pop.img.height }}
        elemkey={pop.img.src}
        duration={popSeekDuration}
        delay={pop.firstImgDrawn ? 0 : 0.3}
        onAnimationComplete={() => {
          pop.setImgDrawn(true);
          if (!pop.firstImgDrawn) pop.setFirstImgDrawn(true);
        }}>
        <Graphic
          reference={elems.img.ref}
          className={`popup--media ${popclass.media} ${!pop.imgLoaded ? "popup--media__loading" : ""}`}
          img={pop.img}
          type={pop.img.media}
          autoplay
          controls
          onLoad={handleImgLoad}
          style={{
            "--img-avail-width": `${elems.img.availWidth}px`,
            "--img-avail-height": `${elems.img.availHeight}px`,
          }}
        />

        {pop.imgReady && (
          <div
            className={`loading--wrapper 
            ${!pop.imgReady || pop.imgLoaded ? "loading--wrapper__hidden" : ""}
            ${pop.zoom ? "loading--wrapper__zoom" : ""}
            `}
            style={{
              "--img-max-width": `${elems.img.maxWidth}px`,
              "--img-max-height": `${elems.img.maxHeight}px`,
              "--img-avail-width": `${elems.img.availWidth}px`,
              "--img-avail-height": `${elems.img.availHeight}px`,
            }}>
            <div className={`loading--img`}>
              <img src={loading_white.src} alt={loading_white.alt} width={loading_white.width} height={loading_white.height} />
            </div>
          </div>
        )}
      </AnimPres>

      {pop.type == "gallery" && pop.group && pop.firstImgDrawn && pop.infoDrawn && (
        <>
          <Controls className="popup--controls__gallery" pop={pop} nav={nav} handles={handles} />
        </>
      )}
    </>
  );
}

function Background({ handles, popclass }) {
  return <div className={`popup--background ${popclass.background}`} onClick={handles.close}></div>;
}

function Head({ pop, nav, popclass, handles }) {
  return (
    <>
      <div className={`popup--header ${popclass.header} popup--nav`}>
        <Title pop={pop} />
        <Close pop={pop} nav={nav} handles={handles} popclass={popclass} />
      </div>
    </>
  );
}

function Title({ pop }) {
  return (
    <>
      {pop.type == "interactive" && (
        <div className="popup--title">
          <h3>{pop.img.title}</h3>
        </div>
      )}
    </>
  );
}

const Controls = React.memo(function Controls({ pop, nav, handles, className }) {
  return (

    <AnimPres mode="wait" animation={popAnims.fade} condition={true} className={`popup--controls ${className ? className : ""}`}
    layout="position"
    style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
    transition={{
      layout: {duration: popLayoutTransition},
    }}
    >
      <Seek direction="left" nav={nav} handles={handles} />
      <Pagination pop={pop} handles={handles} />
      <Seek direction="right" nav={nav} handles={handles} />
    </AnimPres>
  );
}, createUpdateConditions(["pop.img", "pop.group", "nav.left.on", "nav.right.on"]));

function Seek({ direction, nav, handles }) {
  var btn = direction === "left" ? nav.left : nav.right;
  return (
    <div className={`popup--seek popup--seek__${direction} ${btn.classList}`} ref={btn.ref}>
      <Anim animation={classAnims.hideBtns} condition={btn.on}>
        <Button icon={[`chevron_${direction}`, "alone", "mask"]} animation={`pulse-${direction}`} color="background-primary" onClick={handles.seek} />
      </Anim>
    </div>
  );
}

const Pagination = React.memo(function Pagination({ pop, handles }) {
  return (
    <div className="popup--pagination">
      {pop.group?.imgs?.map((img, i) => {
        return (
          <Circle
            active={i === pop.index}
            key={`circle ${img.src}`}
            onClick={() => {
              handles.pagination(img, i);
            }}
          />
        );
      })}
    </div>
  );

  function Circle({ active, onClick }) {
    const classes = active ? "popup--circle__active" : "popup--circle__inactive";
    return (
      <a className={`popup--circle ${classes}`} onClick={onClick}>
        <div className="popup--circle-inner"></div>
      </a>
    );
  }
}, createUpdateConditions(["pop.group", "pop.index"]));

function Close({ pop, nav, popclass, handles, type = "lightbox" }) {
  const condition = pop.ui.visible || pop.type === "interactive" || pop.type == "gallery";
  const col = (() => {
    if (type === "lightbox") {
      return "transparent-primary";
    } else if (type === "gallery") {
      return "transparent-background";
    } else {
      return "transparent-primary";
    }
  })();

  return (
    <AnimPres animation={popAnims.hideUI} condition={condition} className={`popup--close ${popclass.close}`} reference={nav.close.ref}>
      <Button icon={["close", "alone", "mask"]} animation="scale-in" color={col} onClick={handles.close} />
    </AnimPres>
  );
}

function ScaleWrapper({ pop, nav }) {
  const condition = pop.ui.visible;

  return (
    <AnimPres animation={popAnims.hideUI} condition={condition} className="popup--footer popup--nav">
      <Scale className="popup--scale" pop={pop} nav={nav} />
    </AnimPres>
  );
}

function Scale({ pop, nav, className }) {
  var def = 10;

  return (
    <div className={`scale ${className ? className : ""}`}>
      <div className="scale--zoom scale--minus">
        <Button id="zoom-out" icon={["minus", "alone", "mask"]} animation="scale-out" color="transparent-primary" onClick={canvasZoom} />
      </div>

      <div className="scale--slider">
        <div className="scale--end"></div>
        <input type="range" min={minZoom * 100} max={maxZoom * 100} defaultValue={def} className="scale--input" id="popupZoom" onInput={canvasZoom} />
        <div className="scale--end"></div>
      </div>

      <div className="scale--zoom scale--plus">
        <Button id="zoom-in" icon={["plus", "alone", "mask"]} animation="scale-out" color="transparent-primary" onClick={canvasZoom} />
      </div>
    </div>
  );
}

function useNavControls() {
  const [navRightOn, setNavRightOn] = useState(false);
  const [navLeftOn, setNavLeftOn] = useState(false);
  const [navRightClasses, setNavRightClasses] = useState("popup--seek__on");
  const [navLeftClasses, setNavLeftClasses] = useState("popup--seek__on");

  const navCloseRef = useRef(null);

  return {
    left: {
      on: navLeftOn,
      setOn: setNavLeftOn,
      classList: navLeftClasses,
      setClassList: setNavLeftClasses,
    },
    right: {
      on: navRightOn,
      setOn: setNavRightOn,
      classList: navRightClasses,
      setClassList: setNavRightClasses,
    },
    close: {
      ref: navCloseRef,
    },
    scale: {},
  };
}

function Anim({ children, animation, condition, className, style }) {
  const controls = useAnimation();

  const [classList, setClassList] = useState((className ? className : "").split(" "));
  const [classNames, setClassNames] = useState(className ? className : "");

  const classes = {
    list: classList,
    setList: setClassList,
    names: classNames,
    setNames: setClassNames,
  };

  useEffect(() => {
    if (condition) {
      if (typeof animation.in === "string") {
        addClass(animation.in, animation.out);
      } else {
        controls.start(animation.in.animate);
      }
    } else {
      if (typeof animation.out === "string") {
        addClass(animation.out, animation.in);
      } else {
        controls.start(animation.out.exit);
      }
    }
  }, [condition, animation, controls]);

  useEffect(() => {
    classes.setNames(classes.list.join(" "));
  }, [classes.list]);

  function addClass(newClass, oppositeClass) {
    classes.setList((prevClassList) => {
      let updatedClassList = prevClassList.filter((cls) => cls !== oppositeClass);
      if (!updatedClassList.includes(newClass)) {
        updatedClassList.push(newClass);
      }
      return updatedClassList;
    });
  }

  return (
    <motion.div animate={controls} className={classNames} style={style ? style : {}}>
      {children}
    </motion.div>
  );
}

export default Popup;

// export { waitToLoad, setWaitingToShowLoading };

export { startZoom, minZoom, maxZoom };
export { Close };
