function sepSuffix(str, sep) {
  if (str[str.length - 1] != sep) {
    str = str + sep;
  }
  return str;
}

function addStyleNonDestructive(elem, prop, val) {
  var existingStyle = elem.getAttribute("style");
  if (!existingStyle) {
    elem.style.setProperty(prop, val);
  } else {
    existingStyle = semicolonSuffix(existingStyle);
    existingStyle = existingStyle.replace(/\s/g, "");
    var styleStr = "";
    if (existingStyle.includes(prop)) {
      var existingVal = existingStyle.split(prop + ":")[1].split(";")[0];
      existingStyle = existingStyle.replace(prop + ":" + existingVal, prop + ":" + val);
    } else {
      existingStyle += prop + ":" + val + ";";
    }
    elem.setAttribute("style", existingStyle);
  }
}

function addAttrNonDestructive(elem, prop, val, sep) {
  var overlapping = false;
  var overlappingAttrVal = 0;
  for (var i = 0; i < elem.getAttributeNames().length; i++) {
    if (elem.getAttributeNames()[i] == prop) {
      overlapping = true;
      overlappingAttrVal = i;
    }
  }

  if (!overlapping) {
    elem.setAttribute(prop, val);
  } else {
    var existingAttrVal = elem.getAttribute(prop);
    // existingAttrVal = existingAttrVal.replace(/\s/g, '');
    existingAttrVal = sepSuffix(existingAttrVal, sep);
    val = sepSuffix(val, sep);
    if (existingAttrVal.includes(val)) {
      elem.setAttribute(prop, val);
    } else {
      var newAttr = existingAttrVal.replace(existingAttrVal, existingAttrVal + val);
      elem.setAttribute(prop, newAttr);
    }
  }
}

function postScreenSizeToRoot() {

  if (typeof window == "undefined") return;
  var width;
  var height;

  function getScreenSize() {
    width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    window.document.documentElement.style.setProperty("--screen-width", width + "px");
    window.document.documentElement.style.setProperty("--screen-height", height + "px");
  }

  getScreenSize();

  var resizeTimeout = 200;
  // var resizeTimeout = 0;
  var isResizingGlobalScript;
  window.addEventListener(
    "resize",
    function (event) {
      window.clearTimeout(isResizingGlobalScript);
      isResizingGlobalScript = setTimeout(function () {
        getScreenSize();
      }, resizeTimeout);
    },
    false
  );
}

export { addStyleNonDestructive, addAttrNonDestructive, postScreenSizeToRoot };
