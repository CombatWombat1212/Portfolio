// import toggle from "@/scripts/AnimationTools";

// var forceHiddenUIOn = false;
// const HIDDEN_UI = [
//   { type: "interactive", area: ".popup--canvas", target: ".popup--footer" },
//   { type: "lightbox", area: ".popup--content", target: ".popup--header" },
// ];
// var activeHiddenUI;

// function setActiveHiddenUI(type) {
//   activeHiddenUI = HIDDEN_UI.filter((ui) => ui.type == type)[0];
// }

// function hiddenUIToggle() {
//   var target = document.querySelector(activeHiddenUI.target);
//   if (!target) return;
//   var tran = Number(window.getComputedStyle(target).getPropertyValue("transition-duration").split("s")[0]) * 1000;
//   var on = target.classList.contains("popup--nav__on");



//   if (on && !forceHiddenUIOn && !mouseCurrentlyMoving) {
//     toggle(target, {state:"off", classPref: "popup--nav", duration: tran});
//   } else if (!on && (forceHiddenUIOn || mouseCurrentlyMoving)) {
//     toggle(target, {state:"on", classPref: "popup--nav", duration: tran});
//   }



// }

// function forceHiddenUI(e) {
//   forceHiddenUIOn = true;
//   hiddenUIToggle();
// }

// function stopForceHiddenUI() {
//   if (forceHiddenUIOn) {
//     forceHiddenUIOn = false;
//     mouseMoveRan = true;
//   }
// }

// function hiddenUIInit() {
//   var area = document.querySelector(activeHiddenUI.area);
//   var target = document.querySelector(activeHiddenUI.target);

//   window.addEventListener("mousemove", showUIOnMouseMove, false);
//   area.addEventListener("wheel", showUIOnMouseMove, false);
//   target.addEventListener("mouseenter", forceHiddenUI, false);
//   target.addEventListener("mouseleave", stopForceHiddenUI, false);

//   if (activeHiddenUI.type == "interactive") target.classList.remove("popup--nav__on");
//   if (activeHiddenUI.type == "interactive") target.classList.add("popup--nav__off");

//   forceHiddenUIOn = false;
// }

// var isMouseMoving;
// var mouseMoveTimeout = 1000;
// var mouseMoveRan = false;
// var mouseCurrentlyMoving = false;



// function hiddenUIEnd(){
//   window.removeEventListener("mousemove", showUIOnMouseMove, false);
// }



// function showUIOnMouseMove() {
//   if (!mouseMoveRan) {
//     mouseMoveRan = true;
//     mouseCurrentlyMoving = true;
//     hiddenUIToggle();
//   }
//   window.clearTimeout(isMouseMoving);
//   isMouseMoving = setTimeout(isMouseMovingFunctions, mouseMoveTimeout);
// }

// function isMouseMovingFunctions() {
//   mouseCurrentlyMoving = false;
//   mouseMoveRan = false;
//   hiddenUIToggle();
// }

// export { hiddenUIToggle, forceHiddenUI, stopForceHiddenUI, hiddenUIInit, setActiveHiddenUI, showUIOnMouseMove, hiddenUIEnd };
