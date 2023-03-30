// import toggle from "@/scripts/AnimationTools";
// import { popupGroup, seekHandler } from "./LightboxUtilities";

// var setPopupGlobal;




// function setSetPopupGlobal(setPopup) {
//     setPopupGlobal = setPopup;
// }

// function catchKeys(e) {
//     if (e.keyCode == 27 || e.key == "Escape") {
//       closePopup(setPopupGlobal);
//     }
  
//     if (popupGroup) {
//       if (e.keyCode == 37 || e.key == "ArrowLeft") {
//         seekHandler(e, setPopupGlobal);
//       }
  
//       if (e.keyCode == 39 || e.key == "ArrowRight") {
//         seekHandler(e, setPopupGlobal);
//       }
//     }
//   }
  
//   function closePopup(setPopup) {
//     var trans = Number(window.getComputedStyle(document.querySelector(".popup--wrapper")).transitionDuration.split("s")[0]) * 1000;
//     toggle(document.querySelector(".popup--wrapper"), {classPref: "popup--wrapper", duration: "transition"});
//     setTimeout(() => setPopup(false), trans);
//   }

  
//   export {catchKeys, closePopup, setSetPopupGlobal}