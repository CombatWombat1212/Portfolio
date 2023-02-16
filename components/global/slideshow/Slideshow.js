import Heading from "@/components/sections/Heading";
import MAKERIGHT_IMGS, { MAKERIGHT_IMG_GROUPS } from "@/data/MAKERIGHT_IMGS";
import toggle from "@/scripts/AnimationTools";
import { addAttrNonDestructive, getSiblingStyle, RESIZE_TIMEOUT, splitPx, splitS } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";
import Button from "../../elements/Buttons";
import Graphic from "../../sections/Graphic";
import { buttonHandler } from "./slideshow_utilities.js/SlideshowInteractions";
import { slideshowSetDescHeight } from "./slideshow_utilities.js/SlideshowStyle";

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

function Toggle({ state, set, name }) {
  var toggle = useRef(null);

  useMountEffect(() => {
    addAttrNonDestructive(toggle.current, "onclick", "setTimeout(()=>{this.blur();},200)", ";");
  });

  const toggleState = () => {
    set(!state);
  };

  return (
    <div className="toggle">
      <label className="toggle--switch">
        <input
          className="toggle--checkbox"
          type="checkbox"
          ref={toggle}
          onClick={toggleState}
          checked={state}
          onChange={() => {
            set(!state);
          }}
        />
        <span className="toggle--slider"></span>
      </label>
      <div className="toggle--label">
        <span>{name}</span>
      </div>
    </div>
  );
}

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
  if (typeof val == "array") {
    val = val.map((str) => {
      str.trim();
      str = str.charAt(0).toUpperCase() + str.slice(1);
      str = str[str.length - 1] === "." ? str.slice(0, -1) : str;
      return str;
    });
  } else if (typeof val == "string") {
    val.trim();
    val = val.charAt(0).toUpperCase() + val.slice(1);
    val = val[val.length - 1] === "." ? val.slice(0, -1) : val;
  }
  return val;
}

function getAdjacentImage(group, index, val) {
  var result = false;
  var adjacentIndex = index + val;

  if (adjacentIndex >= 0 && adjacentIndex < group.imgs.length) {
    result = {};
    result.index = adjacentIndex;
    result.img = group.imgs[result.index];
  }

  return result;
}



function getElemWidth(elem){
  return splitPx(getComputedStyle(elem).getPropertyValue("width")) + splitPx(getComputedStyle(elem).getPropertyValue("margin-left")) + splitPx(getComputedStyle(elem).getPropertyValue("margin-right"));
}


function containerSetPosition(container, index, duration) {
  // container may be from a ref, or a dom element, convert it to just the dom element
  if (container == null) return;
  container = container.current ? container.current : container;
  duration = splitS(getComputedStyle(container).getPropertyValue("transition-duration"));

  var card = { width: 0, height: 0 };


  // seperate this out into a get card width function that runs on resize, might wanna use a state for it
  
  card.width = getElemWidth(container.children[1]);


  // var firstCard = container.querySelector('.slideshow--card');
  // var lastCard = container.querySelectorAll('.slideshow--card')[container.querySelectorAll('.slideshow--card').length - 1];

  // var [beforeFirstWidth, afterLastWidth] = getSiblingStyle("width", firstCard);

  var scrollTarget = card.width * index;
  var currentScroll = container.scrollLeft;

  container.scrollTo({ left: scrollTarget, behavior: "smooth" });
}

function slideshowInit(cardImage, setCardImage,setCardIndex, setInitialized,startIndex,group, slideshow, container, index) {
  slideshow = slideshow.current;
  container = container.current;

  slideshowResizeFunctions(slideshow, container, index);

  container.addEventListener("scroll", (e)=>{slideshowScrolling(e, cardImage, setCardImage,setCardIndex, setInitialized,startIndex, group)}, false);
  container.addEventListener("scroll", slideshowScrollingDelayed, false);

  window.removeEventListener("resize", slideshowResize, false);
  window.addEventListener("resize", slideshowResize, false);
}



function getCombinedStyle(elem, arr){

  var result = 0;

  arr.forEach((prop)=>{
    result += splitPx(getComputedStyle(elem).getPropertyValue(prop));
  });
  
  return result;
}



function slideshowScrolling(e, cardImage, setCardImage,setCardIndex, setInitialized,startIndex, group){

  var container = e.target;
  var slideshow = container.parentElement;
  var card = container.children[1];
  var drawnIndex = parseInt(getComputedStyle(container).getPropertyValue("--slide-img-index"));

  // amount of the card that needs to be scrolled past before the index is changed
  var buffer = 0.5;


  var cardWidth = getElemWidth(card);

  var scrollPos = container.scrollLeft;


  var calcIndex = Math.floor((scrollPos + (cardWidth * buffer)) / cardWidth);

  setCardImage(group.imgs[calcIndex]);
  setCardIndex(calcIndex);

  
  if (calcIndex != drawnIndex) {
    // setCardImage(group.imgs[calcIndex]);
    
    if (calcIndex === startIndex) {
      setInitialized(true);
    }

  }

  
}



var slideshowIsScrolling;

