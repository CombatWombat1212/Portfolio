import { cn } from "/scripts/GlobalUtilities";

function Mask({ className, img }) {

  return (
    <div
      className={"mask" + cn(className)}
      style={{
        "--mask-aspect-width": img.width,
        "--mask-aspect-height": img.height,
        "--mask-img": `url('${img.src}')`,
      }}
      alt={img.alt} ></div>
  );
}

export default Mask;
