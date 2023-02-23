import Graphic from "./Graphic";
import { addClassToJsxObj } from "./sections_utilities/ClassUtilities";
import { getSectionChildren } from "./sections_utilities/GetSectionChildren";
import MAKERIGHT_IMGS from "@/data/MAKERIGHT_IMGS";
import Section from "./Sections";
import React, { useRef, useState } from "react";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { clamp, RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
const laptop_frame = MAKERIGHT_IMGS.pitch_laptop_frame;

// TODO: i think you should do the same animation on the description side to make it have smooth scrolling transitions too? Or maybe something to lock it in place better next to the screen? might not be priority though
// TODO: how tf is this gonna be responsive?? LOL good luck with that (nah u got this)

var pitches = [];

function PitchItem(pitch) {
  this.ref = pitch;
  this.elem = pitch.current ? pitch.current : pitch;
  this.inView = false;
  this.frame = {
    height: 0,
    width: 0,
    elem: this.elem.querySelector(".pitch--laptop"),
  };
  this.screens = {
    height: 0,
    width: 0,
    elem: this.elem.querySelector(".pitch--screens"),
  };
  this.rows = {
    elems: Array.from(this.elem.querySelectorAll(".pitch--placeholder")),
    current: 0,
    progress: 0,
    previous: null,
  };
}





function pitchSetCurrentRow(pitch) {
  var { current, previous } = pitch.rows;
  if (current !== previous) {
    pitch.rows.previous = current;
    var elem = pitch.elem;
    elem.style.setProperty("--pitch-current-row", pitch.rows.current);
  }
}



let pitchSetRowProgressCounter = 0;

function pitchSetRowProgress(pitch) {
  pitchSetRowProgressCounter++;


  if (pitchSetRowProgressCounter % 5 === 0) {
    pitch.elem.style.setProperty("--pitch-row-progress", pitch.rows.progress);
  }
}





function pitchGetRowProgress(pitch) {
  const captions = pitch.elem.querySelector('.pitch--captions');
  const captionsRect = captions.getBoundingClientRect();
  const captionsCenterY = (captionsRect.top + captionsRect.bottom) / 2;
  const currentRow = pitch.rows.elems[pitch.rows.current];
  const currentRowRect = currentRow.getBoundingClientRect();
  const currentRowCenterY = (currentRowRect.top + currentRowRect.bottom) / 2;

  const distance = (captionsCenterY - currentRowCenterY) / (pitch.frame.height / 2);

  if (distance > 1) {
    pitch.rows.progress = 1;
  } else if (distance < -1) {
    pitch.rows.progress = -1;
  } else {
    pitch.rows.progress = distance;
  }

}








function pitchGetCurrentRow(pitch) {
  // Get the rows array and the current row index
  const { elems, current, previous } = pitch.rows;

  // Check if the current row is in view
  const currentRowRect = elems[current].getBoundingClientRect();
  const currentRowInView = currentRowRect.top >= 0 && currentRowRect.bottom <= window.innerHeight;

  // If the current row is not in view, find the row taking up the most space in the viewport
  if (!currentRowInView) {
    let maxArea = 0;
    let maxIndex = current;
    for (let i = 0; i < elems.length; i++) {
      const rect = elems[i].getBoundingClientRect();
      const area = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (area > maxArea) {
        maxArea = area;
        maxIndex = i;
      }
    }
    pitch.rows.current = maxIndex;
  }
}

function pitchGetInView(pitch) {
  var elem = pitch.elem;
  var rect = elem.getBoundingClientRect();
  var inView = rect.top < window.innerHeight && rect.bottom > 0;
  if (inView) pitch.inView = true;
  else pitch.inView = false;
}

function pitchSetRowSize(pitch) {
  var elem = pitch.elem;
  var height = pitch.frame.height;
  var width = pitch.frame.width;

  // Set the row height and width
  elem.style.setProperty("--pitch-row-height", height + "px");
  elem.style.setProperty("--pitch-row-width", width + "px");

  // Set the row overflow buffer
  elem.style.setProperty("--pitch-overflow-buffer-x", height - pitch.screens.height + "px");
  elem.style.setProperty("--pitch-overflow-buffer-y", width - pitch.screens.width + "px");

}

function pitchGetRowSize(pitch) {
  var elem = pitch.elem;
  var frame = elem.querySelector(".pitch--laptop");

  // get the height and width of the frame
  var height = splitPx(window.getComputedStyle(frame).height);
  var width = splitPx(window.getComputedStyle(frame).width);
  pitch.frame.height = height;
  pitch.frame.width = width;

  // get width and height of the screens
  var screens = pitch.screens.elem;
  var screensHeight = splitPx(window.getComputedStyle(screens).height);
  var screensWidth = splitPx(window.getComputedStyle(screens).width);
  pitch.screens.height = screensHeight;
  pitch.screens.width = screensWidth;

}

function pitchInit(pitch) {
  pitch = pitch.current ? pitch.current : pitch;

  pitchResize(pitch);
  pitchScroll(true);

  window.removeEventListener("resize", pitchResize, false);
  window.addEventListener("resize", pitchResize, false);
  window.removeEventListener("scroll", pitchScroll, false);
  window.addEventListener("scroll", pitchScroll, false);
}


// TODO: is giving the laptop the onLoad thing working well in practice? The other option is giving it priority.  Or both.  

// TODO: The closer you are to completeing the scroll to the next row, add a lil push up or down to help feel like progress is being made.  So as the person scrolls have a value called progress to the next row or something like that then map it to just a lil movement up or down on the main elements in the css.  Then once you scroll to the next one it springs back to where it was

function Laptop({ rows }) {
  return (
    <>
      <div className="pitch--graphics">
        <Graphic img={laptop_frame} className={`pitch--row pitch--image pitch--laptop`} onLoad={pitchResize} />

        <div className="pitch--screens">
          {rows.map((row, i) => {
            var { description, title, heading, graphic, other, vector, mockup } = formatRow(row);
            var mockupProps = mockup.props;
            var graphicClassName = mockupProps.className ? mockupProps.className : "";

            return <Graphic key={i} {...mockupProps} className={`pitch--row pitch--image pitch--mockup`} style={{ "--pitch-row-index": i }} />;
          })}
        </div>
      </div>
    </>
  );
}

function Pitch({ children }) {
  var rows = [];

  for (var i = 0; i < children.length; i++) {
    rows.push({ childs: getSectionChildren(children[i].props.children), props: children[i].props });
  }

  const pitch = useRef(null);

  useMountEffect(() => {
    var pitchObj = new PitchItem(pitch);
    pitches.push(pitchObj);
    pitchInit(pitchObj);
  });

  return (
    <>
      <div className="pitch" ref={pitch}>
        <div className="pitch--column col-8">
          <Laptop rows={rows} />
        </div>
        <div className="pitch--column col-3">
          <div className="pitch--captions">
            {rows.map((row, i) => {
              var { description, title, heading, graphic, other, vector, mockup } = formatRow(row);
              var vectorProps = vector.props;

              return (
                <div className="pitch--row pitch--body" key={i} style={{ "--pitch-row-index": i }}>
                  <Graphic {...vectorProps} />
                  {heading && <>{heading}</>}
                  {description && <>{description}</>}
                </div>
              );
            })}
          </div>
          <div className="pitch--empties">
            {rows.map((row, i) => {
              var { description, title, heading, graphic, other, vector, mockup } = formatRow(row);
              return <div key={i} className="pitch--row pitch--placeholder"></div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function formatRow(row) {
  var { description, title, heading, graphic, other } = row.childs;
  description = addClassToJsxObj(description, "pitch--description");
  title = addClassToJsxObj(title, "pitch--title");
  heading = addClassToJsxObj(heading, "pitch--heading");
  var vector = addClassToJsxObj(graphic[0], "pitch--vector");
  var mockup = addClassToJsxObj(graphic[1], "pitch--mockup");

  return {
    description,
    title,
    heading,
    graphic,
    other,
    vector,
    mockup,
  };
}


function pitchScroll(force) {
  // detect if pitch.elem is in view and console log it
  pitches.forEach((pitch) => {
    pitchGetInView(pitch);
    if (!pitch.inView && !force) return;

    pitchGetCurrentRow(pitch);
    pitchSetCurrentRow(pitch);
    pitchGetRowProgress(pitch);
    pitchSetRowProgress(pitch);

  });
}







var pitchIsResizing;

function pitchResize() {
  window.clearTimeout(pitchIsResizing);
  pitchIsResizing = setTimeout(pitchResizeFunctions, RESIZE_TIMEOUT);
}

function pitchResizeFunctions() {
  pitches.forEach((pitch) => {
    pitchGetRowSize(pitch);
    pitchSetRowSize(pitch);
  });
}

export default Pitch;
