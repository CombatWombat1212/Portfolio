import Link from "next/link";
import { useRef } from "react";
import { useMountEffect } from "../../scripts/hooks/useMountEffect";
import { addAttrNonDestructive } from "/scripts/GlobalUtilities";

function DLink({ reference, color, ...props }) {
  // var props = { ...props };

  const internalRef = useRef();
  const actualRef = reference || internalRef;

  useMountEffect(() => {
    if (!actualRef.current) return;
    addAttrNonDestructive(actualRef.current, "onclick", "setTimeout(()=>{this.blur();},200)", ";");
    // TODO: i'm disabling this for now, its generally helpful but got in the way while making a dropdown and i think there's better ways to do it. nvm
  });

  const classes = `link ${color ? `link__${color}` : ""} ${props.className || ""}`;
  const { href, children, ...otherProps } = props;
  const isLink = href && href.length > 0 && !href.startsWith("#");
  const Component = isLink ? Link : "a";
  const hrefProps = isLink ? { href, scroll: false } : {};

  return (
    <Component {...otherProps} {...hrefProps} ref={actualRef} className={classes}>
      {children}
    </Component>
  );


  // return (
  //   <>
  //     {props.href && props.href.length > 0 && !props.href.startsWith("#") ? (
  //       <Link {...props} href={props.href} ref={actualRef} className={classes} scroll={false}>
  //         {props.children}
  //       </Link>
  //     ) : (
  //       <a {...props} ref={actualRef} className={classes}>
  //         {props.children}
  //       </a>
  //     )}
  //   </>
  // );
}

export default DLink;
