// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it

import toggle, { simpleToggleOn } from "@/scripts/AnimationTools";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import { loading } from "@/data/ICONS";
import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";
import {
  canvasDrawImage,
  canvasImageSizeInit,
  canvasInit,
  canvasOnResize,
  canvasSetSize,
  canvasZoom,
  setCanvasImageLoaded,
} from "./popup_utilities/CanvasUtilities";
import { getImgGroup, imgLoading, lightboxInit, seekHandler, setPopupGroup, updatePopupNav } from "./popup_utilities/LightboxUtilities";
// import { catchKeys, closePopup, setSetPopupGlobal } from "./popup_utilities/PopupUtilities";
import { hiddenUIEnd } from "./popup_utilities/HiddenUIUtilities";
import { Graphic } from "@/components/sections/Sections";
import useBodyClass from "@/scripts/hooks/useBodyClass";
import useListener from "@/scripts/hooks/useListener";
import useToggle from "@/scripts/hooks/useToggle";
import { AnimatePresence, motion } from "framer-motion";
import useMouseMoving from "@/scripts/hooks/useMouseMoving";
import useHoverAndFocus from "@/scripts/hooks/useHoverAndFocus";
import useInputDown from "@/scripts/hooks/useInputDown";

//no more than 2 decimals
const startZoom = 0.95;
const minZoom = 0.95;
const maxZoom = 7.5;

function getPopupClasses(pop) {
  // Initialize arrays for class names
  var headerClassesArray = [];
  var contentClassesArray = [];
  var popupImgClassesArray = [];
  var popupContainerClassesArray = [];
  var popupContainerStyle = {};

  // Case 1: type is "lightbox"
  if (pop.type === "lightbox") {
    headerClassesArray.push("popup--header__condensed", "popup--nav__on");

    // Nested Case 1.1: zoom is true
    if (pop.zoom) {
      popupImgClassesArray.push("popup--img__lightbox-zoom");
      contentClassesArray.push("popup--content__lightbox-zoom");
      popupContainerClassesArray.push("popup__lightbox-zoom");
    }
    // Nested Case 1.2: zoom is false
    else {
      contentClassesArray.push("popup--content__lightbox");
      popupContainerClassesArray.push("popup__lightbox");
    }

    // Update popupContainerStyle for type "lightbox"
    popupContainerStyle = { "--img-aspect-width": pop.img.width, "--img-aspect-height": pop.img.height };
  }
  // Case 2: type is "interactive"
  else if (pop.type == "interactive") {
    headerClassesArray.push("popup--header__full");

    contentClassesArray.push("popup--content__interactive");
    popupContainerClassesArray.push("popup__interactive");
  }

  // Join the arrays to form final class strings
  var headerClasses = headerClassesArray.join(" ");
  var contentClasses = contentClassesArray.join(" ");
  var popupContainerClasses = popupContainerClassesArray.join(" ");
  var popupImgClasses = popupImgClassesArray.join(" ");

  return { headerClasses, contentClasses, popupContainerClasses, popupImgClasses, popupContainerStyle };
}

