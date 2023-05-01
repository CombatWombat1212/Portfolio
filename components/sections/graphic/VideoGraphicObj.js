import { splitS } from "@/scripts/GlobalUtilities";

function VideoGraphic(elem, group=null) {
  this.elem = elem.closest(".graphic--video");
  this.video = this.elem.querySelector("video");
  this.transition = this.getTransitionDuration();
  this.autoplay = this.getAutoplayValue();
  this.sync = this.getSyncValue();
  this.playObserver = null;
  this.is = {
    staggered: this.checkIfStaggered(),
    sync: Boolean(this.sync),
    inView: false,
    loop: this.checkIfLoop(),
    hoverAutoPlay: this.checkIfHoverAutoplay(),
    scrollAutoPlay: this.checkIfScrollAutoplay(),
  };
  this.group = this.getGroup(group);
  this.index = this.getIndex();
}

VideoGraphic.prototype.getTransitionDuration = function () {
  const transitionDuration = getComputedStyle(this.elem).transitionDuration;
  if (transitionDuration && transitionDuration !== "0s") {
    return splitS(transitionDuration);
  } else {
    return splitS(getComputedStyle(document.documentElement).getPropertyValue("--transition").trim());
  }
};

VideoGraphic.prototype.getAutoplayValue = function () {
  const ap = this.video.getAttribute("data-autoplay") || false;
  return ap;
};

VideoGraphic.prototype.getSyncValue = function () {
  return this.elem.getAttribute("data-sync") || false;
};

VideoGraphic.prototype.getGroup = function (group) {
  if (typeof this.sync === "string") {
    return group || Array.from(document.querySelectorAll(`[data-sync="${this.sync}"]`));
  } else {
    return group || [this.elem];
  }
};

VideoGraphic.prototype.getIndex = function () {
  return this.group.indexOf(this.elem);
};

VideoGraphic.prototype.checkIfStaggered = function () {
  return typeof this.autoplay === "string" && this.autoplay.includes("staggered");
};

VideoGraphic.prototype.checkIfLoop = function () {
  const loop = this.video.hasAttribute("data-loop") && this.video.getAttribute("data-loop") !== "false";
  return loop;
};

VideoGraphic.prototype.checkIfHoverAutoplay = function () {
  const isHoverAutoPlay = typeof this.autoplay === "string" && this.autoplay.includes("hover");
  // i try not to do this but this time it was necessary because otherwise i'd have to invoke desktop within the `Graphic` component which is exactly what i refactored it to avoid
  if (isHoverAutoPlay) this.elem.setAttribute("data-autoplay-hover", "true");
  else this.elem.setAttribute("data-autoplay-hover", "false");
  return isHoverAutoPlay;
};


VideoGraphic.prototype.checkIfScrollAutoplay = function () {
  return typeof this.autoplay === "string" && this.autoplay.includes("scroll");
};

export default VideoGraphic;
