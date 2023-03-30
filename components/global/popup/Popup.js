// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click
// TODO: this should either be pre-fetched or otherwise loaded in before the user clicks on it

import toggle, { simpleToggleOn } from "@/scripts/AnimationTools";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { AnimatePresence, motion, useAnimation, useIsPresent } from "framer-motion";
import useMouseMoving from "@/scripts/hooks/useMouseMoving";
import useHoverAndFocus from "@/scripts/hooks/useHoverAndFocus";
import useInputDown from "@/scripts/hooks/useInputDown";

//no more than 2 decimals
const startZoom = 0.95;
const minZoom = 0.95;
const maxZoom = 7.5;

const seekDuration = 0.165;

const anims = {
  popupBounce: {
    in: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.25 },
    },

    out: {
      animate: { opacity: 0, scale: 0.95 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.25 },
    },
  },
  popupFade: {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.15 },
    },

    out: {
      animate: { opacity: 0 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 },
    },
  },
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

  changeImg: {
    in: {
      initial: { translateX: "1rem", opacity: 0 },
      animate: { translateX: "0rem", opacity: 1 },
      transition: { duration: seekDuration, ease: "easeInOut" },
    },
    out: {
      animate: { translateX: "0rem", opacity: 1 },
      exit: { translateX: "-1rem", opacity: 0 },
      transition: { duration: seekDuration, ease: "easeInOut" },
    },
  },

  wipe: {
    in: {
      initial: { clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" },
      animate: { clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" },
      transition: { duration: 0.15 },
    },
    out: {
      animate: { clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" },
      exit: { clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)" },
      transition: { duration: 0.15 },
    },
  },

  hideBtns: {
    in: {
      initial: { opacity: 0.5, cursor: "default" },
      animate: { opacity: 1, cursor: "pointer" },
      transition: { duration: 0.15 },
    },
    out: {
      animate: { opacity: 0.5, cursor: "default" },
      exit: { opacity: 0.5, cursor: "default" },
      transition: { duration: 0.15 },
    },
  },
};

const classAnims = {
  hideBtns: {
    in: "popup--seek__on",
    out: "popup--seek__off",
  },
};

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
    if (!pop.zoom) {
      contentClassesArray.push("popup--content__lightbox");
      popupContainerClassesArray.push("popup__lightbox");
    }

    // Nested Case 1.3: group is true
    if (pop.group) {
      popupContainerClassesArray.push("popup__lightbox-group");
      contentClassesArray.push("popup--content__lightbox-group");
    }
    // Nested Case 1.4: group is false
    if (!pop.group) {
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

function Popup({ pop }) {
  return (
    <>
      <AnimPres animation={anims.popupFade} condition={pop.on} className={"popup--wrapper"}>
        <Wrapper pop={pop} />
      </AnimPres>
    </>
  );
}

function Wrapper({ pop }) {
  var { headerClasses, contentClasses, popupContainerClasses, popupImgClasses, popupContainerStyle } = getPopupClasses(pop);

  useBodyClass("noscroll", pop.on);
  useListener("resize", popupResize, pop.on);
  useListener("keydown", seekHandlerWithKeydown, pop.on);

  const nav = useNavControls(seekHandler);
  const mouseMoving = useMouseMoving(null, 1000);
  const closeHovered = useHoverAndFocus(nav.close.ref);
  const input = useInputDown(["ArrowRight", "ArrowLeft", "LeftMouse", "RightMouse", "Scroll"]);

  const interaction = useMemo(() => {
    return mouseMoving || closeHovered || input;
  }, [mouseMoving, closeHovered, input]);

  useEffect(() => {
    if (interaction) {
      pop.ui.setVisible(true);
    } else {
      const timeoutId = setTimeout(() => {
        pop.ui.setVisible(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [interaction]);

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

  // useEffect(() => {
  //   if (pop.on && pop.type === 'lightbox' && pop.group) {
  //     preloadImages(pop.group.imgs);
  //   }
  // }, [pop.on, pop.type, pop.group]);

  // function preloadImages(images) {
  //   images.forEach((image) => {
  //     const img = document.createElement("img");
  //     img.src = image.src;
  //     console.log(img);
  //   });
  // }

  // TODO: add pagination indicator to the bottom of the popup
  // TODO: add new popup type for explorations page

  const [seekCooldown, setSeekCooldown] = useState(false);

  return (
    <>
      <Background closeHandler={closeHandler} />
      <div className={`popup container ${popupContainerClasses}`} style={popupContainerStyle}>
        <div className="popup--inner">
          <div className={`popup--content popup--content__on ${contentClasses}`}>
            <Head pop={pop} nav={nav} headerClasses={headerClasses} closeHandler={closeHandler} />

            {pop.type == "interactive" && <canvas className="popup--canvas popup--canvas__off" />}

            {pop.type == "lightbox" && (
              <>
                <LightboxContent pop={pop} popupImgClasses={popupImgClasses} />
              </>
            )}

            {/* <div className={`popup--loading popup--loading__off`}>
                <img src={loading.src} alt={loading.alt} width={loading.width} height={loading.height} />
              </div>
   */}
            {pop.type == "interactive" && <ScaleWrapper pop={pop} nav={nav} />}
          </div>

          {/* TODO: whether or not group is there is gonna affect some classes that you gotta write */}
          {pop.type == "lightbox" && pop.group && (
            <div className="popup--controls">
              <Seek direction="left" nav={nav} />
              <Pagination pop={pop} />
              <Seek direction="right" nav={nav} />
            </div>
          )}
        </div>
      </div>
    </>
  );

  function closeHandler() {
    pop.setOn(false);
  }

  function seekHandlerWithKeydown(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      seekHandler(e, e.key === "ArrowRight" ? 1 : -1);
    }
  }

  function seekHandler(e, direction) {
    // Check if the handler is on cooldown
    if (seekCooldown) {
      return;
    }

    // Set the handler on cooldown
    setSeekCooldown(true);

    // Implement the original seekHandler logic
    var button;

    if (e.type === "click") {
      button = e.target;
      while (!button.classList.contains("popup--seek")) {
        button = button.parentElement;
      }
      direction = direction ? direction : button.classList.contains("popup--seek__right") ? 1 : -1;
    }

    var length = pop.group.imgs.length;

    var ind = pop.index;
    ind += direction;

    if (ind >= length) ind = 0;
    if (ind < 0) ind = length - 1;

    pop.setIndex(ind);
    pop.setImg(pop.group.imgs[ind]);
    pop.setZoom(pop.img.zoom ? pop.img.zoom : false);
    pop.setType("lightbox");

    // Set a timeout to remove the cooldown status after a specified duration
    setTimeout(() => {
      setSeekCooldown(false);
    }, seekDuration * 1.75 * 1000); // Adjust the cooldown time (in ms) as needed
  }

  var isResizing;

  function popupResize() {
    window.clearTimeout(isResizing);
    isResizing = setTimeout(popupResizeFunctions, RESIZE_TIMEOUT);
  }

  function popupResizeFunctions() {
    if (pop.type == "interactive") canvasOnResize();
  }
}

function LightboxContent({ pop, popupImgClasses }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pop.img.src}
        initial={anims.changeImg.in.initial}
        animate={anims.changeImg.in.animate}
        exit={anims.changeImg.out.exit}
        transition={anims.changeImg.in.transition}>
        <Graphic
          className={`popup--media ${popupImgClasses}`}
          img={pop.img}
          type={pop.img.media}
          autoplay
          controls
          style={{ "--aspect-width": pop.img.width, "--aspect-height": pop.img.height }}
        />
      </motion.div>
    </AnimatePresence>
  );
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

function Seek({ direction, nav }) {
  var btn = direction === "left" ? nav.left : nav.right;

  return (
    <div className={`popup--seek popup--seek__${direction} ${btn.classList}`} ref={btn.ref}>
      <Anim animation={classAnims.hideBtns} condition={btn.on}>
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

function Close({ pop, nav, closeHandler }) {
  const condition = pop.ui.visible || pop.type === "interactive";

  return (
    <AnimPres animation={anims.hideUI} condition={condition} className="">
      <div className="popup--close" ref={nav.close.ref}>
        <Button icon={["close", "alone", "mask"]} animation="scale-in" color="transparent-primary" onClick={closeHandler} />
      </div>
    </AnimPres>
  );
}

function ScaleWrapper({ pop, nav }) {
  const condition = pop.ui.visible;

  return (
    <AnimPres animation={anims.hideUI} condition={condition} className="popup--footer popup--nav">
      <Scale className="popup--scale" pop={pop} nav={nav} />
    </AnimPres>
  );
}

function Scale({ pop, nav, className }) {
  var def = 10;

  return (
    <div className={`scale ${className ? className : ""}`}>
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

const Pagination = React.memo(
  function Pagination({ pop }) {
    return (
      <div className="popup--pagination">
        {pop.group?.imgs?.map((img, i) => {
          return (
            <>
              <Circle
                active={i === pop.index}
                key={i}
                onClick={() => {
                  pop.setIndex(i);
                  pop.setImg(pop.group.imgs[i]);
                  pop.setZoom(pop.img.zoom ? pop.img.zoom : false);
                  pop.setType("lightbox");
                }}
              />
            </>
          );
        })}
      </div>
    );

    function Circle({ active, onClick }) {
      const classes = active ? "popup--circle__active" : "popup--circle__inactive";
      return (
        <>
          <a className={`popup--circle ${classes}`} onClick={onClick}>
            <div className="popup--circle-inner"></div>
          </a>
        </>
      );
    }
  },
  (prevProps, nextProps) => {
    // Only re-render if any of the specific properties we care about change
    return !(prevProps.pop.group !== nextProps.pop.group || prevProps.pop.index !== nextProps.pop.index);
  }
);

function useNavControls(seekHandler) {
  const [navRightOn, setNavRightOn] = useState(false);
  const [navLeftOn, setNavLeftOn] = useState(false);
  const [navRightClasses, setNavRightClasses] = useState("popup--seek__on");
  const [navLeftClasses, setNavLeftClasses] = useState("popup--seek__on");

  const navCloseRef = useRef(null);

  return {
    left: {
      on: navLeftOn,
      setOn: setNavLeftOn,
      classList: navLeftClasses,
      setClassList: setNavLeftClasses,
      seekHandler: (e) => {
        seekHandler(e);
      },
    },
    right: {
      on: navRightOn,
      setOn: setNavRightOn,
      classList: navRightClasses,
      setClassList: setNavRightClasses,
      seekHandler: (e) => {
        seekHandler(e);
      },
    },
    close: {
      ref: navCloseRef,
    },
    scale: {},
  };
}

function AnimPres({ children, animation, condition, className, style }) {
  return (
    <AnimatePresence>
      {condition && (
        <>
          <motion.div
            initial={animation.in.initial}
            animate={animation.in.animate}
            exit={animation.out.exit}
            transition={animation.in.transition}
            className={className ? className : ""}
            style={style ? style : {}}>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Anim({ children, animation, condition, className, style }) {
  const controls = useAnimation();

  const [classList, setClassList] = useState((className ? className : "").split(" "));
  const [classNames, setClassNames] = useState(className ? className : "");

  const classes = {
    list: classList,
    setList: setClassList,
    names: classNames,
    setNames: setClassNames,
  };

  useEffect(() => {
    if (condition) {
      if (typeof animation.in === "string") {
        addClass(animation.in, animation.out);
      } else {
        controls.start(animation.in.animate);
      }
    } else {
      if (typeof animation.out === "string") {
        addClass(animation.out, animation.in);
      } else {
        controls.start(animation.out.exit);
      }
    }
  }, [condition, animation, controls]);

  useEffect(() => {
    classes.setNames(classes.list.join(" "));
  }, [classes.list]);

  function addClass(newClass, oppositeClass) {
    classes.setList((prevClassList) => {
      let updatedClassList = prevClassList.filter((cls) => cls !== oppositeClass);
      if (!updatedClassList.includes(newClass)) {
        updatedClassList.push(newClass);
      }
      return updatedClassList;
    });
  }

  return (
    <motion.div animate={controls} className={classNames} style={style ? style : {}}>
      {children}
    </motion.div>
  );
}

export default Popup;

// export { waitToLoad, setWaitingToShowLoading };

export { startZoom, minZoom, maxZoom };
