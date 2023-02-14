// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it

import toggle, { simpleToggleOn } from "@/scripts/AnimationTools";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../../elements/Buttons";
import { loading } from "@/data/ICONS";
import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";
import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import { canvasDrawImage, canvasImageSizeInit, canvasInit, canvasSetSize, canvasZoom, setCanvasImageLoaded } from "./popup_utilities/CanvasUtilities";
import { hiddenUIInit, setActiveHiddenUI } from "./popup_utilities/HiddenUIUtilities";




var setPopupGlobal;

var popupType;



//no more than 2 decimals
const startZoom = 0.95;
const minZoom = 0.95;
const maxZoom = 7.5;


var lastPopup = null;






var popupGroup = false;
var popupIndex;
function checkForRelevantGroups(popup, setPopup) {


    // TODO: would it be better to always have the left and right buttons present rather than toggling them on and off depending on the index?
  // TODO: should we add Pagination Indicators? lil dots at the bottom of the popup that indicate which image you're on and how many there are in total?
  // TODO: should we add transitions between images in a gallery?
  // TODO: this one is stupid optional, what about an animation between the image on the page and the image in the popup? like a zoom in or something?


  var imgGroup = popup.img.group;

  if (!imgGroup) return;
  if (typeof MAKERIGHT_IMG_GROUPS[imgGroup] === "undefined") throw new Error(`No group with name ${imgGroup} found`);

  var index = popup.img.index;
  var group = MAKERIGHT_IMG_GROUPS[imgGroup];

  popupGroup = group;
  popupIndex = index;

  if (popupGroup.imgs.length == 0 || popupGroup.imgs.length == 1) return;

  var seekRight = document.querySelector(".popup--seek__right");
  var seekLeft = document.querySelector(".popup--seek__left");

  var seekRightOn = seekRight.classList.contains("popup--seek__on") ? true : false;
  var seekLeftOn = seekLeft.classList.contains("popup--seek__on") ? true : false;

  if (popupIndex == 0) {
    if (!seekRightOn) toggle(seekRight, "popup--seek", "transition", "animated", "");
    if (seekLeftOn) toggle(seekLeft, "popup--seek", "transition", "animated", "");
  }
  if (popupIndex == popupGroup.imgs.length - 1) {
    if (seekRightOn) toggle(seekRight, "popup--seek", "transition", "animated", "");
    if (!seekLeftOn) toggle(seekLeft, "popup--seek", "transition", "animated", "");
  }
  if (popupIndex > 0 && popupIndex < popupGroup.imgs.length - 1) {
    if (!seekRightOn) toggle(seekRight, "popup--seek", "transition", "animated", "");
    if (!seekLeftOn) toggle(seekLeft, "popup--seek", "transition", "animated", "");
  }
}

function seekHandler(e, setPopup) {

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

  var length = popupGroup.imgs.length;

  popupIndex += direction;

  if (popupIndex >= length) popupIndex = 0;
  if (popupIndex < 0) popupIndex = length - 1;

  var img = popupGroup.imgs[popupIndex];

  var zoom = img.zoom ? img.zoom : false;

  setPopup({ type: "lightbox", img: img, zoom: zoom });
}




function lightboxInit(popup, setPopup) {
  checkForRelevantGroups(popup, setPopup);

  setActiveHiddenUI("lightbox");

  var popWrapper = document.querySelector(".popup--wrapper");
  var on = popWrapper.classList.contains("popup--wrapper__on") ? true : false;
  if (!on) hiddenUIInit();
  
}




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

