const RESIZE_TIMEOUT = 300;

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
      var elemHeight =
        splitPx(window.getComputedStyle(elem.parentElement, null).height) -
        splitPx(window.getComputedStyle(elem.parentElement, null).paddingTop) -
        splitPx(window.getComputedStyle(elem.parentElement, null).paddingBottom);
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

function throwLoadErrors(img) {
  if (typeof img.src === "undefined") throw new Error("No src attribute found on img element");
  if (typeof img.alt === "undefined") throw new Error("No alt attribute found on img element");
  if (typeof img.width === "undefined") throw new Error("No width attribute found on img element");
  if (typeof img.height === "undefined") throw new Error("No height attribute found on img element");
}

// function loadImgExternally(img) {
//   var elem;
//   throwLoadErrors(img);

//   elem = document.createElement("img");
//   elem.src = "." + img.src;
//   elem.width = img.width;
//   elem.height = img.height;
//   elem.alt = img.alt;
//   // elem.setAttribute("loading", "lazy"); // Use lazy loading to improve performance
//   elem.setAttribute("decoding", "async"); // Use async decoding to improve performance

//   return elem;
// }
function loadImgExternally(img) {
  var elem;

  throwLoadErrors(img);

  if (IMAGE_TYPES.includes(img.type)) {
    elem = document.createElement("img");
    elem.src = img.src;
    elem.width = img.width;
    elem.height = img.height;
    elem.alt = img.alt;
    // elem.setAttribute("loading", "lazy"); // Use lazy loading to improve performance
    elem.setAttribute("decoding", "async"); // Use async decoding to improve performance
  } else if (VIDEO_TYPES.includes(img.type)) {
    elem = document.createElement("video");
    elem.src = img.src;
    elem.width = img.width;
    elem.height = img.height;
    elem.controls = true;
    elem.setAttribute("preload", "metadata");
    // elem.setAttribute("loading", "lazy"); // Use lazy loading to improve performance
  } else {
    console.error("Unsupported file type: " + img.type);
    return null;
  }

  return elem;
}

function getSiblingStyle(property, elem1, elem2 = null) {
  const elems = Array.from(elem1.parentElement.children);
  const startIndex = elems.indexOf(elem1);
  const endIndex = elem2 ? elems.indexOf(elem2) : elems.length;

  const beforeElemStyle = elems.slice(0, startIndex).reduce((acc, elem) => {
    const value = splitPx(getComputedStyle(elem).getPropertyValue(property));
    return acc + value;
  }, 0);

  let afterElemStyle = 0;
  if (elem2) {
    afterElemStyle = elems.slice(endIndex + 1).reduce((acc, elem) => {
      const value = splitPx(getComputedStyle(elem).getPropertyValue(property));
      return acc + value;
    }, 0);
  } else {
    afterElemStyle = elems.slice(startIndex + 1).reduce((acc, elem) => {
      const value = splitPx(getComputedStyle(elem).getPropertyValue(property));
      return acc + value;
    }, 0);
  }

  return [beforeElemStyle, afterElemStyle];
}

function clamp(input, min, max) {
  return input < min ? min : input > max ? max : input;
}

function map(current, in_min, in_max, out_min, out_max) {
  const mapped = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return clamp(mapped, out_min, out_max);
}

function arrayItemDoesExist(arr) {
  return arr != null && arr != undefined && arr != [] && arr != "" && arr.length > 0;
}

function capFirstRemovePeriod(val) {
  if (typeof val == "array") {
    val = val.map((str) => {
      str.trim();
      str = str.charAt(0).toUpperCase() + str.slice(1);
      str = str[str.length - 1] === "." ? str.slice(0, -1) : str;
      return str;
    });
  } else if (typeof val == "string") {
    val.trim();
    val = val.charAt(0).toUpperCase() + val.slice(1);
    val = val[val.length - 1] === "." ? val.slice(0, -1) : val;
  }
  return val;
}

function getElemWidth(elem) {
  return (
    splitPx(getComputedStyle(elem).getPropertyValue("width")) +
    splitPx(getComputedStyle(elem).getPropertyValue("margin-left")) +
    splitPx(getComputedStyle(elem).getPropertyValue("margin-right"))
  );
}

