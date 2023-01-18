import Image from "next/image";
import { cn } from "/scripts/GlobalUtilities";

function Panel({ children, id, className }) {
  return (
    <>
      <div id={id} className={"container section" + cn(className)}>
        {children}
      </div>
    </>
  );
}

function PanelDesc({ children, className }) {
  return (
    <>
      <div className={"section--desc" + cn(className)}>{children}</div>
    </>
  );
}

function PanelImg({ children, className }) {
  return (
    <>
      <div className={"section--graphic" + cn(className)}>
        <div className="section--img">{children}</div>
      </div>
    </>
  );
}

export { Panel, PanelDesc, PanelImg };
