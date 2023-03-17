import Link from "next/link";
import { useRef } from "react";
import { useMountEffect } from "../../scripts/hooks/useMountEffect";
import { addAttrNonDestructive } from "/scripts/GlobalUtilities";

function DLink({reference, ...props}) {
  // var props = { ...props };

  const internalRef = useRef();
  const actualRef = reference || internalRef;

  useMountEffect(() => {
    if (!actualRef.current) return;
    addAttrNonDestructive(actualRef.current, "onclick", "setTimeout(()=>{this.blur();},200)", ";");
    // TODO: i'm disabling this for now, its generally helpful but got in the way while making a dropdown and i think there's better ways to do it. nvm
  });


  return (
    <>
    {props.href && props.href.length > 0 && !props.href.startsWith('#') ? (
        <Link {...props} href={props.href} ref={actualRef} className={"link" + (props.className ? ` ${props.className}` : '')} 
        scroll={false}
        >
          {props.children}
        </Link>
        // <Link {...props} href={props.href} ref={reference} className={"link" + (props.className ? ` ${props.className}` : '')} >
        //   {props.children}
        // </Link>
      ) : (
        <a {...props} ref={actualRef} className={"link" + (props.className ? ` ${props.className}` : '')}>
          {props.children}
        </a>
      )}
    </>
  );
}

export default DLink;
