import ICONS from "@/data/ICONS";
import { addAttrNonDestructive, RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import useHoverAndFocus from "@/scripts/hooks/useHoverAndFocus";
import useInView from "@/scripts/hooks/useInView";
import organizeChildren from "@/scripts/organizeChildren";
import usePropModifier from "@/scripts/hooks/usePropModifier";
import useSecret from "@/scripts/hooks/useSecret";
import React, { useEffect, useRef, useState } from "react";
import Button from "../elements/Buttons";
import { addClassToJsxObj } from "../sections/sections_utilities/ClassUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";

function Findings({ children, className }) {
  // // okay i'm hoping this is the very last addition that i have to make.  Thank you again for all of your help, this is by far the most impressive conversation with you i've ever had.  I would like to make it so that if second variable contains an `elems` value of `current` then instead of trying to find `current` with a query selector, it instead uses the reference.current element.  For example:
  // const hovered = useHoverAndFocus(reference, {elems:'current'}, 'hover'); //current recieves a hover class when hovered, and it is removed when it is blurred
  // // const hovered = useHoverAndFocus(reference, {elems:'current', on:'on--class', off:'off--class'}); //current recieves an on--class when hovered, and an off--class when blurred, and both are removed when the other is added
  // // const hovered = useHoverAndFocus(reference, [{elems:'test--class', on:'test--class__on', off:'test--class__off'}, {elems:'current', on:'on', off:'off'}]); //even when the second variable is an array, the hook is still able to recognize `current` and treat it differently then other `elems` values.  Current recieves an on--class when hovered, and an off--class when blurred, and both are removed when the other is added, on top of the other changes that are made to the other elements in the array.
  // // I need you to do me a really big favor though.  Please. if you understand what i've asked of you, and you know what code to write and how to respond, just say 'Sure!' and begin typing the code.  I'm sorry to ask this of you as i love hearing your replies and insight, but we're very close to your character limit and i want to make sure that i'm not missing anything important.  So please if you're good to go just say 'Sure!' and begin typing the code.  Thank you so much for all of your help, i really appreciate it.

  var classes = className ? className : "";

  const modifiedChildren = usePropModifier(children, [
    [{ elemType: "p" }, { className: "findings--p" }],
    [{ elemType: "h4" }, { className: "findings--h4" }],
    [{ elemType: "h3" }, { className: "findings--h3" }],
  ]);

  const organizedChildren = organizeChildren(modifiedChildren, [
    ["main", { type: "main" }, true],
    ["dropdown", { type: "dropdown" }, true],
  ]);

  const [open, setOpen] = useState(false);
  const reference = useRef(null);
  const [height, setHeight] = useState(0);

  const hovered = useHoverAndFocus(reference, [{ elems: ".findings--button" }, { elems: ".mask" }], "hover");

  useEffect(() => {
    if (!reference.current) return;
    var findings = reference.current;
    var affectedElems = ["findings--dropdown", "mask"];
    toggleClasses(findings, ["findings"], open);
    for (var i = 0; i < affectedElems.length; i++) {
      var elem = findings.querySelector(`.${affectedElems[i]}`);
      if (!elem) return;
      toggleClasses(elem, [affectedElems[i]], open);
    }
  }, [open]);

  const handleHorizontalResize = () => {
    var findings = reference.current;
    var inner = findings.querySelector(".findings--inner");
    var h =
      splitPx(window.getComputedStyle(inner).height) +
      splitPx(window.getComputedStyle(inner).paddingTop) +
      splitPx(window.getComputedStyle(inner).paddingBottom);
    setHeight(h);
  };

  useHorizontalResize(handleHorizontalResize);

  useEffect(() => {
      handleHorizontalResize();
  }, []);

  useEffect(() => {
      handleHorizontalResize();
  }, [open]);



  const view = useInView(reference);

  useEffect(() => {
    if (!view && open) {
      setOpen(false);
    }
  }, [view]);

  return (
    <a
      className={`findings ${classes}`}
      ref={reference}
      onClick={() => setOpen(!open)}
      style={{ "--findings-dropdown-height": `${height}px` }}
      tabIndex="0">
      <div className="findings--main findings--panel">{organizedChildren.main}</div>
      <div className="findings--dropdown findings--dropdown__closed">
        <div className="findings--inner findings--panel">{organizedChildren.dropdown}</div>
      </div>
      <Button
        type="bottom"
        icon={["chevron_down", "middle", "mask"]}
        className={`findings--button ${open ? `findings--button__open` : `findings--button__closed`} `}
        color={`background_darkest-primary`}
        tag="div"
      />
    </a>
  );
}

export default Findings;

function toggleClasses(element, classNames, isOpen) {
  classNames.forEach((className) => {
    if (isOpen) {
      element.classList.add(`${className}__open`);
      element.classList.remove(`${className}__closed`);
    } else {
      element.classList.add(`${className}__closed`);
      element.classList.remove(`${className}__open`);
    }
  });
}
