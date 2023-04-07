import { AnimatePresence, motion, useAnimation, useIsPresent, wrap } from "framer-motion";

import Tag from "@/components/elements/Tag";
import { createUpdateConditions } from "@/scripts/GlobalUtilities";
import React, { useEffect, useRef, useState } from "react";
import AnimPres from "../../AnimPres";
import popAnims, { popLayoutTransition } from "../popup_utilities/PopupAnimations";
import useDelayedProps from "@/scripts/hooks/useDelayedProps";
import { Close } from "../Popup";
import useHasScrollbar from "@/scripts/hooks/useHasScrollbar";
import Button from "@/components/elements/Buttons";
import useFlexWrapped from "@/scripts/hooks/useFlexWrapped";
import useElementHeight from "@/scripts/hooks/useElementHeight";
import useFlexRows from "@/scripts/hooks/useFlexRows";
import useHoverAndFocus from "@/scripts/hooks/useHoverAndFocus";
import useHasOverflow from "@/scripts/hooks/useHasOverflow";
import useElementStyle from "@/scripts/hooks/useElementStyle";
import useOffsetTop from "@/scripts/hooks/useOffsetTop";
import { STUDY_LINKS } from "@/data/CASE_STUDIES";

const GalInfo = React.memo(function GalInfo({ pop, popclass, elems, nav, handles }) {
  var title, subheading;
  if (pop.img.project) {
    title = pop.img.project;
    subheading = pop.img.title;
  } else if (pop.img.title) {
    title = pop.img.title;
  } else {
    title = false;
  }

  // might have to add elems.img.maxHeight to dependencies idk
  const styles = {
    description: {
      "--gallery-img-height": `${elems.img.height != 0 && elems.img.height}px`,
      "--gallery-img-max-height": `${elems.img.maxHeight != 0 && elems.img.maxHeight}px`,
    },
  };

  var hasDesc = pop.img.description || (pop.group.description && pop.group.description[pop.index]);
  var hasTitle = title ? true : false;

  const scrollbar = useHasScrollbar(elems.desc.ref, {
    observer: true,
    debounceTime: 10,
    repeatChecks: 10,
    repeatChecksDebounceTime: 4,
  });

  const scrollbarClasses = scrollbar ? "popup--description__gallery-scrollbar scrollbar" : "";

  const [catData, setCatData] = useState({});

  const handleCatDataChange = (key, value) => {
    const keyParts = key.split(".");
    setCatData((prevCatData) => {
      if (keyParts.length === 2) {
        const [parentKey, childKey] = keyParts;
        return {
          ...prevCatData,
          [parentKey]: {
            ...prevCatData[parentKey],
            [childKey]: value,
          },
        };
      } else {
        return {
          ...prevCatData,
          [key]: value,
        };
      }
    });
  };


  return (
    <>
      <motion.div
        layout="position"
        transition={{
          // y: { duration: 0.5 },
          layout: { duration: popLayoutTransition },
        }}
        className="popup--info">
        {pop.firstImgDrawn && (
          <AnimPres
            mode="wait"
            fragment
            animation={popAnims.slideFade}
            // delay={0.55}
            condition={true}
            reference={elems.desc.ref}
            className={`popup--description ${popclass.desc} ${scrollbarClasses}`}
            style={styles.description}
            onAnimationComplete={() => {
              pop.setInfoDrawn(true);
            }}>
            {title && <h3 type="h3" className="gallery--title" dangerouslySetInnerHTML={{ __html: title }} />}
            {subheading && <h5 className="gallery--subheading">{subheading}</h5>}

            <div className="gallery--info">
              {(pop.img.disciplines || pop.img.tools) && (
                <GalCategories pop={pop} hasDesc={hasDesc} hasTitle={hasTitle} onCatDataChange={handleCatDataChange} />
              )}
              {pop.img.study && (
                <Button
                  icon={["arrow_right", "right", "mask"]}
                  color={"background-tertiary"}
                  animation={"pulse-right"}
                  className="gallery--button"
                  href={STUDY_LINKS.find((link) => link.toLowerCase().includes(pop.img.study.toLowerCase()))}
                  onClick={handles.close}>
                  View Study
                </Button>
              )}
              {hasDesc && <GalDescription pop={pop} />}
            </div>
          </AnimPres>
        )}

        {pop.firstImgDrawn && pop.infoDrawn && <Close pop={pop} nav={nav} handles={handles} popclass={popclass} type="gallery" />}

        {(pop.img.disciplines || pop.img.tools) && (
          <div
            className={`gallery--categories-background
        ${scrollbar ? "gallery--categories-background__scrollbar" : ""}
        ${catData?.hovered || catData.ellipse?.hovered ? "gallery--categories-background__hovered" : ""}
        `}
            style={{
              "--categories-top": `${catData.wrapper?.top}px`,
              "--tag-height": `${catData.tag?.height}px`,
            }}></div>
        )}
      </motion.div>
    </>
  );
}, createUpdateConditions(["pop.index", "pop.img", "elems.img.height", "pop.firstImgDrawn", "pop.infoDrawn"]));
// }, createUpdateConditions(["pop.index", "pop.img", "elems.img.height"]));

