// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it

import toggle, { simpleToggleOn } from "@/scripts/AnimationTools";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../elements/Buttons";
import { loading } from "@/data/ICONS";
import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";
import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";

var setPopupGlobal;

var canvas,
  context,
  canvasImage,
  canvasImageLoaded = false,
  loadingImage;

const HIDDEN_UI = [
  { type: "interactive", area: ".popup--canvas", target: ".popup--footer" },
  { type: "lightbox", area: ".popup--content", target: ".popup--header" },
];
var activeHiddenUI;
var popupType;

var canvasImgTransform = { x: 0, y: 0, scale: 1, width: 0, height: 0, maxWidth: 0, maxHeight: 0, minWidth: 0, minHeight: 0, middleX: 0, middleY: 0 };

//no more than 2 decimals
var startZoom = 0.95;
var minZoom = 0.95;
var maxZoom = 7.5;

var canvasInput;
var lastPopup = null;

var isDragging = false;
var dragStartPosition = { x: 0, y: 0 };
var dragStartPosOffset = { x: 0, y: 0 };
var currentTransformedCursor;



function getTransformedPoint(x, y) {
  const originalPoint = new DOMPoint(x, y);
  return context.getTransform().invertSelf().transformPoint(originalPoint);
}

function drawImageToCanvas() {
  var run = function () {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();

    context.drawImage(canvasImage, (canvas.width - canvasImgTransform.maxWidth) / 2, (canvas.height - canvasImgTransform.maxHeight) / 2, canvasImgTransform.maxWidth, canvasImgTransform.maxHeight);
  };

  if (canvasImageLoaded) {
    run();
  } else {
    //TODO: maybe this is where a little loading animation would go

    context.drawImage(canvasImage, (canvas.width - canvasImgTransform.maxWidth) / 2, (canvas.height - canvasImgTransform.maxHeight) / 2, canvasImgTransform.maxWidth, canvasImgTransform.maxHeight);
  }
}

function canvasImageSizeInit() {
  var width, height;

  var canvasImgAspect = canvasImage.width / canvasImage.height;

  if (canvas.width > canvas.height) {
    height = canvas.height;
    width = canvas.height * canvasImgAspect;
  } else if (canvas.width < canvas.height) {
    width = canvas.width;
    height = canvas.width / canvasImgAspect;
  }

  height *= startZoom;
  width *= startZoom;

  canvasImgTransform.x = (canvas.width - canvasImgTransform.maxWidth) / 2;
  canvasImgTransform.y = (canvas.height - canvasImgTransform.maxHeight) / 2;
  canvasImgTransform.width = width;
  canvasImgTransform.height = height;
  canvasImgTransform.maxWidth = width;
  canvasImgTransform.maxHeight = height;
  canvasImgTransform.minWidth = width / maxZoom;
  canvasImgTransform.minHeight = height / maxZoom;
  canvasImgTransform.middleX = width / 2;
  canvasImgTransform.middleY = height / 2;
}

