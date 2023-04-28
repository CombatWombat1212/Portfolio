import { splitS } from "@/scripts/GlobalUtilities";

function graphicVideoInit(elem) {
  function Graphic(elem) {
    this.elem = elem.closest(".graphic--video");
    this.video = this.elem.querySelector("video");

    // Check if transition duration is set and not equal to 0s. Otherwise, use a default value from a CSS variable.
    if (getComputedStyle(this.elem).transitionDuration && getComputedStyle(this.elem).transitionDuration !== "0s") {
      this.transition = splitS(getComputedStyle(this.elem).transitionDuration);
    } else {
      this.transition = splitS(getComputedStyle(document.documentElement).getPropertyValue("--transition").trim());
    }

    // Set autoplay and sync properties based on data attributes of the element.
    this.autoplay = this.elem.getAttribute("data-autoplay") ? this.elem.getAttribute("data-autoplay") : false;
    this.sync = this.elem.getAttribute("data-sync") ? this.elem.getAttribute("data-sync") : false;

    // If sync is set, group all elements with the same sync value together.
    if (typeof this.sync === "string") {
      this.group = Array.from(document.querySelectorAll(`[data-sync="${this.sync}"]`));
    } else {
      this.group = [this.elem];
    }

    // Get the index of the element within its group.
    this.index = this.group.indexOf(this.elem);
    this.playObserver = null;

    // Set a boolean flag to indicate if autoplay is staggered or synchronized.
    this.is = {
      staggered: typeof this.autoplay === "string" && this.autoplay.includes("staggered"),
      sync: Boolean(this.sync),
      inView: false,
      loop: this.video.hasAttribute("data-loop") && this.video.getAttribute("data-loop") !== "false",
    };
  }

  var graphic = new Graphic(elem);
  if (graphic.index != graphic.group.length - 1) return;

  graphic.group.forEach((v, i) => {
    v = new Graphic(v);
    graphic.group[i] = v;
  });

  graphicSetLoopingGroup(graphic);

  if (typeof graphic.autoplay === "string" && graphic.autoplay.includes("scroll")) {
    graphicCreateIntersectionObserver(graphic);
  }

  if (typeof graphic.autoplay === "string" && graphic.autoplay.includes("hover")) {
    graphicPlayOnHoverInit(graphic);
  }

  function graphicCreateIntersectionObserver(graphic) {
    // Graphic contains a group of Graphic objects. `g` is a single Graphic object within the group, with their only difference being that `g.group` has a reference to the DOM element, rather than a circular reference to the Graphic object itself, whereas `graphic.group` has a a reference to the Graphic object.

    graphic.group.forEach((g) => {
        // Disconnect the old observer if it exists
        if (g.elem.playObserver) {
          g.elem.playObserver.disconnect();
          g.elem.playObserver = null;
        }
      
        var observer = new IntersectionObserver(
          (entries) => {
            groupIntersectHandle({ entries, graphic, g });
          },
          { threshold: 1 }
        );
      
        // Attach the new observer to the element
        g.elem.playObserver = observer;
        g.elem.setAttribute("data-observed", "true");
        observer.observe(g.elem);
      });
      

  }

  function graphicSetLoopingGroup(graphic) {
    const isLoopingGroup = graphic.group.filter((g) => g.is.loop).length == graphic.group.length;
    if (isLoopingGroup) {
      graphic.is.loopingGroup = true;
      graphic.group.forEach((g) => {
        g.is.loopingGroup = true;
        g.video.setAttribute("loop", "false");
      });
    } else {
      graphic.is.loopingGroup = false;
      graphic.group.forEach((g) => {
        g.is.loopingGroup = false;
        var loop = g.video.getAttribute("data-loop") == "true";
        console.log(loop);
        if (loop) g.video.setAttribute("loop", "true");
      });
    }
  }
}

function graphicVideoPlay(video) {
  video.parentElement.setAttribute("data-playing", "true");
  video.play();
}

function graphicVideoPause(video) {
  video.parentElement.setAttribute("data-playing", "false");
  video.pause();
}

