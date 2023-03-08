import { getColors } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Mask from "../utilities/Mask";
import { getBackgroundClasses } from "./sections_utilities/GetClasses";





// TODO: figure out how to pass in stuff like 'loop' and 'autoplay' from where graphic the component is invoked, without making them all seperate props, or actually now that i think about it maybe thats not bad

// TODO: have an easy-to-add solution for autoplay on scroll







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

var allVideos = [];

function Graphic({ className, innerClassName, type, img, background, color, children, lightbox, zoom, setPopup, width, height, effect, style, priority, onLoad, loop, muted, autoplay, controls, tabIndex }) {
  // TODO: for mobile, add some kind of indication animation of the image being clocked on when its interactable or can be opened in a lightbox

  var pref = "section--graphic";
  var isImg = type == "image" || type == "img";
  var isMask = type == "mask";
  var isVideo = type == "video";
  var backgroundClasses = getBackgroundClasses(pref, background);
  color = color ? `mask__${color}` : "";
  innerClassName = innerClassName ? innerClassName : "";
  className = className ? className : "";

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




  var reference = useRef(null);
  useMountEffect(() => {
    if(autoplay == 'scroll') {      
      var video = reference.current.querySelector('video');
      if(allVideos.includes(video)) return;
      allVideos.push(video);
      
      var observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      });
      observer.observe(video);
    }
    
  });
  
  var ap = autoplay == 'scroll' ? false : autoplay ? true : false; 


  return (
    <>
      {isImg && (
        <div className={`graphic--img ${allClasses}`} style={{ ...styleVariables, ...style }} ref={reference}
            {...(tabIndex != undefined ? { 'tabIndex': tabIndex } : {})}
        >
          {effect && <Effect effect={effect} />}
          <Image className={innerClassName} src={img.src} alt={img.alt} width={width} height={height} onClick={onClickHandler} priority={priority} onLoad={onLoad} />
          {children && children}
        </div>
      )}
      {isMask && (
        <div className={`graphic--mask ${allClasses}`} style={{ ...styleVariables, ...style }} ref={reference}
            {...(tabIndex != undefined ? { 'tabIndex': tabIndex } : {})}
        >
          {effect && <Effect effect={effect} />}
          <Mask className={`${innerClassName} ${color}`} src={img.src} alt={img.alt} width={width} height={height} onClick={onClickHandler} priority={priority} onLoad={onLoad} />
          {children && children}
        </div>
      )}
      {isVideo && (
        <div className={`graphic--video ${allClasses}`} style={{ ...styleVariables, ...style }} ref={reference}
            {...(tabIndex != undefined ? { 'tabIndex': tabIndex } : {})}
        >
          {effect && <Effect effect={effect} />}
          
          <video className={innerClassName} alt={img.alt} width={width} height={height} onClick={onClickHandler}  onLoad={onLoad} loop={loop} muted={muted} autoPlay={ap} controls={controls} >
            <source src={`.${img.src}`} type={`video/${img.type}`}></source>
          </video>


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

export default Graphic;
