import { getColors, RESIZE_TIMEOUT, splitS } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Mask from "../utilities/Mask";
import { getBackgroundClasses } from "./sections_utilities/GetClasses";


function getColor(color, colors) {
  return color.split("-to-").map((color) => {
    if (color == "transparent") {
      return { name: color, value: "#00000000" };
    } else {
      color = `--col-${color}`;
      color = colors[color];
      return color;
    }
  });
}

function Effect({ effect }) {
  if (typeof effect == "string") effect = effect.split(" ");
  var [type] = effect;
  const reference = useRef(null);

  const [colors, setColors] = useState(false);
  const [style, setStyle] = useState(false);
  const [hoverStyle, setHoverStyle] = useState(false);

  var type, dir, color, hover;
  if (effect.length > 3) [type, dir, color, hover] = effect;
  else {
    [type, dir, color] = effect;
    hover = false;
  }

  var hasHover = hover ? true : false;

  useMountEffect(() => {
    setColors(getColors());
  });

  useEffect(() => {
    if (!colors) return;

    if (typeof effect == "string") effect = effect.split(" ");
    var [type] = effect;

    if (type == "gradient") {
      var type, dir, color, hover;

      if (effect.length > 3) [type, dir, color, hover] = effect;
      else {
        [type, dir, color] = effect;
        hover = false;
      }

      dir = dir.replace(/-/g, " ");

      var color = getColor(color, colors);

      setStyle({
        "--color-1": color[0].value,
        "--color-2": color[1].value,
        "--direction": dir,
      });

      if (hover) {
        hover = getColor(hover, colors);
        setHoverStyle({
          "--color-1": hover[0].value,
          "--color-2": hover[1].value,
          "--direction": dir,
        });
      }
    }
  }, [colors]);

  return (
    <>
      {hasHover ? (
        <>
          <div className={`graphic--effect graphic--effect__hover graphic--effect__off graphic--effect__${type}`} style={hoverStyle ? hoverStyle : {}}></div>
          <div className={`graphic--effect graphic--effect__default graphic--effect__on graphic--effect__${type}`} style={style ? style : {}}></div>
        </>
      ) : (
        <>
          <div className={`graphic--effect graphic--effect__${type}`} style={style ? style : {}}></div>
        </>
      )}
    </>
  );
}

