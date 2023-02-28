import toggle from "@/scripts/AnimationTools";

function removeLoading(loading, canvas) {
  toggle(loading, {classPref: "popup--loading", duration: "transition"});
  toggle(canvas, {classPref: "popup--canvas", duration: "transition"});
}



export { removeLoading };
