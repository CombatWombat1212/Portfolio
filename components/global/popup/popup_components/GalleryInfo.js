import Tag from "@/components/elements/Tag";
import { createUpdateConditions } from "@/scripts/GlobalUtilities";
import React from "react";
import AnimPres from "../../AnimPres";
import popAnims from "../popup_utilities/PopupAnimations";


const GalInfo = React.memo(function GalInfo({ pop, popclass, elems }) {
  var title, subheading;
  if (pop.img.project) {
    title = pop.img.project;
    subheading = pop.img.title;
  } else if (pop.img.title) {
    title = pop.img.title;
  } else {
    title = false;
  }

  const styles = {
    description: {
      "--gallery-img-height": `${elems.img.height != 0 && elems.img.height}px`,
    },
  };

  var hasDesc = pop.img.description || (pop.group.description && pop.group.description[pop.index]);
  
  return (
    <>
      <AnimPres
        mode="wait"
        animation={popAnims.changeImg}
        delay={0.65}
        condition={true}
        reference={elems.desc.ref}
        className={`popup--description ${popclass.desc}`}
        style={styles.description}>
        <h3 type="h3" className="gallery--title" dangerouslySetInnerHTML={{ __html: title }} />
        {subheading && <h5 className="gallery--subheading">{subheading}</h5>}

        <div className="gallery--info">
          {hasDesc && <GalDescription pop={pop} />}
          <GalCategories pop={pop} hasDesc={hasDesc}/>
        </div>
      </AnimPres>
    </>
  );
}, createUpdateConditions(["pop.index", "pop.img"]));

const GalCategories = React.memo(function GalCategories({pop, hasDesc}) {

  var catclasses = hasDesc ? "" : "gallery--categories__no-desc";

  return (
    <div className={`gallery--categories ${catclasses}`}>
      {pop.img.disciplines.map((item, i) => {
        return (
          <Tag key={`${item.key} ${i}`} color={"inverted"}>
            {item}
          </Tag>
        );
      })}
      {pop.img.tools.map((item, i) => {
        return (
          <Tag key={`${item.key} ${i}`} color={"inverted"} variant={"tool"}>
            {item}
          </Tag>
        );
      })}
    </div>
  );
}, createUpdateConditions(["pop.index", "pop.img"]));



const GalDescription = React.memo(function GalDescription({ pop }) {
  var descs = pop.img.description ? pop.img.description : pop.group.description[pop.index];
  return (
    <>
      <div className="gallery--description">
        {descs.map((d, i) => {
          return (
            <p key={i} className="gallery--paragraph">
              {d}
            </p>
          );
        })}
      </div>
    </>
  );
}, createUpdateConditions(["pop.img", "pop.index"]));


export { GalInfo, GalCategories, GalDescription}