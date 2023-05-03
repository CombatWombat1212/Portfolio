import { useEffect } from "react";
import { RESIZE_TIMEOUT, addStyleNonDestructive, splitPx } from "./GlobalUtilities";
import useHorizontalResize from "./hooks/useHorizontalResize";

var allMirrorstyleParents;
var allMirrorstyleMatches;

function getMirrorStyleElements() {
  allMirrorstyleParents = document.querySelectorAll('[mirrorstyle*="parent"]');
  allMirrorstyleMatches = document.querySelectorAll('[mirrorstyle*="match"]');
}

function clearOldMirrorStyles() {

  const elementsWithMirrorStyleProp = document.querySelectorAll("[mirrorstyle-properties]");
  const elementsToClear = Array.from(elementsWithMirrorStyleProp).filter((element) => !Array.from(allMirrorstyleMatches).includes(element));

  elementsToClear.forEach((element) => {
    const affectedProperty = element.getAttribute("mirrorstyle-properties");
    let styleAttr = element.getAttribute("style") || "";
    const propertyRegExp = new RegExp(`\\s*${affectedProperty}\\s*:\\s*[^;]+;?`, "i");
    const updatedStyleAttr = styleAttr.replace(propertyRegExp, "");
    element.setAttribute("style", updatedStyleAttr);
    element.removeAttribute("mirrorstyle-properties");
  });
}

function mirrorstyle() {
  getMirrorStyleElements();
  clearOldMirrorStyles();
  // var allParentChildGroups = [];
  // for (var e = 0; e < allMirrorstyleParents.length; e++) {
  //     var parentElem = allMirrorstyleParents[e];
  //     var childElems =
  //         document.querySelectorAll('[mirrorstyle*="' +
  //             allMirrorstyleParents[e].getAttribute('mirrorstyle').split(' ')[0] +
  //             '"][mirrorstyle*="child"]');
  //     var mirrorGroup = [parentElem, childElems];
  //     allParentChildGroups.push(mirrorGroup);
  // }
  // for (var m = 0; m < allParentChildGroups.length; m++) {
  //     var parentElem = allParentChildGroups[m][0];
  //     var childElems = allParentChildGroups[m][1];
  //     var property = parentElem.getAttribute('mirrorstyle').split(' ')[2];
  //     var parentProperyVal;
  //     parentProperyVal = window.getComputedStyle(parentElem, null).getPropertyValue(property);
  //     for (var c = 0; c < childElems.length; c++) {
  //         addStyleNonDestructive(childElems[c], property, parentProperyVal)
  //     }
  // }

  var allMirrorstyleMatchGroups = [];
  var allMirrorstyleMatchGroupIDs = [];
  for (var e = 0; e < allMirrorstyleMatches.length; e++) {
    var mirrorstyleMatchGroupID = allMirrorstyleMatches[e].getAttribute("mirrorstyle").split(" ")[0];
    if (!allMirrorstyleMatchGroupIDs.includes(mirrorstyleMatchGroupID)) {
      allMirrorstyleMatchGroupIDs.push(mirrorstyleMatchGroupID);
    }
  }

  for (var e = 0; e < allMirrorstyleMatchGroupIDs.length; e++) {
    var mirrorstyleMatchGroup = document.querySelectorAll('[mirrorstyle*="' + allMirrorstyleMatchGroupIDs[e] + '"]');
    allMirrorstyleMatchGroups.push(mirrorstyleMatchGroup);
  }

  for (var e = 0; e < allMirrorstyleMatchGroups.length; e++) {
    var property = allMirrorstyleMatchGroups[e][0].getAttribute("mirrorstyle").split(" ")[2];
    var val = 0;
    for (var v = 0; v < allMirrorstyleMatchGroups[e].length; v++) {
      addStyleNonDestructive(allMirrorstyleMatchGroups[e][v], property, "fit-content");
      allMirrorstyleMatchGroups[e][v].setAttribute("mirrorstyle-properties", property);
    }
    for (var v = 0; v < allMirrorstyleMatchGroups[e].length; v++) {
      var matchChildPropertyVal = splitPx(window.getComputedStyle(allMirrorstyleMatchGroups[e][v], null).getPropertyValue(property));
      if (matchChildPropertyVal > val) {
        val = matchChildPropertyVal;
      }
    }
    for (var v = 0; v < allMirrorstyleMatchGroups[e].length; v++) {
      addStyleNonDestructive(allMirrorstyleMatchGroups[e][v], property, val + "px");
      allMirrorstyleMatchGroups[e][v].setAttribute("mirrorstyle-properties", property);
    }
  }
}


const useMirrorStyle = () => {
  useEffect(() => {
    const mirrorStyleInit = () => {
      if (document.readyState === "complete") {
        mirrorstyle();
      } else {
        document.addEventListener("readystatechange", () => {
          if (document.readyState === "complete") {
            mirrorstyle();
          }
        });
      }
    };

    mirrorStyleInit();
  }, []);

  useHorizontalResize(() => {
    getMirrorStyleElements();
    clearOldMirrorStyles();

    if (allMirrorstyleParents[0] || allMirrorstyleMatches[0]) {
      mirrorstyle();
    }
  }, RESIZE_TIMEOUT * 3);


};

function getMirrorStyleProp(props) {
  var mirrorstyle = props.mirrorstyle;
  if (mirrorstyle == false || mirrorstyle == undefined || mirrorstyle == null) mirrorstyle = false;
  return mirrorstyle;
}

export default useMirrorStyle;
export { getMirrorStyleProp };