function canvasZoom(e) {
  if (!canvasImageLoaded) return;

  e.preventDefault();

  var zoomIn = 1.2;
  var zoomOut = 0.8;

  var zoom;
  var currentTransformedCursor;

  var slider = document.querySelector(".scale--input");

  if (e.type === "wheel") {
    zoom = e.deltaY < 0 ? zoomIn : zoomOut;
    currentTransformedCursor = getTransformedPoint(e.offsetX, e.offsetY);
  } else if (e.type === "click") {
    var target = e.target;
    while (target.id !== "zoom-in" && target.id !== "zoom-out") {
      target = target.parentElement;
    }
    zoom = target.id === "zoom-in" ? zoomIn : zoomOut;
    currentTransformedCursor = getTransformedPoint(canvas.width / 2, canvas.height / 2);
  } else if (e.type === "input") {
    currentTransformedCursor = getTransformedPoint(canvas.width / 2, canvas.height / 2);
    var scaleVal = e.target.value / 100;
    zoom = scaleVal / canvasImgTransform.scale;
  }

  var scaleX, scaleY, scale, width, height;

  context.translate(currentTransformedCursor.x, currentTransformedCursor.y);

  if (canvasImgTransform.scale * zoom < minZoom) {
    scaleX = minZoom / canvasImgTransform.scale;
    scaleY = minZoom / canvasImgTransform.scale;
    scale = minZoom;
    width = canvasImgTransform.maxWidth;
    height = canvasImgTransform.maxHeight;
  } else if (canvasImgTransform.scale * zoom > maxZoom) {
    scaleX = maxZoom / canvasImgTransform.scale;
    scaleY = maxZoom / canvasImgTransform.scale;
    scale = maxZoom;
    width = canvasImgTransform.width * (maxZoom / canvasImgTransform.scale);
    height = canvasImgTransform.height * (maxZoom / canvasImgTransform.scale);
  } else {
    scaleX = zoom;
    scaleY = zoom;
    scale = canvasImgTransform.scale * zoom;
    width = canvasImgTransform.width * canvasImgTransform.scale;
    height = canvasImgTransform.height * canvasImgTransform.scale;
  }

  canvasImgTransform.scale = scale;

  var xDelta = canvasImgTransform.width - canvasImgTransform.width * scaleX;
  var yDelta = canvasImgTransform.height - canvasImgTransform.height * scaleY;

  var xPosPercent = (e.offsetX - canvasImgTransform.x) / canvasImgTransform.width;
  var yPosPercent = (e.offsetY - canvasImgTransform.y) / canvasImgTransform.height;

  canvasImgTransform.width = width;
  canvasImgTransform.height = height;

  canvasImgTransform.x += xDelta * xPosPercent;
  canvasImgTransform.y += yDelta * yPosPercent;

  context.scale(scaleX, scaleY);
  context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);

  slider.value = canvasImgTransform.scale * 100;

  // var scaleX, scaleY;
  //   context.translate(currentTransformedCursor.x, currentTransformedCursor.y);

  //   if (canvasImgTransform.scale * zoom < minZoom) {
  //     scaleX = minZoom / canvasImgTransform.scale;
  //     scaleY = minZoom / canvasImgTransform.scale;
  //     context.scale(scaleX, scaleY);
  //     canvasImgTransform.scale = minZoom;
  //     canvasImgTransform.width = canvasImgTransform.maxWidth;
  //     canvasImgTransform.height = canvasImgTransform.maxHeight;

  //   } else if (canvasImgTransform.scale * zoom > maxZoom) {
  //     scaleX = maxZoom / canvasImgTransform.scale;
  //     scaleY = maxZoom / canvasImgTransform.scale;
  //     context.scale(scaleX, scaleY);
  //     canvasImgTransform.scale = maxZoom;
  //     canvasImgTransform.width *= maxZoom / canvasImgTransform.scale;
  //     canvasImgTransform.height *= maxZoom / canvasImgTransform.scale;
  //   } else {
  //     scaleX = zoom;
  //     scaleY = zoom;
  //     context.scale(scaleX, scaleY);
  //     canvasImgTransform.scale *= zoom;
  //     canvasImgTransform.width *= canvasImgTransform.scale;
  //     canvasImgTransform.height *= canvasImgTransform.scale;
  //   }
  //   context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);

  // Redraws the image after the scaling
  drawImageToCanvas();
}

function canvasMouseMoveHandler(e) {
  if (!canvasImageLoaded) return;

  const currentTransformedCursor = getTransformedPoint(e.offsetX, e.offsetY);

  if (isDragging) {
    canvasImgTransform.x += currentTransformedCursor.x - dragStartPosition.x;
    canvasImgTransform.y += currentTransformedCursor.y - dragStartPosition.y;

    //this makes the math work out but makes it feel more sluggish
    // var x = (currentTransformedCursor.x - dragStartPosition.x) / canvasImgTransform.scale;
    // var y = (currentTransformedCursor.y - dragStartPosition.y) / canvasImgTransform.scale;

    var x = currentTransformedCursor.x - dragStartPosition.x;
    var y = currentTransformedCursor.y - dragStartPosition.y;

    context.translate(x, y);

    drawImageToCanvas();
  }
}

function canvasMouseDownHandler(e) {
  isDragging = true;
  dragStartPosition = getTransformedPoint(e.offsetX, e.offsetY);
  dragStartPosOffset = { x: e.offsetX, y: e.offsetY };
}

function canvasMouseUpHandler() {
  isDragging = false;
}

function loadingImageInit() {
  loadingImage = document.createElement("img");
  loadingImage.src = `${loading.src}`;

  loadingImage.width = loading.width;
  loadingImage.height = loading.height;
  loadingImage.alt = loading.alt;
}

