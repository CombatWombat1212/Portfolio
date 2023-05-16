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
  slideshowUpdateCardStyle,
} from "./slideshow_utilities/SlideshowUtilities";
import swipeEventsInit from "@/scripts/SwipeEvents";
import useListener from "@/scripts/hooks/useListener";
import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";

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
  const [cardImage, setCardImage] = useState(img);
  const [descriptionOn, setDescriptionOn] = useState(false);
  const [hitStartPoint, setHitStartPoint] = useState(false);
  const group = MAKERIGHT_IMG_GROUPS[img.group];

  const slide = {
    refs: {
      slideshow: slideshow,
      container: container,
      slider: slider,
    },
    states: {
      img: cardImage,
      setImg: setCardImage,
      desc: descriptionOn,
      setDesc: setDescriptionOn,
    },
    group: group,
    width: group.width.min,
    height: group.height.min,
  };

  var cardGraphicStyle = {
    "--img-aspect-width": `${slide.width}`,
    "--img-aspect-height": `${slide.height}`,
    "--img-width": `${slide.width}px`,
    "--img-height": `${slide.height}px`,
  };

  useMountEffect(() => {
    slideshowInit(slide);
    slideshowSetPosition(container, img.index);
    slideshowUpdateCardStyle(slideshow, img);
    slideshowCheckInit(container, setHitStartPoint);

    sliderInit(slideshow, group, setCardImage);

    if (!slideshows.includes(slideshow.current)) slideshows.push(slideshow.current);
    for (var i = 0; i < slideshows.length; i++) {
      cardImages[i] = cardImage;
    }
  });

  useEffect(() => {
    if (!hitStartPoint) return;
    slideshowUpdateCardStyle(slideshow, cardImage);
    slideshowSetPosition(container, cardImage.index);
    slideshowButtonsDisable(slideshow, cardImage, group);

    for (var i = 0; i < slideshows.length; i++) {
      cardImages[i] = cardImage;
    }
  }, [cardImage]);

  useHorizontalResize(slideshowResize);

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
        onTouchStart={slideshowMouseDown}
        style={{
          "--slide-img-index": `${cardImage.index}`,
        }}
        ref={container}>
        <div className="slideshow--empty"></div>
        {group.imgs.map((groupImg) => {
          return (
            <div className="slideshow--card" key={`card ${groupImg.index}`}>
              <Card
                img={groupImg}
                index={groupImg.index}
                width={slide.width}
                height={slide.height}
                descriptionOn={descriptionOn}
                onClick={groupImg.index === cardImage.index ? null : (e) => cardOnClickHandler(e, group, groupImg.index, cardImage, setCardImage)}
              />
            </div>
          );
        })}
        <div className="slideshow--empty"></div>
      </div>

      <div className="slideshow--footer">
        <div className="slider--wrapper container" ref={slider}>
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
              <div
                className="slider--handle"
                onMouseDown={sliderHandleMouseDown}
                onTouchStart={sliderHandleMouseDown}
                onMouseMove={sliderMouseMoveStart}
                onTouchMove={sliderMouseMoveStart}></div>

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
                    key={`marker ${groupImg.index}`}
                    onClick={(e) => sliderNotchOnClickHandler(e, i, group, setCardImage)}></div>
                );
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

  function slideshowResize() {
    const container = slide.refs.container.current;
    const slider = slide.refs.slider.current;
    const index = slide.states.img.index;

    sliderHandleSet(slider, index);

    // TODO: this works for now but you could always create a new state that's true while resizing, and false once resizing is done and use that to trigger the set position after a resize rather than just a timeout
    setTimeout(() => {
      slideshowSetPosition(container, index);
    }, 2000);
  }
}

export default Slideshow;

export { slideshowGetCardImage };
