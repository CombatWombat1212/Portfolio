import { Toggle } from "@/components/elements/Toggle";
import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import Card from "./slider_subcomponents/Card";
import { slideshowCheckInit, slideshowSetPosition } from "./slideshow_utilities/SlideshowUtilities";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import ResponsiveText from "../ResponsiveText";
import useSlide from "./slideshow_utilities/useSlide";
import Notch from "./slider_subcomponents/Notch";
import { slideshowCreateHandlers } from "./slideshow_utilities/SlideshowHandlers";
import { sliderHandleSet } from "./slideshow_utilities/SliderUtilities";
import useOnce from "@/scripts/hooks/useOnce";
import swipeEventsInit from "@/scripts/SwipeEvents";
import useListener from "@/scripts/hooks/useListener";
import useScrollbarSize from "@/scripts/hooks/useScrollbarSize";
import useInView from "@/scripts/hooks/useInView";

function Slideshow({ children, img }) {
  // TODO: should they be container__wide?

  const slide = useSlide(img);
  const handlers = slideshowCreateHandlers(slide);
  const scrollbar = useScrollbarSize();

  const styles = {
    slideshow: {
      "--img-aspect-width": `${slide.width}`,
      "--img-aspect-height": `${slide.height}`,
      "--img-width": `${slide.width}px`,
      "--img-height": `${slide.height}px`,
      "--page-scrollbar-width": `${scrollbar}px`,
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
    slideshowCheckInit(slide);
    sliderHandleSet(slide);
  });

  useEffect(() => {
    if (!slide.states.atStart) return;
    slideshowSetPosition(slide);
  }, [slide.states.atStart, slide.states.img]);

  useEffect(() => {
    sliderHandleSet(slide);
  }, [slide.states.img]);

  useHorizontalResize(handlers.resize);
  useOnce(() => {
    swipeEventsInit;
  });
  useListener("swiped-left", handlers.containerSwipe, { ref: slide.refs.container });
  useListener("swiped-right", handlers.containerSwipe, { ref: slide.refs.container });

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
        ref={slide.refs.container}>
        <div className="slideshow--empty" ref={slide.refs.empty}></div>
        {slide.group.imgs.map((groupImg) => {
          return (
            <div
              className={`slideshow--card ${groupImg.index == slide.states.img.index ? "slideshow--card__active" : "slideshow--card__inactive"}`}
              key={`card ${groupImg.index}`}>
              <Card
                img={groupImg}
                index={groupImg.index}
                data-index={groupImg.index}
                width={slide.width}
                height={slide.height}
                slide={slide}
                onClick={handlers.cardOnClick}
              />
            </div>
          );
        })}
      </div>
      



      <div className="slideshow--footer">
        <div className="slider--wrapper container"onMouseMove={handlers.sliderMouseMoveStart}
                onTouchMove={handlers.sliderMouseMoveStart}>
          <Button
            className={`slider--button
            slider--button__left ${slide.states.img.index <= 0 ? "slider--button__disabled" : "slider--button__enabled"}`}
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
                ref={slide.refs.handle}
                ></div>

              {slide.group.imgs.map((groupImg, i) => (
                <Notch key={i} index={i} slide={slide} handlers={handlers} />
              ))}
            </div>

            <div className="slider--bar slider--bar__empty"></div>
            <div className="slider--bar slider--bar__filled"></div>
          </div>

          <Button
            className={`slider--button
            slider--button__right ${slide.states.img.index >= slide.group.imgs.length - 1 ? "slider--button__disabled" : "slider--button__enabled"}`}
            reference={slide.refs.nextBtn}
            icon={["chevron_right", "alone", "mask"]}
            animation="scale-in"
            color="transparent-background"
            data-direction="right"
            onClick={handlers.buttonOnClick}
          />
        </div>
        <p className="slideshow--message container">
          <ResponsiveText tag="Fragment">
            <xxl>Slide to explore the final user journey.</xxl>
            <md>Slide or swipe to explore the user journey.</md>
          </ResponsiveText>
        </p>
      </div>
    </div>
  );
}
Slideshow.displayName = "Slideshow";
export default Slideshow;