function slideshowScrollingDelayed() {
  window.clearTimeout(slideshowIsScrolling);
  slideshowIsScrolling = setTimeout(slideshowScrollingDelayedFunctions, RESIZE_TIMEOUT);
}

function slideshowScrollingDelayedFunctions() {
  function actions() {
    console.log('scrolling stopped')
  }

  // if () {
    // var elems = document.querySelectorAll(".slideshow");
    // elems.forEach((elem) => {
      // var slideshow = elem;
      // var container = elem.querySelector(".slideshow--container");
      // var index = parseInt(getComputedStyle(container).getPropertyValue("--slide-img-index"));
      actions();
    // });
  // } else {
    // actions(slideshow, container, index);
  // }
}



















var slideshowIsResizing;

function slideshowResize() {
  window.clearTimeout(slideshowIsResizing);
  slideshowIsResizing = setTimeout(slideshowResizeFunctions, RESIZE_TIMEOUT);
}

function slideshowResizeFunctions(slideshow = null, container = null, index = null) {
  function actions(slideshow, container, index) {
    slideshowSetDescHeight(slideshow);
    containerSetPosition(container, index);
  }

  if (slideshow == null && container == null && index == null) {
    var elems = document.querySelectorAll(".slideshow");
    elems.forEach((elem) => {
      var slideshow = elem;
      var container = elem.querySelector(".slideshow--container");
      var index = parseInt(getComputedStyle(container).getPropertyValue("--slide-img-index"));
      actions(slideshow, container, index);
    });
  } else {
    actions(slideshow, container, index);
  }
}






function Card({ img, index, width, height, descriptionOn }) {
  var hasActions = infoDoesExist(img.actions);
  var hasNotes = infoDoesExist(img.notes);
  var hasMultipleActions = hasActions && img.actions.length > 1;
  var hasMultipleNotes = hasNotes && img.notes.length > 1;

  var formattedActions = img.actions;
  var formattedNotes = img.notes;
  if (hasActions) formattedActions = infoFormatList(img.actions);
  if (hasNotes) formattedNotes = infoFormatList(img.notes);

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
  // if (cardIndex != currentIndex) cardClasses.push("card__off");
  // else cardClasses.push("card__on");
  cardClasses = cardClasses.join(" ");

  return (
    <div className={`${cardClasses}`} ref={card}>
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

function Slideshow({ children, img }) {
  // TODO: keep images stored after being loaded, so load them in outside the DOM and place them in after load in the same way as in the lightbox component

  var slideshow = useRef(null);
  var container = useRef(null);

  const [cardImage, setCardImage] = useState(img);
  const [descriptionOn, setDescriptionOn] = useState(false);
  const [cardIndex, setCardIndex] = useState(img.index);

  const [initialized, setInitialized] = useState(false);

  var group = MAKERIGHT_IMG_GROUPS[img.group];
  var startIndex = img.index;
  var index = cardImage.index;

  var width = group.width.min;
  var height = group.height.min;

  var cardGraphicStyle = {
    "--img-aspect-width": `${width}`,
    "--img-aspect-height": `${height}`,
    "--img-width": `${width}px`,
    "--img-height": `${height}px`,
  };

  useMountEffect(() => {
    slideshowInit(cardImage, setCardImage,setCardIndex, setInitialized,startIndex, group, slideshow, container, cardImage.index);
    containerSetPosition(container, img.index);
  });
  
  
  useEffect(() => {
  
    containerSetPosition(container, cardImage.index);

  }, [cardImage]);

  useEffect(() => {

    console.log(cardIndex);
  
  }, [cardIndex]);



  // var prevImg = getAdjacentImage(group, index, -1);
  // var currentImg = getAdjacentImage(group, index, 0);
  // var nextImg = getAdjacentImage(group, index, 1);
  return (
    <div className="slideshow" style={cardGraphicStyle} ref={slideshow}>
      <div className="slideshow--header container">
        <div className="slideshow--title">{children}</div>
        <div className="slideshow--toggle">
          <Toggle name="Descriptions" state={descriptionOn} set={setDescriptionOn}></Toggle>
        </div>
      </div>

      <div className="slideshow--container" style={{
      "--slide-img-index": `${cardIndex}`,
    }} ref={container}>
        <div className="slideshow--empty"></div>
        {group.imgs.map((groupImg) => {
          return (
            <div className="slideshow--card" key={`card ${groupImg.index}`}>
              <Card img={groupImg} index={groupImg.index} width={width} height={height} descriptionOn={descriptionOn} />
            </div>
          );
        })}
        <div className="slideshow--empty"></div>
      </div>

      {/* <div className="slideshow--card">{prevImg && <Card img={prevImg.img} currentIndex={currentImg.index} cardIndex={prevImg.index} width={width} height={height} descriptionOn={descriptionOn} />}</div>

<div className="slideshow--card">
  <Card img={currentImg.img} currentIndex={currentImg.index} cardIndex={currentImg.index} width={width} height={height} descriptionOn={descriptionOn} />
</div>
<div className="slideshow--card">{nextImg && <Card img={nextImg.img} currentIndex={currentImg.index} cardIndex={nextImg.index} width={width} height={height} descriptionOn={descriptionOn} />}</div> */}

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

export { containerSetPosition };