function getColors() {
  // return new Promise((resolve) => {
  //   if (document.readyState === "complete") {
  //     resolve();
  //   } else {
  //     window.addEventListener("load", resolve);
  //   }
  // }).then(() => {
  var rootStyles = getComputedStyle(document.documentElement);
  var colorsList = rootStyles.getPropertyValue("--colors").trim();
  var colorNames = colorsList.split(",");
  var colors = {};

  for (let i = 0; i < colorNames.length; i++) {
    var colorName = colorNames[i].trim();
    var colorValue = rootStyles.getPropertyValue(colorName).trim();
    colors[colorName] = { name: colorName, value: colorValue };
  }
  return colors;
  // });
}

function toTitleCase(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}

function ensureArray(input) {
  return typeof input === "string" ? [input] : input;
}

function cssVarToPixels(element, cssProperty) {
  // Create a hidden element to inherit the CSS properties
  const hiddenElement = document.createElement("div");
  hiddenElement.style.cssText = `
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    width: 0;
    height: 0;
  `;

  // Add the hidden element to the DOM
  element.appendChild(hiddenElement);

  // Get the value of the specified CSS property on the target element
  const cssValue = getComputedStyle(element)[cssProperty];

  // Check if the input is a CSS variable
  const isCssVariable = cssValue.startsWith("--");

  // Set the specified CSS property of the hidden element to the value of the CSS property or variable
  hiddenElement.style[cssProperty] = isCssVariable ? `var(${cssValue})` : cssValue;

  // Get the computed style of the hidden element
  const computedStyle = getComputedStyle(hiddenElement);

  // Read the computed value of the specified CSS property
  const computedValue = computedStyle[cssProperty];

  // Calculate the pixel value based on the dimensions of the target element
  let pixels;
  if (computedValue.endsWith("%")) {
    const percentage = parseFloat(computedValue) / 100;
    const parentDimension =
      cssProperty === "max-height" || cssProperty === "height" || cssProperty === "min-height" ? element.offsetHeight : element.offsetWidth;
    pixels = parentDimension * percentage;
  } else {
    pixels = parseFloat(computedValue);
  }

  // Remove the hidden element from the DOM
  element.removeChild(hiddenElement);

  return pixels;
}
function ignoreUpdateConditions(propsToIgnore) {
  return function updateConditions(prevProps, nextProps) {
    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);

    if (prevKeys.length !== nextKeys.length) {
      return false;
    }

    for (const key of prevKeys) {
      if (propsToIgnore.includes(key)) {
        continue;
      }
      if (prevProps[key] !== nextProps[key]) {
        return false;
      }
    }
    return true;
  };
}

// function createUpdateConditions(propsToCheck) {
//   return function updateConditions(prevProps, nextProps) {
//     for (const propName of propsToCheck) {
//       const [objName, key] = propName.split(".");
//       if (prevProps[objName][key] !== nextProps[objName][key]) {
//         return false;
//       }
//     }
//     return true;
//   };
// }

function createUpdateConditions(propsToCheck) {
  return function updateConditions(prevProps, nextProps) {
    for (const propName of propsToCheck) {
      if (propName.includes(".")) {
        const [objName, key] = propName.split(".");
        if (prevProps[objName][key] !== nextProps[objName][key]) {
          return false;
        }
      } else {
        if (prevProps[propName] !== nextProps[propName]) {
          return false;
        }
      }
    }
    return true;
  };
}

function conditionalOrder(condition, elements) {
  return condition ? elements.filter(Boolean) : elements.slice(1).concat(elements.slice(0, 1)).filter(Boolean);
}

function isElementNearTop(el, {threshold = 200} = {}) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.top <= threshold;
}

function scrollToTarget(target, {attempts = 0, maxAttempts = 10, behavior = "smooth", block = "start" } = {}) {

  target.scrollIntoView({ behavior: behavior, block: block });

  if (attempts < maxAttempts) {
    const timeoutId = setTimeout(() => {
      const targetNearTop = isElementNearTop(target);

      if (!targetNearTop) {
        scrollToTarget(target, {attempts: attempts + 1, maxAttempts: maxAttempts, block: block});
      } else {
        clearTimeout(timeoutId);
      }
    }, 800);
  }
}

