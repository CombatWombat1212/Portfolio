import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";

import toggle from "@/scripts/AnimationTools";
import { IMAGE_TYPES, splitS, VIDEO_TYPES } from "@/scripts/GlobalUtilities";
import { setWaitingToShowLoading, waitToLoad } from "../Popup";
import { loadImgExternally } from "@/scripts/GlobalUtilities";
import { KOALAKO_IMG_GROUPS } from "@/data/KOALAKO_IMGS";
import { EXPLORATIONS_IMG_GROUPS } from "@/data/EXPLORATIONS_IMGS";
import { MADE_IMG_GROUPS } from "@/data/MADE_IMGS";

function updatePopupNav(pop, nav) {

  const totalImgCount = pop.group?.imgs?.filter(img => !img.hidden).length || 0;

  if (pop.group && totalImgCount != 0 && totalImgCount != 1) {
    if (pop.index == 0) {
      if (!nav.right.on) nav.right.setOn(true);
      if (nav.left.on) nav.left.setOn(false);
    }
    if (pop.index == totalImgCount - 1) {
      if (nav.right.on) nav.right.setOn(false);
      if (!nav.left.on) nav.left.setOn(true);
    }
    if (pop.index > 0 && pop.index < totalImgCount - 1) {
      if (!nav.right.on) nav.right.setOn(true);
      if (!nav.left.on) nav.left.setOn(true);
    }
  } else {
    if (nav.right.on) nav.right.setOn(false);
    if (nav.left.on) nav.left.setOn(false);
  }

}

function getImgGroup(pop) {
  // TODO: would it be better to always have the left and right buttons present rather than toggling them on and off depending on the index?
  // TODO: should we add Pagination Indicators? lil dots at the bottom of the popup that indicate which image you're on and how many there are in total?
  // TODO: this one is stupid optional, what about an animation between the image on the page and the image in the popup? like a zoom in or something?

    var imgGroup = pop.img.group;
    var imgCollection = pop.img.collection;
  
    var IMG_GROUP;
    if (imgCollection == "koalako") IMG_GROUP = KOALAKO_IMG_GROUPS;
    if (imgCollection == "makeright") IMG_GROUP = MAKERIGHT_IMG_GROUPS;
    if (imgCollection == "made") IMG_GROUP = MADE_IMG_GROUPS;
    if (imgCollection == "explorations") IMG_GROUP = EXPLORATIONS_IMG_GROUPS;
  
    if (imgGroup) {
      if (typeof IMG_GROUP[imgGroup] === "undefined") throw new Error(`No group with name ${imgGroup} found`);
      var index = pop.img.index;
  
      const group = IMG_GROUP[imgGroup];
      const nonHiddenImagesCount = group.imgs.filter((img) => !img.hidden).length;
  
      if (group.imgs.length === 1 || nonHiddenImagesCount <= 1) {
        pop.setGroup(false);
      } else {
        pop.setGroup(group);
        pop.setIndex(index);
      }
    } else {
      pop.setGroup(false);
      pop.setIndex(false);
    }
  }
  

// function getImgGroup(pop) {
//   // TODO: would it be better to always have the left and right buttons present rather than toggling them on and off depending on the index?
//   // TODO: should we add Pagination Indicators? lil dots at the bottom of the popup that indicate which image you're on and how many there are in total?
//   // TODO: this one is stupid optional, what about an animation between the image on the page and the image in the popup? like a zoom in or something?


//   var imgGroup = pop.img.group;
//   var imgCollection = pop.img.collection;

//   var IMG_GROUP;
//   if (imgCollection == "koalako") IMG_GROUP = KOALAKO_IMG_GROUPS;
//   if (imgCollection == "makeright") IMG_GROUP = MAKERIGHT_IMG_GROUPS;
//   if (imgCollection == "explorations") IMG_GROUP = EXPLORATIONS_IMG_GROUPS;


//   if (imgGroup) {
//     if (typeof IMG_GROUP[imgGroup] === "undefined") throw new Error(`No group with name ${imgGroup} found`);
//     var index = pop.img.index;
//     pop.setGroup(IMG_GROUP[imgGroup]);
//     pop.setIndex(index);
//   } else {
//     pop.setGroup(false);
//     pop.setIndex(false);
//   }

// }





function lightboxInit(pop) {
  getImgGroup(pop);
}
function galleryInit(pop) {
  getImgGroup(pop);
}

export {
  lightboxInit,
  galleryInit,
  updatePopupNav,
  getImgGroup,
};

export {
  // popupGroup,
  // imgLoading
};
