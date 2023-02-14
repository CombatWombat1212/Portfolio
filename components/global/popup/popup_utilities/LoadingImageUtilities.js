import toggle from "@/scripts/AnimationTools";

function removeLoading(loading, canvas) {
  toggle(loading, "popup--loading", "transition", "animated", "");
  toggle(canvas, "popup--canvas", "transition", "animated", "");
}



export { removeLoading };
