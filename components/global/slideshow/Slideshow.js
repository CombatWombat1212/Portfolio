import { Toggle } from "@/components/elements/Toggle";
import Heading from "@/components/sections/Heading";
import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import toggle from "@/scripts/AnimationTools";
import { addAttrNonDestructive, clamp, getSiblingStyle, map, RESIZE_TIMEOUT, splitPx, splitS } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import Graphic from "../../sections/Graphic";



// TODO: touch support, and keyboard support, but its good for now.  Priority for touch support is on the sliders. SWIPE SUPPORT IS NOT A PRIORITY


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

function slideshowSetPosition(container, index) {
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

  index += move;

  if (move == 0) return;
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

function slideshowInit(group, slideshow, container, index) {
  slideshow = slideshow.current;
  container = container.current;

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

function cardOnClickHandler(e, group, index, cardImage, setCardImage) {
  if (cardImage.index == index) return;

  var slideshow = e.target.closest(".slideshow");
  var slider = slideshow.querySelector(".slider");

  setCardImage(group.imgs[index]);
  sliderHandleSet(slider, index);
}

function Card({ img, index, width, height, descriptionOn, onClick }) {
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
    <div className={`${cardClasses}`} ref={card} onClick={onClick}>
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
    slideshowInit(group, slideshow, container);
    slideshowSetPosition(container, img.index);
    slideshowUpdateCardStyle(slideshow, img);
    slideshowCheckInit(container, setHitStartPoint);

    sliderInit(slideshow, group, setCardImage);
    // slideshow.current.querySelector(".slideshow--empty").style.setProperty("margin-left", `-${getElemWidth(container.current.children[1])* img.index}px`);
  });

  var containerStyle = {
    "--slide-img-index": `${img.index}`,
  };

  useEffect(() => {
    if (!hitStartPoint) return;
    slideshowUpdateCardStyle(slideshow, cardImage);
    slideshowSetPosition(container, cardImage.index);
    slideshowButtonsDisable(slideshow, cardImage, group);
  }, [cardImage]);

  return (
    <div className="slideshow" style={cardGraphicStyle} ref={slideshow}>
      <div className="slideshow--header container">
        <div className="slideshow--title">{children}</div>
        <div className="slideshow--toggle">
          <Toggle name="Descriptions" state={descriptionOn} set={setDescriptionOn}></Toggle>
        </div>
      </div>

      <div
        className={`slideshow--container ${hitStartPoint ? "slideshow--container__visible" : "slideshow--container__hide"}`}
        style={{
          "--slide-img-index": `${cardImage.index}`,
        }}
        ref={container}>
        <div className="slideshow--empty"></div>
        {group.imgs.map((groupImg) => {
          return (
            <div className="slideshow--card" key={`card ${groupImg.index}`}>
              <Card img={groupImg} index={groupImg.index} width={width} height={height} descriptionOn={descriptionOn} onClick={groupImg.index === cardImage.index ? null : (e) => cardOnClickHandler(e, group, groupImg.index, cardImage, setCardImage)} />
            </div>
          );
        })}
        <div className="slideshow--empty"></div>
      </div>

      <div className="slideshow--footer">
        <div className="slider--wrapper container">
          <Button
            className="slider--button slider--button__enabled"
            icon={["chevron_left", "alone", "mask"]}
            animation="scale-in"
            color="transparent-background"
            onClick={(e) => {
              slideShowButtonHandler(e, cardImage, setCardImage, group, "left");
            }}
          />

          <div
            className="slider"
            data-min="0"
            data-max={group.imgs.length - 1}
            data-value={cardImage.index}
            style={{
              "--slider-min": `0`,
              "--slider-max": `${group.imgs.length - 1}`,
              "--slider-section-start": `${group.sections.filter((section) => section.name == cardImage.section)[0].start}`,
              "--slider-section-end": `${group.sections.filter((section) => section.name == cardImage.section)[0].end}`,
            }}>
            <div className="slider--bar">
              <div className="slider--handle" onMouseDown={sliderHandleMouseDown} onMouseMove={sliderMouseMoveStart}></div>

              {group.imgs.map((groupImg, i) => {
                const section = group.sections.find((section) => section.name === cardImage.section);
                const isSectionActive = section && i >= section.start && i <= section.end;
                const notchClass = `slider--notch slider--notch__hoverable${section ? (isSectionActive ? " slider--notch__active" : " slider--notch__inactive") : ""}`;
                return <div className={notchClass} style={{ "--slider-notch-index": `${i}` }} key={`marker ${groupImg.index}`} onClick={(e) => sliderNotchOnClickHandler(e, i, group, setCardImage)}></div>;
              })}
            </div>

            <div className="slider--bar slider--bar__empty"></div>
            <div className="slider--bar slider--bar__filled"></div>
          </div>

          <Button
            className="slider--button slider--button__enabled"
            icon={["chevron_right", "alone", "mask"]}
            animation="scale-in"
            color="transparent-background"
            onClick={(e) => {
              slideShowButtonHandler(e, cardImage, setCardImage, group, "right");
            }}
          />
        </div>
        <p className="slideshow--message container">Slide to explore the final user journey.</p>
      </div>
    </div>
  );
}

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

  var mouse = { x: 0, y: 0 };
  mouse.x = e.clientX;

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
  mouse.x = e.clientX;

  if (sliderMouseGrabbed == 1) {
    sliderMouseGrabbed++;
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

  document.body.classList.add("grabbed");

  document.addEventListener("mousemove", (e) => {
    sliderHandleMouseMove(e, handle);
  });
  document.addEventListener("mouseup", (e) => {
    sliderHandleMouseUp(e, handle);
  });
}

function sliderHandleMouseUp(e, handle) {
  sliderMouseGrabbed = 0;

  handle.classList.remove("slider--handle__active");
  document.body.classList.remove("grabbed");

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
  // sliderNotchesSetPos(slider);
}

export default Slideshow;
