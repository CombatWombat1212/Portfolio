import { ClassList, createUpdateConditions } from "@/scripts/GlobalUtilities";
import React, { useRef } from "react";

const Notch = React.memo(function Notch({ slide, index, handlers }) {
  const { notchOnMouseDown } = handlers;
  const group = slide.group;
  const img = slide.states.img;
  const section = group.sections.find((section) => section.name === img.section);
  const isSectionActive = section && index >= section.start && index <= section.end;

  const list = new ClassList("slider--notch");
  list.add("hoverable");
  if (section) list.addEither(isSectionActive, "active", "inactive");
  const classes = list.get();

  slide.refs.notches[index] = useRef(null);

  return (
    <div
      className={classes}
      ref={slide.refs.notches[index]}
      style={{ "--slider-notch-index": `${index}` }}
      data-index={index}
      key={`marker ${index}`}
      onMouseDown={notchOnMouseDown}
      onTouchStart={notchOnMouseDown}
      ></div>
  );
}, createUpdateConditions(["slide", "index", "handlers"]));

Notch.displayName = "Notch";

export default Notch;
