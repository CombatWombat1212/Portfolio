import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import toggle from "@/scripts/AnimationTools";
import { hiddenUIInit, setActiveHiddenUI } from "./HiddenUIUtilities";


var popupGroup = false;
var popupIndex;


function setPopupGroup(bool){
    popupGroup = bool;
}

function checkForRelevantGroups(popup, setPopup) {

    // TODO: would it be better to always have the left and right buttons present rather than toggling them on and off depending on the index?
  // TODO: should we add Pagination Indicators? lil dots at the bottom of the popup that indicate which image you're on and how many there are in total?
  // TODO: should we add transitions between images in a gallery?
  // TODO: this one is stupid optional, what about an animation between the image on the page and the image in the popup? like a zoom in or something?

  var imgGroup = popup.img.group;

  if (!imgGroup) return;
  if (typeof MAKERIGHT_IMG_GROUPS[imgGroup] === "undefined") throw new Error(`No group with name ${imgGroup} found`);

  var index = popup.img.index;
  var group = MAKERIGHT_IMG_GROUPS[imgGroup];

  popupGroup = group;
  popupIndex = index;

  if (popupGroup.imgs.length == 0 || popupGroup.imgs.length == 1) return;

  var seekRight = document.querySelector(".popup--seek__right");
  var seekLeft = document.querySelector(".popup--seek__left");

  var seekRightOn = seekRight.classList.contains("popup--seek__on") ? true : false;
  var seekLeftOn = seekLeft.classList.contains("popup--seek__on") ? true : false;

  if (popupIndex == 0) {
    if (!seekRightOn) toggle(seekRight, "popup--seek", "transition", "animated", "");
    if (seekLeftOn) toggle(seekLeft, "popup--seek", "transition", "animated", "");
  }
  if (popupIndex == popupGroup.imgs.length - 1) {
    if (seekRightOn) toggle(seekRight, "popup--seek", "transition", "animated", "");
    if (!seekLeftOn) toggle(seekLeft, "popup--seek", "transition", "animated", "");
  }
  if (popupIndex > 0 && popupIndex < popupGroup.imgs.length - 1) {
    if (!seekRightOn) toggle(seekRight, "popup--seek", "transition", "animated", "");
    if (!seekLeftOn) toggle(seekLeft, "popup--seek", "transition", "animated", "");
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




function lightboxImgLoaded(e){
    console.log(e, 'loaded')
}


function lightboxInit(popup, setPopup) {
    checkForRelevantGroups(popup, setPopup);
  
    setActiveHiddenUI("lightbox");
  
    var popWrapper = document.querySelector(".popup--wrapper");
    var on = popWrapper.classList.contains("popup--wrapper__on") ? true : false;
    if (!on) hiddenUIInit();
    
  }
  
  
export {lightboxInit, seekHandler, checkForRelevantGroups, setPopupGroup, lightboxImgLoaded}  

export {popupGroup}