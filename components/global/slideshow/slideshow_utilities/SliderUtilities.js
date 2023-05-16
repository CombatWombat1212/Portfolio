import { getElemWidth, splitPx } from "@/scripts/GlobalUtilities";

var sliderMouse = {
  start: { x: 0, y: 0 },
  cur: { x: 0, y: 0 },
};

var sliderHandle = {
  start: { x: 0, y: 0 },
  cur: { x: 0, y: 0 },
};

var sliderMouseGrabbed = 0;



function sliderHandleMouseMove(e, handle) {
  if (sliderMouseGrabbed < 2) return;

  var bar = handle.parentElement;
  var slider = bar.parentElement;

  var isTouchMove = e.type == "touchmove";
  var touchOrMouse = isTouchMove ? e.touches[0] : e;

  var mouse = { x: 0, y: 0 };
  mouse.x = touchOrMouse.clientX;

  sliderMouse.cur.x = mouse.x;

  var handlePos = sliderHandle.start.x + (sliderMouse.cur.x - sliderMouse.start.x);

  var barWidth = getElemWidth(bar);
  var handleWidth = getElemWidth(handle);

  var min = 0;
  var max = barWidth;

  if (handlePos < 0) handlePos = 0;
  if (handlePos > max) handlePos = max;

  var min = parseInt(slider.getAttribute("data-min"));
  var max = parseInt(slider.getAttribute("data-max"));

  var notch = barWidth / (max - min);

  var value = Math.round(handlePos / notch);

  slider.setAttribute("data-value", value);

  handlePos = Math.round(handlePos / notch) * notch;

  handle.style.setProperty("--slider-handle-left", `${handlePos}px`);
}




function sliderHandleSet(slider, index) {
  
  var bar = slider.querySelector(".slider--bar");
  var handle = slider.querySelector(".slider--handle");

  var barWidth = getElemWidth(bar);
  var min = parseInt(slider.getAttribute("data-min"));
  var max = parseInt(slider.getAttribute("data-max"));
  var notch = barWidth / (max - min);

  var handlePos = index * notch;

  if (handlePos < 0) handlePos = 0;
  if (handlePos > barWidth) handlePos = barWidth;

  slider.setAttribute("data-value", index);
  handle.style.setProperty("--slider-handle-left", `${handlePos}px`);
}

function sliderMouseMoveStart(e) {
  var handle = e.target;
  var slider = handle.parentElement;

  var mouse = { x: 0, y: 0 };

  if (e.type == "mousemove" && sliderMouseGrabbed == 1) {
    sliderMouseGrabbed++;
    mouse.x = e.clientX;
    sliderMouse.start.x = mouse.x;
    sliderHandle.start.x = splitPx(window.getComputedStyle(handle).getPropertyValue("--slider-handle-left"));
  } else if (e.type == "touchmove" && sliderMouseGrabbed == 1) {
    sliderMouseGrabbed++;
    var touch = e.touches[0];
    mouse.x = touch.clientX;
    sliderMouse.start.x = mouse.x;
    sliderHandle.start.x = splitPx(window.getComputedStyle(handle).getPropertyValue("--slider-handle-left"));
  }
}

function sliderHandleMouseDown(e) {
  sliderMouseGrabbed++;

  var handle = e.target;
  handle.classList.add("slider--handle__active");

  var notches = handle.parentElement.querySelectorAll(".slider--notch");
  notches.forEach((notch) => {
    notch.classList.remove("slider--notch__hoverable");
  });

  document.body.classList.add("cursor-grabbed");

  if (e.type == "mousedown") {
    document.addEventListener("mousemove", (e) => {
      sliderHandleMouseMove(e, handle);
    });
    document.addEventListener("mouseup", (e) => {
      sliderHandleMouseUp(e, handle);
    });
  } else if (e.type == "touchstart") {

    document.addEventListener("touchmove", (e) => {
      sliderHandleMouseMove(e, handle);
    });

    document.addEventListener("touchend", (e) => {
      sliderHandleMouseUp(e, handle);
    });
  }
}

function sliderHandleMouseUp(e, handle) {
  sliderMouseGrabbed = 0;

  handle.classList.remove("slider--handle__active");
  document.body.classList.remove("cursor-grabbed");

  var notches = handle.parentElement.querySelectorAll(".slider--notch");
  notches.forEach((notch) => {
    notch.classList.add("slider--notch__hoverable");
  });

  document.removeEventListener("mousemove", (e) => {
    sliderHandleMouseMove(e, handle);
  });
  document.removeEventListener("mouseup", (e) => {
    sliderHandleMouseUp(e, handle);
  });
}

function sliderNotchOnClickHandler(e, index, group, setCardImage) {
  const img = group.imgs[index];
  setCardImage(img);

  var slider = e.target.closest(".slider");
  sliderHandleSet(slider, index);
}

function sliderHandler(index, group, setCardImage) {
  var img = group.imgs[index];
  setCardImage(img);
}

function sliderHandleInit(slider) {
  var value = slider.getAttribute("data-value");
  sliderHandleSet(slider, value);
}

function sliderObserve(slider, group, setCardImage) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "data-value") {
        const newValue = mutation.target.getAttribute("data-value");
        if (newValue !== currentValue) {
          sliderHandler(newValue, group, setCardImage);
          currentValue = newValue;
        }
      }
    });
  });

  // Initialize currentValue with the current value of the 'data-value' attribute
  let currentValue = slider.getAttribute("data-value");

  // Start observing changes to the 'data-value' attribute
  observer.observe(slider, { attributes: true });
}

function sliderInit(slideshow, group, setCardImage) {
  var slider = slideshow.current.querySelector(".slider");
  sliderHandleInit(slider);
  sliderObserve(slider, group, setCardImage);
}

export { sliderHandleMouseMove, sliderHandleSet, sliderMouseMoveStart, sliderHandleMouseDown, sliderHandleMouseUp, sliderNotchOnClickHandler, sliderHandler, sliderHandleInit, sliderObserve, sliderInit };