function cooldown(fn, delay) {
  let lastExecution = 0;

  return function (...args) {
    const currentTime = Date.now();
    if (currentTime - lastExecution >= delay) {
      fn(...args);
      lastExecution = currentTime;
    }
  };
}

function getClientXFromEvent(e) {
  if (e.type === "mousemove") {
    return e.clientX;
  } else if (e.type === "touchmove") {
    return e.touches[0].clientX;
  }
}

// Video file formats
const VIDEO_TYPES = ["mp4", "avi", "mov", "wmv", "mkv", "flv", "webm"];

// Image file formats
const IMAGE_TYPES = ["jpg", "jpeg", "png", "gif", "svg", "bmp", "webp"];
class ClassList {
  constructor(pref) {
    this.pref = pref;
    this.classList = [pref];
    this.prefDefault = true;
  }

  processNames(names) {
    if (Array.isArray(names)) {
      return names;
    } else if (typeof names === 'string') {
      return names.split(' ');
    }
    return [];
  }

  getClassName(name, hasPref) {
    if (hasPref) {
      return `${this.pref}__${name}`;
    } else {
      return name;
    }
  }

  addClassNames(names, hasPref) {
    this.processNames(names).forEach(name => this.classList.push(this.getClassName(name, hasPref)));
  }

  removeClassNames(names, hasPref) {
    this.processNames(names).forEach(name => {
      const index = this.classList.indexOf(this.getClassName(name, hasPref));
      if (index > -1) {
        this.classList.splice(index, 1);
      }
    });
  }

  add(names, options = {}) {
    const { pref: hasPref = this.prefDefault } = options;
    this.addClassNames(names, hasPref);
  }

  addIf(names, condition, options = {}) {
    const { pref: hasPref = this.prefDefault } = options;
    if (condition) {
      this.addClassNames(names, hasPref);
    } else {
      this.removeClassNames(names, hasPref);
    }
  }

  addEither(condition, names1, names2, options = {}) {
    const { pref: hasPref = this.prefDefault } = options;
    if (condition) {
      this.addClassNames(names1, hasPref);
      this.removeClassNames(names2, hasPref);
    } else {
      this.addClassNames(names2, hasPref);
      this.removeClassNames(names1, hasPref);
    }
  }

  addOnly(names) {
    this.processNames(names).forEach(name => this.classList.push(name));
  }

  addOnlyIf(names, condition) {
    if (condition) {
      this.processNames(names).forEach(name => this.classList.push(name));
    } else {
      this.processNames(names).forEach(name => {
        const index = this.classList.indexOf(name);
        if (index > -1) {
          this.classList.splice(index, 1);
        }
      });
    }
  }

  get() {
    return this.classList.join(" ");
  }
}



function getProjectId(image){

  var name = image.projectStr || image.project || image.group || image.title;

  let id = name.toLowerCase();
  id = id.replace(/\./g, "");
  id = id.replace(/\s/g, "-");
  id = id.replace(/_/g, "-");
  id = id.replace(/[^\w-]/g, "");

  return id;
}


export {
  addStyleNonDestructive,
  addAttrNonDestructive,
  postScreenSizeToRoot,
  overflowEllipsis,
  splitPx,
  splitRem,
  splitS,
  loadImgExternally,
  getSiblingStyle,
  clamp,
  map,
  arrayItemDoesExist,
  capFirstRemovePeriod,
  getElemWidth,
  getColors,
  toTitleCase,
  ensureArray,
  cssVarToPixels,
  createUpdateConditions,
  ignoreUpdateConditions,
  conditionalOrder,
  isElementNearTop,
  scrollToTarget,
  cooldown,
  getClientXFromEvent,
  getProjectId,
  ClassList,
  RESIZE_TIMEOUT,
  VIDEO_TYPES,
  IMAGE_TYPES,
};