function Popup({ popup, setPopup }) {
  var type;
  var img;
  var zoom;

  type = popup.type;
  img = popup.img;
  zoom = popup.zoom ? popup.zoom : false;


  popupType = type;

  useEffect(() => {
    if (popup) {
      document.body.classList.add("noscroll");

      if (lastPopup != popup || lastPopup != false) {
        lastPopup = popup;

        window.addEventListener("resize", popupResize, false);
        window.addEventListener("keydown", catchKeys, false);
        if (type == "interactive") canvasInit(popup, setPopup);
        if (type == "lightbox") lightboxInit(popup, setPopup);
      }

      var popWrapper = document.querySelector(".popup--wrapper");
      var on = popWrapper.classList.contains("popup--wrapper__on") ? true : false;
      if (!on) toggle(popWrapper, "popup--wrapper", "transition", "animated", "");

      setPopupGlobal = setPopup;
    } else {
      window.removeEventListener("resize", popupResize, false);
      window.removeEventListener("keydown", catchKeys, false);
      setCanvasImageLoaded(false);
      document.body.classList.remove("noscroll");
      popupGroup = false;
    }
  }, [popup, setPopup]);



  var headerClasses = type == "lightbox" ? "popup--header__condensed popup--nav__off" : "popup--header__full";
  var contentClasses = `popup--content ${type === "lightbox" ? (zoom ? "popup--content__lightbox-zoom" : "popup--content__lightbox") : "popup--content__interactive"}`;

  var popupContainerClasses = 
  `${type === "lightbox" ? (zoom ? "popup__lightbox-zoom" : "popup__lightbox") : "popup__interactive"}`;

  // TODO: will there be a way of seeking between relevant images in the lightbox? i think so, yes, but strap in cause that one might be tricky.  You got this:)

  return (
    <>
      {popup && (
        <div className="popup--wrapper popup--wrapper__off">
          <div
            className="popup--background"
            onClick={() => {
              closePopup(setPopup);
            }}></div>

          <div className={`popup container ${popupContainerClasses}`} style={type == "lightbox" ? { "--img-aspect-width": img.width, "--img-aspect-height": img.height } : {}}>
            <div className="popup--inner">
              {type == "lightbox" && (
                <div className="popup--seek popup--seek__left popup--seek__off">
                  <Button
                    icon={["chevron_left", "alone", "mask"]}
                    animation="pulse-left"
                    color="background-primary"
                    onClick={(e) => {
                      seekHandler(e, setPopup);
                    }}
                  />
                </div>
              )}

              <div className={contentClasses}>
                <div className={`popup--header ${headerClasses} popup--nav`}>
                  {type == "interactive" && (
                    <div className="popup--title">
                      <h3>{popup.img.title}</h3>
                    </div>
                  )}
                  <div className="popup--close">
                    <Button
                      icon={["close", "alone", "mask"]}
                      animation="scale-in"
                      color="transparent-primary"
                      onClick={() => {
                        closePopup(setPopup);
                      }}
                    />
                  </div>
                </div>

                {type == "interactive" && (
                  <>
                    <canvas className="popup--canvas popup--canvas__off"></canvas>
                  </>
                )}

                <div className="popup--loading popup--loading__on">
                  <img src={loading.src} alt={loading.alt} width={loading.width} height={loading.height} />
                </div>

                {type == "lightbox" && (
                  <div className={`popup--img ${zoom && 'popup--img__lightbox-zoom'}`}>
                    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />
                  </div>
                )}

                {type == "interactive" && (
                  <div className="popup--footer popup--nav popup--nav__off">
                    <Scale className="popup--scale" />
                  </div>
                )}
              </div>

              {type == "lightbox" && (
                <div className="popup--seek popup--seek__right popup--seek__off">
                  <Button
                    icon={["chevron_right", "alone", "mask"]}
                    animation="pulse-right"
                    color="background-primary"
                    onClick={(e) => {
                      seekHandler(e, setPopup);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function catchKeys(e) {
  if (e.keyCode == 27 || e.key == "Escape") {
    closePopup(setPopupGlobal);
  }

  if (popupGroup) {
    if (e.keyCode == 37 || e.key == "ArrowLeft") {
      seekHandler(e, setPopupGlobal);
    }

    if (e.keyCode == 39 || e.key == "ArrowRight") {
      seekHandler(e, setPopupGlobal);
    }
  }
}

function closePopup(setPopup) {
  var trans = Number(window.getComputedStyle(document.querySelector(".popup--wrapper")).transitionDuration.split("s")[0]) * 1000;
  toggle(document.querySelector(".popup--wrapper"), "popup--wrapper", "transition", "animated", "");
  setTimeout(() => setPopup(false), trans);
}






var isResizing;

function popupResize() {
  window.clearTimeout(isResizing);
  isResizing = setTimeout(popupResizeFunctions, RESIZE_TIMEOUT);
}

function popupResizeFunctions() {
  if (popupType == "interactive") {
    canvasSetSize();
    canvasDrawImage();
    canvasImageSizeInit();
  }
}

export default Popup;

export {popupResizeFunctions}

export {startZoom,
  minZoom,
  maxZoom}