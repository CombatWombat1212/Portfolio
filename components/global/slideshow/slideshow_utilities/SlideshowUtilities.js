import { getElemWidth, map, RESIZE_TIMEOUT, splitPx, splitS } from "@/scripts/GlobalUtilities";
import { slideshowGetCardImage } from "../Slideshow";
import { sliderHandleSet } from "./SliderUtilities";

// var slideshows = [];

// function slideshowSwipeListenersInit(slide) {
//   const slideshow = slide.refs.slideshow.current;
//   const container = slide.refs.container.current;
//   const group = slide.group;
//   if (slideshows.includes(slideshow)) return;
//   slideshows.push(slideshow);

//   container.removeEventListener(
//     "swiped",
//     (e) => {
//       slideshowContainerSwiped(e, group, slide.states.setImg);
//     },
//     true
//   );
//   container.addEventListener(
//     "swiped",
//     (e) => {
//       slideshowContainerSwiped(e, group, slide.states.setImg);
//     },
//     true
//   );
// }

// function slideshowContainerSwiped(e, group, setCardImage){

//   if(e.detail.dir != 'left' && e.detail.dir != 'right') return;
//   var slideshow = e.target.closest(".slideshow");
//   var slider = slideshow.querySelector(".slider");
//   var dir = e.detail.dir;

//   if(dir == 'left') dir = 'right';
//   else if(dir == 'right') dir = 'left';

//   var cardImage = slideshowGetCardImage(slideshow);

//   var index = cardImage.index;
//   var move = 0;

//   if (dir == "left") move = -1;
//   else if (dir == "right") move = 1;

//   if (index <= 0 && move == -1) move = 0;
//   if (index >= group.imgs.length - 1 && move == 1) move = 0;

//   if (move == 0) return;

//   index += move;
//   var img = group.imgs[index];

//   setCardImage(img);
//   sliderHandleSet(slider, index);

// }

// function slideShowButtonHandler(e, cardImage, setCardImage, group, str) {
//   var slideshow = e.target.closest(".slideshow");
//   var container = slideshow.querySelector(".slideshow--container");
//   var button = e.target.closest(".button");
//   var slider = slideshow.querySelector(".slider");

//   var index = cardImage.index;

//   var move = 0;

//   if (str == "left") move = -1;
//   else if (str == "right") move = 1;

//   if (index <= 0 && move == -1) move = 0;
//   if (index >= group.imgs.length - 1 && move == 1) move = 0;

//   if (move == 0) return;

//   index += move;
//   var img = group.imgs[index];

//   setCardImage(img);
//   sliderHandleSet(slider, index);
// }


function slideshowUpdateCardImageAndSlider(slide, move) {
  var index = slide.states.img.index;
  if (index <= 0 && move == -1) move = 0;
  if (index >= slide.group.imgs.length - 1 && move == 1) move = 0;
  if (move == 0) return;
  index += move;
  const img = slide.group.imgs[index];

  slide.states.setImg(img);

}


// function slideshowContainerSwiped(e, group, setCardImage) {
//   if (e.detail.dir != "left" && e.detail.dir != "right") return;

//   var slideshow = e.target.closest(".slideshow");
//   var slider = slideshow.querySelector(".slider");
//   var dir = e.detail.dir;

//   if (dir == "left") dir = "right";
//   else if (dir == "right") dir = "left";

//   var cardImage = slideshowGetCardImage(slideshow);
//   var index = cardImage.index;
//   var move = dir == "left" ? -1 : 1;

//   slideshowUpdateCardImageAndSlider(cardImage, setCardImage, slider, index, group, move);
// }


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

function slideshowInit(slide) {
  const container = slide.refs.container.current;
  const group = slide.group;
  const empty = slide.refs.empty.current;

  // slideshowSwipeListenersInit(slide);


  function run(emptyTransition) {
    var interval = setInterval(() => {
      slideshowScrolling(group, container);
      slideshowScrollingDelayed();
    }, emptyTransition / 20);

    setTimeout(() => {
      clearInterval(interval);
    }, emptyTransition);
  }

  run();

  // Create a new MutationObserver that observes changes to the style property of container.querySelector('.slideshow--empty')
  const existingObserver = empty.observer;
  if (existingObserver) {
    existingObserver.disconnect();
    delete empty.observer;
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.attributeName === "style") {
        const empty = container.querySelector(".slideshow--empty");
        const rect = empty.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isVisible) {
          var emptyTransition = splitS(getComputedStyle(empty).getPropertyValue("transition-duration"));
          run(emptyTransition);
        }
      }
    }
  });

  // Start observing changes to the style property of container.querySelector('.slideshow--empty')
  observer.observe(empty, { attributes: true });

  // Store the observer on the element for future access
  empty.observer = observer;
}

function slideshowScrolling(group, container) {
  var slideshow = container.parentElement;
  var card = container.children[1];
  var drawnIndex = parseInt(getComputedStyle(container).getPropertyValue("--slide-img-index"));

  var buffer = 0.5;
  var cardWidth = getElemWidth(card);
  var scrollPos = splitPx(window.getComputedStyle(container.querySelector(".slideshow--empty")).getPropertyValue("margin-left"));
  var calcIndex = Math.abs(Math.floor((scrollPos + cardWidth * buffer) / cardWidth));
}

var slideshowIsScrolling;

function slideshowScrollingDelayed() {
  window.clearTimeout(slideshowIsScrolling);
  slideshowIsScrolling = setTimeout(slideshowScrollingDelayedFunctions(), RESIZE_TIMEOUT);
}

function slideshowScrollingDelayedFunctions() {
  function actions() {}
  actions();
}


function slideshowMouseDown(e) {}

export {
  // slideShowButtonHandler,
  slideshowInit,
  slideshowSetPosition,
  slideshowUpdateCardStyle,
  slideshowCheckInit,
  slideshowButtonsDisable,
  slideshowMouseDown,
  slideshowUpdateCardImageAndSlider,
};