function Graphic({ className, innerClassName, type, img, background, color, children, lightbox, zoom, setPopup, width, height, effect, style, priority, onLoad, loop, muted, autoplay, controls, tabIndex, onClick, square, sync, ...props }) {
  // TODO: for mobile, add some kind of indication animation of the image being clicked on when its interactable or can be opened in a lightbox

  var pref = "section--graphic";
  var isImg = type == "image" || type == "img";
  var isMask = type == "mask";
  var isVideo = type == "video";
  var isSquare = square ? true : false;
  var backgroundClasses = getBackgroundClasses(pref, background);
  color = color ? `mask__${color}` : "";
  innerClassName = innerClassName ? innerClassName : "";
  className = className ? className : "";

  sync = sync ? sync : false;
  width = width ? width : img.width;
  height = height ? height : img.height;
  priority = priority ? true : false;
  onLoad = onLoad ? onLoad : () => {};

  var hasButton = false;
  if (children) {
    var childrenArray = React.Children.toArray(children);
    for (var i = 0; i < childrenArray.length; i++) {
      if (childrenArray[i].type.name == "Button") {
        hasButton = true;
        break;
      }
    }
  }
  var buttonClasses = hasButton ? "graphic__container" : "";

  // TODO: if you end up using this 'img-aspect-width' thing in multiple places then you should create a wrapper for Next/Image that automatically adds it to your image components, same as its done here and within the Mask component

  var onClickHandler;
  lightbox = lightbox ? lightbox : false;
  zoom = zoom ? true : false;
  if (lightbox) {
    var lightboxImg = img;

    if (typeof lightbox == "object") {
      lightboxImg = lightbox;
    }

    // TODO: add loading indicator for lightbox images, and smoother transitions between non-zoomed images and zoomed images
    onClickHandler = () => {
      setPopup({ type: "lightbox", img: lightboxImg, zoom: zoom });
    };
  }

  effect = effect ? effect : false;

  var allClasses = `section--graphic graphic ${backgroundClasses} ${className} ${buttonClasses} ${lightbox ? "graphic__lightbox" : ""}`;

  var typePref = isImg ? "img" : isMask ? "mask" : isVideo ? "video" : "";

  var styleVariables = {
    [`--${typePref}-aspect-width`]: width,
    [`--${typePref}-aspect-height`]: height,
    [`--${typePref[0]}w`]: `${width / 16}rem`,
    [`--${typePref[0]}h`]: `${height / 16}rem`,
  };

  const reference = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [reference]);

  useEffect(() => {
    if (!isMounted) return;
    if (isSquare) {
      graphicKeepSquare(reference.current);
    }

    if (isVideo) {
      graphicVideoInit(reference.current);
    }
  }, [isMounted]);

  // var ap = autoplay == "scroll" ? false : autoplay ? true : false;
  var ap = typeof autoplay === "string" && autoplay.includes("scroll") ? false : autoplay ? true : false;

  return (
    <>
      {isImg && (
        <div className={`graphic--img ${allClasses}`} style={{ ...styleVariables, ...style }} ref={reference} onClick={onClick} {...(tabIndex !== undefined ? { tabIndex } : {})} {...props}>
          {effect && <Effect effect={effect} />}
          <Image className={innerClassName} src={img.src} alt={img.alt} width={width} height={height} onClick={onClickHandler} priority={priority} onLoad={onLoad} />
          {children && children}
        </div>
      )}
      {isMask && (
        <div className={`graphic--mask ${allClasses}`} style={{ ...styleVariables, ...style }} ref={reference} onClick={onClick} {...(tabIndex != undefined ? { tabIndex: tabIndex } : {})} {...props}>
          {effect && <Effect effect={effect} />}
          <Mask className={`${innerClassName} ${color}`} src={img.src} alt={img.alt} width={width} height={height} onClick={onClickHandler} priority={priority} onLoad={onLoad} />
          {children && children}
        </div>
      )}
      {isVideo && (
        <div className={`graphic--video ${allClasses}`} style={{ ...styleVariables, ...style }} ref={reference} onClick={onClick} {...(tabIndex != undefined ? { tabIndex: tabIndex } : {})} {...(sync != undefined ? { "data-sync": sync } : {})} {...(typeof autoplay === "string" && autoplay.includes("hover") ? { "data-autoplay-hover": true } : {})} {...(autoplay ? { "data-autoplay": autoplay } : {})} {...props}>
          {effect && <Effect effect={effect} />}

          <video className={`${innerClassName} video--foreground`} alt={img.alt} width={width} height={height} onClick={onClickHandler} onLoad={onLoad} loop={loop} muted={muted} autoPlay={ap} controls={controls}>
            <source src={`.${img.src}`} type={`video/${img.type}`}></source>
          </video>

          {typeof autoplay === "string" && autoplay.includes("hover") && (
            <video className={`${innerClassName} video--background`} alt={img.alt} width={width} height={height}>
              <source src={`.${img.src}`} type={`video/${img.type}`}></source>
            </video>
          )}
        </div>
      )}
    </>
  );
}

Graphic.defaultProps = {
  type: "image",
  effect: null,
  loop: false,
  muted: false,
  autoplay: false,
  controls: false,
};

Graphic.propTypes = {
  type: PropTypes.oneOf(["image", "img", "mask", "video"]),
};

