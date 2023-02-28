import toggle from "@/scripts/AnimationTools";

function removeLoading(loading, canvas) {
  toggle(loading, {classPref: "popup--loading", anim: "animated", duration: "transition"});
  toggle(canvas, {classPref: "popup--canvas", anim: "animated", duration: "transition"});
}



export { removeLoading };
