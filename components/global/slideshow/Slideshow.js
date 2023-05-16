import { Toggle } from "@/components/elements/Toggle";
import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import Card from "./slider_subcomponents/Card";
import { cardOnClickHandler } from "./slideshow_utilities/CardUtilities";
import {
  slideshowButtonsDisable,
  slideshowCheckInit,
  slideshowSetPosition,
  slideshowUpdateCardStyle,
} from "./slideshow_utilities/SlideshowUtilities";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import ResponsiveText from "../ResponsiveText";
import useSlide from "./slideshow_utilities/useSlide";
import Notch from "./slider_subcomponents/Notch";
import { slideshowCreateHandlers } from "./slideshow_utilities/SlideshowHandlers";
import { sliderHandleSet } from "./slideshow_utilities/SliderUtilities";

function Slideshow({ children, img }) {
  // TODO: should they be container__wide?

  const slide = useSlide(img);
  const handlers = slideshowCreateHandlers(slide);

  const styles = {
    slideshow: {
      "--img-aspect-width": `${slide.width}`,
      "--img-aspect-height": `${slide.height}`,
      "--img-width": `${slide.width}px`,
      "--img-height": `${slide.height}px`,
    },
    constainer: {
      "--slide-img-index": `${slide.states.img.index}`,
    },
    slider: {
      "--slider-min": slide.slider.min,
      "--slider-max": slide.slider.max,
      "--slider-section-start": `${slide.group.sections.filter((section) => section.name == slide.states.img.section)[0].start}`,
      "--slider-section-end": `${slide.group.sections.filter((section) => section.name == slide.states.img.section)[0].end}`,
    },
  };

  useMountEffect(() => {
    slideshowSetPosition(slide);
    slideshowUpdateCardStyle(slide);
    slideshowCheckInit(slide);
    sliderHandleSet(slide);
  });

  useEffect(() => {
    if (!slide.states.atStart) return;
    slideshowUpdateCardStyle(slide);
    slideshowSetPosition(slide);
    slideshowButtonsDisable(slide);
  }, [slide.states.atStart, slide.states.img]);

  useEffect(() => {
    sliderHandleSet(slide);
  }, [slide.states.img]);

  useHorizontalResize(handlers.resize);

  return (
    <div className="slideshow" style={styles.slideshow} ref={slide.refs.slideshow}>
      <div className="slideshow--header container">
        <div className="slideshow--title">{children}</div>
        <div className="slideshow--toggle">
          <Toggle state={slide.states.desc} set={slide.states.setDesc}>
            <ResponsiveText tag="Fragment">
              <xxl>Descriptions</xxl>
              <md>Info</md>
            </ResponsiveText>
          </Toggle>
        </div>
      </div>

      <div
        className={`slideshow--container ${slide.states.atStart ? "slideshow--container__visible" : "slideshow--container__hide"}`}
        style={styles.container}
        ref={slide.refs.container}>
        <div className="slideshow--empty" ref={slide.refs.empty}></div>
        {slide.group.imgs.map((groupImg) => {
          return (
            <div className="slideshow--card" key={`card ${groupImg.index}`}>
              <Card
                img={groupImg}
                index={groupImg.index}
                data-index={groupImg.index}
                width={slide.width}
                height={slide.height}
                descriptionOn={slide.states.desc}
                onClick={handlers.cardOnClick}
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
            reference={slide.refs.prevBtn}
            icon={["chevron_left", "alone", "mask"]}
            animation="scale-in"
            color="transparent-background"
            data-direction="left"
            onClick={handlers.buttonOnClick}
          />

          <div ref={slide.refs.slider} className="slider" style={styles.slider}>
            <div className="slider--bar" ref={slide.refs.bar}>
              <div
                className="slider--handle"
                onMouseDown={handlers.sliderMouseDown}
                onTouchStart={handlers.sliderMouseDown}
                onMouseMove={handlers.sliderMouseMoveStart}
                onTouchMove={handlers.sliderMouseMoveStart}
                ref={slide.refs.handle}></div>

              {slide.group.imgs.map((groupImg, i) => (
                <Notch key={i} index={i} slide={slide} handlers={handlers} />
              ))}
            </div>

            <div className="slider--bar slider--bar__empty"></div>
            <div className="slider--bar slider--bar__filled"></div>
          </div>

          <Button
            className="slider--button slider--button__enabled
            slider--button__right"
            reference={slide.refs.nextBtn}
            icon={["chevron_right", "alone", "mask"]}
            animation="scale-in"
            color="transparent-background"
            data-direction="right"
            onClick={handlers.buttonOnClick}
          />
        </div>
        <p className="slideshow--message container">Slide to explore the final user journey.</p>
      </div>
    </div>
  );
}

export default Slideshow;
