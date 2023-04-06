import { AnimatePresence, motion, useAnimation, useIsPresent } from "framer-motion";

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
    debounceTime: 0,
    repeatChecks: 3,
    repeatChecksDebounceTime: 100,
  });
  const scrollbarClasses = scrollbar ? "popup--description__gallery-scrollbar" : "";

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
              {(pop.img.disciplines || pop.img.tools) && <GalCategories pop={pop} hasDesc={hasDesc} hasTitle={hasTitle} />}

              {hasDesc && <GalDescription pop={pop} />}
              {pop.img.study && <GalStudy pop={pop} />}
            </div>
          </AnimPres>
        )}

        {pop.firstImgDrawn && pop.infoDrawn && <Close pop={pop} nav={nav} handles={handles} popclass={popclass} type="gallery" />}
      </motion.div>
    </>
  );
}, createUpdateConditions(["pop.index", "pop.img", "elems.img.height", "pop.firstImgDrawn", "pop.infoDrawn"]));
// }, createUpdateConditions(["pop.index", "pop.img", "elems.img.height"]));

const GalCategories = React.memo(function GalCategories({ pop, hasDesc, hasTitle }) {
  // var catclasses = hasDesc ? "" : "gallery--categories__no-desc";
  var catclasses = [];

  if (hasDesc) {
  } else {
    catclasses.push("gallery--categories__no-desc");
  }

  if (hasTitle) {
  } else {
    catclasses.push("gallery--categories__no-title");
  }

  catclasses = catclasses.join(" ");

  const catRef = useRef(null);
  const firstTagRef = useRef(null);

  const cat = {
    ref: catRef,
    flex: useFlexRows(catRef, { observer: true, repeatChecks: 3, repeatCheckDebounceTime: 10 }),
    hovered: useHoverAndFocus(catRef),
    tag: {
      ref: firstTagRef,
      height: useElementHeight(firstTagRef, { border: true }),
    },
  };

  useEffect(() => {
    console.log(`cat.hovered: ${cat.hovered}`);
  }, [cat.hovered]);

  var j = 0;

  return (
    <div
      className={`gallery--categories ${catclasses}`}
      ref={cat.ref}
      style={{
        "--tag-height": `${cat.tag.height}px`,
        "--categories-rows": `${cat.flex}`,
        // "--categories-flexxed": `${cat.flex !== 0 && cat.flex !== 1 ? "1" : "0" }`,
        "--categories-hovered": `${cat.hovered ? "1" : "0" }`,
      }}>
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
      {cat.flex !== 0 && cat.flex !== 1 && (
        <div className="gallery--ellipse"><span>...</span></div>
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
  return (
    <>
      <Button
        icon={["arrow_right", "right", "mask"]}
        color={"background-tertiary"}
        animation={"pulse-right"}
        className="gallery--button"
        // href={study.link}
      >
        View Study
      </Button>
    </>
  );
}

export { GalInfo, GalCategories, GalDescription };
