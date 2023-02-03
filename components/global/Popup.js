// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: Should it sit above the footer?
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it

// TODO: make it so the canvas doesn't have padding and is flush with the edges of the popup, and give the zoom tool a background, and do some opacity stuff to make it fade away if the user isn't moving the cursor or something

import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../elements/Buttons";


var canvas;
var canvasInput;
var cursorLocationCanvas = {x: 0, y: 0};
var cursorLocationPage = {x: 0, y: 0};
var lastPopup = null;



function applyTransform(elem, transform) {
  elem.style.webkitTransform = transform;
  elem.style.mozTransform = transform;
  elem.style.transform = transform;
}







function canvasZoom(value, source){

  var scale = Number(canvasInput.value) / 10;
  var img = canvas.querySelector(".popup--img");

  var canvasMiddle = {
    x: canvas.offsetWidth / 2,
    y: canvas.offsetHeight / 2
  };


  if(scale < 1) scale = 1;
  if(scale > 10) scale = 10;

  if(canvasInput.value == 100 && scale > 0) return;

  
  if(source == "input"){
    img.style.transform = `scale(${scale})`;
    img.style.transformOrigin = `${canvasMiddle.x}px ${canvasMiddle.y}px`;
  } else if(source == "wheel"){
    var x = cursorLocationCanvas.x;
    var y = cursorLocationCanvas.y;


    // img.style.transformOrigin = `${x}px ${y}px`;
    // img.style.transformOrigin = `${canvasMiddle.x}px ${canvasMiddle.y}px`;
    // img.style.transformOrigin = `${(x+canvasMiddle.x) / 2}px ${(y+canvasMiddle.y)/2}px`;
    
    img.style.transformOrigin = `${x}px ${y}px`;
    img.style.transform = `scale(${scale})`;



    // TODO: USE THIS ONE IT LOOKS GOOD MAYBE https://roblouie.com/article/617/transforming-mouse-coordinates-to-canvas-coordinates/ HAVE A GREAT START TO YOUR WEEK BIG GUY:) congrats on getting through such a hard week last week<3
    
    


// https://jsfiddle.net/u3kmvbe0/8/
    // var parentRect = canvas.getBoundingClientRect();
    // var rect = img.getBoundingClientRect();
    // var xPercent = Number((x / parentRect.width).toFixed(2));
    // var yPercent = Number((y / parentRect.height).toFixed(2));
    
    // var left = Math.round(cursorLocationCanvas.x   - (xPercent * (rect.width * scale / oldScale)));
    // var top = Math.round(cursorLocationCanvas.y - (yPercent * (rect.height * scale / oldScale)));

    // console.log(cursorLocationCanvas.x)
    

    // console.log({
    //   x: x,
    //   y: y,
    //   parentRectLeft: parentRect.left,
    //   parentRectTop: parentRect.top,
    //   xPercent: xPercent,
    //   yPercent: yPercent,
    //   rectWidth: rect.width,
    //   rectHeight: rect.height,
    //   scale: scale,
    //   oldScale: oldScale,

    // })

    
    // transform = 'matrix(' + scale + ',0,0,' + scale + ',' + left + ',' + top + ')';

    // img.style.transform = transform;


    // applyTransform(img, transform);
    
    // 



  }


  // canvas.style.transform = `scale(${scale})`;
  // canvas.style.transformOrigin = "0 0";
}





function canvasWheelHandler(e){
  e.preventDefault();
  var delta = e.deltaY || e.detail || e.wheelDelta;
  var increment = 5;
  var zoom; 
  if(delta > 0) zoom = increment * -1;
  if(delta < 0) zoom = increment;

  canvasInput.value = parseInt(canvasInput.value) + zoom;
  canvasZoom(canvasInput.value, "wheel");

}


function canvasMouseMoveHandler(e){

  var rect = canvas.getBoundingClientRect();
  cursorLocationCanvas = {x: e.clientX - rect.left, y: e.clientY - rect.top};
  cursorLocationPage = {x: e.clientX, y: e.clientY};

}



function canvasInit(canvas) {

  if(!canvas) return;

  
  canvas.addEventListener("wheel", canvasWheelHandler);
  canvas.addEventListener("mousemove", canvasMouseMoveHandler);

  

}



function canvasZoomButtonHandler(str){
  var zoom = 5;
  if(str == "in") zoom = zoom * -1;
  if(str == "out") zoom = zoom * 1;
  canvasInput.value = parseInt(canvasInput.value) + zoom;
  canvasZoom(canvasInput.value, "input");
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
        <input type="range" min="1" max="100" defaultValue={def} className="scale--input" id="popupZoom" onInput={()=>{canvasZoom(canvasInput.value, "input")}} />
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

    if(!popup) return;
    canvas = document.querySelector(".popup--canvas");
    canvasInput = document.querySelector(".scale--input");
    if(lastPopup != popup){
      lastPopup = popup;
      canvasInit(canvas);
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

                <div className="popup--canvas">
                  {type == "img" && (
                    <div className="popup--img">
                      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />
                    </div>
                  )}
                </div>

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

export default Popup;