const GalCategories = React.memo(function GalCategories({ pop, hasDesc, hasTitle, onCatDataChange }) {
  const catRef = useRef(null);
  const wrapperRef = useRef(null);
  const firstTagRef = useRef(null);
  const ellipseRef = useRef(null);
  const catRefHovered = useHoverAndFocus(catRef);
  const ellipseHovered = useHoverAndFocus(ellipseRef);

  const cat = {
    ref: catRef,
    hovered: catRefHovered,
    wrapper: {
      ref: wrapperRef,
      overflow: useHasOverflow(wrapperRef, { observer: true, repeatChecks: 4, repeatCheckDebounceTime: 10 }),
      top: useOffsetTop(wrapperRef, { observer: true, repeatChecks: 4, repeatCheckDebounceTime: 10 }),
    },
    tag: {
      ref: firstTagRef,
      height: useElementHeight(firstTagRef, { border: true }),
    },
    ellipse: {
      ref: ellipseRef,
      hovered: ellipseHovered,
    },
  };

  useEffect(() => {
    if (onCatDataChange) {
      onCatDataChange("wrapper.top", cat.wrapper.top);
    }
  }, [cat.wrapper.top]);

  useEffect(() => {
    if (onCatDataChange) {
      onCatDataChange("tag.height", cat.tag.height);
    }
  }, [cat.tag.height]);
  useEffect(() => {
    if (onCatDataChange) {
      onCatDataChange("hovered", cat.hovered);
    }
  }, [cat.hovered]);
  useEffect(() => {
    if (onCatDataChange) {
      onCatDataChange("ellipse.hovered", cat.ellipse.hovered);
    }
  }, [cat.ellipse.hovered]);

  const controls = useAnimation();

  const [animationCompleted, setAnimationCompleted] = useState(true);
  const [calculatedX, setCalculatedX] = useState(0);

  const handleMouseEnter = () => {
    setAnimationCompleted(false);

    // const width = cat.ref.current.offsetWidth;
    // const scrollWidth = cat.ref.current.scrollWidth;
    // const duration = (scrollWidth - width) * 0.0075; // Adjust the multiplier to control speed

    const width = cat.ref.current.offsetWidth;
    const scrollWidth = cat.ref.current.scrollWidth;
    const scrollPosition = (() => {
      var trans = window.getComputedStyle(cat.ref.current).getPropertyValue("transform");
      if (trans == "none" || trans == "matrix(1, 0, 0, 1, 0, 0)" || trans == "" || trans == undefined) {
        return 0;
      }
      if (trans.includes("matrix")) {
        trans = Math.abs(parseFloat(trans.split(",")[4].trim()));
        return trans;
      }
      return 0;
    })();
    
    const remainingScroll = scrollWidth - width - scrollPosition;
    const duration = remainingScroll * 0.0075; // Adjust the multiplier to control speed

    if (animationCompleted) {
      setCalculatedX(-scrollWidth + width - scrollPosition);
    }

    controls.start({
      x: calculatedX,
      transition: { duration, ease: "linear" },
    });
  };

  const handleMouseLeave = () => {
    const width = cat.ref.current.offsetWidth;
    const scrollWidth = cat.ref.current.scrollWidth;
    const duration = (scrollWidth - width) * 0.0075 * 0.5; // Adjust the multiplier to control speed

    controls.start({
      x: 0,
      transition: {
        duration: duration,
        ease: "easeOut",
        onComplete: () => setAnimationCompleted(true),
      }, // Adjust the duration for the transition
    });
  };

  var catclasses = [];

  if (hasDesc) {
  } else {
    catclasses.push("gallery--categories-wrapper__no-desc");
  }

  if (hasTitle) {
  } else {
    catclasses.push("gallery--categories-wrapper__no-title");
  }

  catclasses = catclasses.join(" ");

  useEffect(() => {
    return () => {
      setLockedOverflow(false);
    };
  }, []);

  const [lockedOverflow, setLockedOverflow] = useState(false);

  useEffect(() => {
    if (cat.ellipse.hovered || cat.hovered) {
      setLockedOverflow(cat.ellipse.hovered || cat.hovered);
    }
  }, [cat.ellipse.hovered, cat.hovered]);

  var j = 0;

  return (
    <div
      className={`gallery--categories-wrapper  ${catclasses}
    ${cat.wrapper.overflow || lockedOverflow ? "gallery--categories-wrapper__overflow" : "gallery--categories-wrapper__no-overflow"}
    `}
      ref={cat.wrapper.ref}
      style={{
        "--categories-top": `${cat.wrapper.top}px`,
        "--tag-height": `${cat.tag.height}px`,
      }}>
      <motion.div className={`gallery--categories`} ref={cat.ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} animate={controls}>
        <div
          className={`gallery--categories-inner 
          ${cat.wrapper.overflow || lockedOverflow ? "gallery--categories-inner__overflow" : "gallery--categories-inner__no-overflow"}`}>
          {pop.img.disciplines.map((item, i) => {
            j++;
            return (
              <Tag key={`${item.key} ${i}`} color={"inverted"} {...(j == 1 ? { reference: cat.tag.ref } : {})}>
                {item}
              </Tag>
            );
          })}
          {pop.img.tools.map((item, i) => {
            j++;
            return (
              <Tag key={`${item.key} ${i}`} color={"inverted"} variant={"tool"} {...(j == 1 ? { reference: cat.tag.ref } : {})}>
                {item}
              </Tag>
            );
          })}
        </div>
      </motion.div>
      {(cat.wrapper.overflow || lockedOverflow) && (
        <div className={`gallery--ellipse`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={ellipseRef}>
          <span>...</span>
        </div>
      )}
    </div>
  );
}, createUpdateConditions(["pop.index", "pop.img"]));

const GalDescription = React.memo(function GalDescription({ pop }) {
  var descs = pop.img.description ? pop.img.description : pop.group.description[pop.index];
  return (
    <>
      <div className="gallery--description">
        {descs.map((d, i) => {
          return (
            <p key={i} className="gallery--paragraph">
              {d}
            </p>
          );
        })}
      </div>
    </>
  );
}, createUpdateConditions(["pop.img", "pop.index"]));

function GalStudy({ pop }) {
  return <></>;
}

export { GalInfo, GalCategories, GalDescription };