function Anim({ children, animation, condition, className }) {
  return (
    <AnimatePresence>
      {condition && (
        <>
          <motion.div
            initial={animation.in.initial}
            animate={animation.in.animate}
            exit={animation.out.exit}
            transition={animation.in.transition}
            className={className ? className : ""}>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Popup({ pop }) {
  const wrapperAnimation = {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.25 },
    },

    out: {
      animate: { opacity: 0 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 },
    },
  };

  return (
    <>
      <Anim animation={wrapperAnimation} condition={pop.on} className={"popup--wrapper"}>
        <Wrapper pop={pop} />
      </Anim>
      {/* <AnimatePresence>
        {pop.on && (
          <>
            <motion.div
              initial={animate.in.initial}
              animate={animate.in.animate}
              exit={animate.out.exit}
              transition={animate.in.transition}
              className="popup--wrapper">
              <Wrapper pop={pop} />
            </motion.div>
          </>
        )}
      </AnimatePresence> */}
    </>
  );
}

function Wrapper({ pop }) {
  var { headerClasses, contentClasses, popupContainerClasses, popupImgClasses, popupContainerStyle } = getPopupClasses(pop);

  useBodyClass("noscroll", pop.on);
  useListener("resize", popupResize, pop.on);
  // useListener("keydown", catchKeys, popup);

  const nav = useNavControls(seekHandler);
  const mouseMoving = useMouseMoving(null, 0);
  const closeHovered = useHoverAndFocus(nav.close.ref);
  const interaction = useInputDown(["ArrowRight", "ArrowLeft", "LeftMouse", "RightMouse", "Scroll"]);

  useEffect(() => {
    if (mouseMoving || closeHovered || interaction) {
      pop.ui.setVisible(true);
    } else {
      const timeoutId = setTimeout(() => {
        pop.ui.setVisible(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [mouseMoving, closeHovered, interaction]);

  useEffect(() => {
    if (pop.on) {
      if (pop.type == "interactive") canvasInit(pop);
      if (pop.type == "lightbox") lightboxInit(pop);
    } else {
      setCanvasImageLoaded(false);
      pop.setGroup(false);
      pop.setIndex(false);
    }
  }, [pop.on]);

  useEffect(() => {
    updatePopupNav(pop, nav);
  }, [pop.group, pop.index]);

  return (
    <>
      <Background closeHandler={closeHandler} />
      <div className={`popup container ${popupContainerClasses}`} style={popupContainerStyle}>
        <div className="popup--inner">
          {pop.type == "lightbox" && <Seek direction="left" nav={nav} />}

          <div className={`popup--content popup--content__on ${contentClasses}`}>
            <Head pop={pop} nav={nav} headerClasses={headerClasses} closeHandler={closeHandler} />

            {pop.type == "interactive" && <canvas className="popup--canvas popup--canvas__off" />}
            {pop.type == "lightbox" && <Graphic className={`popup--media ${popupImgClasses}`} img={pop.img} type={pop.img.media} autoplay controls />}

            {/* <div className={`popup--loading popup--loading__off`}>
                <img src={loading.src} alt={loading.alt} width={loading.width} height={loading.height} />
              </div>
   */}
            {pop.type == "interactive" && <ScaleWrapper pop={pop} nav={nav} />}
          </div>

          {pop.type == "lightbox" && <Seek direction="right" nav={nav} />}
        </div>
      </div>
    </>
  );

  function closeHandler() {
    pop.setOn(false);
  }

  function seekHandler(e) {
    var button;

    if (e.type == "keydown") {
      if (e.key == "ArrowRight") {
        button = document.querySelector(".popup--seek__right");
      }
      if (e.key == "ArrowLeft") {
        button = document.querySelector(".popup--seek__left");
      }
    } else {
      button = e.target;
      while (!button.classList.contains("popup--seek")) {
        button = button.parentElement;
      }
    }

    var direction = button.classList.contains("popup--seek__right") ? 1 : -1;

    var length = pop.group.imgs.length;

    var ind = pop.index;
    ind += direction;

    if (ind >= length) ind = 0;
    if (ind < 0) ind = length - 1;

    pop.setIndex(ind);
    pop.setImg(pop.group.imgs[ind]);
    pop.setZoom(pop.img.zoom ? pop.img.zoom : false);
    pop.setType("lightbox");
  }
}

function Background({ closeHandler }) {
  return <div className="popup--background" onClick={closeHandler}></div>;
}

function Head({ pop, nav, headerClasses, closeHandler }) {
  return (
    <>
      <div className={`popup--header ${headerClasses} popup--nav`}>
        <Title pop={pop} />
        <Close pop={pop} nav={nav} closeHandler={closeHandler} />
      </div>
    </>
  );
}

function Title({ pop }) {
  return (
    <>
      {pop.type == "interactive" && (
        <div className="popup--title">
          <h3>{pop.img.title}</h3>
        </div>
      )}
    </>
  );
}

// function Seek({ direction, nav }) {
//   const dur = 0.15;

//   const btnIn = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1 },
//     transition: { duration: dur },
//   };

//   const btnOut = {
//     animate: { opacity: 0 },
//     exit: { opacity: 0 },
//     transition: { duration: dur },
//   };

//   var btn = direction == "left" ? nav.left : nav.right;

//   return (
//     <div className={`popup--seek popup--seek__${direction} ${btn.classList}`} ref={btn.ref}>
//       <AnimatePresence>
//         {btn.on && (
//           <motion.div key={`${direction}Button`} initial={btnIn.initial} animate={btnIn.animate} exit={btnOut.exit} transition={btnIn.transition}>
//             <Button
//               icon={[`chevron_${direction}`, "alone", "mask"]}
//               animation={`pulse-${direction}`}
//               color="background-primary"
//               onClick={btn.seekHandler}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

function Seek({ direction, nav }) {
  const dur = 0.15;

  const btnAnimation = {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: dur },
    },
    out: {
      animate: { opacity: 0 },
      exit: { opacity: 0 },
      transition: { duration: dur },
    },
  };

  var btn = direction === "left" ? nav.left : nav.right;

  return (
    <div className={`popup--seek popup--seek__${direction} ${btn.classList}`} ref={btn.ref}>
      <Anim animation={btnAnimation} condition={btn.on}>
        <Button
          icon={[`chevron_${direction}`, "alone", "mask"]}
          animation={`pulse-${direction}`}
          color="background-primary"
          onClick={btn.seekHandler}
        />
      </Anim>
    </div>
  );
}

function HiddenUi({ children, nav, className }) {
  return (
    <motion.div
      className={className ? className : ""}
      initial={nav.animate.hideUI.in.initial}
      animate={nav.animate.hideUI.in.animate}
      exit={nav.animate.hideUI.out.exit}
      transition={nav.animate.hideUI.in.transition}>
      {children}
    </motion.div>
  );
}

function Close({ pop, nav, closeHandler }) {
  const condition = pop.ui.visible || pop.type === "interactive";

  return (
    <Anim animation={nav.animate.hideUI} condition={condition} className="">
      <div className="popup--close" ref={nav.close.ref}>
        <Button icon={["close", "alone", "mask"]} animation="scale-in" color="transparent-primary" onClick={closeHandler} />
      </div>
    </Anim>
  );
}

// function Close({ pop, nav, closeHandler }) {
//   return (
//     <>
//       <AnimatePresence>
//         {(pop.ui.visible || pop.type == "interactive") && (
//           <HiddenUi nav={nav}>
//             <div className="popup--close" ref={nav.close.ref}>
//               <Button icon={["close", "alone", "mask"]} animation="scale-in" color="transparent-primary" onClick={closeHandler} />
//             </div>
//           </HiddenUi>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

function ScaleWrapper({ pop, nav }) {
  const condition = pop.ui.visible;

  return (
    <Anim animation={nav.animate.hideUI} condition={condition} className="popup--footer popup--nav">
      <Scale className="popup--scale" pop={pop} nav={nav} />
    </Anim>
  );
}

// function ScaleWrapper({ pop, nav }) {
//   return (
//     <>
//       <AnimatePresence>
//         {pop.ui.visible && (
//           <HiddenUi nav={nav} className="popup--footer popup--nav">
//             <Scale className="popup--scale" pop={pop} nav={nav} />
//           </HiddenUi>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

function Scale({ pop, nav, className }) {
  var def = 10;

  return (
    <div className={`scale ${className ? className : ""}`} ref={nav.scale.ref}>
      <div className="scale--zoom scale--minus">
        <Button id="zoom-out" icon={["minus", "alone", "mask"]} animation="scale-out" color="transparent-primary" onClick={canvasZoom} />
      </div>

      <div className="scale--slider">
        <div className="scale--end"></div>
        <input type="range" min={minZoom * 100} max={maxZoom * 100} defaultValue={def} className="scale--input" id="popupZoom" onInput={canvasZoom} />
        <div className="scale--end"></div>
      </div>

      <div className="scale--zoom scale--plus">
        <Button id="zoom-in" icon={["plus", "alone", "mask"]} animation="scale-out" color="transparent-primary" onClick={canvasZoom} />
      </div>
    </div>
  );
}

function useNavControls(seekHandler) {
  const [navRightOn, setNavRightOn] = useState(false);
  const [navLeftOn, setNavLeftOn] = useState(false);
  const [navRightClasses, setNavRightClasses] = useState("popup--seek__on");
  const [navLeftClasses, setNavLeftClasses] = useState("popup--seek__on");
  const navRightRef = useRef(null);
  const navLeftRef = useRef(null);

  const [navCloseOn, setNavCloseOn] = useState(false);
  const navCloseRef = useRef(null);

  const [navScaleOn, setNavScaleOn] = useState(false);
  const navScaleRef = useRef(null);

  return {
    left: {
      on: navLeftOn,
      setOn: setNavLeftOn,
      ref: navLeftRef,
      classList: navLeftClasses,
      setClassList: setNavLeftClasses,
      seekHandler: (e) => {
        seekHandler(e);
      },
    },
    right: {
      on: navRightOn,
      setOn: setNavRightOn,
      ref: navRightRef,
      classList: navRightClasses,
      setClassList: setNavRightClasses,
      seekHandler: (e) => {
        seekHandler(e);
      },
    },
    close: {
      on: navCloseOn,
      setOn: setNavCloseOn,
      ref: navCloseRef,
    },
    scale: {
      on: navScaleOn,
      setOn: setNavScaleOn,
      ref: navScaleRef,
    },
    animate: {
      hideUI: {
        in: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2 },
        },

        out: {
          animate: { opacity: 0 },
          exit: { opacity: 0 },
          transition: { duration: 1.15 },
        },
      },
    },
  };
}

var isResizing;

function popupResize() {
  window.clearTimeout(isResizing);
  isResizing = setTimeout(popupResizeFunctions, RESIZE_TIMEOUT);
}

function popupResizeFunctions() {
  if (pop.type == "interactive") canvasOnResize();
}

export default Popup;

// export { waitToLoad, setWaitingToShowLoading };

export { startZoom, minZoom, maxZoom };
