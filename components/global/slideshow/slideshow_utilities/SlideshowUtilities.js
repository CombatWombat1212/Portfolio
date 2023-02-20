import { getElemWidth, map, RESIZE_TIMEOUT, splitPx, splitS } from "@/scripts/GlobalUtilities";
import { slideshowGetCardImage } from "../Slideshow";
import { sliderHandleSet } from "./SliderUtilities";


var slideshows = [];

function slideshowSwipeListenersInit(slideshow, container, group, setCardImage){

  // add slideshow to slideshows if it is not already there
  if(slideshows.includes(slideshow)) return
  slideshows.push(slideshow);

  console.log('added')
  container.removeEventListener('swiped', (e)=>{slideshowContainerSwiped(e, group, setCardImage)}, true);
  container.addEventListener('swiped', (e)=>{slideshowContainerSwiped(e, group, setCardImage)}, true);

}



function slideshowContainerSwiped(e, group, setCardImage){

  if(e.detail.dir != 'left' && e.detail.dir != 'right') return;
  var slideshow = e.target.closest(".slideshow");
  var slider = slideshow.querySelector(".slider");
  var dir = e.detail.dir;
  
  if(dir == 'left') dir = 'right';
  else if(dir == 'right') dir = 'left';


  console.log('ran')

  var cardImage = slideshowGetCardImage(slideshow);
  console.log(cardImage.index)
  
  var index = cardImage.index;
  var move = 0;


  if (dir == "left") move = -1;
  else if (dir == "right") move = 1;

  if (index <= 0 && move == -1) move = 0;
  if (index >= group.imgs.length - 1 && move == 1) move = 0;
  
  
  if (move == 0) return;
  
  
  index += move;
  var img = group.imgs[index];


  setCardImage(img);
  sliderHandleSet(slider, index);

  
}







function slideshowSetPosition(container, index) {
  if (container == null) return;
  container = container.current ? container.current : container;

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

function slideshowButtonsDisable(slideshow, cardImage, group) {
  slideshow = slideshow.current ? slideshow.current : slideshow;

  var prevButton = slideshow.querySelectorAll(".slider--button")[0];
  var nextButton = slideshow.querySelectorAll(".slider--button")[slideshow.querySelectorAll(".slider--button").length - 1];

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





function slideShowButtonHandler(e, cardImage, setCardImage, group, str) {
  var slideshow = e.target.closest(".slideshow");
  var container = slideshow.querySelector(".slideshow--container");
  var button = e.target.closest(".button");
  var slider = slideshow.querySelector(".slider");

  var index = cardImage.index;

  var move = 0;

  if (str == "left") move = -1;
  else if (str == "right") move = 1;

  if (index <= 0 && move == -1) move = 0;
  if (index >= group.imgs.length - 1 && move == 1) move = 0;

  if (move == 0) return;

  
  index += move;
  var img = group.imgs[index];


  setCardImage(img);
  sliderHandleSet(slider, index);
}



function slideshowUpdateCardStyle(slideshow, cardImage) {
  slideshow = slideshow.current ? slideshow.current : slideshow;

  var container = slideshow.querySelector(".slideshow--container");
  var index = cardImage.index;
  var cards = container.querySelectorAll(".slideshow--card");
  cards = Array.from(cards);

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

function slideshowCheckInit(container, setHitStartPoint) {
  container = container.current ? container.current : container;
  var empty = container.querySelector(".slideshow--empty");
  var card = { width: 0, height: 0 };
  card.width = getElemWidth(container.children[1]);
  var currentTransition = splitS(getComputedStyle(empty).getPropertyValue("transition-duration"));
  setTimeout(() => {
    setHitStartPoint(true);
  }, currentTransition * 2);
}

function slideshowInit(group, slideshow, container, cardImage, setCardImage) {
  slideshow = slideshow.current;
  container = container.current;

  var index = cardImage.index;
  slideshowSwipeListenersInit(slideshow, container, group, setCardImage);
  slideshowResizeFunctions(slideshow, container, index);

  var empty = container.querySelector(".slideshow--empty");
  // var emptyTransition = splitS(getComputedStyle(empty).getPropertyValue("transition-duration"));

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

  // TODO: keyboard navigation support
  // container.removeEventListener("wheel", slideshowWheelHandler, false);
  // container.addEventListener("wheel", slideshowWheelHandler, false);

  // window.removeEventListener("keydown", (e)=>slideshowCatchKeys(e,container), true);
  // window.addEventListener("keydown", (e)=>slideshowCatchKeys(e,container), true);
  // window.removeEventListener("keyup", (e)=>handleKeyUp(e,container), true);
  // window.addEventListener("keyup", (e)=>handleKeyUp(e,container), true);

  window.removeEventListener("resize", slideshowResize, false);
  window.addEventListener("resize", slideshowResize, false);
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

var slideshowIsResizing;

function slideshowResize() {
  window.clearTimeout(slideshowIsResizing);
  slideshowIsResizing = setTimeout(slideshowResizeFunctions, RESIZE_TIMEOUT);
}

function slideshowResizeFunctions(slideshow = null, container = null, index = null) {
  function actions(slideshow, container, index) {
    if (index == null) index = parseInt(getComputedStyle(container).getPropertyValue("--slide-img-index"));

    sliderHandleSet(slideshow.querySelector(".slider"), index);

    // TODO: this works for now but you could always create a new state that's true while resizing, and false once resizing is done and use that to trigger the set position after a resize rather than just a timeout
    setTimeout(() => {
      slideshowSetPosition(container, index);
    }, 2000);
  }

  if (slideshow == null && container == null && index == null) {
    var elems = document.querySelectorAll(".slideshow");
    elems.forEach((elem) => {
      var slideshow = elem;
      var container = elem.querySelector(".slideshow--container");
      var index = parseInt(getComputedStyle(container).getPropertyValue("--slide-img-index"));
      actions(slideshow, container, index);
    });
  } else {
    actions(slideshow, container, index);
  }
}




function slideshowMouseDown(e){



}













export { slideShowButtonHandler, slideshowInit, slideshowSetPosition, slideshowUpdateCardStyle, slideshowCheckInit, slideshowButtonsDisable, slideshowMouseDown };
