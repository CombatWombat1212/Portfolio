import VideoGraphic from "./VideoGraphicObj";
import createEventListenerTracker from "@/scripts/EventListenerTracker";
const { addEventListenerWithTracking, removeAllEventListeners, removeEventListenerWithTracking } = createEventListenerTracker();

function graphicVideoInit(ref) {
  var graphic = new VideoGraphic(ref.current);

  if (graphic.index != graphic.group.length - 1) return;

  graphic.group.forEach((g, i) => {
    g = new VideoGraphic(g, graphic.group);
    graphic.group[i] = g;
  });

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
}

function graphicVideoPlay(graphic) {
  console.log("checking if inside graphicVideoPlay");
  if (!graphic || !graphic.elem || !graphic.getVideo()) return;
  console.log("actually playing");
  graphic.set.dataPlaying(true);
  graphic
    .getVideo()
    .play()
    .catch((error) => {
      console.log(error);
      // console.error('Error playing the video:', error);
    });
}

function graphicVideoPause(graphic) {
  console.log("checking if inside graphicVideoPause");
  if (!graphic || !graphic.elem || !graphic.getVideo()) return;
  console.log("actually pausing", graphic);
  graphic.set.dataPlaying(false);
  // if (!graphic.getVideo().paused) {
  graphic.getVideo().pause();
  // }
}

function graphicPlayOnHoverInit(graphic) {
  if (graphic.is.hoverAutoPlay) {
    init(graphic);
  } else {
    uninit(graphic);
  }

  function init(graphic) {
    graphic.group.forEach((g) => {
      addEventListenerWithTracking(g.elem, "mouseenter", play);
      addEventListenerWithTracking(g.elem, "mouseleave", pause);
      addEventListenerWithTracking(g.elem, "touchstart", play);
      addEventListenerWithTracking(g.elem, "touchend", pause);
    });
  }

  function uninit(graphic) {
    graphic.group.forEach((g) => {
      removeAllEventListeners(g.elem);
      g.getVideo().removeEventListener("timeupdate", loop);
      if (g.hideTimeout) clearTimeout(g.hideTimeout);
      if (g.showTimeout) clearTimeout(g.showTimeout);
    });
  }

  function checkIfHoverAutoplay(graph) {
    if (!graph) return false;
    graph.get.hoverAutoPlay();
    if (!graph.is.hoverAutoPlay) {
      uninit(graph);
      return true;
    }
    return false;
  }

  function getTarget(e) {
    const target = e.target.closest(".graphic--video");
    const graph = graphic.group.find((g) => g.elem === target);
    return { target, graph };
  }

  function loop(e) {
    var { target, graph } = getTarget(e);
    console.log("check if hover autoplay");
    if (checkIfHoverAutoplay(graph)) return;

    console.log("loop");

    
    if (graph.getVideo().currentTime >= graph.getVideo().duration - 0.1) {
      graph.getVideo().currentTime = 0;
      graphicVideoPlay(graph);
      console.log('loop playing');
    }
  }

  function play(e) {
    var { target, graph } = getTarget(e);
    graph.hovered = true;
    if (checkIfHoverAutoplay(graph)) return;
    addEventListenerWithTracking(graph.getVideo(), "timeupdate", loop);
    graphicVideoPlay(graph);

    console.log("play");

    graph.group.forEach((g) => {
      if (g.elem !== target) {
        g.getVideo().removeEventListener("timeupdate", loop);
        graphicVideoReset(g);
      }
    });
  }

  function pause(e) {
    var { target, graph } = getTarget(e);
    graph.hovered = false;
    if (checkIfHoverAutoplay(graph)) return;

    console.log("pause", graph);

    graphicVideoReset(graph);
    removeAllEventListeners(graph.getVideo());
  }
}

// function graphicVideoReset(graphic) {
//   graphic.getVideo().style.setProperty("transition-duration", `${graphic.transition}ms`);

//   console.log("reset", graphic);
//   graphic.set.dataPlaying(false);

//   graphic.getVideo().classList.add("video__hidden");

//   setTimeout(() => {
//     graphicVideoPause(graphic);
//     graphic.getVideo().currentTime = 0;
//     setTimeout(() => {
//       graphic.getVideo().classList.remove("video__hidden");
//     }, 100);
//   }, graphic.transition);

