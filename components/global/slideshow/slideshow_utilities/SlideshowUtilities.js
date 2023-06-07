import { getElemWidth, map, splitPx, splitS } from "@/scripts/GlobalUtilities";

function slideshowUpdateCardImageAndSlider(slide, move) {
  var index = slide.states.img.index;
  if (index <= 0 && move == -1) move = 0;
  if (index >= slide.group.imgs.length - 1 && move == 1) move = 0;
  if (move == 0) return;
  index += move;
  const img = slide.group.imgs[index];

  slide.states.setImg(img);
}

function slideshowSetPosition(slide) {
  const container = slide.refs.container.current;
  const index = slide.states.img.index;

  var card = { width: 0, height: 0 };
  // if (!container || !container.children || container.children.length <= 1) return;
  if (!container || !container.querySelectorAll(".slideshow--card") || container.querySelectorAll(".slideshow--card").length <= 1) return;

  card.width = getElemWidth(container.querySelector(".slideshow--card"));

  var scrollTarget = card.width * index;

  // get the current scroll position of slideshow at the beginning of the transition
  var currentScroll = -1 * splitPx(container.style.getPropertyValue("--inner-translate-x"));

  // calculate distance and speed
  var distance = Math.abs(scrollTarget - currentScroll);
  var speed = 5000; // pixels per second
  var duration = distance / speed;

  duration = map(duration, 0, 8, 0.4, 5);
  // duration = 0;

  // set transition duration and starting position
  container.style.setProperty("--movement-transition", `${duration}s`);
  container.style.setProperty("--inner-translate-x", `-${scrollTarget}px`);

  // check if slideshow has reached the scroll target every 10 milliseconds
  var transitionInterval = setInterval(function () {
    if (-1 * splitPx(container.style.getPropertyValue("--inner-translate-x")) == scrollTarget) {
      // stop the interval if slideshow has reached the scroll target
      clearInterval(transitionInterval);
    } else {
      // update currentScroll during transition
      currentScroll = -1 * splitPx(container.style.getPropertyValue("--inner-translate-x"));
    }
  }, 10);
}

function slideshowCheckInit(slide) {
  const container = slide.refs.container.current;

  var card = { width: 0, height: 0 };
  card.width = getElemWidth(container.querySelector(".slideshow--card"));
  var currentTransition = splitS(getComputedStyle(container).getPropertyValue("--movement-transition"));
  setTimeout(() => {
    slide.states.setAtStart(true);
  }, currentTransition * 2);
}

export { slideshowSetPosition, slideshowCheckInit, slideshowUpdateCardImageAndSlider };
