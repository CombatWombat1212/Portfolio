import VideoGraphic from "./VideoGraphicObj";


function graphicVideoInit(elem, desktop) {
  var graphic = new VideoGraphic(elem);
  if (graphic.index != graphic.group.length - 1) return;

  graphic.group.forEach((v, i) => {
    v = new VideoGraphic(v);
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
    // VideoGraphic contains a group of VideoGraphic objects. `g` is a single VideoGraphic object within the group, with their only difference being that `g.group` has a reference to the DOM element, rather than a circular reference to the VideoGraphic object itself, whereas `graphic.group` has a a reference to the VideoGraphic object.

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
        { threshold: 0.9 }
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

  graphic.elem.setAttribute("data-playing", "false");

  if (graphic.is.hoverAutoPlay) graphic.video.classList.add("video__hidden");

  setTimeout(() => {
    graphicVideoPause(graphic.video);
    graphic.video.currentTime = 0;
    setTimeout(() => {
      if (graphic.is.hoverAutoPlay) graphic.video.classList.remove("video__hidden");
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

      console.log("handled");
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
