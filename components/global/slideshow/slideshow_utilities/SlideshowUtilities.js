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
  card.width = getElemWidth(container.children[1]);

  var scrollTarget = card.width * index;
  var empty = container.querySelector(".slideshow--empty");

  // get the current scroll position of empty at the beginning of the transition
  var currentScroll = -1 * splitPx(empty.style.marginLeft);

  // calculate distance and speed
  var distance = Math.abs(scrollTarget - currentScroll);
  var speed = 5000; // pixels per second
  var duration = distance / speed;

  duration = map(duration, 0, 5, 0.4, 6);
  // duration = 0;

  // set transition duration and starting position
  empty.style.transitionDuration = `${duration}s`;
  empty.style.setProperty("margin-left", `-${scrollTarget}px`);

  // check if empty has reached the scroll target every 10 milliseconds
  var transitionInterval = setInterval(function () {
    if (-1 * splitPx(empty.style.marginLeft) == scrollTarget) {
      // stop the interval if empty has reached the scroll target
      clearInterval(transitionInterval);
    } else {
      // update currentScroll during transition
      currentScroll = -1 * splitPx(empty.style.marginLeft);
    }
  }, 10);
}



function slideshowButtonsDisable(slide) {
  const prevButton = slide.refs.prevBtn.current;
  const nextButton = slide.refs.nextBtn.current;
  const cardImage = slide.states.img;
  const group = slide.group;

  if (cardImage.index <= 0) {
    prevButton.classList.add("slider--button__disabled");
    prevButton.classList.remove("slider--button__enabled");
  } else {
    prevButton.classList.remove("slider--button__disabled");
    prevButton.classList.add("slider--button__enabled");
  }

  if (cardImage.index >= group.imgs.length - 1) {
    nextButton.classList.add("slider--button__disabled");
    nextButton.classList.remove("slider--button__enabled");
  } else {
    nextButton.classList.remove("slider--button__disabled");
    nextButton.classList.add("slider--button__enabled");
  }
}

function slideshowUpdateCardStyle(slide) {
  const container = slide.refs.container.current;
  const index = slide.states.img.index;
  const cards =  Array.from(container.querySelectorAll(".slideshow--card"));

  for (let i = 0; i < cards.length; i++) {
    if (i != index) {
      cards[i].classList.add("slideshow--card__active");
      cards[i].classList.add("slideshow--card__inactive");
    } else {
      cards[i].classList.remove("slideshow--card__active");
      cards[i].classList.remove("slideshow--card__inactive");
    }
  }
}

function slideshowCheckInit(slide) {
  const container = slide.refs.container.current;
  const empty = slide.refs.empty.current;

  var card = { width: 0, height: 0 };
  card.width = getElemWidth(container.children[1]);
  var currentTransition = splitS(getComputedStyle(empty).getPropertyValue("transition-duration"));
  setTimeout(() => {
    slide.states.setAtStart(true);
  }, currentTransition * 2);
}





export {
  slideshowSetPosition,
  slideshowUpdateCardStyle,
  slideshowCheckInit,
  slideshowButtonsDisable,
  slideshowUpdateCardImageAndSlider,
};
