import { defaultProps, PropTypes } from "prop-types";



function Mask({ className, src, alt, width, height, img }) {
  

  if(img){
    src = img.src
    alt = img.alt
    width = img.width
    height = img.height
  }


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



Mask.defaultProps = {
  img: undefined,
};

Mask.propTypes = {
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};



export default Mask;
