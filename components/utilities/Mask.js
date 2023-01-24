function Mask({ className, src, alt, width, height }) {


  var imgSrc = src;
  if(src[0] == "."){
    imgSrc = src.slice(1)
    src = imgSrc
  }


  // TODO: add a fallback if the image doesn't load to display its alt text?


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
