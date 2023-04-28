import { splitS } from "@/scripts/GlobalUtilities";

function VideoGraphic(elem, desktop) {
  this.elem = elem.closest(".graphic--video");
  this.video = this.elem.querySelector("video");
  this.desktop = desktop;
  this.transition = this.getTransitionDuration();
  this.autoplay = this.getAutoplayValue();
  this.sync = this.getSyncValue();
  this.group = this.getGroup();
  this.index = this.getIndex();
  this.playObserver = null;
  this.is = {
    staggered: this.checkIfStaggered(),
    sync: Boolean(this.sync),
    inView: false,
    loop: this.checkIfLoop(),
    hoverAutoPlay: this.checkIfHoverAutoplay(),
  };
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
  const ap = this.elem.getAttribute("data-autoplay") || false;
  if (!this.desktop && ap.includes("hover")) return "scroll";
  return ap;
};

VideoGraphic.prototype.getSyncValue = function () {
  return this.elem.getAttribute("data-sync") || false;
};

VideoGraphic.prototype.getGroup = function () {
  if (typeof this.sync === "string") {
    return Array.from(document.querySelectorAll(`[data-sync="${this.sync}"]`));
  } else {
    return [this.elem];
  }
};

VideoGraphic.prototype.getIndex = function () {
  return this.group.indexOf(this.elem);
};

VideoGraphic.prototype.checkIfStaggered = function () {
  return typeof this.autoplay === "string" && this.autoplay.includes("staggered");
};

VideoGraphic.prototype.checkIfLoop = function () {
  if (!this.desktop) return true;
  return this.video.hasAttribute("data-loop") && this.video.getAttribute("data-loop") !== "false";
};

VideoGraphic.prototype.checkIfHoverAutoplay = function () {
  return typeof this.autoplay === "string" && this.autoplay.includes("hover");
};

export default VideoGraphic;
