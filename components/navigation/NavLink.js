import useHoverAndFocus from "@/scripts/hooks/useHoverAndFocus";
import DLink from "../utilities/DynamicLink";
import { useEffect, useRef, useState } from "react";

function NavLink({ item }) {
  return (
    <>
      {!item.dropdown ? (
        <DLink className="nav--item" href={item.link} aria-label={item.ariaLabel}>
          {item.text}
        </DLink>
      ) : (
        <Dropdown item={item} />
      )}
    </>
  );
}

function Dropdown({ item }) {
  const dropBtnRef = useRef(null);
  const dropContainerRef = useRef(null);
const [active, setActive] = useState(false);
  const dropBtnHov = useHoverAndFocus({ hovered: dropBtnRef, parent: dropContainerRef }, [
    {
      elems: ".nav--item",
      on: "nav--drop-item__active",
      off: "nav--drop-item__inactive",
    },
    {
      elems: "parent",
      on: "nav--dropdown__active",
      off: "nav--dropdown__inactive",
    },
  ]);
  const dropContainerHov = useHoverAndFocus(dropContainerRef, [
    {
      elems: ".nav--item",
      on: "nav--drop-item__active",
      off: "nav--drop-item__inactive",
    },
    {
      elems: "current",
      on: "nav--dropdown__active",
      off: "nav--dropdown__inactive",
    },
  ]);

  const drop = {
    btn: {
      ref: dropBtnRef,
      hover: dropBtnHov,
    },
    container: {
      ref: dropContainerRef,
      hover: dropContainerHov,
    },
    active: active,
    setActive: setActive,
  };



  useEffect(() => {
    if (drop.btn.hover || drop.container.hover) {
      drop.setActive(true);
    } else {
      drop.setActive(false);
    }
  }, [drop.btn.hover, drop.container.hover]);


  return (
    <>
      <a className={`nav--item nav--item__drop
      ${drop.active ? 'hover' : ''}
   `} aria-label={item.ariaLabel} ref={drop.btn.ref} tabIndex={0}>
        {item.text}
      </a>

      <div
        className="nav--dropdown"
        ref={drop.container.ref}
        style={{
          "--dropdown-items-total": `${item.dropdown.length}`,
        }}>
        {item.dropdown.map((study, i) => {
          return (
            <DLink
              className="nav--item nav--drop-item nav--drop-item__inactive "
              href={study.link}
              style={{
                "--dropdown-index": `${i}`,
                "--dropdown-delay": `${(i + 1) * 0.3}s`,
              }}
              
              >
              {study.name}
            </DLink>
          );
        })}
      </div>
    </>
  );
}

export default NavLink;
