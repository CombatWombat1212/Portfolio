import { splitS } from "@/scripts/GlobalUtilities";

function VideoGraphic(elem, group = null) {
  this.elem = elem.closest(".graphic--video");
  this.video = this.getVideo();
  this.transition = this.getTransitionDuration();
  this.autoplay = this.getAutoplayValue();
  this.sync = this.getSyncValue();
  this.playObserver = null;
  this.is = {
    playing: false,
    staggered: this.checkIfStaggered(),
    sync: Boolean(this.sync),
    inView: false,
    loop: this.checkIfLoop(),
    hoverAutoPlay: this.checkIfHoverAutoplay(),
    scrollAutoPlay: this.checkIfScrollAutoplay(),
    clicked: false,
    hovered: false,
    playedOnce: false,
    autoPlaying:false,
  };
  this.get = {
    loopingGroup: graphicGetLoopingGroup.bind(this),
    hoverAutoPlay: graphicGetHoverAutoPlay.bind(this),
    loop: this.checkIfLoop.bind(this),
    playedOnce: returnGetAttr('data-played-once').bind(this),
    clicked: returnGetAttr('data-clicked-playing').bind(this),
  };
  this.set = {
    hoverAutoPlay: graphicSetHoverAutoPlay.bind(this),
    dataPlaying: returnSetElemProperties({
      is: "playing",
      attr: "data-playing",
    }).bind(this),
    playedOnce: returnSetElemProperties({
      is: "playedOnce",
      attr: "data-played-once",
    }).bind(this),
    clicked: returnSetElemProperties({
      is: "clicked",
      attr: "data-clicked-playing",
    }).bind(this),
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


VideoGraphic.prototype.shouldBePlaying = function() {

// function shouldGraphicBePlaying(graphic) {
//   // Check if the graphic is in view
//   if (!graphic.is.inView) return false;

//   // Check if the graphic is clicked
//   if (graphic.get.clicked()) return true;

//   // Check if the graphic is auto-playing
//   if (graphic.is.autoPlaying) return true;

//   // Check if all group members are played once and it is hovered
//   const allPlayedOnce = graphic.group.every((g) => g.get.playedOnce());

//   if (allPlayedOnce && graphic.is.hovered) return true;

//   return false;
// }

  // console.log(graphic.is.autoPlaying, graphic.is.inView);
  // I want to define a new variable called const shouldBePlaying, this is the logic it should follow
  // scenarios where it should be playing: 
  // it always has to be in view in every scenario
  // 1. if it is graphic.get.clicked()
  // 2. if it is graphic.is.autoPlaying
  // 3. if all of its group members are graphic.get.playedOnce(), and it is hovered


  // console.log(this.elem)
  // console.log(`Condition 1: ${!this.is.inView}, Condition 2: ${this.get.clicked()}, Condition 3: ${this.is.autoPlaying}, Condition 4: ${this.group.every((g) => g.get.playedOnce())}, Condition 5: ${this.is.hovered}`)


  // Check if the graphic is in view
  if (!this.is.inView) return false;

  // Check if the graphic is clicked
  if (this.get.clicked()) return true;

  // Check if the graphic is auto-playing
  if (this.is.autoPlaying) return true;

  // Check if all group members are played once and it is hovered
  const allPlayedOnce = this.group.every((g) => g.get.playedOnce());

  if (allPlayedOnce && this.is.hovered) return true;

  return false;
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
  const isLoopingGroup = this.group.filter((g) => g.get.loop()).length == this.group.length;

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

// function graphicSetDataPlaying(bool) {
//   this.elem.setAttribute("data-playing", bool);
// }

function setElementProperties(bool, options = {}) {
  if (options.is) {
    this.is[options.is] = bool;
  }

  if (options.attr) {
    this.elem.setAttribute(options.attr, bool);
  }

  if (options.class) {
    if (bool) {
      this.elem.classList.add(options.class);
    } else {
      this.elem.classList.remove(options.class);
    }
  }
}

function getAttr(attr) {
  return this.elem.getAttribute(attr) == "true";
}




function returnSetElemProperties(options = {}) {
  return function (bool) {
    setElementProperties.call(this, bool, options);
  };
}

function returnGetAttr(attr) {
  return function () {
    return getAttr.call(this, attr);
  };
}



export default VideoGraphic;
