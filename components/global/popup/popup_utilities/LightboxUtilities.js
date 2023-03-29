import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";

import toggle from "@/scripts/AnimationTools";
import { IMAGE_TYPES, splitS, VIDEO_TYPES } from "@/scripts/GlobalUtilities";
import { setWaitingToShowLoading, waitToLoad } from "../Popup";
import { hiddenUIInit, setActiveHiddenUI } from "./HiddenUIUtilities";
import { loadImgExternally } from "@/scripts/GlobalUtilities";
import { KOALAKO_IMG_GROUPS } from "@/data/KOALAKO_IMGS";
import { EXPLORATIONS_IMG_GROUPS } from "@/data/EXPLORATIONS_IMGS";

var popupGroup = false;
var popupIndex;

function updatePopupNav(popup, setPopup, group, setGroup, index, setIndex, nav) {

  if (group && group.imgs.length != 0 && group.imgs.length != 1) {

    if (index == 0) {
      if (!nav.right.on) nav.right.setOn(true);
      if (nav.left.on) nav.left.setOn(false);
    }
    if (index == group.imgs.length - 1) {
      if (nav.right.on) nav.right.setOn(false);
      if (!nav.left.on) nav.left.setOn(true);
      
    }
    if (index > 0 && index < group.imgs.length - 1) {
      if (!nav.right.on) nav.right.setOn(true);
      if (!nav.left.on) nav.left.setOn(true);
    }

  } else {

    if (nav.right.on) nav.right.setOn(false);
    if (nav.left.on) nav.left.setOn(false);

  }


}

function getImgGroup(popup, setPopup, group, setGroup, index, setIndex) {
  // TODO: would it be better to always have the left and right buttons present rather than toggling them on and off depending on the index?
  // TODO: should we add Pagination Indicators? lil dots at the bottom of the popup that indicate which image you're on and how many there are in total?
  // TODO: this one is stupid optional, what about an animation between the image on the page and the image in the popup? like a zoom in or something?

  var imgGroup = popup.img.group;
  var imgStudy = popup.img.study;

  var IMG_GROUP;
  if (imgStudy == "koalako") IMG_GROUP = KOALAKO_IMG_GROUPS;
  if (imgStudy == "makeright") IMG_GROUP = MAKERIGHT_IMG_GROUPS;
  if (imgStudy == "explorations") IMG_GROUP = EXPLORATIONS_IMG_GROUPS;

  if (imgGroup) {
    if (typeof IMG_GROUP[imgGroup] === "undefined") throw new Error(`No group with name ${imgGroup} found`);
    var index = popup.img.index;
    setGroup(IMG_GROUP[imgGroup]);
    setIndex(index);
  } else {
    setGroup(false);
    setIndex(false);
  }

  // popupGroup = group;
}

// function checkForRelevantGroups(popup, setPopup) {
//   // TODO: would it be better to always have the left and right buttons present rather than toggling them on and off depending on the index?
//   // TODO: should we add Pagination Indicators? lil dots at the bottom of the popup that indicate which image you're on and how many there are in total?
//   // TODO: this one is stupid optional, what about an animation between the image on the page and the image in the popup? like a zoom in or something?

//   var imgGroup = popup.img.group;
//   var imgStudy = popup.img.study;

//   var IMG_GROUP;
//   if (imgStudy == "koalako") IMG_GROUP = KOALAKO_IMG_GROUPS;
//   if (imgStudy == "makeright") IMG_GROUP = MAKERIGHT_IMG_GROUPS;
//   if (imgStudy == "explorations") IMG_GROUP = EXPLORATIONS_IMG_GROUPS;

//   if (!imgGroup) return;
//   if (typeof IMG_GROUP[imgGroup] === "undefined") throw new Error(`No group with name ${imgGroup} found`);

//   var index = popup.img.index;
//   var group = IMG_GROUP[imgGroup];

//   popupGroup = group;
//   popupIndex = index;

// }


// var imgLoading = false;

// function lightboxInit(popup, setPopup, setShowLoading) {
function lightboxInit(popup, setPopup, group, setGroup, index, setIndex) {
  // if (imgLoading) return; // cancel image loading if one is already in progress

  // imgLoading = true;

  getImgGroup(popup, setPopup, group, setGroup, index, setIndex);

  setActiveHiddenUI("lightbox");

  var popWrapper = document.querySelector(".popup--wrapper");
  var on = popWrapper.classList.contains("popup--wrapper__on") ? true : false;
  if (!on) hiddenUIInit();

  // var img = loadImgExternally(popup.img);
  // var content = document.querySelector(".popup--content");
  // var media = document.querySelector(".popup--media");

  // var isImg = IMAGE_TYPES.includes(popup.img.type);
  // var isVid = VIDEO_TYPES.includes(popup.img.type);

  // if (isImg) {
  //   media.classList.add("popup--img");
  //   media.classList.remove("popup--video");
  //   img.onload = function () {
  //     run();
  //   };
  // }
  // if (isVid) {
  //   media.classList.add("popup--video");
  //   media.classList.remove("popup--img");
  //     run();
  // }

  // function run() {
  //   var transition = splitS(window.getComputedStyle(content).transitionDuration);

  //   var media = document.querySelector(".popup--media");
  //   var loader = document.querySelector(".popup--loading");

  //   // Remove the previous image or video
  //   while (media.firstChild) {
  //     media.removeChild(media.firstChild);
  //   }

  //   img.classList.add("popup--media__off");
  //   media.appendChild(img);

  //   toggle(img, { classPref: "popup--media", duration: "transition" });
  //   toggle(content, { classPref: "popup--content", duration: "transition" });

  //   imgLoading = false; // indicate that the image has finished loading

  // }
}

export {
  lightboxInit,
  // seekHandler,
  // checkForRelevantGroups,
  // setPopupGroup
  updatePopupNav,
  getImgGroup,
};

export {
  // popupGroup,
  // imgLoading
};
