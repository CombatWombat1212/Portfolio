import { getElemWidth, splitPx } from "@/scripts/GlobalUtilities";
import { sliderHandleSet } from "./SliderUtilities";
import { slideshowSetPosition, slideshowUpdateCardImageAndSlider } from "./SlideshowUtilities";
import { SliderElement } from "@vidstack/player";

function slideshowCreateHandlers(slide) {
  let handlers = {
    resize: (e) => {
      slideshowResize(slide);
    },

    cardOnClick: (e) => {
      cardOnClick(e, slide);
    },

    buttonOnClick: (e) => {
      slideshowButtonOnClick(e, slide);
    },

    containerSwipe: (e) => {
      containerSwipe(e, slide);
    },

    sliderMouseMoveStart: (e) => {
      sliderMouseMoveStart(e, slide);
    },

    sliderMouseMove: (e) => {
      sliderMouseMove(e, slide, handlers);
    },
  };

  handlers.sliderMouseDown = (e) => {
    sliderMouseDown(e, slide, handlers);
  };

  handlers.sliderMouseUp = (e) => {
    sliderMouseUp(e, slide, handlers);
  };

  handlers.notchOnMouseDown = (e) => {
    sliderNotchOnClick(e,slide);
    sliderNotchOnMouseDown(e, slide);
    sliderMouseDown(e, slide, handlers);
  };

  return handlers;
}

function slideshowResize(slide) {
  sliderHandleSet(slide);

  // TODO: this works for now but you could always create a new state that's true while resizing, and false once resizing is done and use that to trigger the set position after a resize rather than just a timeout
  setTimeout(() => {
    slideshowSetPosition(slide);
  }, 2000);
}

function slideshowButtonOnClick(e, slide) {
  const direction = e.target.closest(".slider--button").getAttribute("data-direction");
  const move = direction == "left" ? -1 : 1;

  slideshowUpdateCardImageAndSlider(slide, move);
}

function sliderNotchOnClick(e, slide) {
  const target = e.target;
  const index = parseInt(target.getAttribute("data-index"));
  slide.states.setImg(slide.group.imgs[index]);
}

function sliderNotchOnMouseDown(e, slide) {
  slide.slider.grabbed++;
  const target = e.target;
  const index = parseInt(target.getAttribute("data-index"));
  slide.states.setImg(slide.group.imgs[index]);
}

function cardOnClick(e, slide) {
  const index = e.target.closest(".card").getAttribute("data-index");
  if (slide.states.img.index == index) return;
  const group = slide.group;
  slide.states.setImg(group.imgs[index]);
}

function sliderMouseMove(e, slide) {
  const grabbed = slide.slider.grabbed;
  if (grabbed < 2) return;

  const bar = slide.refs.bar.current;
  const handle = slide.refs.handle.current;
  const group = slide.group;

  var isTouchMove = e.type == "touchmove";
  var touchOrMouse = isTouchMove ? e.touches[0] : e;

  var mouse = { x: 0, y: 0 };
  mouse.x = touchOrMouse.clientX;

  slide.slider.mouse.cur.x = mouse.x;

  var handlePos = slide.slider.handle.start.x + (slide.slider.mouse.cur.x - slide.slider.mouse.start.x);
//   console.log(
//     `
// handle start: ${slide.slider.handle.start.x},
// mouse start: ${slide.slider.mouse.start.x},
// mouse cur: ${slide.slider.mouse.cur.x},
// handle pos: ${handlePos}`
//   );

  var barWidth = getElemWidth(bar);
  var handleWidth = getElemWidth(handle);

  var min = 0;
  var max = barWidth;

  if (handlePos < 0) handlePos = 0;
  if (handlePos > max) handlePos = max;

  var min = slide.slider.min;
  var max = slide.slider.max;

  var notch = barWidth / (max - min);

  var value = Math.round(handlePos / notch);

  slide.slider.index = value;

  handlePos = Math.round(handlePos / notch) * notch;

  handle.style.setProperty("--slider-handle-left", `${handlePos}px`);

  slide.states.setImg(group.imgs[value]);
}



function sliderMouseMoveStart(e, slide) {
  const handle = slide.refs.handle.current;
  var mouse = { x: 0, y: 0 };
  
  function updateSlideState(clientX) {
    if (slide.slider.grabbed === 1) {
      slide.slider.grabbed++;
      mouse.x = clientX;
      slide.slider.mouse.start.x = mouse.x;
      slide.slider.handle.start.x = splitPx(window.getComputedStyle(handle).getPropertyValue("--slider-handle-left"));
    }
  }

  if (e.type === "mousemove") {
    updateSlideState(e.clientX);
  } else if (e.type === "touchmove") {
    var touch = e.touches[0];
    updateSlideState(touch.clientX);
  }
}



function sliderMouseDown(e, slide, handlers) {
  slide.slider.grabbed++;
  const handle = slide.refs.handle.current;

  handle.classList.add("slider--handle__active");

  notchesRemoveHoverabe(slide);

  document.body.classList.add("cursor-grabbed");

  if (e.type == "mousedown") {
    document.addEventListener("mousemove", handlers.sliderMouseMove);
    document.addEventListener("mouseup", handlers.sliderMouseUp);
  } else if (e.type == "touchstart") {
    document.addEventListener("touchmove", handlers.sliderMouseMove);
    document.addEventListener("touchend", handlers.sliderMouseUp);
  }
}









function sliderMouseUp(e, slide, handlers) {
  slide.slider.grabbed = 0;
  const handle = slide.refs.handle.current;

  if (!handle) return;
  handle.classList.remove("slider--handle__active");
  document.body.classList.remove("cursor-grabbed");

  notchesAddHoverabe(slide);

  document.removeEventListener("mousemove", handlers.sliderMouseMove);
  document.removeEventListener("mouseup", handlers.sliderMouseUp);
  document.removeEventListener("touchmove", handlers.sliderMouseMove);
  document.removeEventListener("touchend", handlers.sliderMouseUp);
}

function containerSwipe(e, slide) {
  const direction = e.detail.dir;
  const move = direction == "left" ? 1 : -1;
  slideshowUpdateCardImageAndSlider(slide, move);
}

function notchesRemoveHoverabe(slide) {
  const notches = slide.refs.notches;
  notches.forEach((notch) => {
    notch.current.classList.remove("slider--notch__hoverable");
  });
}

function notchesAddHoverabe(slide) {
  const notches = slide.refs.notches;
  notches.forEach((notch) => {
    notch.current.classList.add("slider--notch__hoverable");
  });
}

export { slideshowCreateHandlers };
