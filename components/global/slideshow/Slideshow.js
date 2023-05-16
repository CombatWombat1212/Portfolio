import { Toggle } from "@/components/elements/Toggle";
import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import Card from "./slider_subcomponents/Card";
import { cardOnClickHandler } from "./slideshow_utilities/CardUtilities";
import {
  sliderInit,
  sliderHandleMouseDown,
  sliderMouseMoveStart,
  sliderNotchOnClickHandler,
  sliderHandleSet,
} from "./slideshow_utilities/SliderUtilities";
import {
  slideShowButtonHandler,
  slideshowButtonsDisable,
  slideshowCheckInit,
  slideshowInit,
  slideshowMouseDown,
  slideshowResize,
  slideshowSetPosition,
  slideshowUpdateCardImageAndSlider,
  slideshowUpdateCardStyle,
} from "./slideshow_utilities/SlideshowUtilities";
import swipeEventsInit from "@/scripts/SwipeEvents";
import useListener from "@/scripts/hooks/useListener";
import { RESIZE_TIMEOUT, getElemWidth, splitPx } from "@/scripts/GlobalUtilities";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import ResponsiveText from "../ResponsiveText";

var loadOnceCount = 0;

var slideshows = [];
var cardImages = [];

function slideshowGetCardImage(slideshow) {
  for (var i = 0; i < slideshows.length; i++) {
    if (slideshows[i] == slideshow) {
      return cardImages[i];
    }
  }
}

