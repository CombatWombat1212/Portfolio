import Link from "next/link";

function DLink(props) {

  var props = {...props};
  var ref = props.reference;

  return (
    <>
      {props.href && props.href.length > 0 ? (
        <Link href={props.href} {...props} ref={ref}>
         {props.children}
        </Link>
      ) : (
        <a {...props} ref={ref}>{props.children}</a>
      )}
    </>
  );
}

export default DLink;
