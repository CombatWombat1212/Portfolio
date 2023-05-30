import { useRef } from "react";

function Notch({ slide, index, handlers }) {
  const {notchOnMouseDown } = handlers;
  const group = slide.group;
  const img = slide.states.img;
  const section = group.sections.find((section) => section.name === img.section);
  const isSectionActive = section && index >= section.start && index <= section.end;
  const notchClass = `slider--notch slider--notch__hoverable ${
    section ? (isSectionActive ? "slider--notch__active" : "slider--notch__inactive") : ""
  }`;

  slide.refs.notches[index] = useRef(null);

  return (
    <div
      className={notchClass}
      ref={slide.refs.notches[index]}
      style={{ "--slider-notch-index": `${index}` }}
      data-index={index}
      key={`marker ${index}`}
      onMouseDown={notchOnMouseDown}
      onTouchStart={notchOnMouseDown}

      ></div>
  );
}

Notch.displayName = "Notch";

export default Notch;
