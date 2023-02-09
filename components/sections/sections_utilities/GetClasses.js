import { SECTION_TYPE_C } from "../Sections";
import { BACKGROUND_COLORS } from "../Sections";

function getElemClasses(pref, type) {
    if (pref == undefined) pref = `${pref}`;
    var elemClasses = `${pref}`;
    if (type == undefined) return elemClasses;
    if (type == "overview") elemClasses += ` ${pref}__overview`;
    if (type == "pitch") elemClasses += ` ${pref}__pitch`;
  
    return elemClasses;
  }
  
  
  function getMainClasses(mainClassName, titled){
  
    if(mainClassName == undefined) mainClassName = "";
    if(titled == true || titled == false) return mainClassName;
    if(titled == "above") mainClassName += " section--main__title-above";
  
    return mainClassName;
  }
  
  function getGapClasses(type, arrows) {
    var gapClasses = "";
    if (SECTION_TYPE_C.indexOf(type) != -1) gapClasses += " gap-4";
    if (arrows) {
      gapClasses = "gap-5";
    }
    return gapClasses;
  }
  
  function getContainerMarginClass(margin) {
    var containerMarginClass = "container";
    if (margin == undefined) return containerMarginClass;
    // if (margin == "regular") containerMarginClass += " container__regular";
    if (margin == "wide") containerMarginClass += " container__wide";
  
    return containerMarginClass;
  }
  
  function getWrapperClasses(pref) {
    if (pref == undefined) pref = "section";
    var wrapperClasses = `${pref}--wrapper`;
  
    return wrapperClasses;
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



  function getBackgroundClasses(pref, background) {
    var backgroundClasses = ``;
    if (background == undefined) return backgroundClasses;
  
    if (typeof background == "string") {
      if (BACKGROUND_COLORS.indexOf(background) != -1) {
        if (pref == "chapter" && background != "background") backgroundClasses += ` ${pref}__color`;
        else if (pref == "section") backgroundClasses += ` ${pref}__color`;
        else if (pref == "section--quote") backgroundClasses += ` ${pref}__color`;
        else if (pref == "section--description") backgroundClasses += ` ${pref}__color`;
      }
  
      if (pref == "section--graphic") backgroundClasses += ` graphic--panel`;
  
      if (background == "primary") backgroundClasses += ` background__primary`;
      if (background == "makeright tertiary") backgroundClasses += ` background__makeright-tertiary`;
      if (background == "tertiary") backgroundClasses += ` background__tertiary`;
      if (background == "tertiary light") backgroundClasses += ` background__tertiary-light`;
      if (background == "background") backgroundClasses += ` background__background`;
      if (background == "background darker") backgroundClasses += ` background__background background__background-darker`;
      if (background == "background darkest") backgroundClasses += ` background__background background__background-darkest`;
    } else if (typeof background == "object") {
      backgroundClasses += ` ${pref}__image`;
    }
    return backgroundClasses;
  }
  
  
  

  
  export { getElemClasses, getContainerMarginClass, getWrapperClasses, getMainClasses, getGapClasses, getBackgroundClasses, getColClassList };