function Slideshow({ children, img }) {
  // TODO: should they be container__wide?

  const slideshow = useRef(null);
  const container = useRef(null);
  const slider = useRef(null);
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);
  const empty = useRef(null);
  const bar = useRef(null);
  const handle = useRef(null);
  const [cardImage, setCardImage] = useState(img);
  const [descriptionOn, setDescriptionOn] = useState(false);
  const [hitStartPoint, setHitStartPoint] = useState(false);
  const group = MAKERIGHT_IMG_GROUPS[img.group];

  const slide = {
    refs: {
      slideshow: slideshow,
      container: container,
      slider: slider,
      prevBtn: prevBtn,
      nextBtn: nextBtn,
      empty: empty,
      bar: bar,
      handle: handle,
    },
    states: {
      img: cardImage,
      setImg: setCardImage,
      desc: descriptionOn,
      setDesc: setDescriptionOn,
      atStart: hitStartPoint,
      setAtStart: setHitStartPoint,
    },
    group: group,
    width: group.width.min,
    height: group.height.min,
    slider: {
      grabbed: 0,
      index: cardImage.index,
      mouse: {
        start: { x: 0, y: 0 },
        cur: { x: 0, y: 0 },
      },
      handle: {
        start: { x: 0, y: 0 },
        cur: { x: 0, y: 0 },
      },
    },
  };

  var cardGraphicStyle = {
    "--img-aspect-width": `${slide.width}`,
    "--img-aspect-height": `${slide.height}`,
    "--img-width": `${slide.width}px`,
    "--img-height": `${slide.height}px`,
  };

  useMountEffect(() => {
    slideshowInit(slide);
    slideshowSetPosition(slide);
    slideshowUpdateCardStyle(slide);
    slideshowCheckInit(slide);
    sliderHandleSet(slide);

    if (!slideshows.includes(slideshow.current)) slideshows.push(slideshow.current);
    for (var i = 0; i < slideshows.length; i++) {
      cardImages[i] = cardImage;
    }
  });

  useEffect(() => {
    if (!hitStartPoint) return;
    slideshowUpdateCardStyle(slide);
    slideshowSetPosition(slide);
    slideshowButtonsDisable(slide);

    for (var i = 0; i < slideshows.length; i++) {
      cardImages[i] = cardImage;
    }
  }, [slide.states.img]);

  useEffect(() => {
    sliderHandleSet(slide);
  }, [slide.states.img]);

  useHorizontalResize(slideshowResize);

  return (
    <div className="slideshow" style={cardGraphicStyle} ref={slideshow}>
      <div className="slideshow--header container">
        <div className="slideshow--title">{children}</div>
        <div className="slideshow--toggle">
          <Toggle state={descriptionOn} set={setDescriptionOn}>
            <ResponsiveText tag="Fragment">
              <xxl>Descriptions</xxl>
              <md>Info</md>
            </ResponsiveText>
          </Toggle>
        </div>
      </div>

      <div
        className={`slideshow--container ${hitStartPoint ? "slideshow--container__visible" : "slideshow--container__hide"}`}
        onTouchStart={slideshowMouseDown}
        style={{
          "--slide-img-index": `${slide.states.img.index}`,
        }}
        ref={container}>
        <div className="slideshow--empty" ref={empty}></div>
        {group.imgs.map((groupImg) => {
          return (
            <div className="slideshow--card" key={`card ${groupImg.index}`}>
              <Card
                img={groupImg}
                index={groupImg.index}
                data-index={groupImg.index}
                width={slide.width}
                height={slide.height}
                descriptionOn={descriptionOn}
                onClick={cardOnClickHandler}
              />
            </div>
          );
        })}
      </div>

      <div className="slideshow--footer">
        <div className="slider--wrapper container">
          <Button
            className="slider--button slider--button__enabled
            slider--button__left"
            reference={prevBtn}
            icon={["chevron_left", "alone", "mask"]}
            animation="scale-in"
            color="transparent-background"
            data-direction="left"
            onClick={slideshowButtonLeftHandler}
          />

          <div
            ref={slider}
            className="slider"
            data-min="0"
            data-max={group.imgs.length - 1}
            style={{
              "--slider-min": `0`,
              "--slider-max": `${group.imgs.length - 1}`,
              "--slider-section-start": `${group.sections.filter((section) => section.name == cardImage.section)[0].start}`,
              "--slider-section-end": `${group.sections.filter((section) => section.name == cardImage.section)[0].end}`,
            }}>
            <div className="slider--bar" ref={bar}>
              <div
                className="slider--handle"
                onMouseDown={sliderHandleMouseDown}
                onTouchStart={sliderHandleMouseDown}
                onMouseMove={sliderMouseMoveStart}
                onTouchMove={sliderMouseMoveStart}
                ref={handle}></div>

              {group.imgs.map((groupImg, i) => {
                const section = group.sections.find((section) => section.name === cardImage.section);
                const isSectionActive = section && i >= section.start && i <= section.end;
                const notchClass = `slider--notch slider--notch__hoverable${
                  section ? (isSectionActive ? " slider--notch__active" : " slider--notch__inactive") : ""
                }`;
                return (
                  <div
                    className={notchClass}
                    style={{ "--slider-notch-index": `${i}` }}
                    data-index={i}
                    key={`marker ${groupImg.index}`}
                    onClick={sliderNotchOnClickHandler}></div>
                );
              })}
            </div>

            <div className="slider--bar slider--bar__empty"></div>
            <div className="slider--bar slider--bar__filled"></div>
          </div>

          <Button
            className="slider--button slider--button__enabled
            slider--button__right"
            reference={nextBtn}
            icon={["chevron_right", "alone", "mask"]}
            animation="scale-in"
            color="transparent-background"
            data-direction="right"
            onClick={slideshowButtonRightHandler}
          />
        </div>
        <p className="slideshow--message container">Slide to explore the final user journey.</p>
      </div>
    </div>
  );

  function slideshowResize() {
    sliderHandleSet(slide);

    // TODO: this works for now but you could always create a new state that's true while resizing, and false once resizing is done and use that to trigger the set position after a resize rather than just a timeout
    setTimeout(() => {
      slideshowSetPosition(slide);
    }, 2000);
  }

  function sliderNotchOnClickHandler(e) {
    const index = parseInt(e.target.getAttribute("data-index"));
    slide.states.setImg(slide.group.imgs[index]);
    // sliderHandleSet(slide);
  }

  function cardOnClickHandler(e) {
    const index = e.target.closest(".card").getAttribute("data-index");
    if (slide.states.img.index == index) return;
    const group = slide.group;
    slide.states.setImg(group.imgs[index]);
    // sliderHandleSet(slide);
  }

  function slideshowButtonLeftHandler() {
    const move = -1;
    slideshowUpdateCardImageAndSlider(slide, move);
  }

  function slideshowButtonRightHandler() {
    const move = 1;
    slideshowUpdateCardImageAndSlider(slide, move);
  }

  function sliderHandleMouseMove(e) {
    const grabbed = slide.slider.grabbed;
    if (grabbed < 2) return;

    const bar = slide.refs.bar.current;
    const slider = slide.refs.slider.current;
    const handle = slide.refs.handle.current;
    const group = slide.group;

    var isTouchMove = e.type == "touchmove";
    var touchOrMouse = isTouchMove ? e.touches[0] : e;

    var mouse = { x: 0, y: 0 };
    mouse.x = touchOrMouse.clientX;

    slide.slider.mouse.cur.x = mouse.x;

    var handlePos = slide.slider.handle.start.x + (slide.slider.mouse.cur.x - slide.slider.mouse.start.x);

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

    slide.slider.index = value;

    handlePos = Math.round(handlePos / notch) * notch;

    handle.style.setProperty("--slider-handle-left", `${handlePos}px`);

    slide.states.setImg(group.imgs[value]);
  }

  function sliderHandleSet(slide) {
    const slider = slide.refs.slider.current;
    const index = slide.states.img.index;
    const bar = slide.refs.bar.current;
    const handle = slide.refs.handle.current;

    var barWidth = getElemWidth(bar);
    var min = parseInt(slider.getAttribute("data-min"));
    var max = parseInt(slider.getAttribute("data-max"));
    var notch = barWidth / (max - min);

    var handlePos = index * notch;

    if (handlePos < 0) handlePos = 0;
    if (handlePos > barWidth) handlePos = barWidth;

    handle.style.setProperty("--slider-handle-left", `${handlePos}px`);
  }

  function sliderMouseMoveStart(e) {
    const handle = slide.refs.handle.current;

    var mouse = { x: 0, y: 0 };

    if (e.type == "mousemove" && slide.slider.grabbed == 1) {
      slide.slider.grabbed++;
      mouse.x = e.clientX;
      slide.slider.mouse.start.x = mouse.x;
      slide.slider.handle.start.x = splitPx(window.getComputedStyle(handle).getPropertyValue("--slider-handle-left"));
    } else if (e.type == "touchmove" && slide.slider.grabbed == 1) {
      slide.slider.grabbed++;
      var touch = e.touches[0];
      mouse.x = touch.clientX;
      slide.slider.mouse.start.x = mouse.x;
      slide.slider.handle.start.x = splitPx(window.getComputedStyle(handle).getPropertyValue("--slider-handle-left"));
    }
  }

  function sliderHandleMouseDown(e) {
    slide.slider.grabbed++;
    const handle = slide.refs.handle.current;

    handle.classList.add("slider--handle__active");

    var notches = Array.from(handle.parentElement.querySelectorAll(".slider--notch"));
    notches.forEach((notch) => {
      notch.classList.remove("slider--notch__hoverable");
    });

    document.body.classList.add("cursor-grabbed");

    if (e.type == "mousedown") {
      document.addEventListener("mousemove", sliderHandleMouseMove);
      document.addEventListener("mouseup", sliderHandleMouseUp);
    } else if (e.type == "touchstart") {
      document.addEventListener("touchmove", sliderHandleMouseMove);
      document.addEventListener("touchend", sliderHandleMouseUp);
    }
  }

  function sliderHandleMouseUp(e) {
    slide.slider.grabbed = 0;
    const handle = slide.refs.handle.current;

    handle.classList.remove("slider--handle__active");
    document.body.classList.remove("cursor-grabbed");

    var notches = handle.parentElement.querySelectorAll(".slider--notch");
    notches.forEach((notch) => {
      notch.classList.add("slider--notch__hoverable");
    });

    document.removeEventListener("mousemove", sliderHandleMouseMove);
    document.removeEventListener("mouseup", sliderHandleMouseUp);
  }

  function sliderHandler(index, group, setCardImage) {
    var img = group.imgs[index];
    setCardImage(img);
  }
}

export default Slideshow;

export { slideshowGetCardImage };
