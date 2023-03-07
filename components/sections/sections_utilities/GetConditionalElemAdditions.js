import { addClassToJsxObj } from "./ClassUtilities";

function getGraphicChanges(type, graphic) {
  if (type == "overview") {
    for (var i = 0; i < graphic.length; i++) {
      graphic[i] = addClassToJsxObj(graphic[i], "my-auto");
    }
  }

  return graphic;
}

export { getGraphicChanges };
