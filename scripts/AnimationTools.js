var tran;
if (typeof window != "undefined") {
  tran = window.getComputedStyle(window.document.documentElement).getPropertyValue("--transition") || false;
  if (tran) tran = Number(tran.split("s")[0]) * 1000;
  else tran = 0;
}

function getTransition(elem) {
  return Number(window.getComputedStyle(elem, null).transitionDuration.split("s")[0]) * 1000;
}

function simpleToggleOn(elem, { classPref = "", overlap = false, duration = 0 } = {}) {
  if (!tran) {
    tran = getTransition(elem);
  }

  if (duration != tran) {
    duration = getTransition(elem);
  }

  if (overlap) {
    elem.classList.add(classPref + "tran");
    setTimeout(() => {
      elem.classList.remove(classPref + "on");
      elem.classList.add(classPref + "off");
      elem.classList.remove(classPref + "tran");
    }, 0);
  } else {
    elem.classList.add(classPref + "tran");
    setTimeout(() => {
      elem.classList.remove(classPref + "on");
      elem.classList.add(classPref + "off");
      elem.classList.remove(classPref + "tran");
    }, duration);
  }
}

function simpleToggleOff(elem, { classPref = "", overlap = false, duration = 0 } = {}) {
  if (duration != tran) {
    duration = getTransition(elem);
  }

  elem.classList.add(classPref + "on");
  elem.classList.add(classPref + "tran");
  elem.classList.remove(classPref + "off");

  if (overlap) {
    setTimeout(() => {
      elem.classList.remove(classPref + "off");
      elem.classList.remove(classPref + "tran");
    }, 0);
    setTimeout(() => {}, tran);
  } else {
    setTimeout(() => {
      elem.classList.remove(classPref + "off");
      elem.classList.remove(classPref + "tran");
    }, duration);
  }
}

function dualTransitionToggleOn(elem, { classPref = "", overlap = false, duration = 0 } = {}) {
  if (duration != tran) {
    duration = getTransition(elem);
  }

  elem.classList.add(classPref + "tran1");

  if (overlap) {
    setTimeout(() => {
      elem.classList.remove(classPref + "on");
      elem.classList.add(classPref + "off");
      elem.classList.remove(classPref + "tran1");
    }, 0);
  } else {
    setTimeout(() => {
      elem.classList.remove(classPref + "on");
      elem.classList.add(classPref + "off");
      elem.classList.remove(classPref + "tran1");
    }, duration);
  }
}

function dualTransitionToggleOff(elem, { classPref = "", overlap = false, duration = 0 } = {}) {
  if (duration != tran) {
    duration = getTransition(elem);
  }

  elem.classList.add(classPref + "on");
  elem.classList.add(classPref + "tran2");
  elem.classList.remove(classPref + "off");

  if (overlap) {
    setTimeout(() => {
      elem.classList.remove(classPref + "off");
      elem.classList.remove(classPref + "tran2");
    }, 0);
  } else {
    setTimeout(() => {
      elem.classList.remove(classPref + "off");
      elem.classList.remove(classPref + "tran2");
    }, duration);
  }
}

function toggle(elem, { classPref = "", duration = 0, anim = "", transitions = "", overlap = "" } = {}) {
  var selectorPrefix = "__";
  if (classPref == "") selectorPrefix = "";
  classPref = classPref + selectorPrefix;

  if (anim == "animated") {
    var overlapStart = false;
    var overlapEnd = false;
    if (overlap == "overlap end") {
      overlapStart = false;
      overlapEnd = true;
    } else if (overlap == "overlap start") {
      overlapStart = true;
      overlapEnd = false;
    } else if (overlap == "overlap both") {
      overlapStart = true;
      overlapEnd = true;
    } else {
      overlapStart = false;
      overlapEnd = false;
    }

    if (transitions != "2 transitions") {
      if (elem.classList.contains(classPref + "on")) {
        simpleToggleOn(elem, { classPref, overlap: overlapStart, duration });
      } else {
        simpleToggleOff(elem, { classPref, overlap: overlapEnd, duration });
      }
    } else {
      if (elem.classList.contains(classPref + "on")) {
        dualTransitionToggleOn(elem, { classPref, overlap: overlapStart, duration });
      } else {
        dualTransitionToggleOff(elem, { classPref, overlap: overlapEnd, duration });
      }
    }
  } else {
    elem.classList.toggle(classPref + "on");
    elem.classList.toggle(classPref + "off");
  }
}

export default toggle;
export { simpleToggleOn, simpleToggleOff, dualTransitionToggleOn, dualTransitionToggleOff, toggle };
