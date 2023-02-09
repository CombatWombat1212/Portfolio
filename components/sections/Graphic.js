import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Mask from "../utilities/Mask";
import {getHasBackground, getBackgroundClasses} from "./sections_utilities/GetBackgrounds";



function Graphic({ className, type, img, background, children }) {
    var pref = "section--graphic";
    var isImg = type == "image";
    var isMask = type == "mask";
    var hasBackground = getHasBackground(background);
    var backgroundClasses = getBackgroundClasses(pref, background);
  
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
  
    // TODO: if you end up using this 'img-aspect-width' thing in multiple places then you should create a wrapper for Next/Image that automatically adds it to your image components, same as its done here and within the Mask component
  
    return (
      <>
        {isImg && (
          <div className={`section--graphic graphic ${backgroundClasses} ${className ? className : ''} ${hasButton ? 'graphic__container' : ''}`} style={{ "--img-aspect-width": img.width, "--img-aspect-height": img.height }}>
            <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />
            {children && children}
          </div>
        )}
        {isMask && (
          <div className={`section--graphic graphic ${backgroundClasses} ${className ? className : ''} ${hasButton ? 'graphic__container' : ''}`} style={{ "--mask-aspect-width": img.width, "--mask-aspect-height": img.height }}>
            <Mask src={img.src} alt={img.alt} width={img.width} height={img.height} />
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
    type: PropTypes.oneOf(["image", "mask"]),
  };
  
  
  

  export default Graphic;