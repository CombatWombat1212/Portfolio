// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it

import toggle, { simpleToggleOn } from "@/scripts/AnimationTools";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import { loading } from "@/data/ICONS";
import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";
import {
  canvasDrawImage,
  canvasImageSizeInit,
  canvasInit,
  canvasOnResize,
  canvasSetSize,
  canvasZoom,
  setCanvasImageLoaded,
} from "./popup_utilities/CanvasUtilities";
import { getImgGroup, imgLoading, lightboxInit, seekHandler, setPopupGroup, updatePopupNav } from "./popup_utilities/LightboxUtilities";
import { catchKeys, closePopup, setSetPopupGlobal } from "./popup_utilities/PopupUtilities";
import { hiddenUIEnd } from "./popup_utilities/HiddenUIUtilities";
import { Graphic } from "@/components/sections/Sections";
import useBodyClass from "@/scripts/hooks/useBodyClass";
import useListener from "@/scripts/hooks/useListener";
import useToggle from "@/scripts/hooks/useToggle";
import { AnimatePresence, motion } from "framer-motion";

var popupType;

//no more than 2 decimals
const startZoom = 0.95;
const minZoom = 0.95;
const maxZoom = 7.5;

var lastPopup = null;

function Scale({ className }) {
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

// var waitingToShowLoading = false;

// function setWaitingToShowLoading(bool) {
//   waitingToShowLoading = bool;
// }

// function waitToLoad(setShowLoading) {
//   if (waitingToShowLoading) return;
//   waitingToShowLoading = true;

//   const timeout = setTimeout(() => {
//     setShowLoading(true);
//     waitingToShowLoading = false;
//   }, 1000);

//   return () => clearTimeout(timeout);
// }

// function handleLoading(showLoading, imgLoading) {
//   var loader = document.querySelector(".popup--loading");
//   if (showLoading && imgLoading) {
//     loader.classList.add("popup--loading__on");
//     loader.classList.remove("popup--loading__off");
//   } else {
//     loader.classList.add("popup--loading__off");
//     loader.classList.remove("popup--loading__on");
//   }
// }

function getPopupClasses(type, zoom, img) {
  // Initialize arrays for class names
  var headerClassesArray = [];
  var contentClassesArray = [];
  var popupImgClassesArray = [];
  var popupContainerClassesArray = [];
  var popupContainerStyle = {};

  // Case 1: type is "lightbox"
  if (type === "lightbox") {
    headerClassesArray.push("popup--header__condensed", "popup--nav__on");

    // Nested Case 1.1: zoom is true
    if (zoom) {
      popupImgClassesArray.push("popup--img__lightbox-zoom");
      contentClassesArray.push("popup--content__lightbox-zoom");
      popupContainerClassesArray.push("popup__lightbox-zoom");
    }
    // Nested Case 1.2: zoom is false
    else {
      contentClassesArray.push("popup--content__lightbox");
      popupContainerClassesArray.push("popup__lightbox");
    }

    // Update popupContainerStyle for type "lightbox"
    popupContainerStyle = { "--img-aspect-width": img.width, "--img-aspect-height": img.height };
  }
  // Case 2: type is "interactive"
  else if (type == "interactive") {
    headerClassesArray.push("popup--header__full");

    contentClassesArray.push("popup--content__interactive");
    popupContainerClassesArray.push("popup__interactive");
  }

  // Join the arrays to form final class strings
  var headerClasses = headerClassesArray.join(" ");
  var contentClasses = contentClassesArray.join(" ");
  var popupContainerClasses = popupContainerClassesArray.join(" ");
  var popupImgClasses = popupImgClassesArray.join(" ");

  return { headerClasses, contentClasses, popupContainerClasses, popupImgClasses, popupContainerStyle };
}

function Popup({ popup, setPopup }) {
  var type;
  var img;
  var zoom;

  type = popup.type;
  img = popup.img;
  zoom = popup.zoom ? popup.zoom : false;

  var isInteractive = type == "interactive" ? true : false;
  var isLightbox = type == "lightbox" ? true : false;

  popupType = type;

  var { headerClasses, contentClasses, popupContainerClasses, popupImgClasses, popupContainerStyle } = getPopupClasses(type, zoom, img);

  useBodyClass("noscroll", popup);
  useListener("resize", popupResize, popup);
  useListener("keydown", catchKeys, popup);

  const [group, setGroup] = useState(false);
  const [index, setIndex] = useState(false);

  const nav = useNavControls(seekHandler);

  useEffect(() => {
    if (popup) {
      if (isInteractive) canvasInit(popup, setPopup);

      if (isLightbox) lightboxInit(popup, setPopup, group, setGroup, index, setIndex);

      setSetPopupGlobal(setPopup);

      toggle(document.querySelector(".popup--wrapper"), { state: "on", classPref: "popup--wrapper", duration: "transition" });


    } else {
      hiddenUIEnd();
      setCanvasImageLoaded(false);
      setGroup(false);
    }
  }, [popup]);


  useEffect(() => {
    updatePopupNav(popup, setPopup, group, setGroup, index, setIndex, nav);
  }, [group, index]);



  return (
    <>
      {popup && (
        <div className="popup--wrapper popup--wrapper__off">
          <Background />

          <div className={`popup container ${popupContainerClasses}`} style={popupContainerStyle}>
            <div className="popup--inner">

              {isLightbox && <SeekButton direction="left" nav={nav} />}

              <div className={`popup--content popup--content__on ${contentClasses}`}>
                <PopupHeader />

                {isInteractive && <canvas className="popup--canvas popup--canvas__off" />}

                {isLightbox && (
                  // <div className={`popup--media ${popupImgClasses}`} style={{ "--aspect-width": img.width, "--aspect-height": img.height }}></div>
                  <Graphic className={`popup--media ${popupImgClasses}`} img={img} type={img.media} autoplay controls />
                )}

                <div className={`popup--loading popup--loading__off`}>
                  <img src={loading.src} alt={loading.alt} width={loading.width} height={loading.height} />
                </div>

                {isInteractive && (
                  <div className="popup--footer popup--nav popup--nav__off">
                    <Scale className="popup--scale" />
                  </div>
                )}
              </div>

              {isLightbox && <SeekButton direction="right" nav={nav} />}
            </div>
          </div>
        </div>
      )}
    </>
  );

  function PopupHeader() {
    return (
      <div className={`popup--header ${headerClasses} popup--nav`}>
        {isInteractive && (
          <div className="popup--title">
            <h3>{popup.img.title}</h3>
          </div>
        )}
        <div className="popup--close">
          <CloseButton />
        </div>
      </div>
    );
  }

  function CloseButton() {
    return (
      <Button
        icon={["close", "alone", "mask"]}
        animation="scale-in"
        color="transparent-primary"
        onClick={() => {
          closePopup(setPopup);
        }}
      />
    );
  }

  function Background() {
    return (
      <div
        className="popup--background"
        onClick={() => {
          closePopup(setPopup);
        }}></div>
    );
  }

  function seekHandler(e) {
    var button;

    if (e.type == "keydown") {
      if (e.key == "ArrowRight") {
        button = document.querySelector(".popup--seek__right");
      }
      if (e.key == "ArrowLeft") {
        button = document.querySelector(".popup--seek__left");
      }
    } else {
      button = e.target;
      while (!button.classList.contains("popup--seek")) {
        button = button.parentElement;
      }
    }

    var direction = button.classList.contains("popup--seek__right") ? 1 : -1;

    var length = group.imgs.length;

    var ind = index;
    ind += direction;

    if (ind >= length) ind = 0;
    if (ind < 0) ind = length - 1;

    setIndex(ind);
    var img = group.imgs[ind];

    var zoom = img.zoom ? img.zoom : false;

    setPopup({ type: "lightbox", img: img, zoom: zoom });
  }
}


function SeekButton({ direction, nav }) {
  const btnIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.15 },
  };

  const btnOut = {
    animate: { opacity: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 },
  };

  var btn = direction == "left" ? nav.left : nav.right;

  return (
    <div className={`popup--seek popup--seek__${direction} ${btn.classList}`} ref={btn.ref}>
      <AnimatePresence>
        {btn.on && (
          <motion.div
            key={`${direction}Button`}
            initial={btnIn.initial}
            animate={btnIn.animate}
            exit={btnOut.exit}
            transition={btnIn.transition}>
            <Button
              icon={[`chevron_${direction}`, "alone", "mask"]}
              animation={`pulse-${direction}`}
              color="background-primary"
              onClick={btn.seekHandler}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function useNavControls(seekHandler) {
  const [navRightOn, setNavRightOn] = useState(false);
  const [navLeftOn, setNavLeftOn] = useState(false);
  const [navRightClasses, setNavRightClasses] = useState("popup--seek__on");
  const [navLeftClasses, setNavLeftClasses] = useState("popup--seek__on");
  const navRightRef = useRef(null);
  const navLeftRef = useRef(null);

  return {
    left: {
      on: navLeftOn,
      setOn: setNavLeftOn,
      ref: navLeftRef,
      classList: navLeftClasses,
      setClassList: setNavLeftClasses,
      seekHandler: (e) => {
        seekHandler(e);
      },
    },
    right: {
      on: navRightOn,
      setOn: setNavRightOn,
      ref: navRightRef,
      classList: navRightClasses,
      setClassList: setNavRightClasses,
      seekHandler: (e) => {
        seekHandler(e);
      },
    },
  };
}






var isResizing;

function popupResize() {
  window.clearTimeout(isResizing);
  isResizing = setTimeout(popupResizeFunctions, RESIZE_TIMEOUT);
}

function popupResizeFunctions() {
  if (popupType == "interactive") canvasOnResize();
}

export default Popup;

// export { waitToLoad, setWaitingToShowLoading };

export { startZoom, minZoom, maxZoom };
