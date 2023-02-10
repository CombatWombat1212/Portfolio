import React from "react";

function removeEmptyClasses(className) {
  if (className == "" || className == " ") return "";

  className = className.split(" ");
  className = className.filter((className) => {
    if (className == "" || className == " ") return false;
    else return true;
  });

  return className.join(" ");
}

function removeClassesOfPrefix(className, prefix) {
  if (className == "" || className == " ") return "";
  className = className.split(" ");
  className = className.filter((className) => {
    if (className.indexOf(prefix) != -1) return false;
    else return true;
  });
  return className.join(" ");
}

function getClassesOfPrefix(className, prefix) {
  if (className == "" || className == " ") return "";
  className = className.split(" ");
  className = className.filter((className) => {
    if (className.indexOf(prefix) != -1) return true;
    else return false;
  });
  return className.join(" ");
}



function addClassNoRepeats(className, newClass) {

  if (className == "" || className == " ") return newClass;
  className = className.split(" ");
  if (className.includes(newClass)) return className.join(" ");
  else return className.join(" ") + " " + newClass;
}






function addClassToJsxObj(jsxObj, className) {
  function addClass(obj, className) {
    var copy = { ...obj };
    copy.props = { ...obj.props };
    if (typeof copy.props.className == "undefined") copy.props.className = className;
    else if (copy.props.className.includes(className)) return copy;
    else copy.props.className = `${copy.props.className} ${className}`;
    return copy;
  }

  var jsxObjCopy = jsxObj;
  for (var i = 0; i < jsxObj.length; i++) {
    jsxObjCopy[i] = addClass(jsxObj[i], className);
  }

  return jsxObjCopy;
}

export { removeEmptyClasses, removeClassesOfPrefix, getClassesOfPrefix, addClassToJsxObj, addClassNoRepeats };