function hiddenUIInit() {
  var area = document.querySelector(activeHiddenUI.area);
  var target = document.querySelector(activeHiddenUI.target);

  area.addEventListener("mousemove", showUIOnMouseMove, false);
  area.addEventListener("wheel", showUIOnMouseMove, false);
  target.addEventListener("mouseenter", forceScale, false);
  target.addEventListener("mouseleave", stopForceScale, false);

  if (activeHiddenUI.type == "interactive") target.classList.remove("popup--nav__on");
  if (activeHiddenUI.type == "interactive") target.classList.add("popup--nav__off");

  forceHiddenUIOn = false;
}

function canvasInit(popup) {
  canvas = document.querySelector(".popup--canvas");
  context = canvas.getContext("2d");
  canvasInput = document.querySelector(".scale--input");
  // canvasImage = document.querySelector(".popup--img img");

  if (!canvas) return;

  loadingImageInit();

  canvasImage = document.createElement("img");
  canvasImage.src = "." + popup.img.src;
  canvasImage.width = popup.img.width;
  canvasImage.height = popup.img.height;
  canvasImage.alt = popup.img.alt;

  canvasImage.onload = function () {
    popupResizeFunctions();
    canvasImageLoaded = true;
    canvasImageSizeInit();
    removeLoading();
    canvas.addEventListener("wheel", canvasZoom);
    canvas.addEventListener("mousemove", canvasMouseMoveHandler);
    canvas.addEventListener("mousedown", canvasMouseDownHandler);
    canvas.addEventListener("mouseup", canvasMouseUpHandler);

    activeHiddenUI = HIDDEN_UI.filter((ui) => ui.type == "interactive")[0];
    hiddenUIInit();

    drawImageToCanvas();
  };

  canvas.addEventListener("mousedown", canvasGrabbed, false);
  canvas.addEventListener("mouseup", canvasReleased, false);

  // context.imageSmoothingEnabled = false;
}

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

  activeHiddenUI = HIDDEN_UI.filter((ui) => ui.type == "lightbox")[0];

  var popWrapper = document.querySelector(".popup--wrapper");
  var on = popWrapper.classList.contains("popup--wrapper__on") ? true : false;
  if (!on) hiddenUIInit();
  
}

function canvasSetSize() {
  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = canvas.getBoundingClientRect().height;
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
      canvasImageLoaded = false;
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
                    <div className="popup--loading popup--loading__on">
                      <img src={loading.src} alt={loading.alt} width={loading.width} height={loading.height} />
                    </div>
                  </>
                )}

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

function removeLoading() {
  var loading = document.querySelector(".popup--loading");

  toggle(loading, "popup--loading", "transition", "animated", "");
  toggle(canvas, "popup--canvas", "transition", "animated", "");
}

function canvasGrabbed() {
  canvas.classList.add("popup--canvas__grabbed");
}
function canvasReleased() {
  canvas.classList.remove("popup--canvas__grabbed");
}

var forceHiddenUIOn = false;

function forceScale(e) {
  forceHiddenUIOn = true;
  hiddenUIToggle();
}

function stopForceScale() {
  if (forceHiddenUIOn) {
    forceHiddenUIOn = false;
    mouseMoveRan = true;
  }
}

function hiddenUIToggle() {
  var target = document.querySelector(activeHiddenUI.target);
  if (!target) return;
  var on = target.classList.contains("popup--nav__on");
  var tran = Number(window.getComputedStyle(target).getPropertyValue("transition-duration").split("s")[0]) * 1000;

  if (on) {
    if (forceHiddenUIOn) return;
    toggle(target, "popup--nav", tran, "animated", "");
  } else {
    toggle(target, "popup--nav", tran, "animated", "");
  }
}

var isMouseMoving;
var mouseMoveTimeout = 1000;
var mouseMoveRan = false;
function showUIOnMouseMove() {
  if (!mouseMoveRan) {
    hiddenUIToggle();
    mouseMoveRan = true;
  }
  window.clearTimeout(isMouseMoving);
  isMouseMoving = setTimeout(isMouseMovingFunctions, mouseMoveTimeout);
}

function isMouseMovingFunctions() {
  mouseMoveRan = false;
  hiddenUIToggle();
}

var isResizing;

function popupResize() {
  window.clearTimeout(isResizing);
  isResizing = setTimeout(popupResizeFunctions, RESIZE_TIMEOUT);
}

function popupResizeFunctions() {
  if (popupType == "interactive") {
    canvasSetSize();
    drawImageToCanvas();
    canvasImageSizeInit();
  }
}

export default Popup;
