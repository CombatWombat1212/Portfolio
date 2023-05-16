import { Graphic, Heading } from "@/components/sections/Sections";
import toggle from "@/scripts/AnimationTools";
import { arrayItemDoesExist, capFirstRemovePeriod } from "@/scripts/GlobalUtilities";
import { useEffect, useRef } from "react";
import Info from "./Info";
import ResponsiveText from "../../ResponsiveText";

function Card({ img, index, width, height, slide, onClick, ...props }) {
  const card = useRef(null);

  var hasActions = arrayItemDoesExist(img.actions);
  var hasNotes = arrayItemDoesExist(img.notes);
  var hasMultipleActions = hasActions && img.actions.length > 1;
  var hasMultipleNotes = hasNotes && img.notes.length > 1;

  var formattedActions = img.actions;
  var formattedNotes = img.notes;
  if (hasActions) formattedActions = capFirstRemovePeriod(img.actions);
  if (hasNotes) formattedNotes = capFirstRemovePeriod(img.notes);

  var affectedClasses = ["card--description-inner", "card--description", "card--graphic"];

  useEffect(() => {
    if (card.current == null) return;
    for (var i = 0; i < affectedClasses.length; i++) {
      var target = card.current.querySelector(`.${affectedClasses[i]}`);
      if (target == null) continue;
      toggle(target, { classPref: affectedClasses[i], duration: "transition", overlap: "overlap both", state: slide.states.desc ? "on" : "off" });
    }
  }, [slide.states.desc]);

  return (
    <div className={`card`} ref={card} onClick={onClick} {...props}>
      <div className="card--graphic card--graphic__off" width={width} height={height}>
        <Graphic className="card--img" type="image" img={img} />
      </div>
      <div className={`card--description card--description__off section--description`}>
        <div className={`card--description-inner card--description-inner__off`}>
          <Heading type="h3" className="card--title">
            <ResponsiveText tag="Fragment">{img.title}</ResponsiveText>
          </Heading>
          <Heading type="p" className="card--subtitle">
            {img.section} - {img.phase}
          </Heading>

          <div className="">
            <Heading type="h5" className="card--subheading">
              Description:
            </Heading>
            {img.description.map((desc, index) => (
              <p className="card--paragraph" key={index}>
                {desc}
              </p>
            ))}
          </div>

          {hasActions && <Info name="User Action" hasMultiple={hasMultipleActions} items={formattedActions} />}
          {hasNotes && <Info name="Note" hasMultiple={hasMultipleNotes} items={formattedNotes} />}
        </div>
      </div>
    </div>
  );
}

export default Card;
