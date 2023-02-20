import { Graphic, Heading } from "@/components/sections/Sections";
import toggle from "@/scripts/AnimationTools";
import { arrayItemDoesExist, capFirstRemovePeriod } from "@/scripts/GlobalUtilities";
import { useEffect, useRef } from "react";
import Info from "./Info";

function Card({ img, index, width, height, descriptionOn, onClick }) {
    var hasActions = arrayItemDoesExist(img.actions);
    var hasNotes = arrayItemDoesExist(img.notes);
    var hasMultipleActions = hasActions && img.actions.length > 1;
    var hasMultipleNotes = hasNotes && img.notes.length > 1;
  
    var formattedActions = img.actions;
    var formattedNotes = img.notes;
    if (hasActions) formattedActions = capFirstRemovePeriod(img.actions);
    if (hasNotes) formattedNotes = capFirstRemovePeriod(img.notes);
  
    var affectedClasses = ["card--description-inner", "card--description", "card--graphic"];
  
    var card = useRef(null);
  
    useEffect(() => {
      if (card.current == null) return;
      for (var i = 0; i < affectedClasses.length; i++) {
        var target = card.current.querySelector(`.${affectedClasses[i]}`);
        if (target == null) continue;
        toggle(target, affectedClasses[i], "transition", "", "");
      }
    }, [descriptionOn]);
  
    var cardClasses = ["card"];
    cardClasses = cardClasses.join(" ");
  
    return (
      <div className={`${cardClasses}`} ref={card} onClick={onClick}>
        <div className="card--graphic card--graphic__off" width={width} height={height}>
          <Graphic className="card--img" type="image" img={img} />
        </div>
        <div className={`card--description card--description__off section--description`}>
          <div className={`card--description-inner card--description-inner__off`}>
            <Heading type="h3" className="card--title">
              {img.title}
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