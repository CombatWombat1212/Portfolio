import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Background from "../utilities/Background";

import { getElemClasses, getContainerMarginClass, getWrapperClasses, getMainClasses, getGapClasses, getBackgroundClasses, getColClassList } from "./sections_utilities/GetClasses";
import { getHasText, getHasGraphic, getHasBackground } from "./sections_utilities/IfHas";
import { getSectionChildren } from "./sections_utilities/GetSectionChildren";

import Graphic from "./Graphic";
import Quote from "./Quote";
import Heading, { getAdditionalHeadingClassesFromParentProps } from "./Heading";
import Title from "./Title";
import Description from "./Description";
import { Column, ColumnGroup } from "./Columns";

const DEFINED_CHILDREN = ["Column", "Description", "Title", "Heading", "Graphic", "Quote"];
const BACKGROUND_COLORS = ["background", "background darker", "background darkest", "primary", "secondary", "tertiary", "tertiary light", "makeright tertiary"];

// TODO: at some point these should be re-ordered in a way that's more logical, maybe that would include more descriptive names but they're really hard to think of for something as abstract as this
// and background should really be renammed to something else because in this case it means a literal section describing background information, but everywhere else in this file it refers to the background color
const SECTION_TYPE_A = ["default", "overview", "logo banner"];
const SECTION_TYPE_B = ["columns"];
const SECTION_TYPE_C = ["passthrough"];
const SECTION_TYPES = [...SECTION_TYPE_A, ...SECTION_TYPE_B, ...SECTION_TYPE_C];







function SectionBackground({ sec }) {
  var { attrs, chil, has, classes } = sec;
  return (
    <>
      {has.background && typeof attrs.background == "object" && (
        <>
          <Background img={attrs.background} />
        </>
      )}
    </>
  );
}

function SectionInner({ children, sec }) {
  var { attrs, chil, has, classes } = sec;

  return (
    <div className="section--inner">
      <div className={`${classes.elem} ${classes.containerMargin} ${classes.sec} ${has.titled ? "" : classes.gap}`}>{children}</div>
    </div>
  );
}

function SectionWrapper({ children, sec }) {
  var { attrs, chil, has, classes } = sec;

  return (
    <div id={attrs.id} className={classes.wrapper + classes.background} ref={attrs.reference ? attrs.reference : null}>
      {children}
    </div>
  );
}

function SectionBody({ children, sec }) {
  var { attrs, chil, has, classes } = sec;

  return (
    <>
      {SECTION_TYPE_A.indexOf(attrs.type) != -1 ? (
        <>
          {has.text && (
            <div className={`section--copy ${classes.copy}`}>
              {chil.title && <>{chil.title}</>}
              {chil.heading && <>{chil.heading}</>}
              {chil.other && <>{chil.other}</>}
              {chil.description && <>{chil.description}</>}
            </div>
          )}

          {has.graphic && <>{chil.graphic}</>}
        </>
      ) : SECTION_TYPE_B.indexOf(attrs.type) != -1 ? (
        <>
          {has.titled && (
            <div className={`section--copy ${classes.copy} col-12`}>
              {chil.title && <>{chil.title}</>}
              {chil.heading && <>{chil.heading}</>}
              {chil.description && <>{chil.description}</>}
            </div>
          )}
          {has.titled ? (
            <div className={`section--main ${classes.gap} ${classes.main}`}>
              <ColumnGroup columns={chil.columns} arrows={attrs.arrows} mainType={attrs.mainType} />
            </div>
          ) : (
            <ColumnGroup columns={chil.columns} arrows={attrs.arrows} mainType={attrs.mainType} />
          )}
          {chil.graphic && <>{chil.graphic}</>}
          {chil.other && <>{chil.other}</>}
        </>
      ) : SECTION_TYPE_C.indexOf(attrs.type) != -1 ? (
        <>{children}</>
      ) : null}
    </>
  );
}

function Section({className, children, type, background, id, margin, titled, arrows, mainClassName, copyClassName, wrapperClassName, mainType, reference}) {
  
  var sec = createSectionObject(className, children, type, background, id, margin, titled, arrows, mainClassName, copyClassName, wrapperClassName, mainType, reference);

  return (
    <>
      <SectionWrapper sec={sec}>
        <SectionBackground sec={sec} />
        <SectionInner sec={sec}>
          <SectionBody sec={sec}>{children}</SectionBody>
        </SectionInner>
      </SectionWrapper>
    </>
  );
}

function createSectionObject(className, children, type, background, id, margin, titled, arrows, mainClassName, copyClassName, wrapperClassName, mainType, reference) {
  var pref = "section";

  if (children == undefined) children = children ?? <></>;
  if (children.length == undefined) children = [children];

  var { columns, description, title, heading, graphic, other } = getSectionChildren(children);
  titled = titled || false;
  var hasTitled = titled ? true : false;
  if (titled == "above") ({ columns, description, title, heading, graphic, other } = getAdditionalHeadingClassesFromParentProps({ columns, description, title, heading, graphic, other }, "titled above"));


  var sec = {
    has: {
      text: getHasText({ columns, description, title, heading, graphic, other }),
      graphic: getHasGraphic(graphic),
      background: getHasBackground(background),
      titled: hasTitled,
    },
    classes: {
      sec: className ? className : "",
      elem: getElemClasses(pref, type, titled),
      containerMargin: getContainerMarginClass(margin),
      wrapper: getWrapperClasses(wrapperClassName, pref),
      main: getMainClasses(mainClassName, mainType, titled),
      gap: getGapClasses(type, arrows, mainClassName),
      background: getBackgroundClasses(pref, background),
      copy: copyClassName ? copyClassName : "",
    },
    chil: {
      columns,
      description,
      title,
      heading,
      graphic,
      other,
    },
    attrs: {
      id,
      mainType,
      arrows,
      titled,
      margin,
      type,
      background,
      reference: reference ? reference : null,
    },
  };

  return sec;
}

Section.defaultProps = {
  background: "none",
  margin: "regular",
  type: "default",
  className: "",
  mainType: "flex",
};

Section.propTypes = {
  margin: PropTypes.oneOf(["regular", "wide", "none"]),
  mainType: PropTypes.oneOf(["flex", "grid"]),
  type: PropTypes.oneOf(SECTION_TYPES),
  background: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf(["none", ...BACKGROUND_COLORS])]),
};

// TODO: might be worth checking if this is working properly, specifically the two variables below
var SECTION_DEFAULT_PROPS = Section.defaultProps;
var SECTION_PROP_TYPES = Section.propTypes;
import Chapter from "./Chapter";
export { SECTION_DEFAULT_PROPS, SECTION_PROP_TYPES };

export default Section;
export { Section, Chapter, Description, Column, Title, Heading, Graphic, Quote };
export { SECTION_TYPE_A, SECTION_TYPE_B, SECTION_TYPE_C, SECTION_TYPES, BACKGROUND_COLORS, DEFINED_CHILDREN };
export { SectionBackground, SectionInner, SectionWrapper, SectionBody };
