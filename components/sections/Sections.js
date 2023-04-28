import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Background from "../utilities/Background";

import {
  getElemClasses,
  getContainerMarginClass,
  getWrapperClasses,
  getMainClasses,
  getGapClasses,
  getBackgroundClasses,
  getColClassList,
  getGraphicClasses,
  getCopyClasses,
  getCopyBelowClasses,
  getSectionClasses,
} from "./sections_utilities/GetClasses";
import { getHasText, getHasGraphic, getHasBackground } from "./sections_utilities/IfHas";
import { getSectionChildren } from "./sections_utilities/GetSectionChildren";

import Graphic from "./graphic/Graphic";
import Quote from "./Quote";
import Heading, { getAdditionalHeadingClassesFromParentProps } from "./Heading";
import Title from "./Title";
import Description from "./Description";
import { Column, ColumnGroup } from "./Columns";

const DEFINED_CHILDREN = ["Column", "Description", "Title", "Heading", "Graphic", "Quote"];
const BACKGROUND_COLORS = [
  "background",
  "background darker",
  "background darkest",
  "primary",
  "secondary",
  "tertiary",
  "tertiary light",
  "makeright tertiary",
];

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
    <div
      id={attrs.id}
      className={classes.wrapper + classes.background}
      ref={attrs.reference ? attrs.reference : null}
      {...(attrs.line ? { "data-line": attrs.line } : {})}
      {...(attrs.loading ? { style: { opacity: 0 } } : {})}>
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
          {has.titled && attrs.titled != "below" && (
            <div className={`section--copy ${classes.copy} col-12`}>
              {chil.title && <>{chil.title}</>}
              {chil.heading && <>{chil.heading}</>}
              {chil.description && !has.descBelow && <>{chil.description}</>}
            </div>
          )}
          {/* {has.titled || has.main ? ( */}
          {(has.titled && has.columns) || has.main ? (
            <div className={`section--main ${classes.gap} ${classes.main}`}>
              <ColumnGroup columns={chil.columns} arrows={attrs.arrows} line={attrs.line} mainType={attrs.mainType} />
            </div>
          ) : (
            <ColumnGroup columns={chil.columns} arrows={attrs.arrows} line={attrs.line} mainType={attrs.mainType} />
          )}
          {has.titled && attrs.titled == "below" && (
            <div className={`section--copy ${classes.copy} col-12`}>
              {chil.title && <>{chil.title}</>}
              {chil.heading && <>{chil.heading}</>}
              {chil.description && <>{chil.description}</>}
            </div>
          )}
          {has.descBelow && (
            <>
              <div className={`section--copy ${classes.copyBelow} col-12`}>{chil.description && <>{chil.description}</>}</div>
            </>
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

function Section({
  className,
  children,
  type,
  background,
  id,
  margin,
  titled,
  arrows,
  line,
  mainClassName,
  copyClassName,
  wrapperClassName,
  mainType,
  reference,
  loading,
}) {
  var sec = useSectionObject(
    className,
    children,
    type,
    background,
    id,
    margin,
    titled,
    arrows,
    line,
    mainClassName,
    copyClassName,
    wrapperClassName,
    mainType,
    reference,
    loading
  );

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

function useSectionObject(
  className,
  children,
  type,
  background,
  id,
  margin,
  titled,
  arrows,
  line,
  mainClassName,
  copyClassName,
  wrapperClassName,
  mainType,
  reference,
  loading
) {
  var pref = "section";
  titled = titled || false;
  var hasTitled = titled ? true : false;

  if (children == undefined) children = children ?? <></>;
  if (children.length == undefined) children = [children];


  // Fallback for when section has titles but it isn't explicitly set to true
  var topLevelFoundChildren = false;



  var foundChildren = findChildren(children, [
    ["titles", { elemType: "Title" }],
    ["headings", { elemType: "Heading" }],
    ["columns", { elemType: "Column" }],
  ]);
  
  var { columns: organizedColumns } = organizeChildren(children, [["columns", { elemType: "Column" }]]);




  const { desktop } = useResponsive();
  const isSplitTitledAbove = getSplitTitledAbove(titled, foundChildren, organizedColumns);
  const ISTA_RESULT = updateChildrenSplitTitled(children, titled,foundChildren, organizedColumns, isSplitTitledAbove, desktop);
  children = ISTA_RESULT.children;
  titled = ISTA_RESULT.titled;
  foundChildren = ISTA_RESULT.foundChildren;
  organizedColumns = ISTA_RESULT.organizedColumns;

  var { columns, description, title, heading, graphic, other } = getSectionChildren(children);




  topLevelFoundChildren = (titled === true || titled === false) && (foundChildren.titles || foundChildren.headings) && foundChildren.columns;

  if (topLevelFoundChildren) {
    hasTitled = true;
    titled = true;
  }

  var mainNoHead = false;
  if (foundChildren.columns && !foundChildren.titles && !foundChildren.headings) {
    mainNoHead = true;
  }
  var hasMain = mainType == "grid" && (!titled || foundChildren.columns) ? true : false;


  if (titled == "above")
    ({ columns, description, title, heading, graphic, other } = getAdditionalHeadingClassesFromParentProps(
      { columns, description, title, heading, graphic, other },
      "titled above"
    ));

  var hasGraphic = getHasGraphic(graphic);
  var hasDescBelow = organizeChildren(children, [["all", { elemType: "Description", below: true }]]).all.length > 0 ? true : false;

  
  var hasColumns = foundChildren.columns ? true : false;
  if (type == "default" && hasColumns) type = "columns";


  const hasEvenCol = (() => {
    if (!(organizedColumns.length > 0)) return false;
    const colClasses = organizedColumns.map((col) => {
      const { className } = col.props;
      if (className == undefined) return null;
      if (!className.split(" ").some((c) => c.startsWith("col-"))) return null;
      const colClass = className
        .split(" ")
        .filter((c) => c.startsWith("col-"))
        .sort((a, b) => a.length - b.length)[0];
      return colClass;
    });
    // added a check for at least more than one column

    const noCol = organizedColumns.map((col) => {
      const { nocol } = col.props;
      return nocol;
    });
    if (organizedColumns.length > 1 && colClasses.every((c) => c == colClasses[0]) && noCol.every((c) => c == false || c == undefined)) return true;
    return false;
  })();








  var sec = {
    has: {
      text: getHasText({ columns, description, title, heading, graphic, other }),
      graphic: hasGraphic,
      background: getHasBackground(background),
      titled: hasTitled,
      descBelow: hasDescBelow,
      columns: hasColumns,
      main: hasMain,
      evenCol: hasEvenCol,
    },
    classes: {
      sec: getSectionClasses({ className }, hasEvenCol, hasMain || hasTitled),
      elem: getElemClasses(pref, type, titled),
      containerMargin: getContainerMarginClass(margin),
      wrapper: getWrapperClasses(wrapperClassName, pref),
      main: getMainClasses(mainClassName, mainType, titled, mainNoHead, hasEvenCol),
      gap: getGapClasses(type, arrows, mainClassName),
      background: getBackgroundClasses(pref, background),
      graphic: getGraphicClasses(type),
      copy: getCopyClasses(copyClassName),
      copyBelow: getCopyBelowClasses(copyClassName, hasDescBelow),
    },
    chil: {
      columns,
      description,
      title,
      heading,
      graphic: getGraphicChanges(type, graphic),
      other,
    },
    attrs: {
      id,
      mainType,
      arrows,
      line: line ? line : false,
      titled,
      margin,
      type,
      background,
      reference: reference ? reference : null,
      loading,
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
import { getGraphicChanges, getGraphicElem } from "./sections_utilities/GetConditionalElemAdditions";
import organizeChildren from "@/scripts/organizeChildren";
import findChildren from "@/scripts/findChildren";
import { conditionalOrder } from "@/scripts/GlobalUtilities";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { getSplitTitledAbove, updateChildrenSplitTitled } from "./sections_utilities/SplitTitledAbove";
export { SECTION_DEFAULT_PROPS, SECTION_PROP_TYPES };

export default Section;
export { Section, Chapter, Description, Column, Title, Heading, Graphic, Quote };
export { SECTION_TYPE_A, SECTION_TYPE_B, SECTION_TYPE_C, SECTION_TYPES, BACKGROUND_COLORS, DEFINED_CHILDREN };
export { SectionBackground, SectionInner, SectionWrapper, SectionBody };
