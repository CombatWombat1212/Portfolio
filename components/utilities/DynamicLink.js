import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMountEffect } from "../../scripts/hooks/useMountEffect";
import { addAttrNonDestructive } from "/scripts/GlobalUtilities";
import { useRouter } from "next/router";
import { LOADING_DURATION } from "../navigation/LoadingScreen";
import { useIntercept } from "@/scripts/contexts/InterceptContext";

function DLink({ reference, color, onClick, target="_self", ...props }) {
  const internalRef = useRef();
  const actualRef = reference || internalRef;
  const router = useRouter();
  const { href, children, ...otherProps } = props;
  const [isLink, setIsLink] = useState(href && href.length > 0);
  const [isAnchor, setIsAnchor] = useState(false);
  const [isNewLink, setIsNewLink] = useState(false);
  const { intercept, setIntercept } = useIntercept();
  const isExternal = target == "_blank";
  const isMail = href && href.startsWith("mailto:");

  useEffect(() => {
    setIsLink(href && href.length > 0);
    const checkAnchor = href && (href.startsWith("#") || href.startsWith(`${router.pathname}#`));
    if (checkAnchor) setIsAnchor(true);
    else setIsAnchor(false);
  }, [href, router.pathname]);

  useEffect(() => {
    setIsNewLink(isLink && router.pathname != href);
  }, [isLink, router.pathname]);

  const defaultOnClick = (e) => {
    if (onClick) {
      onClick(e);
      actualRef.current.blur();
    } else {
      // setTimeout(() => {
        // actualRef.current.blur();
      // }, 200);
    }
  };

  const delayedOnClick = (e) => {
    if (isAnchor || !isLink) return;
    if (isExternal || isMail) return;
    e.preventDefault();
    actualRef.current.blur();
    if (isNewLink) setIntercept(true);
    setTimeout(() => {
      if (isNewLink) router.push(href);
    }, LOADING_DURATION * 1000);
  };

  const onClickHandler = (e) => {
    defaultOnClick(e);
    if (isLink) delayedOnClick(e);
  };

  const classes = `link ${color ? `link__${color}` : ""} ${props.className || ""}`;
  const Component = isLink ? Link : "a";
  const hrefProps = isLink ? { href, scroll: false, target: target } : {};

  // useMountEffect(() => {
  //   if (!actualRef.current) return;
  //   addAttrNonDestructive(actualRef.current, "onclick", "setTimeout(()=>{this.blur(); console.log(this, `hey`)},200)", ";");
  //   // TODO: i'm disabling this for now, its generally helpful but got in the way while making a dropdown and i think there's better ways to do it. nvm
  // });

  // const defaultOnClick = (e) => {
  //   const target = e.target.closest("a");
  //   setTimeout(() => {
  //   if (target) target.blur();
  //   }, 200);
  // };

  return (
    <Component {...otherProps} {...hrefProps} ref={actualRef} className={classes} onClick={onClickHandler}>
      {children}
    </Component>
  );
}


DLink.displayName = "DLink";

export default DLink;

