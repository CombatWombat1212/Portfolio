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




function addStyleToJsxObj(jsxObj, propName, propValue) {
  function addStyle(obj, propName, propValue) {
    var copy = { ...obj };
    copy.props = { ...obj.props };
    copy.props.style = { ...obj.props.style };
    copy.props.style[propName] = propValue;
    return copy;
  }

  var jsxObjCopy = Array.isArray(jsxObj) ? jsxObj.slice() : [jsxObj];

  for (var i = 0; i < jsxObjCopy.length; i++) {
    jsxObjCopy[i] = addStyle(jsxObjCopy[i], propName, propValue);
  }

  return Array.isArray(jsxObj) ? jsxObjCopy : jsxObjCopy[0];
}



// function addClassToJsxObj(jsxObj, className) {
//   function addClass(obj, className) {
//     var copy = { ...obj };
//     copy.props = { ...obj.props };
//     copy.props.className = copy.props.className ? `${copy.props.className} ${className}` : className;
//     return copy;
//   }

//   var jsxObjCopy = Array.isArray(jsxObj) ? jsxObj.slice() : [jsxObj];

//   for (var i = 0; i < jsxObjCopy.length; i++) {
//     jsxObjCopy[i] = addClass(jsxObjCopy[i], className);
//   }

//   return Array.isArray(jsxObj) ? jsxObjCopy : jsxObjCopy[0];
// }

function addClassToJsxObj(jsxObj, className) {
  function addClass(obj, className) {
    console.log(`addClass function called with className: ${className}`);
    
    if (!obj) {
      console.error(`The object passed to addClass, ${className}, is undefined.`);
      return;
    }
    if (!obj.props) {
      console.error('The props of the object passed to addClass are undefined.');
      return;
    }

    var copy = { ...obj };
    copy.props = { ...obj.props };
    copy.props.className = copy.props.className ? `${copy.props.className} ${className}` : className;
    return copy;
  }

  console.log(`addClassToJsxObj called with className: ${className}`);

  if (!jsxObj) {
    console.error(`The jsxObj passed to addClassToJsxObj, ${className}, is undefined.`);
    return;
  }

  var jsxObjCopy = Array.isArray(jsxObj) ? jsxObj.slice() : [jsxObj];

  for (var i = 0; i < jsxObjCopy.length; i++) {
    if (!jsxObjCopy[i]) {
      console.error(`jsxObjCopy at index ${i} is undefined.`);
    } else {
      jsxObjCopy[i] = addClass(jsxObjCopy[i], className);
    }
  }

  return Array.isArray(jsxObj) ? jsxObjCopy : jsxObjCopy[0];
}





export { removeEmptyClasses, removeClassesOfPrefix, getClassesOfPrefix, addClassToJsxObj, addStyleToJsxObj, addClassNoRepeats };
