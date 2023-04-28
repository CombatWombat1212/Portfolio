import { getColors, RESIZE_TIMEOUT, splitS } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import useSameHeight from "@/scripts/hooks/useSameHeight";
import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Mask from "../../utilities/Mask";
import { getBackgroundClasses } from "../sections_utilities/GetClasses";
import graphicVideoInit from "./VideoUtilities";

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
  const graphicref = useRef(null);

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
          <div
            className={`graphic--effect graphic--effect__hover graphic--effect__off graphic--effect__${type}`}
            style={hoverStyle ? hoverStyle : {}}></div>
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

function Graphic({
  className,
  innerClassName,
  type,
  img,
  background,
  color,
  children,
  lightbox,
  gallery,
  zoom,
  // setPopup,
  pop,
  width,
  height,
  effect,
  style,
  priority,
  onLoad,
  loop,
  muted,
  autoplay,
  controls,
  tabIndex,
  onClick,
  square,
  sync,
  innerStyle,
  sameHeight,
  reference,
  ...props
}) {
  // TODO: for mobile, add some kind of indication animation of the image being clicked on when its interactable or can be opened in a lightbox

  // if (!img) {
  //   img = {};
  //   console.log('me');
  // }

  var pref = "section--graphic";
  var isImg = type == "image" || type == "img";
  var isMask = type == "mask";
  var isVideo = type == "video";
  var isSquare = square ? true : false;
  var backgroundClasses = getBackgroundClasses(pref, background);
  color = color ? `mask__${color}` : "";
  innerStyle = innerStyle ? innerStyle : {};
  innerClassName = innerClassName ? innerClassName : "";
  className = className ? className : "";

  sync = sync ? sync : false;
  width = width ? width : img.width;
  height = height ? height : img.height;
  priority = priority ? true : false;


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
  gallery = gallery ? gallery : false;

  if(gallery && lightbox) console.error(`Img ${img.src} is both a lightbox and a gallery image. Please only use one or the other.`)

  if (lightbox || gallery) {

    var lightboxImg = img;
    if (typeof lightbox == "object") {
      lightboxImg = lightbox;
    }
    if (typeof gallery == "object") {
      lightboxImg = gallery;
    }


    // TODO: add loading indicator for lightbox images, and smoother transitions between non-zoomed images and zoomed images

    onClickHandler = () => {
      pop.setImg(lightboxImg);
      pop.setZoom(lightboxImg.zoom ? lightboxImg.zoom : false);
      pop.setOn(true);
      // pop.setType("lightbox");
      pop.setType(lightbox ? "lightbox" : (gallery ? "gallery" : "lightbox"));
    };
  }


  

  effect = effect ? effect : false;

  var allClasses = `section--graphic graphic ${backgroundClasses} ${className} ${buttonClasses} ${lightbox ? "graphic__lightbox" : ""} ${gallery ? "graphic__gallery" : ""}`;

  var typePref = isImg ? "img" : isMask ? "mask" : isVideo ? "video" : "";

  var styleVariables = {
    [`--${typePref}-aspect-width`]: width,
    [`--${typePref}-aspect-height`]: height,
    [`--${typePref[0]}w`]: `${width / 16}rem`,
    [`--${typePref[0]}h`]: `${height / 16}rem`,
  };

  const graphicref = useRef(null);
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    setIsPresent(true);
    if(reference){
      reference.current = graphicref.current;
    }
  }, [graphicref]);

  useEffect(() => {
    if (!isPresent) return;
    if (isSquare) {
      graphicKeepSquare(graphicref.current);
    }

    if (isVideo) {
      graphicVideoInit(graphicref.current);
    }

  }, [isPresent]);

  // var ap = autoplay == "scroll" ? false : autoplay ? true : false;
  var ap = typeof autoplay === "string" && autoplay.includes("scroll") ? false : autoplay ? true : false;

  sameHeight = sameHeight ? sameHeight : false;
  const sameHeightObj = useSameHeight(sameHeight, graphicref, {
    resize: "horizontal",
  });





  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  onLoad = onLoad ? onLoad : handleImageLoad;
  useEffect(() => {
    setImageLoaded(false);
  }, []);





  return (
    <>
      {isImg  && (
        <div
          className={`graphic--img ${allClasses}`}
          style={{
            ...styleVariables,
            ...style,
            ...(sameHeightObj
              ? {
                  height: !sameHeightObj.resizing ? `${sameHeightObj.height.min}px` : "auto",
                }
              : {}),
          }}
          ref={graphicref}
          onClick={onClick}
          {...(tabIndex !== undefined ? { tabIndex } : {})}
          {...props}>
          {effect && <Effect effect={effect} />}

          <Image
            className={innerClassName}
            src={img.src}
            alt={img.alt}
            width={width}
            height={height}
            onClick={onClickHandler}
            priority={priority}
            onLoadingComplete={onLoad}
            style={innerStyle}
          />

          {children && children}
        </div>
      )}
      {isMask && (
        <div
          className={`graphic--mask ${allClasses}`}
          style={{ ...styleVariables, ...style }}
          ref={graphicref}
          onClick={onClick}
          {...(tabIndex != undefined ? { tabIndex: tabIndex } : {})}
          {...props}>
          {effect && <Effect effect={effect} />}
          <Mask
            className={`${innerClassName} ${color}`}
            src={img.src}
            alt={img.alt}
            width={width}
            height={height}
            onClick={onClickHandler}
            priority={priority}
            onLoad={onLoad}
            style={innerStyle}
          />
          {children && children}
        </div>
      )}
      {isVideo && (
        <div
          className={`graphic--video ${allClasses}`}
          style={{ ...styleVariables, ...style }}
          ref={graphicref}
          onClick={onClick}
          {...(tabIndex != undefined ? { tabIndex: tabIndex } : {})}
          {...(sync != undefined ? { "data-sync": sync } : {})}
          {...(typeof autoplay === "string" && autoplay.includes("hover") ? { "data-autoplay-hover": true } : {})}
          {...(autoplay ? { "data-autoplay": autoplay } : {})}
          {...props}
          >
          {effect && <Effect effect={effect} />}

          <video
            className={`${innerClassName} video--foreground`}
            alt={img.alt}
            width={width}
            height={height}
            onClick={onClickHandler}
            onCanPlayThrough={onLoad}
            // loop={loop}
            data-loop={loop}
            muted={muted}
            autoPlay={ap}
            controls={controls}
            disableRemotePlayback={true}

            >
            <source src={`.${img.src}`} type={`video/${img.type}`}></source>
          </video>


          {typeof autoplay === "string" && autoplay.includes("hover") && (
            <video className={`${innerClassName} video--background`} alt={img.alt} width={width} height={height}
            disableRemotePlayback={true}
            >
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


export default Graphic;

export { graphicKeepSquare };
