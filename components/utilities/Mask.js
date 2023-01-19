function Mask({ className, img }) {

  return (
    <div
      className={"mask" + (className ? ` ${className}` : "")}
      style={{
        "--mask-aspect-width": img.width,
        "--mask-aspect-height": img.height,
        "--mask-img": `url('${img.src}')`,
      }}
      alt={img.alt} ></div>
  );
}

export default Mask;
