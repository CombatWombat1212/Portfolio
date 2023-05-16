function Notch({ slide, index, handlers: { notchOnClick } }) {
  const group = slide.group;
  const img = slide.states.img;
  const section = group.sections.find((section) => section.name === img.section);
  const isSectionActive = section && index >= section.start && index <= section.end;
  const notchClass = `slider--notch slider--notch__hoverable ${
    section ? (isSectionActive ? "slider--notch__active" : "slider--notch__inactive") : ""
  }`;

  return (
    <div
      className={notchClass}
      style={{ "--slider-notch-index": `${index}` }}
      data-index={index}
      key={`marker ${index}`}
      onClick={notchOnClick}></div>
  );
}

export default Notch;
