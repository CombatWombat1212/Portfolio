import Link from "next/link";
import { useRef } from "react";
import { useMountEffect } from "../../scripts/hooks/useMountEffect";
import { addAttrNonDestructive } from "/scripts/GlobalUtilities";

function DLink(props) {
  var props = { ...props };

  const reference = useRef();

  useMountEffect(() => {
    if (!reference.current) return;
    addAttrNonDestructive(reference.current, "onclick", "setTimeout(()=>{this.blur();},200)", ";");
  });


  return (
    <>
    {props.href && props.href.length > 0 && !props.href.startsWith('#') ? (
        <Link {...props} href={props.href} ref={reference} className={"link" + (props.className ? ` ${props.className}` : '')} >
          {props.children}
        </Link>
        // <Link {...props} href={props.href} ref={reference} className={"link" + (props.className ? ` ${props.className}` : '')} >
        //   {props.children}
        // </Link>
      ) : (
        <a {...props} ref={reference} className={"link" + (props.className ? ` ${props.className}` : '')}>
          {props.children}
        </a>
      )}
    </>
  );
}

export default DLink;
