import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Mask from "../utilities/Mask";
import { getHasBackground } from "./sections_utilities/IfHas";
import { getBackgroundClasses } from "./sections_utilities/GetClasses";

function Graphic({ className, innerClassName, type, img, background, color, children, lightbox, zoom, setPopup }) {


  // TODO: for mobile, add some kind of indication animation of the image being clocked on when its interactable or can be opened in a lightbox

  var pref = "section--graphic";
  var isImg = type == "image" || type == "img";
  var isMask = type == "mask";
  var backgroundClasses = getBackgroundClasses(pref, background);
  color = color ? `mask__${color}` : "";
  innerClassName = innerClassName ? innerClassName : "";
  className = className ? className : "";

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

    if(typeof lightbox == "object"){
      lightboxImg = lightbox;
    }

    // TODO: add loading indicator for lightbox images, and smoother transitions between non-zoomed images and zoomed images
    onClickHandler = () => {
      setPopup({ type: "lightbox", img: lightboxImg, zoom: zoom });
    };
  }

  var allClasses = `section--graphic graphic ${backgroundClasses} ${className} ${buttonClasses} ${lightbox ? "graphic__lightbox" : ""}`;

  return (
    <>
      {isImg && (
        <div className={`graphic--img ${allClasses}`} style={{ "--img-aspect-width": img.width, "--img-aspect-height": img.height }}>
          <Image className={innerClassName} src={img.src} alt={img.alt} width={img.width} height={img.height} onClick={onClickHandler} />
          {children && children}
        </div>
      )}
      {isMask && (
        <div className={`graphic--mask ${allClasses}`} style={{ "--mask-aspect-width": img.width, "--mask-aspect-height": img.height }}>
          <Mask className={`${innerClassName} ${color}`} src={img.src} alt={img.alt} width={img.width} height={img.height} onClick={onClickHandler} />
          {children && children}
        </div>
      )}
    </>
  );
}

Graphic.defaultProps = {
  type: "image",
};

Graphic.propTypes = {
  type: PropTypes.oneOf(["image", "img", "mask"]),
};

export default Graphic;
