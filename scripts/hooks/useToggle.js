import { useState, useLayoutEffect, useEffect } from "react";

Array.prototype.remove = function (value) {
  const index = this.indexOf(value);
  if (index > -1) {
    this.splice(index, 1);
  }
  return this;
};

function useToggle(
  ref,
  { update = false, classPref = "", duration = 0, animated = true, transitions = "", overlap = "overlap start", state = "", initial = "off" } = {}
) {
  const [classList, setClassList] = useState([]);
  const [result, setResult] = useState({
    value: false,
    classNames: "",
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    var init = false;

    if (initialized) {
      init = false;
    }

    if (!ref || !ref.current) {
      init = false;
    }

    if (typeof update != "undefined" && !update) {
      init = false;
    }

    if (ref.current && ref.current instanceof HTMLElement) {
      init = true;
    }

    setInitialized(init);
  }, [ref, ref.current, update]);




  useEffect(() => {
    if (!initialized) return;
    if (typeof update != "undefined" && !update) return;
    if (!ref || !ref.current) return;

    var selectorPrefix = "__";
    if (classPref == "") selectorPrefix = "";
    classPref = classPref + selectorPrefix;
    var array = Array.from(ref.current.classList);

    if (initial == "on" && !array.includes(classPref + "on")) {
      array.remove(classPref + "off");
      array.push(classPref + "on");
    } else if (initial == "off" && !array.includes(classPref + "off")) {
      array.remove(classPref + "on");
      array.push(classPref + "off");
    }
    setClassList(array);



    




  }, [initialized, update, classPref, duration, animated, transitions, overlap, state, initial]);


  useEffect(() => {
    if (!initialized) {
      setResult({
        value: false,
        classNames: "",
      });
    } else {
      setResult({ value: true, classNames: classList.join(" ") });
    }
  }, [classList]);

  return result;


}

export default useToggle;

// import { useState, useEffect } from "react";

// Array.prototype.remove = function (value) {
//   const index = this.indexOf(value);
//   if (index > -1) {
//     this.splice(index, 1);
//   }
//   return this;
// };

// function useToggle(ref, { classPref = "", duration = 0, animated = true, transitions = "", overlap = "overlap start", state = "", initial = "off" } = {}) {
//   const [classList, setClassList] = useState([]);
//   const [initialized, setInitialized] = useState(false);

//   var selectorPrefix = "__";
//   if (classPref == "") selectorPrefix = "";
//   classPref = classPref + selectorPrefix;

//   useEffect(() => {
//     if (ref.current) {
//       setInitialized(true);
//     }
//   }, [ref, ref.current]);

//   useEffect(() => {
//     console.log(initialized);
//   }, [initialized]);

//   useEffect(() => {
//     if (initialized) {
//       var array = Array.from(ref.current.classList);
//       if (initial == "on") {
//         array.remove(classPref + selectorPrefix + "off");
//         array.push(classPref + selectorPrefix + "on");
//       } else {
//         array.remove(classPref + selectorPrefix + "on");
//         array.push(classPref + selectorPrefix + "off");
//       }
//       setClassList(array);
//     }
//   }, [initialized]);

//   useEffect(() => {
//     if (!ref.current) return;
//     if (!initialized) return;

//     if (animated) {

//       var overlapStart = false;
//       var overlapEnd = false;
//       if (overlap == "overlap end") {
//         overlapStart = false;
//         overlapEnd = true;
//       } else if (overlap == "overlap start") {
//         overlapStart = true;
//         overlapEnd = false;
//       } else if (overlap == "overlap both") {
//         overlapStart = true;
//         overlapEnd = true;
//       } else {
//         overlapStart = false;
//         overlapEnd = false;
//       }

//       if (transitions !== "2 transitions") {
//         if (state === "on" && classList.includes(classPref + "on")) {
//           // do nothing
//         } else if (state === "on" || (state === "" && classList.includes(classPref + "off"))) {
//           simpleToggleOn(ref, classList, setClassList, { classPref, overlap: overlapStart, duration });
//         } else if (state === "off" && classList.includes(classPref + "off")) {
//           // do nothing
//         } else {
//           simpleToggleOff(ref, classList, setClassList, { classPref, overlap: overlapEnd, duration });
//         }
//       } else {
//         if (state === "on" && classList.includes(classPref + "on")) {
//           // do nothing
//         } else if (state === "on" || (state === "" && classList.includes(classPref + "off"))) {
//           // dualTransitionToggleOn(ref, classList, setClassList, { classPref, overlap: overlapStart, duration });
//         } else if (state === "off" && classList.includes(classPref + "off")) {
//           // do nothing
//         } else {
//           // dualTransitionToggleOff(ref, classList, setClassList, { classPref, overlap: overlapEnd, duration });
//         }
//       }

//     } else {
//       if (state == "on" && elem.classList.contains(classPref + "on")) {
//         // do nothing
//       } else if (state == "on" || (state === "" && elem.classList.contains(classPref + "off"))) {
//         elem.classList.remove(classPref + "off");
//         elem.classList.add(classPref + "on");
//       } else if (state == "off" && elem.classList.contains(classPref + "off")) {
//         // do nothing
//       } else {
//         elem.classList.remove(classPref + "on");
//         elem.classList.add(classPref + "off");
//       }
//     }

// }, [ref, classPref, duration, animated, transitions, overlap, state]);

// useEffect(() => {
// console.log(classList);
// }, [classList]);

//   if(initialized){
//     return classList.join(" ");
//   }
// }

// function toggle(elem, { classPref = "", duration = 0, animated = true, transitions = "", overlap = "overlap start", state = "" } = {}) {

//   var selectorPrefix = "__";
//   if (classPref == "") selectorPrefix = "";
//   classPref = classPref + selectorPrefix;

