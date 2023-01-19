function Mask({ className, src, alt, width, height }) {
  return (
    <div
      className={"mask" + (className ? ` ${className}` : "")}
      style={{
        "--mask-aspect-width": width,
        "--mask-aspect-height": height,
        "--mask-img": `url('${src}')`,
      }}
      alt={alt} ></div>
  );
}

export default Mask;
