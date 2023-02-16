import { Toggle } from "@/components/elements/Toggle";
import Heading from "@/components/sections/Heading";
import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import toggle from "@/scripts/AnimationTools";
import { addAttrNonDestructive, getSiblingStyle, RESIZE_TIMEOUT, splitPx, splitS } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import Graphic from "../../sections/Graphic";
import { buttonHandler } from "./slideshow_utilities.js/SlideshowInteractions";
import { slideshowSetDescHeight } from "./slideshow_utilities.js/SlideshowStyle";

function getAdjacentImage(group, index, val) {
  var result = false;
  var adjacentIndex = index + val;

  if (adjacentIndex >= 0 && adjacentIndex < group.imgs.length) {
    result = {};
    result.index = adjacentIndex;
    result.img = group.imgs[result.index];
  }

  return result;
}

function getCombinedStyle(elem, arr) {
  var result = 0;

  arr.forEach((prop) => {
    result += splitPx(getComputedStyle(elem).getPropertyValue(prop));
  });

  return result;
}

function Info({ name, hasMultiple, items }) {
  return (
    <>
      <>
        <Heading type="h5" className="card--subheading">
          {hasMultiple ? `${name}s:` : `${name}:`}
        </Heading>
        {hasMultiple ? (
          <ul className="list">
            {items.map((item, index) => (
              <li className="list--item" key={index}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="list">{items[0]}</p>
        )}
      </>
    </>
  );
}

function infoDoesExist(arr) {
  return arr != null && arr != undefined && arr != [] && arr != "" && arr.length > 0;
}

function infoFormatList(val) {
  if (typeof val == "array") {
    val = val.map((str) => {
      str.trim();
      str = str.charAt(0).toUpperCase() + str.slice(1);
      str = str[str.length - 1] === "." ? str.slice(0, -1) : str;
      return str;
    });
  } else if (typeof val == "string") {
    val.trim();
    val = val.charAt(0).toUpperCase() + val.slice(1);
    val = val[val.length - 1] === "." ? val.slice(0, -1) : val;
  }
  return val;
}

function getElemWidth(elem) {
  return splitPx(getComputedStyle(elem).getPropertyValue("width")) + splitPx(getComputedStyle(elem).getPropertyValue("margin-left")) + splitPx(getComputedStyle(elem).getPropertyValue("margin-right"));
}




// function containerSetPosition(container, index, duration) {
//   if (container == null) return;
//   container = container.current ? container.current : container;
//   duration = splitS(getComputedStyle(container).getPropertyValue("transition-duration"));

//   var card = { width: 0, height: 0 };

//   card.width = getElemWidth(container.children[1]);

//   var scrollTarget = card.width * index;
//   var empty = document.querySelector(".slideshow--empty");

//   var currentScroll = splitPx(window.getComputedStyle(empty).getPropertyValue("margin-left"));
//   console.log(currentScroll);
//   empty.style.setProperty("margin-left", `-${scrollTarget}px`);
// }




// function containerSetPosition(container, index, duration) {
//   if (container == null) return;
//   container = container.current ? container.current : container;

//   var card = { width: 0, height: 0 };
//   card.width = getElemWidth(container.children[1]);

//   var scrollTarget = card.width * index;
//   var empty = document.querySelector(".slideshow--empty");
//   var currentScroll = splitPx(window.getComputedStyle(empty).getPropertyValue("margin-left"));
//   // empty left rect
//   // var currentScroll = empty.getBoundingClientRect().left;
//   //       console.log(currentScroll);  
//   //       console.log(currentScroll, window.getComputedStyle(empty).getPropertyValue("left"));  
    
//     // calculate distance and speed
//     var distance = Math.abs(scrollTarget - currentScroll);
//     var speed = 5000; // pixels per second
//     var duration = distance / speed;
//     console.log(distance)

//   // add more influence with exponent
//   duration = duration ** 0.5;


//   // set transition duration
//   empty.style.transitionDuration = `${duration}s`;
//   empty.style.setProperty("margin-left", `-${scrollTarget}px`);
// }


// TODO: get me in global
function clamp(input, min, max) {
  return input < min ? min : input > max ? max : input;
}

function map(current, in_min, in_max, out_min, out_max) {
  const mapped = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return clamp(mapped, out_min, out_max);
}





function containerSetPosition(container, index, duration) {
  if (container == null) return;
  container = container.current ? container.current : container;

  var card = { width: 0, height: 0 };
  card.width = getElemWidth(container.children[1]);

  var scrollTarget = card.width * index;
  var empty = document.querySelector(".slideshow--empty");
  
  // get the current scroll position of empty at the beginning of the transition
  var currentScroll = -1 * splitPx(empty.style.marginLeft);

  // calculate distance and speed
  var distance = Math.abs(scrollTarget - currentScroll);
  var speed = 5000; // pixels per second
  var duration = distance / speed;

  // add more influence with exponent
  // duration = duration ** 0.5;

  duration = map(duration, 0, 5, 1.5, 5);

  // set transition duration and starting position
  empty.style.transitionDuration = `${duration}s`;
  empty.style.setProperty("margin-left", `-${scrollTarget}px`);

  // check if empty has reached the scroll target every 10 milliseconds
  var transitionInterval = setInterval(function() {
    if (-1 * splitPx(empty.style.marginLeft) == scrollTarget) {
      // stop the interval if empty has reached the scroll target
      clearInterval(transitionInterval);
    } else {
      // update currentScroll during transition
      currentScroll = -1 * splitPx(empty.style.marginLeft);
    }
  }, 10);
}




function slideshowInit(setHitStartPoint, setStoppedAfterInit, startIndex, group, slideshow, container, index) {
  slideshow = slideshow.current;
  container = container.current;

  slideshowResizeFunctions(slideshow, container, index);

  var empty = container.querySelector(".slideshow--empty");
  // var emptyTransition = splitS(getComputedStyle(empty).getPropertyValue("transition-duration"));

  function run(emptyTransition) {
    var interval = setInterval(() => {
      slideshowScrolling(setHitStartPoint, startIndex, group, container);
      slideshowScrollingDelayed(setStoppedAfterInit);
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

  // Create a MutationObserver that observes changes to the style property of container.querySelector('.slideshow--empty')
//   const observer = new MutationObserver((mutationsList, observer) => {
//     for (let mutation of mutationsList) {
//       if (mutation.attributeName === "style") {
//         const empty = container.querySelector(".slideshow--empty");
//         const marginLeft = parseInt(getComputedStyle(empty).marginLeft);
//         if (marginLeft !== 0) {
//           console.log('running')
//           var emptyTransition = splitS(getComputedStyle(empty).getPropertyValue("transition-duration"));
//           console.log(emptyTransition);
//           run(emptyTransition);
// }
//       }
//     }
//   });
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.attributeName === "style") {
        const empty = container.querySelector(".slideshow--empty");
        const rect = empty.getBoundingClientRect();
        const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
        if (isVisible) {
          console.log('running')
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

  window.removeEventListener("resize", slideshowResize, false);
  window.addEventListener("resize", slideshowResize, false);
}

function slideshowScrolling(setHitStartPoint, startIndex, group, container) {
  var slideshow = container.parentElement;
  var card = container.children[1];
  var drawnIndex = parseInt(getComputedStyle(container).getPropertyValue("--slide-img-index"));

  var buffer = 0.5;
  var cardWidth = getElemWidth(card);
  var scrollPos = splitPx(window.getComputedStyle(container.querySelector(".slideshow--empty")).getPropertyValue("margin-left"));
  var calcIndex = Math.abs(Math.floor((scrollPos + cardWidth * buffer) / cardWidth));
  if (calcIndex === startIndex) {
    setTimeout(() => {
      setHitStartPoint(true);
    }, 500);
  }
}

var slideshowIsScrolling;

function slideshowScrollingDelayed(setStoppedAfterInit) {
  window.clearTimeout(slideshowIsScrolling);
  slideshowIsScrolling = setTimeout(slideshowScrollingDelayedFunctions(setStoppedAfterInit), RESIZE_TIMEOUT);
}

function slideshowScrollingDelayedFunctions(setStoppedAfterInit) {
  function actions() {
    setStoppedAfterInit(true);
  }
  actions();
}

var slideshowIsResizing;

function slideshowResize() {
  window.clearTimeout(slideshowIsResizing);
  slideshowIsResizing = setTimeout(slideshowResizeFunctions, RESIZE_TIMEOUT);
}

function slideshowResizeFunctions(slideshow = null, container = null, index = null) {
  function actions(slideshow, container, index) {
    slideshowSetDescHeight(slideshow);
    containerSetPosition(container, index);
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

function Card({ img, index, width, height, descriptionOn }) {
  var hasActions = infoDoesExist(img.actions);
  var hasNotes = infoDoesExist(img.notes);
  var hasMultipleActions = hasActions && img.actions.length > 1;
  var hasMultipleNotes = hasNotes && img.notes.length > 1;

  var formattedActions = img.actions;
  var formattedNotes = img.notes;
  if (hasActions) formattedActions = infoFormatList(img.actions);
  if (hasNotes) formattedNotes = infoFormatList(img.notes);

  var affectedClasses = ["card--description-inner", "card--description", "card--graphic"];

  var card = useRef(null);

  useEffect(() => {
    if (card.current == null) return;
    for (var i = 0; i < affectedClasses.length; i++) {
      var target = card.current.querySelector(`.${affectedClasses[i]}`);
      if (target == null) continue;

      toggle(target, affectedClasses[i], "transition", "", "");
    }
  }, [descriptionOn]);

  var cardClasses = ["card"];
  cardClasses = cardClasses.join(" ");

  return (
    <div className={`${cardClasses}`} ref={card}>
      <div className="card--graphic card--graphic__off" width={width} height={height}>
        <Graphic className="card--img" type="image" img={img} />
      </div>
      <div className={`card--description card--description__off section--description`}>
        <div className={`card--description-inner card--description-inner__off`}>
          <Heading type="h3" className="card--title">
            {img.title}
          </Heading>
          <Heading type="p" className="card--subtitle">
            {img.section} - {img.phase}
          </Heading>

          <div className="">
            <Heading type="h5" className="card--subheading">
              Description:
            </Heading>
            {img.description.map((desc, index) => (
              <p className="card--paragraph" key={index}>
                {desc}
              </p>
            ))}
          </div>

          {hasActions && <Info name="User Action" hasMultiple={hasMultipleActions} items={formattedActions} />}
          {hasNotes && <Info name="Note" hasMultiple={hasMultipleNotes} items={formattedNotes} />}
        </div>
      </div>
    </div>
  );
}

function Slideshow({ children, img }) {
  // TODO: keep images stored after being loaded, so load them in outside the DOM and place them in after load in the same way as in the lightbox component

  var slideshow = useRef(null);
  var container = useRef(null);

  const [cardImage, setCardImage] = useState(img);
  const [descriptionOn, setDescriptionOn] = useState(false);
  const [hitStartPoint, setHitStartPoint] = useState(false);
  const [stoppedAfterInit, setStoppedAfterInit] = useState(false);

  var group = MAKERIGHT_IMG_GROUPS[img.group];
  var startIndex = img.index;
  var index = img.index;

  var width = group.width.min;
  var height = group.height.min;

  var cardGraphicStyle = {
    "--img-aspect-width": `${width}`,
    "--img-aspect-height": `${height}`,
    "--img-width": `${width}px`,
    "--img-height": `${height}px`,
  };

  useMountEffect(() => {
    slideshowInit(setHitStartPoint, setStoppedAfterInit, startIndex, group, slideshow, container);
    containerSetPosition(container, img.index);
  });

  var containerStyle = {
    "--slide-img-index": `${img.index}`,
  };

  useEffect(() => {
    if (!hitStartPoint) return;

    containerSetPosition(container, cardImage.index);
  }, [cardImage]);



  useEffect(() => {
console.log(hitStartPoint, stoppedAfterInit)
  }, [hitStartPoint, stoppedAfterInit]);



  return (
    <div className="slideshow" style={cardGraphicStyle} ref={slideshow}>
      <div className="slideshow--header container">
        <div className="slideshow--title">{children}</div>
        <div className="slideshow--toggle">
          <Toggle name="Descriptions" state={descriptionOn} set={setDescriptionOn}></Toggle>
        </div>
      </div>

      <div
        className={`slideshow--container ${hitStartPoint && stoppedAfterInit ? "slideshow--container__visible" : "slideshow--container__hide"}`}
        style={{
          "--slide-img-index": `${cardImage.index}`,
        }}
        ref={container}>
        <div className="slideshow--empty"></div>
        {group.imgs.map((groupImg) => {
          return (
            <div className="slideshow--card" key={`card ${groupImg.index}`}>
              <Card img={groupImg} index={groupImg.index} width={width} height={height} descriptionOn={descriptionOn} />
            </div>
          );
        })}
        <div className="slideshow--empty"></div>
      </div>

      <div className="slideshow--slider"></div>

      <div className="flex-row gap-4 mt-3">
        <div>
          <input
            type="range"
            min="0"
            max={group.imgs.length - 1}
            value={cardImage.index}
            className="slider"
            onChange={(e) => {
              sliderHandler(e, group, setCardImage);
            }}></input>
        </div>

        {/* <Button
          onClick={(e) => {
            buttonHandler(e, group, cardImage, setCardImage);
          }}
          color="background-secondary">
          Left
        </Button>
        <Button
          onClick={(e) => {
            buttonHandler(e, group, cardImage, setCardImage);
          }}
          color="background-secondary">
          Right
        </Button> */}
      </div>
    </div>
  );
}

function sliderHandler(e, group, setCardImage) {
  var index = parseInt(e.target.value);
  var img = group.imgs[index];
  setCardImage(img);
}

export default Slideshow;

export { containerSetPosition };
