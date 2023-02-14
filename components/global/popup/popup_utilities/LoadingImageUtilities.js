import { loading } from "@/data/ICONS";
import toggle from "@/scripts/AnimationTools";

var loadingImage;

function loadingImageInit() {
  loadingImage = document.createElement("img");
  loadingImage.src = `${loading.src}`;

  loadingImage.width = loading.width;
  loadingImage.height = loading.height;
  loadingImage.alt = loading.alt;
}

function removeLoading(loading, canvas) {
  toggle(loading, "popup--loading", "transition", "animated", "");
  toggle(canvas, "popup--canvas", "transition", "animated", "");
}



export { loadingImageInit, removeLoading };