// }

function graphicVideoReset(graphic) {
  graphic.getVideo().style.setProperty("transition-duration", `${graphic.transition}ms`);

  console.log("reset", graphic);
  graphic.set.dataPlaying(false);

  graphic.getVideo().classList.add("video__hidden");

  const hideTimeout = setTimeout(() => {
    graphicResetHandleHideTimeout(graphic);
  }, graphic.transition);

  // Store the hideTimeout id in the graphic object
  graphic.hideTimeout = hideTimeout;
}

function graphicResetHandleHideTimeout(graphic) {
  if (!graphic.hovered) {
    graphicVideoPause(graphic);
    graphic.getVideo().currentTime = 0;

    const showTimeout = setTimeout(() => {
      graphicResetHandleShowTimeout(graphic);
    }, 100);
    graphic.showTimeout = showTimeout;
  } else {
    if (graphic.showTimeout) clearTimeout(graphic.showTimeout);
    if (graphic.getVideo()) {
      graphic.getVideo().classList.remove("video__hidden");
      graphicVideoPlay(graphic);
    }
  }
}

function graphicResetHandleShowTimeout(graphic) {
  graphic.getVideo().classList.remove("video__hidden");
}

function groupIntersectHandle({ entries, graphic: graphicObj, g: graphicInstance }) {
  graphicObj.get.loopingGroup();

  entries.forEach((entry) => {
    var inView = [];
    let videoIndex = 0;

    if (entry.isIntersecting) {
      updated(true);
    } else {
      updated(false);
    }

    function updated(bool) {
      graphicInstance.is.inView = bool;
      if (graphicObj.elem == graphicInstance.elem) graphicObj.is.inView = bool;
      graphicObj.group.forEach((g) => {
        if (g.elem == graphicInstance.elem) g.is.inView = bool;
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
  function staggeredEndHandler() {
    groupGetInView(staggeredEnd, graphicObj, inView);
  }

  function staggeredEnd() {
    graphic.get.loopingGroup();
    console.log("staggered end");
    // console.log(inView);
    // console.log(graphicObj.is.loopingGroup);
    // console.log(graphicObj.get.loop());
    graphicVideoPause(graphic);
    if (graphic.is.staggered) {
      graphic.getVideo().removeEventListener("ended", staggeredEndHandler);

      if (graphic.hovered) {
        videoIndex = videoIndex;
      } else if (graphic.is.loopingGroup && videoIndex == inView.length - 1) {
        videoIndex = 0;
      } else {
        videoIndex++;
      }
      groupPlayNextInView(graphicObj, videoIndex, inView);
    }
  }

  function nonStaggeredEndHandler(g) {
    if (graphicObj.is.loopingGroup) {
      graphicVideoPlay(g);
    } else {
      graphicVideoPause(g);
    }
  }

  const handlerMap = new Map();

  function nonStaggeredPlay() {
    console.log("non staggered play");
    inView.forEach((g) => {
      graphicVideoPlay(g);
      const videoElement = g.getVideo();

      if (handlerMap.has(videoElement)) {
        videoElement.removeEventListener("ended", handlerMap.get(videoElement));
      }

      const wrappedHandler = () => nonStaggeredEndHandler(g);
      handlerMap.set(videoElement, wrappedHandler);
      videoElement.addEventListener("ended", wrappedHandler);
    });
  }

  const graphic = inView[videoIndex];
  if (!graphic) return;
  graphic.currentTime = 0;
  if (graphicObj.is.staggered) {
    const isAnotherGraphicPlaying = inView.some((g) => g.getVideo().paused === false && g !== graphic);

    if (!isAnotherGraphicPlaying) {
      graphicVideoPlay(graphic);
      graphic.getVideo().removeEventListener("ended", staggeredEndHandler);
      graphic.getVideo().addEventListener("ended", staggeredEndHandler);
    }
  } else {
    graphic.getVideo().removeEventListener("ended", staggeredEndHandler);
    const timeout = graphic.is.sync ? 200 : 0;
    setTimeout(nonStaggeredPlay, timeout);
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
