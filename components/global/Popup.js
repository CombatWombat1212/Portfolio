// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it

import toggle from "@/scripts/AnimationTools";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../elements/Buttons";
import { loading } from "@/data/ICONS";
import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";

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

  target.classList.remove("popup--nav__on");
  target.classList.add("popup--nav__off");
  forceHiddenUIOn = false;
}

function canvasInit(popup) {
  canvas = document.querySelector(".popup--canvas");
  context = canvas.getContext("2d");
  canvasInput = document.querySelector(".scale--input");
  canvasImage = document.querySelector(".popup--img img");

  if (!canvas) return;

  loadingImageInit();

  canvasImage = document.createElement("img");
  canvasImage.src = "." + popup.img.src;
  canvasImage.width = popup.img.width;
  canvasImage.height = popup.img.height;
  canvasImage.alt = popup.img.alt;

  popupResizeFunctions();

  window.addEventListener("resize", popupResize, false);
  window.addEventListener("keydown", catchCloseKey, false);

  canvasImage.onload = function () {
    canvasImageSizeInit();
    canvasImageLoaded = true;
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

function lightboxInit() {
  activeHiddenUI = HIDDEN_UI.filter((ui) => ui.type == "lightbox")[0];
  hiddenUIInit();
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

  type = popup.type;
  img = popup.img;

  useEffect(() => {
    if (popup) {
      document.body.classList.add("noscroll");

      // if (type == "interactive") {
      // canvas = document.querySelector(".popup--canvas");
      // context = canvas.getContext("2d");
      // canvasInput = document.querySelector(".scale--input");
      // canvasImage = document.querySelector(".popup--img img");
      // }

      if (lastPopup != popup || lastPopup != false) {
        lastPopup = popup;

        toggle(document.querySelector(".popup--wrapper"), "popup--wrapper", "transition", "animated", "");

        if (type == "interactive") canvasInit(popup, setPopup);
        if (type == "lightbox") lightboxInit(popup, setPopup);
      }

      setPopupGlobal = setPopup;
    } else {
      window.removeEventListener("resize", popupResize, false);
      window.removeEventListener("keydown", catchCloseKey, false);
      canvasImageLoaded = false;
      document.body.classList.remove("noscroll");
    }
  }, [popup, setPopup]);

  var headerClasses = type == "lightbox" ? "popup--header__condensed popup--nav__off" : "popup--header__full";
  var contentClasses = `popup--content ${type == "lightbox" && "popup--content__lightbox"}`;

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

          <div className={`popup container ${type == "lightbox" ? "popup__lightbox" : "popup__interactive"}`} style={type == "lightbox" ? { "--img-aspect-width": img.width, "--img-aspect-height": img.height } : {}}>
            <div className="popup--inner">
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
                  <div className="popup--img">
                    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />
                  </div>
                )}

                {type == "interactive" && (
                  <div className="popup--footer popup--nav popup--nav__off">
                    <Scale className="popup--scale" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function catchCloseKey(e) {
  if (e.keyCode == 27 || e.key == "Escape") {
    closePopup(setPopupGlobal);
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
  canvasSetSize();
  drawImageToCanvas();
  canvasImageSizeInit();
}

export default Popup;
