import { maxZoom, minZoom, popupResizeFunctions, startZoom } from "../Popup";
import { hiddenUIInit, setActiveHiddenUI } from "./HiddenUIUtilities";
import { removeLoading } from "./LoadingImageUtilities";
import { loadImgExternally } from "@/scripts/GlobalUtilities";
import { loading } from "@/data/ICONS";


var canvas;
var context;
var canvasImage;
var canvasImageLoaded = false;


var canvasImgTransform = { x: 0, y: 0, scale: 1, width: 0, height: 0, maxWidth: 0, maxHeight: 0, minWidth: 0, minHeight: 0, middleX: 0, middleY: 0 };
var canvasInput;
var isDragging = false;
var dragStartPosition = { x: 0, y: 0 };
var dragStartPosOffset = { x: 0, y: 0 };
var currentTransformedCursor;


function getTransformedPoint(x, y) {
    const originalPoint = new DOMPoint(x, y);
    return context.getTransform().invertSelf().transformPoint(originalPoint);
  }
  
  
function setCanvasImageLoaded(bool){
    canvasImageLoaded = bool;
}


function canvasDrawImage() {
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

function canvasZoom(e) {
  if (!canvasImageLoaded) return;

  e.preventDefault();

  var zoomIn = 1.2;
  var zoomOut = 0.8;

  var zoom;
  var currentTransformedCursor;

  var slider = document.querySelector(".scale--input");

  if(!slider) return;

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

  // Redraws the image after the scaling
  canvasDrawImage();
}

function canvasGrabbed() {
  canvas.classList.add("popup--canvas__grabbed");
}
function canvasReleased() {
  canvas.classList.remove("popup--canvas__grabbed");
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

    canvasDrawImage();
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

function canvasSetSize() {
  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = canvas.getBoundingClientRect().height;
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

function canvasInit(pop) {
  canvas = document.querySelector(".popup--canvas");
  context = canvas.getContext("2d");
  canvasInput = document.querySelector(".scale--input");
  
  if (!canvas) return;
  
  canvasImage = loadImgExternally(pop.img);

  canvasImage.onload = function () {

    canvasOnResize();
    canvasImageLoaded = true;
    canvasImageSizeInit();

    // var loading = document.querySelector(".popup--loading");
    // removeLoading(loading, canvas);
    canvas.addEventListener("wheel", canvasZoom);
    canvas.addEventListener("mousemove", canvasMouseMoveHandler);
    canvas.addEventListener("mousedown", canvasMouseDownHandler);
    canvas.addEventListener("mouseup", canvasMouseUpHandler);

    // setActiveHiddenUI("interactive");

    // hiddenUIInit();
    canvasDrawImage();

  };

  canvas.addEventListener("mousedown", canvasGrabbed, false);
  canvas.addEventListener("mouseup", canvasReleased, false);

  // context.imageSmoothingEnabled = false;
}


function canvasOnResize(){
    canvasSetSize();
    canvasDrawImage();
    canvasImageSizeInit();
}





//   export all functions
export { canvasZoom, canvasGrabbed, canvasReleased, canvasMouseMoveHandler, canvasMouseDownHandler, canvasMouseUpHandler, canvasSetSize, canvasImageSizeInit, canvasInit, canvasDrawImage, setCanvasImageLoaded,canvasOnResize };

export { canvas, context, canvasImage, canvasImageLoaded };
