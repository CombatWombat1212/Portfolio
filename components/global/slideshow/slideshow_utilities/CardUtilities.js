import { sliderHandleSet } from "./SliderUtilities";

function cardOnClickHandler(e, group, index, cardImage, setCardImage) {
    if (cardImage.index == index) return;
  
    var slideshow = e.target.closest(".slideshow");
    var slider = slideshow.querySelector(".slider");
  
    setCardImage(group.imgs[index]);
    sliderHandleSet(slider, index);
  }
  
  
  

  export { cardOnClickHandler}