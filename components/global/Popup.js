// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: Should it sit above the footer?
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it

// TODO: make it so the canvas doesn't have padding and is flush with the edges of the popup, and give the zoom tool a background, and do some opacity stuff to make it fade away if the user isn't moving the cursor or something

import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../elements/Buttons";

var canvas,
  context,
  canvasImage,
  canvasImageLoaded = false;

var canvasImgTransform = { x: 0, y: 0, scale: 1, width: 0, height: 0, maxWidth: 0, maxHeight: 0, minWidth: 0, minHeight: 0, middleX: 0, middleY: 0 };


var startZoom = 0.95;
var minZoom = 0.95;
var maxZoom = 6;
var panBorderPadding = -50;



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

    context.drawImage(canvasImage, 
      (canvas.width - canvasImgTransform.maxWidth)/2, 
      (canvas.height - canvasImgTransform.maxHeight)/2, 
      canvasImgTransform.maxWidth, 
      canvasImgTransform.maxHeight);
  };

  if (canvasImageLoaded) {
    run();
  } else {
    //TODO: maybe this is where a little loading animation would go
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

  canvasImgTransform.x = (canvas.width - canvasImgTransform.maxWidth)/2;
  canvasImgTransform.y = (canvas.height - canvasImgTransform.maxHeight)/2;
  canvasImgTransform.width = width;
  canvasImgTransform.height = height;
  canvasImgTransform.maxWidth = width;
  canvasImgTransform.maxHeight = height;
  canvasImgTransform.minWidth = width / maxZoom;
  canvasImgTransform.minHeight = height / maxZoom;
  canvasImgTransform.middleX = width / 2;
  canvasImgTransform.middleY = height / 2;
}

function canvasZoom(value, source) {}

function canvasWheelHandler(e) {
  e.preventDefault();

  const currentTransformedCursor = getTransformedPoint(e.offsetX, e.offsetY);
  var zoom = e.deltaY < 0 ? 1.1 : 0.9;


  
  // canvasImgTransform.scale *= zoom;
  
  // var xDelta = canvasImgTransform.width - (canvasImgTransform.width * zoom);
  // var yDelta = canvasImgTransform.height - (canvasImgTransform.height * zoom);

  // var xPosPercent = (e.offsetX - canvasImgTransform.x) / canvasImgTransform.width;
  // var yPosPercent = (e.offsetY - canvasImgTransform.y) / canvasImgTransform.height;
  
  // canvasImgTransform.width *= zoom;
  // canvasImgTransform.height *= zoom;  
  
  // canvasImgTransform.x += xDelta * xPosPercent;
  // canvasImgTransform.y += yDelta * yPosPercent;

  // context.translate(currentTransformedCursor.x, currentTransformedCursor.y);
  // context.scale(zoom, zoom);
  // context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);




  
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
    height = canvasImgTransform.height*(maxZoom / canvasImgTransform.scale);
  } else {
    scaleX = zoom;
    scaleY = zoom;
    scale= canvasImgTransform.scale*(zoom);
    width= canvasImgTransform.width*(canvasImgTransform.scale);
    height= canvasImgTransform.height*(canvasImgTransform.scale);
  }

  

  canvasImgTransform.scale = scale;
  
  var xDelta = canvasImgTransform.width - (canvasImgTransform.width * scaleX);
  var yDelta = canvasImgTransform.height - (canvasImgTransform.height * scaleY);
  
  var xPosPercent = (e.offsetX - canvasImgTransform.x) / canvasImgTransform.width;
  var yPosPercent = (e.offsetY - canvasImgTransform.y) / canvasImgTransform.height;
  
  canvasImgTransform.width = width;
  canvasImgTransform.height = height;
  
  canvasImgTransform.x += xDelta * xPosPercent;
  canvasImgTransform.y += yDelta * yPosPercent;



  context.scale(scaleX, scaleY);
  context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);
  
  
  
  

  
  








  
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
  const currentTransformedCursor = getTransformedPoint(e.offsetX, e.offsetY);
    
  if (isDragging) {
    
    canvasImgTransform.x += currentTransformedCursor.x - dragStartPosition.x;
    canvasImgTransform.y += currentTransformedCursor.y - dragStartPosition.y;

    var x = (currentTransformedCursor.x - dragStartPosition.x) / canvasImgTransform.scale;
    var y = (currentTransformedCursor.y - dragStartPosition.y) / canvasImgTransform.scale;

    context.translate(x, y);

    drawImageToCanvas();
  }
}

