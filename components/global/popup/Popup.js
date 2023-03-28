// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it

import toggle, { simpleToggleOn } from "@/scripts/AnimationTools";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { imgLoading, lightboxInit, seekHandler, setPopupGroup } from "./popup_utilities/LightboxUtilities";
import { catchKeys, closePopup, setSetPopupGlobal } from "./popup_utilities/PopupUtilities";
import { hiddenUIEnd } from "./popup_utilities/HiddenUIUtilities";
import { Graphic } from "@/components/sections/Sections";

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

var waitingToShowLoading = false;

function setWaitingToShowLoading(bool) {
  waitingToShowLoading = bool;
}

function waitToLoad(setShowLoading) {
  if (waitingToShowLoading) return;
  waitingToShowLoading = true;

  const timeout = setTimeout(() => {
    setShowLoading(true);
    waitingToShowLoading = false;
  }, 1000);

  return () => clearTimeout(timeout);
}

function handleLoading(showLoading, imgLoading) {
  var loader = document.querySelector(".popup--loading");
  if (showLoading && imgLoading) {
    loader.classList.add("popup--loading__on");
    loader.classList.remove("popup--loading__off");
  } else {
    loader.classList.add("popup--loading__off");
    loader.classList.remove("popup--loading__on");
  }
}

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

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (typeof document == "undefined") return;
    if (typeof document.querySelector(".popup--loading") == "undefined" || document.querySelector(".popup--loading") == null) return;
    handleLoading(showLoading, imgLoading);
  }, [showLoading]);

  useEffect(() => {
    if (popup) {
      document.body.classList.add("noscroll");

      if (lastPopup != popup || lastPopup != false) {
        lastPopup = popup;

        window.addEventListener("resize", popupResize, false);
        window.addEventListener("keydown", catchKeys, false);
        if (isInteractive) canvasInit(popup, setPopup);
        if (isLightbox) lightboxInit(popup, setPopup, setShowLoading);
      }

      var popWrapper = document.querySelector(".popup--wrapper");
      var on = popWrapper.classList.contains("popup--wrapper__on") ? true : false;
      if (!on) toggle(popWrapper, { classPref: "popup--wrapper", duration: "transition" });

      waitToLoad(setShowLoading);

      if (on && document.querySelector(".popup--img *") != null) document.querySelector(".popup--img *").remove();
      setSetPopupGlobal(setPopup);
    } else {
      hiddenUIEnd();
      window.removeEventListener("resize", popupResize, false);
      window.removeEventListener("keydown", catchKeys, false);
      setCanvasImageLoaded(false);
      document.body.classList.remove("noscroll");
      setPopupGroup(false);
    }
  }, [popup, setPopup]);

  var { headerClasses, contentClasses, popupContainerClasses, popupImgClasses, popupContainerStyle } = getPopupClasses(type, zoom, img);


  //TODO: update popup to be more react-y, it should be using Graphic as the img otherwise you wont have srcset

  return (
    <>
      {popup && (
        <div className="popup--wrapper popup--wrapper__off">
          <Background />

          <div className={`popup container ${popupContainerClasses}`} style={popupContainerStyle}>
            <div className="popup--inner">
              {isLightbox && (
                <div className="popup--seek popup--seek__left popup--seek__off">
                  <LeftButton />
                </div>
              )}

              <div className={`popup--content popup--content__on ${contentClasses}`}>
                <PopupHeader />

                {isInteractive && <canvas className="popup--canvas popup--canvas__off" />}

                {isLightbox && (
                    <div className={`popup--media ${popupImgClasses}`} style={{ "--aspect-width": img.width, "--aspect-height": img.height }}></div>
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

              {isLightbox && (
                <div className="popup--seek popup--seek__right popup--seek__off">
                  <RightButton />
                </div>
              )}
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

  function RightButton() {
    return (
      <Button
        icon={["chevron_right", "alone", "mask"]}
        animation="pulse-right"
        color="background-primary"
        onClick={(e) => {
          seekHandler(e, setPopup);
        }}
      />
    );
  }
  function LeftButton() {
    return (
      <Button
        icon={["chevron_left", "alone", "mask"]}
        animation="pulse-left"
        color="background-primary"
        onClick={(e) => {
          seekHandler(e, setPopup);
        }}
      />
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

export { waitToLoad, setWaitingToShowLoading };

export { startZoom, minZoom, maxZoom };