function graphicPlayOnHoverInit(graphic) {
  graphic.group.forEach((g) => {
    g.elem.addEventListener("mouseenter", play);
    g.elem.addEventListener("mouseleave", pause);
    g.elem.addEventListener("touchstart", play);
    g.elem.addEventListener("touchend", pause);
  });

  function loop(e) {
    var target = e.target.closest(".graphic--video");
    var g = graphic.group.find((g) => g.elem === target);
    if (g.video.currentTime >= g.video.duration - 0.1) {
      g.video.currentTime = 0;
    }
  }

  function play(e) {
    var target = e.target.closest(".graphic--video");
    var g = graphic.group.find((g) => g.elem === target);
    graphicVideoPlay(g.video);
    g.video.addEventListener("timeupdate", loop);

    graphic.group.forEach((g) => {
      if (g.elem !== target) {
        g.video.removeEventListener("timeupdate", loop);
        graphicVideoReset(g);
      }
    });
  }

  function pause(e) {
    var target = e.target.closest(".graphic--video");
    var g = graphic.group.find((g) => g.elem === target);
    graphicVideoReset(g);
    g.video.removeEventListener("timeupdate", loop);
  }
}

function graphicVideoReset(graphic) {
  graphic.video.style.setProperty("transition-duration", `${graphic.transition}ms`);

  graphic.video.classList.add("video__hidden");
  graphic.elem.setAttribute("data-playing", "false");

  setTimeout(() => {
    graphicVideoPause(graphic.video);
    graphic.video.currentTime = 0;
    setTimeout(() => {
      graphic.video.classList.remove("video__hidden");
    }, 100);
  }, graphic.transition);
}

function groupIntersectHandle({ entries, graphic: graphicObj, g: graphicInstance }) {
  entries.forEach((entry) => {
    var inView = [];
    let videoIndex = 0;

    if (entry.isIntersecting) {
      graphicInstance.is.inView = true;
      if (graphicObj.elem == graphicInstance.elem) graphicObj.is.inView = true;

      groupGetInView(
        () => {
          groupPlayNextInView(graphicObj, videoIndex, inView);
        },
        graphicObj,
        inView
      );
    } else {
      graphicInstance.is.inView = false;
      if (graphicObj.elem == graphicInstance.elem) graphicObj.is.inView = false;

      groupGetInView(
        () => {
          groupPauseOutOfView(graphicObj);
        },
        graphicObj,
        inView
      );
    }
  });
}

function groupGetInView(callback, graphicObj, inView) {
  const maxCount = 2;
  let count = 0;

  const helper = () => {
    const newInView = graphicObj.group
      .filter((graphicInstance) => graphicInstance.is.inView)
      .sort((a, b) => graphicObj.group.indexOf(a) - graphicObj.group.indexOf(b))
      .map((graphicInstance) => graphicInstance.video);

    if (newInView.length === 0 && graphicObj.group.length > 0) {
      inView.length = 0;
    } else {
      inView.length = 0;
      newInView.forEach((item) => inView.push(item));
    }

    if (inView.length < graphicObj.group.length && count < maxCount) {
      count++;
      setTimeout(helper, 50);
    } else {
      callback();
    }
  };

  helper();
}

function groupPlayNextInView(graphicObj, videoIndex, inView) {
  function ended() {
    graphicVideoPause(video);
    if (graphicObj.is.staggered && videoIndex < inView.length - 1) {
      if (graphicObj.is.loopingGroup) {
        video.removeEventListener("ended", ended);
        videoIndex = 0;
      } else {
        video.removeEventListener("ended", ended);
        videoIndex++;
      }
      groupPlayNextInView(graphicObj, videoIndex, inView);
    }
  }

  const video = inView[videoIndex];
  if (!video) return;
  video.currentTime = 0;
  if (graphicObj.is.staggered) {
    graphicVideoPlay(video);
    video.addEventListener("ended", ended);
  } else {
    setTimeout(() => {
      inView.forEach((v) => {
        graphicVideoPlay(v);
        v.addEventListener("ended", () => {
          graphicVideoPause(v);
        });
      });
    }, 200);
  }
}

function groupPauseOutOfView(graphicObj) {
  var outOfView = graphicObj.group.filter((graphicInstance) => !graphicInstance.is.inView);

  outOfView.forEach((graphicInstance) => {
    if (!graphicInstance.paused) {
      graphicVideoReset(graphicInstance);
    }
  });
}

export default graphicVideoInit;
