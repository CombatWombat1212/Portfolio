import { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import { useRef, useState } from "react";

function useSlide(img) {
  const slideshow = useRef(null);
  const container = useRef(null);
  const slider = useRef(null);
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);
  const bar = useRef(null);
  const handle = useRef(null);
  const [cardImage, setCardImage] = useState(img);
  const [descriptionOn, setDescriptionOn] = useState(false);
  const [hitStartPoint, setHitStartPoint] = useState(false);
  const [notchesHoverable, setNotchesHoverable] = useState(true);
  const group = MAKERIGHT_IMG_GROUPS[img.group];

  const slide = {
    refs: {
      slideshow: slideshow,
      container: container,
      slider: slider,
      prevBtn: prevBtn,
      nextBtn: nextBtn,
      bar: bar,
      handle: handle,
      notches: [],
    },
    states: {
      img: cardImage,
      setImg: setCardImage,
      desc: descriptionOn,
      setDesc: setDescriptionOn,
      atStart: hitStartPoint,
      setAtStart: setHitStartPoint,
      notchesHoverable: notchesHoverable,
      setNotchesHoverable: setNotchesHoverable,
    },
    group: group,
    width: group.width.min,
    height: group.height.min,
    slider: {
      grabbed: 0,
      index: cardImage.index,
      min: 0,
      max: group.imgs.length - 1,
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

  return slide;
}


export default useSlide;