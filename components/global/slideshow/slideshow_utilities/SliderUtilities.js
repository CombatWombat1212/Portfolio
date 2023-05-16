import { getElemWidth } from "@/scripts/GlobalUtilities";

function sliderHandleSet(slide) {
  const index = slide.states.img.index;
  const bar = slide.refs.bar.current;
  const handle = slide.refs.handle.current;
  const min = slide.slider.min;
  const max = slide.slider.max;

  var barWidth = getElemWidth(bar);
  var notch = barWidth / (max - min);

  var handlePos = index * notch;

  if (handlePos < 0) handlePos = 0;
  if (handlePos > barWidth) handlePos = barWidth;

  handle.style.setProperty("--slider-handle-left", `${handlePos}px`);
}


export { sliderHandleSet}