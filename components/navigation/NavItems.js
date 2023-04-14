import useHoverAndFocus from "@/scripts/hooks/useHoverAndFocus";
import DLink from "../utilities/DynamicLink";
import { createRef, useEffect, useRef, useState } from "react";
import { menu } from "@/data/ICONS";
import { Graphic } from "../sections/Sections";
import AnimPres from "../global/AnimPres";
import navAnims from "./NavAnims";
import useBodyClass from "@/scripts/hooks/useBodyClass";
import { useBreakpoint, useBreakpointUtils } from "@/scripts/hooks/useBreakpoint";

function NavLink({ item, nav, className, type }) {
  const { setOpen } = nav;

  function renderItem() {
    return (
      <DLink
        className={`nav--item ${className ? className : ""}`}
        href={item.link}
        aria-label={item.ariaLabel}
        onClick={() => {
          setOpen(false);
        }}>
        {item.text}
      </DLink>
    );
  }

  return (
    <>
      {!item.dropdown ? (
        <>{type == "menu" ? <div className="nav--menu-item-wrapper"> {renderItem()} </div> : renderItem()}</>
      ) : (
        <Dropdown item={item} />
      )}
    </>
  );
}

function NavItems({ filter, nav, flatten = false, className = "", type = "default" }) {
  const { items } = nav;

  const modified_items = ((items, flatten, filter, type) => {
    const flattenedItems = flattenItems(items, flatten);
    const filteredItems = filterItems(flattenedItems, filter);
    const updatedItems = updateItems(filteredItems, type);
    return updatedItems;
  })(items, flatten, filter, type);

  return (
    <>
      {modified_items.map((item) => {
        return <NavLink nav={nav} type={type} key={item.key} item={item} className={className || ""} />;
      })}
    </>
  );
}

function Dropdown({ item }) {
  const dropBtnRef = useRef(null);
  const dropContainerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [items, setItems] = useState(
    Array.from({ length: item.dropdown.length }, () => ({
      ref: null,
      hovered: false,
    }))
  );

  const dropBtnHov = useHoverAndFocus({ hovered: dropBtnRef, parent: dropContainerRef }, [
    {
      elems: ".nav--item",
      on: "nav--drop-item__active",
      off: "nav--drop-item__inactive",
    },
  ]);
  const dropContainerHov = useHoverAndFocus(dropContainerRef, [
    {
      elems: ".nav--item",
      on: "nav--drop-item__active",
      off: "nav--drop-item__inactive",
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
    items: items,
    setItems: setItems,
    active: active,
    setActive: setActive,
  };

  useEffect(() => {
    if (drop.btn.hover || drop.container.hover || drop.items.some((item) => item.hovered)) {
      drop.setActive(true);
    } else {
      drop.setActive(false);
    }
  }, [drop.btn.hover, drop.container.hover, ...drop.items.map((item) => item.hovered)]);

  return (
    <>
      <a className={`nav--item nav--item__drop ${drop.active ? "hover" : ""}`} aria-label={item.ariaLabel} ref={drop.btn.ref} tabIndex={0}>
        {item.text}
      </a>

      <div
        className={`nav--dropdown ${drop.active ? "nav--dropdown__active" : "nav--dropdown__inactive"}`}
        ref={drop.container.ref}
        style={{
          "--dropdown-items-total": `${item.dropdown.length}`,
        }}>
        {item.dropdown.map((study, i) => {
          return <DropdownItem key={i} study={{ ...study, index: i }} drop={drop} />;
        })}
      </div>
    </>
  );
}

function DropdownItem({ study, drop }) {
  const ref = useRef(null);
  const hovered = useHoverAndFocus(ref);

  useEffect(() => {
    drop.setItems((prev) => {
      const newItems = [...prev];
      newItems[study.index] = { ref, hovered };
      return newItems;
    });
  }, [ref, hovered]);

  return (
    <DLink
      reference={ref}
      className="nav--item nav--drop-item nav--drop-item__inactive"
      href={study.link}
      style={{
        "--dropdown-index": `${study.index}`,
        "--dropdown-delay": `${(study.index + 1) * 0.3}s`,
      }}>
      {study.name}
    </DLink>
  );
}

function NavMenu({ nav }) {
  const { open, setOpen, items } = nav;

  useBodyClass("noscroll", open);

  return (
    <div className="nav--menu-wrapper">
      <AnimPres className="nav--menu" animation={navAnims.slide} condition={open}>
        <NavItems className="nav--menu-item" type="menu" filter={["Link", "Logo"]} flatten nav={nav} />
      </AnimPres>
    </div>
  );
}

function NavMenuButton({ nav }) {
  const { open, setOpen } = nav;

  const classes = {
    "menu-btn": [],
    "menu-icon": [],
    "menu-mask": [],
  };

  Object.keys(classes).forEach((key) => {
    classes[key].push(`nav--${key}__${open ? "open" : "closed"}`);
  });

  Object.keys(classes).forEach((key) => {
    classes[key] = classes[key].join(" ");
  });


  const menuBtnRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const menuOnClickHandler = () => {
    setOpen(!open);
      setFocused(false);
  }

  useEffect(() => {
    if (!focused && menuBtnRef.current) {
      menuBtnRef.current.blur();
    }
  }, [focused]);
  const handleFocus = () => {
  setFocused(true);
};



  return (
    <>
      <DLink className={`nav--item nav--menu-btn ${classes["menu-btn"]}`}
      
      reference={menuBtnRef}  
      onClick={menuOnClickHandler}
      onFocus={handleFocus}

      
      aria-label="Open Menu">
        <Graphic
          type="mask"
          className={`nav--menu-icon ${classes["menu-icon"]}`}
          innerClassName={`nav--menu-mask ${classes["menu-mask"]}`}
          img={menu}
        />
      </DLink>
    </>
  );
}

function flattenItems(items, flatten) {
  if (flatten) {
    return items.reduce((acc, item) => {
      if (item.dropdown && Array.isArray(item.dropdown)) {
        const dropdownItems = item.dropdown.map((dropdownItem) => ({
          ...dropdownItem,
          type: "Link",
          text: dropdownItem.name,
          key: dropdownItem.key,
        }));
        return [...acc, ...dropdownItems];
      } else {
        return [...acc, item];
      }
    }, []);
  } else {
    return items;
  }
}

function filterItems(items, filter) {
  if (!filter) {
    return items;
  } else if (Array.isArray(filter)) {
    return items.filter((item) => filter.includes(item.type));
  } else {
    return items.filter((item) => item.type === filter);
  }
}

function updateItems(items, type) {
  if (type === "menu" && items.some((item) => item.type === "Logo")) {
    return items.map((item) => {
      if (item.type === "Logo") {
        return { ...item, text: "Home" };
      } else {
        return item;
      }
    });
  } else {
    return items;
  }
}

export { NavItems, NavLink, NavMenuButton, NavMenu };
