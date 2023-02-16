import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";


var isResizing;

function slideshowSetDescHeightInit(elem) {
  elem = elem.current;

  slideshowSetDescHeight(elem);
  window.addEventListener("resize", slideshowResize, false);

}

function slideshowSetDescHeight(elem) {


  // TODO: seems i didnt need this

  // console.log(elem)

  // var cardGraphic = elem.querySelector(".card--graphic");
  // var width = cardGraphic.clientWidth;
  // var height = cardGraphic.clientHeight;

  
  // var description = elem.querySelector(".card--description");
  // if (description == null) {console.log('returned'); return;}
  
  // console.log(height)
  // console.log(description)

  // description.style.setProperty("--graphic-width", `${width}px`);
  // description.style.setProperty("--slideshow-graphic-height", `${height}px`);

}


function slideshowResize() {
  window.clearTimeout(isResizing);
  isResizing = setTimeout(slideshowResizeFunctions, RESIZE_TIMEOUT);
}

function slideshowResizeFunctions() {


    var elem = document.querySelectorAll(".slideshow");
    elem.forEach((elem) => {
        slideshowSetDescHeight(elem);
    });
    
}

export { slideshowSetDescHeightInit };
