import { SECTION_TYPE_B } from "../Sections";
import { BACKGROUND_COLORS } from "../Sections";
import { getClassesOfPrefix, removeClassesOfPrefix, removeEmptyClasses } from "./ClassUtilities";

function getElemClasses(pref, type, titled) {
  if (pref == undefined) pref = `${pref}`;
  var elemClasses = `${pref}`;
  if (type == undefined) return elemClasses;
  if (type == "overview") elemClasses += ` ${pref}__overview`;
  if (pref == "section" && type == "pitch") elemClasses += ` pitch ${pref}__pitch`;
  if (pref == "section" && titled) elemClasses += ` flex-col`;

  return elemClasses;
}

function getMainClasses(mainClassName, mainType, titled, mainNoHead) {
  if (mainClassName == undefined) mainClassName = "";
  // if (titled == true || titled == false) return mainClassName;
  if (titled == "above") mainClassName += " section--main__title-above";
  if (titled == "below") mainClassName += " section--main__title-below";
  if (mainType == "grid") mainClassName += " section--main__grid";
  if (mainNoHead) mainClassName += " section--main__no-head";

  mainClassName = removeClassesOfPrefix(mainClassName, "gap-");

  return mainClassName;
}

function getGapClasses(type, arrows, mainClassName) {
  var gapClasses = "";
  if (SECTION_TYPE_B.indexOf(type) != -1) gapClasses = "gap-4";
  if (arrows) gapClasses = "gap-6";

  if (!mainClassName) return gapClasses;
  if (mainClassName.indexOf("gap-") == -1) return gapClasses;

  gapClasses = getClassesOfPrefix(mainClassName, "gap-");

  // var classes = { otherClasses: [], gapClasses: [] };
  // var mainClassNameList = removeEmptyClasses(mainClassName).split(" ");

  // for(var i=0; i<mainClassNameList.length ; i++) {
  //   if (mainClassNameList[i].indexOf("gap-") != -1) classes.gapClasses.push(mainClassNameList[i]);
  //   else classes.otherClasses.push(mainClassNameList[i]);
  // }

  return gapClasses;
}

function getContainerMarginClass(margin) {
  var containerMarginClass = "container";
  if (margin == undefined) return containerMarginClass;
  if (margin == "wide") containerMarginClass += " container__wide";
  if (margin == "none") containerMarginClass = " container__none";

  return containerMarginClass;
}

function getWrapperClasses(wrapperClassName, pref) {
  wrapperClassName = wrapperClassName ? wrapperClassName : "";
  if (pref == undefined) pref = "section";
  wrapperClassName += ` ${pref}--wrapper`;

  return wrapperClassName;
}

function getColClassList(classList) {
  var classes = [];
  var columnClasses = [];
  var otherClasses = [];

  if (classList == undefined || classList == "") return { colClasses: columnClasses, otherClasses: otherClasses };
  if (typeof classList == "string") classes = classList.split(" ");

  for (var i = 0; i < classes.length; i++) {
    if (classes[i].indexOf("col-") != -1) columnClasses.push(classes[i]);
    else otherClasses.push(classes[i]);
  }

  return { colClasses: columnClasses, otherClasses: otherClasses };
}

// function getBackgroundClasses(pref, background) {
//   var backgroundClasses = ``;
//   if (background == undefined) return backgroundClasses;

//   if (typeof background == "string") {

//     if (BACKGROUND_COLORS.indexOf(background) != -1) {
//       if (pref == "chapter" && background != "background") backgroundClasses += ` ${pref}__color`;
//       else if (pref == "section") backgroundClasses += ` ${pref}__color`;
//       else if (pref == "section--quote") backgroundClasses += ` ${pref}__color`;
//       else if (pref == "section--description") backgroundClasses += ` ${pref}__color`;
//     }

//     if (pref == "section--graphic") backgroundClasses += ` graphic--panel`;

//     if (background == "primary") backgroundClasses += ` background__primary`;
//     if (background == "makeright tertiary") backgroundClasses += ` background__tertiary-makeright`;
//     if (background == "tertiary") backgroundClasses += ` background__tertiary`;
//     if (background == "tertiary light") backgroundClasses += ` background__tertiary-light`;
//     if (background == "background") backgroundClasses += ` background__background`;
//     if (background == "background darker") backgroundClasses += ` background__background background__background-darker`;
//     if (background == "background darkest") backgroundClasses += ` background__background background__background-darkest`;
//   } else if (typeof background == "object") {
//     backgroundClasses += ` ${pref}__image background__image`;
//   }
//   return backgroundClasses;
// }

function getBackgroundClasses(pref, background) {
  if (background === undefined) return "";

  const BACKGROUND_CLASSES_MAP = {
    primary: "background__primary",
    "makeright tertiary": "background__tertiary-makeright",
    tertiary: "background__tertiary",
    "tertiary light": "background__tertiary-light",
    background: "background__background",
    "background darker": "background__background background__background-darker",
    "background darkest": "background__background background__background-darkest",
  };

  let backgroundClasses = "";

  if (typeof background === "string") {
    if (BACKGROUND_COLORS.includes(background)) {
      if (["chapter", "section", "section--quote", "section--description"].includes(pref)) {
        backgroundClasses += ` ${pref}__color`;
      }
    }

    if (pref === "section--graphic") {
      backgroundClasses += " graphic--panel";
    }

    const mappedClass = BACKGROUND_CLASSES_MAP[background];
    if (mappedClass) {
      backgroundClasses += ` ${mappedClass}`;
    }
  } else if (typeof background === "object") {
    backgroundClasses += ` ${pref}__image background__image`;
  }

  return backgroundClasses;
}

function getGraphicClasses(type) {
  var classes = "";
  if (type == "oveview") classes += " my-auto";

  return classes;
}

function getCopyClasses(copyClassName) {
  return copyClassName ? copyClassName : "";
}

function getCopyBelowClasses(copyClassName, hasDescBelow) {
  var classes = copyClassName ? copyClassName : "";
  if (hasDescBelow) classes += " section--copy__below";
  return classes;
}

export { getElemClasses, getContainerMarginClass, getWrapperClasses, getMainClasses, getGapClasses, getBackgroundClasses, getColClassList, getGraphicClasses, getCopyClasses, getCopyBelowClasses };
