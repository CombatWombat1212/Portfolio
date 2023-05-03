import { splitS } from "@/scripts/GlobalUtilities";

function VideoGraphic(elem, group = null) {
  this.elem = elem.closest(".graphic--video");
  this.video = this.getVideo();
  this.transition = this.getTransitionDuration();
  this.autoplay = this.getAutoplayValue();
  this.sync = this.getSyncValue();
  this.playObserver = null;
  this.hovered = false;
  this.is = {
    staggered: this.checkIfStaggered(),
    sync: Boolean(this.sync),
    inView: false,
    loop: this.checkIfLoop(),
    hoverAutoPlay: this.checkIfHoverAutoplay(),
    scrollAutoPlay: this.checkIfScrollAutoplay(),
    clicked: false,
  };
  this.get = {
    loopingGroup: graphicGetLoopingGroup.bind(this),
    hoverAutoPlay: graphicGetHoverAutoPlay.bind(this),
    loop: this.checkIfLoop.bind(this),
    // hovered: graphicGetHovered.bind(this),
  };
  this.set = {
    hoverAutoPlay: graphicSetHoverAutoPlay.bind(this),
    dataPlaying: graphicSetDataPlaying.bind(this),
  };
  this.group = this.getGroup(group);
  this.index = this.getIndex();

  this.set.hoverAutoPlay();
}

VideoGraphic.prototype.getVideo = function () {
  const video = this.elem.querySelector("video");
  return video;
};

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
    return group || Array.from(document.querySelectorAll(`[data-sync="${this.sync}"]`)) || false;
  } else {
    return group || [this.elem] || false;
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
  return isHoverAutoPlay;
};


VideoGraphic.prototype.checkIfScrollAutoplay = function () {
  return typeof this.autoplay === "string" && this.autoplay.includes("scroll");
};



function graphicGetHoverAutoPlay() {
  this.is.hoverAutoPlay = this.elem.getAttribute("data-autoplay-hover") == "true";
}

function graphicSetHoverAutoPlay() {
    if (this.is.hoverAutoPlay) {
      this.elem.setAttribute("data-autoplay-hover", "true");
    } else {
      this.elem.setAttribute("data-autoplay-hover", "false");
    }
}

function graphicGetLoopingGroup() {
    // const isLoopingGroup = this.group.filter((g) => g.is.loop).length == this.group.length;
    const isLoopingGroup = this.group.filter((g) => g.get.loop() ).length == this.group.length;

    if (isLoopingGroup) {
      this.is.loopingGroup = true;
      this.group.forEach((g) => {
        g.is.loopingGroup = true;
        g.getVideo().removeAttribute("loop");
      });
    } else {
      this.is.loopingGroup = false;
      this.group.forEach((g) => {
        g.is.loopingGroup = false;
        var loop = g.getVideo().getAttribute("data-loop") == "true";
        if (loop) g.getVideo().setAttribute("loop", "true");
        if (!loop) g.getVideo().removeAttribute("loop");
      });
    }

}



// function graphicGetHovered() {
//   return this.elem.matches(':hover, :focus');
// }



function graphicSetDataPlaying(bool) {
  this.elem.setAttribute("data-playing", bool);
}


export default VideoGraphic;