//   if (animated) {
//     var overlapStart = false;
//     var overlapEnd = false;
//     if (overlap == "overlap end") {
//       overlapStart = false;
//       overlapEnd = true;
//     } else if (overlap == "overlap start") {
//       overlapStart = true;
//       overlapEnd = false;
//     } else if (overlap == "overlap both") {
//       overlapStart = true;
//       overlapEnd = true;
//     } else {
//       overlapStart = false;
//       overlapEnd = false;
//     }

//     if (transitions != "2 transitions") {
//       if (state == "on" && elem.classList.contains(classPref + "on")) {
//         // do nothing
//       } else if (state == "on" || (state === "" && elem.classList.contains(classPref + "off"))) {
//         simpleToggleOn(ref, elem, { classPref, overlap: overlapStart, duration });
//       } else if (state == "off" && elem.classList.contains(classPref + "off")) {
//         // do nothing
//       } else {
//         simpleToggleOff(elem, { classPref, overlap: overlapEnd, duration });
//       }
//     } else {
//       if (state == "on" && elem.classList.contains(classPref + "on")) {
//         // do nothing
//       } else if (state == "on" || (state === "" && elem.classList.contains(classPref + "off"))) {
//         dualTransitionToggleOn(ref, elem, { classPref, overlap: overlapStart, duration });
//       } else if (state == "off" && elem.classList.contains(classPref + "off")) {
//         // do nothing
//       } else {
//         dualTransitionToggleOff(elem, { classPref, overlap: overlapEnd, duration });
//       }
//     }
//   } else {
//     if (state == "on" && elem.classList.contains(classPref + "on")) {
//       // do nothing
//     } else if (state == "on" || (state === "" && elem.classList.contains(classPref + "off"))) {
//       elem.classList.remove(classPref + "off");
//       elem.classList.add(classPref + "on");
//     } else if (state == "off" && elem.classList.contains(classPref + "off")) {
//       // do nothing
//     } else {
//       elem.classList.remove(classPref + "on");
//       elem.classList.add(classPref + "off");
//     }
//   }
// }

// var tran;
// if (typeof window != "undefined") {
//   tran = window.getComputedStyle(window.document.documentElement).getPropertyValue("--transition") || false;
//   if (tran) tran = Number(tran.split("s")[0]) * 1000;
//   else tran = 0;
// }

// function getTransition(elem) {
//   return Number(window.getComputedStyle(elem, null).transitionDuration.split("s")[0]) * 1000;
// }

// function simpleToggleOn(ref, classList, setClassList, { classPref = "", overlap = true, duration = 0 } = {}) {
//   const elem = ref.current;
//   if (!elem) return;

//   let tran = getTransition(elem);

//   if (duration !== tran) {
//     duration = getTransition(elem);
//   }

//   const newClassList = [...classList];
//   if (overlap) {
//     newClassList.remove(classPref + "off");
//     newClassList.push(classPref + "on");
//     newClassList.push(classPref + "tran");
//     setClassList(newClassList);
//     setTimeout(() => {
//       newClassList.remove(classPref + "tran");
//       setClassList(newClassList);
//     }, 0);
//   } else {
//     newClassList.remove(classPref + "off");
//     newClassList.push(classPref + "on");
//     newClassList.push(classPref + "tran");
//     setClassList(newClassList);
//     setTimeout(() => {
//       newClassList.remove(classPref + "tran");
//       setClassList(newClassList);
//     }, duration);
//   }
// }

// function simpleToggleOff(elem, classList, setClassList, { classPref = "", overlap = false, duration = 0 } = {}) {
//   if (duration != tran) {
//     duration = getTransition(elem);
//   }

//   elem.classList.add(classPref + "on");
//   elem.classList.add(classPref + "tran");
//   elem.classList.remove(classPref + "off");

//   if (overlap) {
//     setTimeout(() => {
//       elem.classList.add(classPref + "off");
//       elem.classList.remove(classPref + "on");
//       elem.classList.remove(classPref + "tran");
//     }, 0);
//     setTimeout(() => {}, tran);
//   } else {
//     setTimeout(() => {
//       elem.classList.add(classPref + "off");
//       elem.classList.remove(classPref + "on");
//       elem.classList.remove(classPref + "tran");
//     }, duration);
//   }
// }

// function dualTransitionToggleOn(ref, elem, { classPref = "", overlap = false, duration = 0 } = {}) {
//   if (duration != tran) {
//     duration = getTransition(elem);
//   }

//   elem.classList.add(classPref + "tran1");

//   if (overlap) {
//     setTimeout(() => {
//       elem.classList.remove(classPref + "on");
//       elem.classList.add(classPref + "off");
//       elem.classList.remove(classPref + "tran1");
//     }, 0);
//   } else {
//     setTimeout(() => {
//       elem.classList.remove(classPref + "on");
//       elem.classList.add(classPref + "off");
//       elem.classList.remove(classPref + "tran1");
//     }, duration);
//   }
// }

// function dualTransitionToggleOff(elem, { classPref = "", overlap = false, duration = 0 } = {}) {
//   if (duration != tran) {
//     duration = getTransition(elem);
//   }

//   elem.classList.add(classPref + "on");
//   elem.classList.add(classPref + "tran2");
//   elem.classList.remove(classPref + "off");

//   if (overlap) {
//     setTimeout(() => {
//       elem.classList.remove(classPref + "off");
//       elem.classList.remove(classPref + "tran2");
//     }, 0);
//   } else {
//     setTimeout(() => {
//       elem.classList.remove(classPref + "off");
//       elem.classList.remove(classPref + "tran2");
//     }, duration);
//   }
// }

// export default useToggle;
