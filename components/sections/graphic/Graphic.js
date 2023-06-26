import { getColors, RESIZE_TIMEOUT, splitS } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Mask from "../../utilities/Mask";
import { getBackgroundClasses } from "../sections_utilities/GetClasses";
import graphicVideoInit from "./VideoUtilities";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import Video from "./Video";

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

function Graphic(props) {
  var {
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
    autoplay: autoplayProp,
    controls,
    tabIndex,
    onClick,
    square,
    sync,
    innerStyle,
    reference,
    playbackRate,
    lazy = true,
    ...restProps
  } = props;

  const graphicref = useRef(null);

  useEffect(() => {
    if (reference) {
      reference.current = graphicref.current;
    }
  }, [graphicref]);

  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    setImageLoaded(false);
  }, []);

  // TODO: for mobile, add some kind of indication animation of the image being clicked on when its interactable or can be opened in a lightbox

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
  lightbox = lightbox ? lightbox : false;
  gallery = gallery ? gallery : false;
  effect = effect ? effect : false;
  playbackRate = playbackRate ? playbackRate : 1;

  const loading = lazy ? "lazy" : "eager";

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  onLoad = onLoad ? onLoad : handleImageLoad;

  if (gallery && lightbox) console.error(`Img ${img.src} is both a lightbox and a gallery image. Please only use one or the other.`);

  var hasButton = (function (children) {
    if (children) {
      var childrenArray = React.Children.toArray(children);
      for (var i = 0; i < childrenArray.length; i++) {
        if (childrenArray[i].type.name == "Button" || childrenArray[i].type.displayName == "Button") {
          return true;
        }
      }
    }
    return false;
  })(children);

  var buttonClasses = hasButton ? "graphic__container" : "";

  var onClickHandler = (() => {
    if (lightbox || gallery) {
      var lightboxImg = img;
      if (typeof lightbox == "object") {
        lightboxImg = lightbox;
      }
      if (typeof gallery == "object") {
        lightboxImg = gallery;
      }
      // TODO: add loading indicator for lightbox images, and smoother transitions between non-zoomed images and zoomed images

      return () => {
        pop.setImg(lightboxImg);
        pop.setZoom(lightboxImg.zoom ? lightboxImg.zoom : false);
        pop.setOn(true);
        pop.setType(lightbox ? "lightbox" : gallery ? "gallery" : "lightbox");
      };
    }
  })();

  // var allClasses = `section--graphic graphic ${backgroundClasses} ${className} ${buttonClasses} ${lightbox ? "graphic__lightbox" : ""} ${
  //   isSquare && "graphic__square"
  // } ${gallery ? "graphic__gallery" : ""}`;

  const allClasses = (() => {
    let classes = ["section--graphic", "graphic"];

    classes.push(backgroundClasses);
    classes.push(className);
    classes.push(buttonClasses);

    if (isSquare) classes.push("graphic__square");
    if (lightbox) classes.push("graphic__lightbox");
    if (gallery) classes.push("graphic__gallery");

    return classes.join(" ");
  })();

  var typePref = isImg ? "img" : isMask ? "mask" : isVideo ? "video" : "";
  var styleVariables = {
    [`--${typePref}-aspect-width`]: width,
    [`--${typePref}-aspect-height`]: height,
    [`--${typePref[0]}w`]: `${width / 16}rem`,
    [`--${typePref[0]}h`]: `${height / 16}rem`,
  };


  const IMAGE_PROPS = {
    // sizes: `(max-width: 480px) 100vw,
    // (max-width: 768px) 100vw,
    // (max-width: 1024px) 100vw,
    // (max-width: 1280px) 100vw,
    // (max-width: 1920px) 100vw,
    // (max-width: 2560px) 100vw,
    // (max-width: 3840px) 100vw,
    // (max-width: 5120px) 100vw,
    // 100vw`,
    sizes: `100vw`,
  }

  var autoplayHTML = typeof autoplayProp === "string" && autoplayProp.includes("scroll") ? false : autoplayProp ? true : false;

  const WRAPPER_STYLE = {
    ...styleVariables,
    ...style,
  };

  const WRAPPER_COMMON_VIDEO_PROPS = {
    ...(sync !== undefined && sync !== false && { "data-sync": sync }),
    // ...(typeof autoplayProp === "string" && autoplayProp.includes("hover") && { "data-autoplay-hover": true }),
    // ...(autoplayProp && { "data-autoplay": autoplayProp }),
  };

  const WRAPPER_PROPS = {
    className: `graphic--${typePref} ${allClasses}`,
    ref: graphicref,
    onClick: onClick,
    ...(tabIndex !== undefined && { tabIndex: tabIndex }),
    style: WRAPPER_STYLE,
    ...restProps,
    ...(isVideo && WRAPPER_COMMON_VIDEO_PROPS),
  };

  const INNER_COMMON_VIDEO_PROPS = {
    onCanPlayThrough: onLoad,
    "data-loop": loop,
    muted: muted,
    autoPlay: autoplayHTML,
    "data-autoplay": autoplayProp,
    controls: controls,
    innerClassName: innerClassName,
    type: img.type,
    playbackRate: playbackRate,
  };

  const INNER_PROPS = {
    className: `${innerClassName} ${isMask ? color : ""}`,
    src: img.src,
    alt: img.alt,
    width: width,
    height: height,
    onClick: onClickHandler,
    priority: priority,
    style: innerStyle,
    onLoadingComplete: onLoad,
    ...(isVideo && INNER_COMMON_VIDEO_PROPS),
    ...(isImg && lazy == false && { loading: loading }),
    ...(isImg && { ...IMAGE_PROPS}),
    reference: graphicref,
    'data-transparent': Boolean(img.transparent),
    'data-fallback': img.fallback ? img.fallback : false,
  };


  const renderContent = (Component, innerProps, includeChildren = false) => (
    <Wrapper props={WRAPPER_PROPS} effect={effect}>
      <Component {...innerProps} />
      {includeChildren && children}
    </Wrapper>
  );

  return (
    <>
      {isImg && renderContent(Image, INNER_PROPS, true)}
      {isMask && renderContent(Mask, INNER_PROPS, true)}
      {isVideo && renderContent(Video, INNER_PROPS)}
    </>
  );
}

function Wrapper({ props, children, effect }) {
  return (
    <div {...props}>
      {effect && <Effect effect={effect} />}
      {children}
    </div>
  );
}

Effect.displayName = "Effect";
Graphic.displayName = "Graphic";
Wrapper.displayName = "Wrapper";

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

export default Graphic;