function canvasMouseDownHandler(e) {
  isDragging = true;
  dragStartPosition = getTransformedPoint(e.offsetX, e.offsetY);
  dragStartPosOffset = {x:e.offsetX, y:e.offsetY}
}

function canvasMouseUpHandler() {
  isDragging = false;

}

function canvasInit(canvas, popup) {
  if (!canvas) return;
  canvas.addEventListener("wheel", canvasWheelHandler);
  canvas.addEventListener("mousemove", canvasMouseMoveHandler);
  canvas.addEventListener("mousedown", canvasMouseDownHandler);
  canvas.addEventListener("mouseup", canvasMouseUpHandler);

  canvasImage = document.createElement("img");
  canvasImage.src = "." + popup.src;
  canvasImage.width = popup.width;
  canvasImage.height = popup.height;
  canvasImage.alt = popup.alt;
  canvasImage.onload = function () {
    canvasImageLoaded = true;
    drawImageToCanvas();
  };

  popupResizeFunctions();
  window.addEventListener("resize", popupResize, false);

  canvasImageSizeInit();

  // context.imageSmoothingEnabled = false;
}

function canvasZoomButtonHandler(str) {
  // var zoom = 5;
  // if(str == "in") zoom = zoom * -1;
  // if(str == "out") zoom = zoom * 1;
  // canvasInput.value = parseInt(canvasInput.value) + zoom;
  // canvasZoom(canvasInput.value, "input");
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
        <Button icon={["minus", "alone", "mask"]} animation="scale-out" color="transparent-primary" onClick={() => canvasZoomButtonHandler("in")} />
      </div>

      <div className="scale--slider">
        <div className="scale--end"></div>
        <input
          type="range"
          min="1"
          max="100"
          defaultValue={def}
          className="scale--input"
          id="popupZoom"
          onInput={() => {
            canvasZoom(canvasInput.value, "input");
          }}
        />
        <div className="scale--end"></div>
      </div>

      <div className="scale--zoom scale--plus">
        <Button icon={["plus", "alone", "mask"]} animation="scale-out" color="transparent-primary" onClick={() => canvasZoomButtonHandler("out")} />
      </div>
    </div>
  );
}

function Popup({ popup, setPopup }) {
  var type;
  var img;

  // TODO: add noscroll to body

  if (typeof popup == "object" && typeof popup.src != "undefined") {
    img = popup;
    type = "img";
  } else {
    //
  }

  useEffect(() => {
    console.log(popup);

    if (popup) {
      canvas = document.querySelector(".popup--canvas");
      context = canvas.getContext("2d");
      canvasInput = document.querySelector(".scale--input");
      canvasImage = document.querySelector(".popup--img img");

      if (lastPopup != popup || lastPopup != false) {
        lastPopup = popup;
        canvasInit(canvas, popup);
      }
    } else {
      window.removeEventListener("resize", popupResize, false);
      canvasImageLoaded = false;
    }
  }, [popup]);

  return (
    <>
      {popup && (
        <div className="popup--wrapper">
          <div className="popup--background" onClick={() => setPopup(false)}></div>

          <div className="popup container">
            <div className="popup--inner">
              <div className="popup--content">
                <div className="popup--header">
                  <div className="popup--title">
                    <h3>{popup.title}</h3>
                  </div>
                  <div className="popup--close">
                    <Button icon={["close", "alone", "mask"]} animation="scale-in" color="transparent-primary" onClick={() => setPopup(false)} />
                  </div>
                </div>

                <canvas className="popup--canvas">
                  {/* {type == "img" && (
                    <div className="popup--img">
                      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} onLoad={()=>{canvasImageLoaded = true;drawImageToCanvas();}}/>
                    </div>
                  )} */}
                </canvas>

                <div className="popup--footer">
                  <Scale className="popup--scale" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

var isResizing;

var resizeTimeout = 200;
function popupResize(e) {
  window.clearTimeout(isResizing);
  isResizing = setTimeout(popupResizeFunctions, resizeTimeout);
}

function popupResizeFunctions() {
  canvasSetSize();
  drawImageToCanvas();
  canvasImageSizeInit();
}

export default Popup;
