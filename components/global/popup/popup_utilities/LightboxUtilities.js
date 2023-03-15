import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";

import toggle from "@/scripts/AnimationTools";
import { splitS } from "@/scripts/GlobalUtilities";
import { setWaitingToShowLoading, waitToLoad } from "../Popup";
import { hiddenUIInit, setActiveHiddenUI } from "./HiddenUIUtilities";
import { loadImgExternally } from "@/scripts/GlobalUtilities";
import { KOALAKO_IMG_GROUPS } from "@/data/KOALAKO_IMGS";

var popupGroup = false;
var popupIndex;

function setPopupGroup(bool) {
  popupGroup = bool;
}

function checkForRelevantGroups(popup, setPopup) {
  // TODO: would it be better to always have the left and right buttons present rather than toggling them on and off depending on the index?
  // TODO: should we add Pagination Indicators? lil dots at the bottom of the popup that indicate which image you're on and how many there are in total?
  // TODO: this one is stupid optional, what about an animation between the image on the page and the image in the popup? like a zoom in or something?

  var imgGroup = popup.img.group;
  var imgStudy = popup.img.study;

  var IMG_GROUP; 
  if (imgStudy == "koalako") IMG_GROUP = KOALAKO_IMG_GROUPS;
  if (imgStudy == "makeright") IMG_GROUP = MAKERIGHT_IMG_GROUPS;



  if (!imgGroup) return;
  if (typeof IMG_GROUP[imgGroup] === "undefined") throw new Error(`No group with name ${imgGroup} found`);

  var index = popup.img.index;
  var group = IMG_GROUP[imgGroup];

  popupGroup = group;
  popupIndex = index;

  if (popupGroup.imgs.length == 0 || popupGroup.imgs.length == 1) return;

  var seekRight = document.querySelector(".popup--seek__right");
  var seekLeft = document.querySelector(".popup--seek__left");

  var seekRightOn = seekRight.classList.contains("popup--seek__on") ? true : false;
  var seekLeftOn = seekLeft.classList.contains("popup--seek__on") ? true : false;

  if (popupIndex == 0) {
    if (!seekRightOn) toggle(seekRight, { classPref: "popup--seek", duration: "transition" });
    if (seekLeftOn) toggle(seekLeft, { classPref: "popup--seek", duration: "transition" });
  }
  if (popupIndex == popupGroup.imgs.length - 1) {
    if (seekRightOn) toggle(seekRight, { classPref: "popup--seek", duration: "transition" });
    if (!seekLeftOn) toggle(seekLeft, { classPref: "popup--seek", duration: "transition" });
  }
  if (popupIndex > 0 && popupIndex < popupGroup.imgs.length - 1) {
    if (!seekRightOn) toggle(seekRight, { classPref: "popup--seek", duration: "transition" });
    if (!seekLeftOn) toggle(seekLeft, { classPref: "popup--seek", duration: "transition" });
  }
}

function seekHandler(e, setPopup) {
  var button;

  if (e.type == "keydown") {
    if (e.key == "ArrowRight") {
      button = document.querySelector(".popup--seek__right");
    }
    if (e.key == "ArrowLeft") {
      button = document.querySelector(".popup--seek__left");
    }
  } else {
    button = e.target;
    while (!button.classList.contains("popup--seek")) {
      button = button.parentElement;
    }
  }

  var direction = button.classList.contains("popup--seek__right") ? 1 : -1;

  var length = popupGroup.imgs.length;

  popupIndex += direction;

  if (popupIndex >= length) popupIndex = 0;
  if (popupIndex < 0) popupIndex = length - 1;

  var img = popupGroup.imgs[popupIndex];

  var zoom = img.zoom ? img.zoom : false;

  setPopup({ type: "lightbox", img: img, zoom: zoom });
}

var imgLoading = false;

function lightboxInit(popup, setPopup, setShowLoading) {
  if (imgLoading) return; // cancel image loading if one is already in progress

  imgLoading = true;

  checkForRelevantGroups(popup, setPopup);
  setActiveHiddenUI("lightbox");

  var popWrapper = document.querySelector(".popup--wrapper");
  var on = popWrapper.classList.contains("popup--wrapper__on") ? true : false;
  if (!on) hiddenUIInit();

  var img = loadImgExternally(popup.img);
  var content = document.querySelector(".popup--content");

  waitToLoad(setShowLoading);

  img.onload = function () {
    // transition = .popup--content transition-duration

    var transition = splitS(window.getComputedStyle(content).transitionDuration);

    var wrapper = document.querySelector(".popup--img");
    var loader = document.querySelector(".popup--loading");
    img.classList.add("popup--img__off");
    wrapper.appendChild(img);

    toggle(img, { classPref: "popup--img", duration: "transition" });
    toggle(content, { classPref: "popup--content", duration: "transition" });

    imgLoading = false; // indicate that the image has finished loading

    setWaitingToShowLoading(false);
    setShowLoading(false);
  };
}

export { lightboxInit, seekHandler, checkForRelevantGroups, setPopupGroup };

export { popupGroup, imgLoading };
