import Graphic from "./Graphic";
import { addClassToJsxObj } from "./sections_utilities/ClassUtilities";
import { getSectionChildren } from "./sections_utilities/GetSectionChildren";
import MAKERIGHT_IMGS from "@/data/MAKERIGHT_IMGS";

const laptop_frame = MAKERIGHT_IMGS.pitch_laptop_frame;

function Laptop({image}) {
    var imageProps = image.props;
    var graphicClassName = imageProps.className ? imageProps.className : "";
    console.log(imageProps.img)

    return (
      <>
        <div className="pitch--graphic">
          <Graphic {...imageProps} className={`${graphicClassName} pitch--mockup`} />
          <Graphic img={laptop_frame} className={`${graphicClassName} pitch--laptop`} />
        </div>
      </>
    );
  }

  
function Pitch({ children, copyClassName }) {
  var childs = getSectionChildren(children);
  var { columns, description, title, heading, graphic, other } = childs;

  var vector = graphic[0];
  var image = graphic[1];
  var vectorProps = vector.props;


  return (
    <>
      <div className={`section--copy ${copyClassName} col-3`}>
        <Graphic {...vectorProps} />
        {heading && <>{heading}</>}
        {description && <>{description}</>}
      </div>
      <div className="col-8">
        <Laptop image={image} />
      </div>
    </>
  );
}

export default Pitch;
