
function sepSuffix(str, sep) {
    if (str[str.length - 1] != sep) {
        str = str + sep;
    }
    return str;
}





function addStyleNonDestructive(elem, prop, val) {
  var existingStyle = elem.getAttribute('style');
  if (!existingStyle) {
      elem.style.setProperty(prop, val);
  } else {
      existingStyle = semicolonSuffix(existingStyle);
      existingStyle = existingStyle.replace(/\s/g, '');
      var styleStr = "";
      if (existingStyle.includes(prop)) {
          var existingVal = existingStyle.split(prop + ":")[1].split(";")[0];
          existingStyle = existingStyle.replace(
              prop + ":" + existingVal,
              prop + ":" + val
          );
      } else {
          existingStyle += prop + ":" + val + ";";
      }
      elem.setAttribute('style', existingStyle);
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
          var newAttr = existingAttrVal.replace(
              existingAttrVal,
              existingAttrVal + val
          );
          elem.setAttribute(prop, newAttr);
      }
  }
}





export { addStyleNonDestructive, addAttrNonDestructive };