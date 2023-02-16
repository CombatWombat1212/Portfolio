const RESIZE_TIMEOUT = 200;

function semicolonSuffix(str) {
  if (str[str.length - 1] != ";") {
    str = str + ";";
  }
  return str;
}

function RemoveSemicolonSuffix(str) {
  if (str[str.length - 1] == ";") {
    str = str.slice(0, -1);
  }
  return str;
}

function sepSuffix(str, sep) {
  if (str[str.length - 1] != sep) {
    str = str + sep;
  }
  return str;
}

function splitPx(str) {
  str = Number(str.split("px")[0]);
  return str;
}

function splitRem(str) {
  str = Number(str.split("rem")[0]) * 16;
  return str;
}

function splitS(str) {
  if (str.includes("s")) {
    str = Number(str.split("s")[0]) * 1000;
  } else if (str.includes("ms")) {
    str = Number(str.split("ms")[0]);
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

  var isResizing;
  window.addEventListener(
    "resize",
    function (event) {
      window.clearTimeout(isResizing);
      isResizing = setTimeout(function () {
        getScreenSize();
      }, RESIZE_TIMEOUT);
    },
    false
  );
}

function overflowEllipsis() {
  function run() {
    var overflowEllipsisElems = document.getElementsByClassName("overflow__ellipsis");
    for (var i = 0; i < overflowEllipsisElems.length; i++) {
      var elem = overflowEllipsisElems[i];
      var elemLineHeight = splitPx(window.getComputedStyle(elem, null).lineHeight);
      var elemHeight = splitPx(window.getComputedStyle(elem.parentElement, null).height) - splitPx(window.getComputedStyle(elem.parentElement, null).paddingTop) - splitPx(window.getComputedStyle(elem.parentElement, null).paddingBottom);
      var lines = Math.round(elemHeight / elemLineHeight);

      addStyleNonDestructive(elem, "--rounded-height", lines * elemLineHeight + "px");
      addStyleNonDestructive(elem, "--visible-lines", lines);
      addStyleNonDestructive(elem, "--line-height", elemLineHeight + "px");
    }
  }

  run();
  var isResizing;
  window.addEventListener(
    "resize",
    function (event) {
      window.clearTimeout(isResizing);
      isResizing = setTimeout(function () {
        run();
      }, RESIZE_TIMEOUT);
    },
    false
  );
}





function throwLoadErrors(img){
  if(typeof img.src === "undefined") throw new Error("No src attribute found on img element");
  if(typeof img.alt === "undefined") throw new Error("No alt attribute found on img element");
  if(typeof img.width === "undefined") throw new Error("No width attribute found on img element");
  if(typeof img.height === "undefined") throw new Error("No height attribute found on img element");

}



function loadImgExternally(img){

  var elem;

  throwLoadErrors(img);


  elem = document.createElement("img");
  elem.src = "." + img.src;
  elem.width = img.width;
  elem.height = img.height;
  elem.alt = img.alt;
  // elem.setAttribute("loading", "lazy"); // Use lazy loading to improve performance
  elem.setAttribute("decoding", "async"); // Use async decoding to improve performance


  return elem;

}






export { addStyleNonDestructive, addAttrNonDestructive, postScreenSizeToRoot, overflowEllipsis, splitPx, splitRem, splitS,loadImgExternally, RESIZE_TIMEOUT };