function graphicKeepSquare(elem) {
  var graphic = {
    elem: elem,
    height: 0,
    width: 0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  run(graphic);

  function graphicGetDimensions(graphic) {
    graphic.width = graphic.elem.offsetWidth;
    graphic.height = graphic.elem.offsetHeight;
    graphic.padding.top = parseFloat(getComputedStyle(graphic.elem).paddingTop);
    graphic.padding.right = parseFloat(getComputedStyle(graphic.elem).paddingRight);
    graphic.padding.bottom = parseFloat(getComputedStyle(graphic.elem).paddingBottom);
    graphic.padding.left = parseFloat(getComputedStyle(graphic.elem).paddingLeft);
  }

  function graphicSetDimensions(graphic) {
    graphic.elem.style.height = graphic.width - graphic.padding.left - graphic.padding.right + "px";
  }

  function run(graphic) {
    graphicGetDimensions(graphic);
    graphicSetDimensions(graphic);
  }

  function ran() {
    window.clearTimeout(isResizing);
    isResizing = setTimeout(function () {
      run(graphic);
    }, RESIZE_TIMEOUT);
  }

  var isResizing;
  window.removeEventListener("resize", ran);
  window.addEventListener("resize", ran);
}




function graphicVideoInit(elem) {
  function GraphicItem(elem) {
    this.elem = elem.closest(".graphic--video");
    this.video = this.elem.querySelector("video");
    this.transition = getComputedStyle(this.elem).transitionDuration && getComputedStyle(this.elem).transitionDuration !== "0s" ? splitS(getComputedStyle(this.elem).transitionDuration) : splitS(getComputedStyle(document.documentElement).getPropertyValue("--transition").trim());
    this.autoplay = this.elem.getAttribute("data-autoplay") ? this.elem.getAttribute("data-autoplay") : false;
    this.sync = this.elem.getAttribute("data-sync") ? this.elem.getAttribute("data-sync") : false;
    this.group = typeof this.sync === "string" ? Array.from(document.querySelectorAll(`[data-sync="${this.sync}"]`)) : [this.elem];
    this.index = this.group && this.group.indexOf(this.elem) ? this.group.indexOf(this.elem) : 0;
    this.observer = null;
    this.is = {
      staggered: typeof this.autoplay === "string" && this.autoplay.includes("staggered"),
      sync: this.sync ? true : false,
    };
  }

  var graphic = new GraphicItem(elem);

  if (graphic.index != graphic.group.length - 1) return;

  graphic.group.forEach((v, i) => {
    v = new GraphicItem(v);
    graphic.group[i] = v;
  });

  if (typeof graphic.autoplay === "string" && graphic.autoplay.includes("scroll")) {
    graphicCreateIntersectionObserver(graphic);
  }

  if (typeof graphic.autoplay === "string" && graphic.autoplay.includes("hover")) {
    graphicPlayOnHoverInit(graphic);
  }

  function graphicCreateIntersectionObserver(graphic) {
    var videos = graphic.group.map((v) => v.elem.querySelector("video"));
    var firstVideo = videos[0];
    if (firstVideo.parentElement.getAttribute("data-observed") === "true") return;

    var loadedFlags = videos.map((v) => {
      return false;
    });

    var promises = videos.map((v, i) => {
      return new Promise((resolve) => {
        if (v.readyState >= 4) {
          loadedFlags[i] = true;
          resolve();
        } else {
          v.addEventListener("loadedmetadata", () => {
            loadedFlags[i] = true;
            resolve();
          });
        }
      });
    });

    Promise.all(promises).then(() => {
      if (graphic.is.sync && !graphic.is.staggered) {
        setTimeout(() => startPlaying(), 500);
      } else {
        startPlaying();
      }
    });

    function startPlaying() {
      if (loadedFlags.every((f) => f)) {
        var observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let videoIndex = 0;

              const playNextVideo = () => {
                const video = videos[videoIndex];
                video.currentTime = 0;
                graphicVideoPlay(video);

                video.addEventListener("ended", () => {
                  graphicVideoPause(video);
                  if (graphic.is.staggered && videoIndex < videos.length - 1) {
                    videoIndex++;
                    playNextVideo();
                  }
                });

                if (!graphic.is.staggered) {
                  videos.forEach((v, i) => {
                    graphicVideoPlay(v);

                    v.addEventListener("ended", () => {
                      graphicVideoPause(v);
                    });

                  });
                }
              };

              playNextVideo();
            } else {
              videos.forEach((v) => {
                graphicVideoPause(v);
              });
            }
          });
        });

        graphic.observer = observer;
        firstVideo.setAttribute("data-observed", "true");
        observer.observe(firstVideo);
      } else {
        setTimeout(startPlaying, 100);
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

    function play(e) {
      var target = e.target.closest(".graphic--video");
      var g = graphic.group.find((g) => g.elem === target);
      graphicVideoPlay(g.video);

      // pause others
      graphic.group.forEach((g) => {
        if (g.elem !== target) {
          graphicVideoReset(g);
        }
      });
    }

    function pause(e) {
      var target = e.target.closest(".graphic--video");
      graphicVideoReset(graphic.group.find((g) => g.elem === target));
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
}

export default Graphic;
