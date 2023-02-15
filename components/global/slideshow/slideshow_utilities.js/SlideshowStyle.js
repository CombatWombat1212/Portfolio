import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";


var isResizing;

function slideshowSetDescHeightInit(elem) {
  elem = elem.current;

  slideshowSetDescHeight(elem);
  window.addEventListener("resize", slideshowResize, false);

}

function slideshowSetDescHeight(elem) {

  var cardGraphic = elem.querySelector(".card--graphic");
  var width = cardGraphic.clientWidth;
  var height = cardGraphic.clientHeight;

  var description = elem.querySelector(".card--description");

  if (description == null) return;

  description.style.setProperty("--graphic-width", `${width}px`);
  description.style.setProperty("--graphic-height", `${height}px`);

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
