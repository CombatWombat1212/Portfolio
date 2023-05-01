import VideoGraphic from "./VideoGraphicObj";

function graphicVideoInit(ref) {
  var graphic = new VideoGraphic(ref.current);

  if (graphic.index != graphic.group.length - 1) return;

  graphic.group.forEach((g, i) => {
    g = new VideoGraphic(g, graphic.group);
    graphic.group[i] = g;
  });

  // graphicSetLoopingGroup(graphic);
  // graphic.set.loopingGroup();
  // console.log(graphic.is.loopingGroup);

  if (graphic.is.scrollAutoPlay) {
    graphicCreateIntersectionObserver(graphic);
  }

  // whether or not it initializes is determined internally, rather than wrapping the whole thing in an if because it needs to be uninitialized if it goes from graphic.is.hoverAutoPlay to !graphic.is.hoverAutoPlay
  graphicPlayOnHoverInit(graphic);

  function graphicCreateIntersectionObserver(graphic) {
    // VideoGraphic contains a group of VideoGraphic objects. `g` is a single VideoGraphic object within the group, with their only difference being that `g.group` has a reference to the DOM element, rather than a circular reference to the VideoGraphic object itself, whereas `graphic.group` has a a reference to the VideoGraphic object.

    graphic.group.forEach((g) => {
      if (g.elem.getAttribute("data-observed") == "true") return;

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

  // function graphicSetLoopingGroup(graphic) {

  //   const isLoopingGroup = graphic.group.filter(
  //     (g) => g.is.loop
  //     ).length == graphic.group.length;

  //   if (isLoopingGroup) {
  //     graphic.is.loopingGroup = true;
  //     graphic.group.forEach((g) => {
  //       g.is.loopingGroup = true;
  //       g.getVideo().removeAttribute("loop");
  //     });
  //   } else {
  //     graphic.is.loopingGroup = false;
  //     graphic.group.forEach((g) => {
  //       g.is.loopingGroup = false;
  //       var loop = g.getVideo().getAttribute("data-loop") == "true";
  //       if (loop) g.getVideo().setAttribute("loop", "true");
  //       if (!loop) g.getVideo().removeAttribute("loop");
  //     });
  //   }
  // }
}

function graphicVideoPlay(graphic) {
  if (!graphic || !graphic.elem || !graphic.getVideo()) return;
  graphic.elem.setAttribute("data-playing", "true");
  graphic.getVideo().play();
}

function graphicVideoPause(graphic) {
  if (!graphic || !graphic.elem || !graphic.getVideo()) return;
  graphic.elem.setAttribute("data-playing", "false");
  graphic.getVideo().pause();
}

function graphicPlayOnHoverInit(graphic) {

  graphic.get.hoverAutoPlay();
  graphic.set.hoverAutoPlay();

  if (graphic.is.hoverAutoPlay) {
    init();
  } else {
    uninit();
  }

  function init() {
    graphic.group.forEach((g) => {
      g.elem.addEventListener("mouseenter", play);
      g.elem.addEventListener("mouseleave", pause);
      g.elem.addEventListener("touchstart", play);
      g.elem.addEventListener("touchend", pause);
    });
  }
  function uninit() {
    graphic.group.forEach((g) => {
      g.elem.removeEventListener("mouseenter", play);
      g.elem.removeEventListener("mouseleave", pause);
      g.elem.removeEventListener("touchstart", play);
      g.elem.removeEventListener("touchend", pause);
      g.getVideo().removeEventListener("timeupdate", loop);
    });
  }

  function loop(e) {
    
    var target = e.target.closest(".graphic--video");
    var g = graphic.group.find((g) => g.elem === target);
    if (g.getVideo().currentTime >= g.getVideo().duration - 0.1) {
      g.getVideo().currentTime = 0;
    }
  }

  function play(e) {
    
    var target = e.target.closest(".graphic--video");
    var g = graphic.group.find((g) => g.elem === target);

    graphicVideoPlay(g);
    g.getVideo().addEventListener("timeupdate", loop);

    graphic.group.forEach((g) => {
      if (g.elem !== target) {
        g.getVideo().removeEventListener("timeupdate", loop);
        graphicVideoReset(g);
      }
    });
  }

  function pause(e) {
    
    var target = e.target.closest(".graphic--video");
    var g = graphic.group.find((g) => g.elem === target);
    graphicVideoReset(g);
    g.getVideo().removeEventListener("timeupdate", loop);
  }
}

function graphicVideoReset(graphic) {
  graphic.getVideo().style.setProperty("transition-duration", `${graphic.transition}ms`);

  graphic.elem.setAttribute("data-playing", "false");

  if (graphic.is.hoverAutoPlay) {
    graphic.getVideo().classList.add("video__hidden");
  } else {
  }

  setTimeout(() => {
    graphicVideoPause(graphic);
    graphic.getVideo().currentTime = 0;
    setTimeout(() => {
      if (graphic.is.hoverAutoPlay) graphic.getVideo().classList.remove("video__hidden");
    }, 100);
  }, graphic.transition);
}

function groupIntersectHandle({ entries, graphic: graphicObj, g: graphicInstance }) {
  graphicObj.get.loopingGroup();

  entries.forEach((entry) => {
    var inView = [];
    let videoIndex = 0;

    if (entry.isIntersecting) {
      graphicInstance.is.inView = true;
      if (graphicObj.elem == graphicInstance.elem) graphicObj.is.inView = true;
      console.log("play next in view");
      groupGetInView(
        () => {
          groupPlayNextInView(graphicObj, videoIndex, inView);
          groupPauseOutOfView(graphicObj);
        },
        graphicObj,
        inView
      );
    } else {
      graphicInstance.is.inView = false;
      if (graphicObj.elem == graphicInstance.elem) graphicObj.is.inView = false;
      graphicObj.group.forEach((g) => {
        if (g.elem == graphicInstance.elem) g.is.inView = false;
      });

      groupGetInView(
        () => {
          groupPlayNextInView(graphicObj, videoIndex, inView);
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
      .sort((a, b) => graphicObj.group.indexOf(a) - graphicObj.group.indexOf(b));
    // .map((graphicInstance) => graphicInstance.video);

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
    graphicVideoPause(graphic);
    if (graphicObj.is.staggered) {
      graphic.getVideo().removeEventListener("ended", ended);
      if (graphicObj.is.loopingGroup && videoIndex == inView.length - 1) {
        videoIndex = 0;
      } else {
        videoIndex++;
      }
      groupPlayNextInView(graphicObj, videoIndex, inView);
    }
  }

  const graphic = inView[videoIndex];
  if (!graphic) return;
  graphic.currentTime = 0;
  if (graphicObj.is.staggered) {
    graphicVideoPlay(graphic);
    graphic.getVideo().addEventListener("ended", ended);
  } else {
    setTimeout(() => {
      inView.forEach((g) => {
        graphicVideoPlay(g);
        g.getVideo().addEventListener("ended", () => {
          graphicVideoPause(g);
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
