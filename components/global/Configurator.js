import { MADE_IMGS } from "@/data/MADE_IMGS";
import { SHIRT_COMPONENTS, SHIRT_COMPONENTS_GROUPS } from "@/data/SHIRT_COMPONENTS";
import Graphic from "../sections/Graphic";
import Heading from "../sections/Heading";

function Configurator() {
  var materials = [];
  var components = ["base_shirt", "collar_band", "collar_mini_wide", "collar_wide", "cuff_regular", "cuff_french", "placket_hidden", "placket_regular", "placket_tuxedo"];
  for (var key in SHIRT_COMPONENTS_GROUPS) {
    materials.push(key);
  }

  return (
    <>
      <div className="configurator">
        <div className="configurator--panel assets">
          <div className="assets--row">
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Collars</b>
              </Heading>
              <div className="assets--inner">
                <Graphic type="mask" img={MADE_IMGS.component_collar_wide} background="background darker" className="assets--panel col-4" tabIndex={0} />
                <Graphic type="mask" img={MADE_IMGS.component_collar_mini_wide} background="background darker" className="assets--panel col-4" tabIndex={0} />
                <Graphic type="mask" img={MADE_IMGS.component_collar_band} background="background darker" className="assets--panel col-4" tabIndex={0} />
              </div>
            </div>
          </div>

          <div className="assets--row">
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Plackets</b>
              </Heading>
              <div className="assets--inner">
                <Graphic type="mask" img={MADE_IMGS.component_placket_regular} background="background darker" className="assets--panel col-4" tabIndex={0} />
                <Graphic type="mask" img={MADE_IMGS.component_placket_tuxedo} background="background darker" className="assets--panel col-4" tabIndex={0} />
                <Graphic type="mask" img={MADE_IMGS.component_placket_hidden} background="background darker" className="assets--panel col-4" tabIndex={0} />
              </div>
            </div>
          </div>

          <div className="assets--row">
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Cuffs</b>
              </Heading>
              <div className="assets--inner">
                <Graphic type="mask" img={MADE_IMGS.component_cuff_regular} background="background darker" className="assets--panel col-4" tabIndex={0} />
                <Graphic type="mask" img={MADE_IMGS.component_cuff_french} background="background darker" className="assets--panel col-4" tabIndex={0} />
              </div>
            </div>
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Base</b>
              </Heading>
              <div className="assets--inner ">
                <Graphic type="mask" img={MADE_IMGS.component_base} background="background darker" className="assets--panel col-4" tabIndex={0} />
              </div>
            </div>
          </div>
        </div>

        <div className="configurator--panel viewer">
          <Heading type="h3" className="configurator--title viewer--heading">
            <b>Preview</b>
          </Heading>
          <div className="viewer--inner">
            <div className="viewer--preview">
              <Preview material={"755027"} components={components} />
            </div>

            <div className="viewer--materials"></div>
          </div>
        </div>
      </div>
    </>
  );
}

function Preview({ material, components }) {
  var order = ["base", "placket", "collar", "cuff"];

  var IMGS = [];
  if (!material) {
    IMGS = null;
  } else {
    for (var i = 0; i < components.length; i++) {
      IMGS.push(SHIRT_COMPONENTS[`${components[i]}_${material}`]);
    }
  }

  var ordered = [];
  for (var i = 0; i < order.length; i++) {
    var matchingImages = IMGS.filter((img) => img.name.includes(order[i]));
    ordered.push(...matchingImages);
  }

  return (
    <div className="preview">
      {ordered.map((img, index) => {
        return <Graphic key={index} img={img} className="preview--component"  />;
      })}
    </div>
  );
}

export default Configurator;
