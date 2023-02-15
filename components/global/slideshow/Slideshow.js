import Heading from "@/components/sections/Heading";
import { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useRef, useState } from "react";
import Button from "../../elements/Buttons";
import Graphic from "../../sections/Graphic";
import { buttonHandler } from "./slideshow_utilities.js/SlideshowInteractions";
import { slideshowSetDescHeightInit, slideshowSetDescriptionHeight } from "./slideshow_utilities.js/SlideshowStyle";

// function Card({ img, width, height }) {
//   var hasActions = img.actions != null && img.actions != undefined && img.actions != [] && img.actions != "" && img.actions.length > 0;

//   var hasMultipleActions = hasActions && img.actions.length > 1;

//   return (
//     <div className="card">
//       <div className="card--graphic col-8" width={width} height={height}>
//         <Graphic className="card--img" type="image" img={img} />
//       </div>
//       <div className="card--description col-4 section--description">
//         <Heading type="h3">{img.title}</Heading>
//         {img.description.map((desc, index) => (
//           <p key={index}>{desc}</p>
//         ))}

//         {hasActions && (
//           <>
//             <Heading type="h5" className="card--subheading">
//               {hasMultipleActions ? "User Actions:" : "User Action:"}
//             </Heading>
//             {hasMultipleActions ? (
//               <ul className="list">
//                 {img.actions.map((action, index) => {
//                   const formattedAction = action[action.length - 1] === "." ? action.slice(0, -1) : action;
//                   return (
//                     <li className="list--item" key={index}>
//                       <span>{formattedAction}</span>
//                     </li>
//                   );
//                 })}
//               </ul>
//             ) : (
//               <p className="list">{img.actions[0]}</p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

function Info({ name, hasMultiple, items }) {
  return (
    <>
      <>
        <Heading type="h5" className="card--subheading">
          {hasMultiple ? `${name}s:` : `${name}:`}
        </Heading>
        {hasMultiple ? (
          <ul className="list">
            {items.map((item, index) => (
              <li className="list--item" key={index}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="list">{items[0]}</p>
        )}
      </>
    </>
  );
}

function infoDoesExist(arr) {
  return arr != null && arr != undefined && arr != [] && arr != "" && arr.length > 0;
}

function infoFormatList(val) {

  if(typeof val == "array"){
    val = val.map((str) => {
      str.trim();
      str = str.charAt(0).toUpperCase() + str.slice(1);
      str = str[str.length - 1] === "." ? str.slice(0, -1) : str;
      return str;
    });
  } else if(typeof val == "string"){
    val.trim();
    val = val.charAt(0).toUpperCase() + val.slice(1);
    val = val[val.length - 1] === "." ? val.slice(0, -1) : val;
  }
   return val;
}

function Card({ img, index, width, height }) {
  var hasActions = infoDoesExist(img.actions);
  var hasNotes = infoDoesExist(img.notes);
  var hasMultipleActions = hasActions && img.actions.length > 1;
  var hasMultipleNotes = hasNotes && img.notes.length > 1;

  var formattedActions = img.actions;
  var formattedNotes = img.notes;
  if (hasActions) formattedActions = infoFormatList(img.actions);
  if (hasNotes) formattedNotes = infoFormatList(img.notes);

  return (
    <div className="card">
      <div className="card--graphic col-8" width={width} height={height}>
        <Graphic className="card--img" type="image" img={img} />
      </div>
      <div className="card--description col-4 section--description">
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

        {/* {hasActions && <Info name="User Action" hasMultiple={hasMultipleActions} items={formattedActions} />} */}
      </div>
    </div>
  );
}

function Slideshow({ children, img }) {
  // TODO: keep images stored after being loaded, so load them in outside the DOM and place them in after load in the same way as in the lightbox component

  var slideshow = useRef(null);

  useMountEffect(() => {
    slideshowSetDescHeightInit(slideshow);
  });

  const [cardImage, setCardImage] = useState(img);

  var group = MAKERIGHT_IMG_GROUPS[cardImage.group];
  var index = cardImage.index;

  var width = group.width.min;
  var height = group.height.min;

  var cardGraphicStyle = {
    "--img-aspect-width": `${width}`,
    "--img-aspect-height": `${height}`,
    "--img-width": `${width}px`,
    "--img-height": `${height}px`,
  };

  return (
    <div className="slideshow" style={cardGraphicStyle} ref={slideshow}>
      <div className="slideshow--header">{children}</div>
      <div className="slideshow--content">
        <Card img={group.imgs[index]} index={index} width={width} height={height} />
      </div>
      <div className="slideshow--slider"></div>

      <div className="flex-row gap-4 mt-3">
        <Button
          onClick={(e) => {
            buttonHandler(e, group, index, cardImage, setCardImage);
          }}
          color="background-secondary">
          Left
        </Button>
        <Button
          onClick={(e) => {
            buttonHandler(e, group, index, cardImage, setCardImage);
          }}
          color="background-secondary">
          Right
        </Button>
      </div>
    </div>
  );
}

export default Slideshow;
