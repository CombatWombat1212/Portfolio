import { MADE_IMGS } from "@/data/MADE_IMGS";
import { SHIRT_COMPONENTS, SHIRT_COMPONENTS_GROUPS } from "@/data/SHIRT_COMPONENTS";
import { setConfig } from "next/config";
import React, { Fragment, useRef } from "react";
import { useEffect, useState } from "react";
import Graphic from "../sections/Graphic";
import Heading from "../sections/Heading";

const order = ["base", "placket", "collar", "cuff"];
const defaultCongif = {
  base: "base",
  placket: "regular",
  collar: "wide",
  cuff: "regular",
};

const components = ["base_shirt", "collar_band", "collar_mini_wide", "collar_wide", "cuff_regular", "cuff_french", "placket_hidden", "placket_regular", "placket_tuxedo"];

function updateActiveState(index, length) {
  return Array.from({ length }, (_, i) => i === index);
}

function optionsHandleClick(e, config, setConfig, active, setActive) {
  var target = e.target.closest(".assets--panel");
  var component = target.getAttribute("data-component");
  var type = target.getAttribute("data-type");
  var c = config;
  c[component] = type;
  setConfig(c);

  var group = Array.from(target.closest(".assets--inner").children);
  var index = group.indexOf(target);

  var newActive = active;
  for (var i = 0; i < newActive.length; i++) {
    if (i == index) newActive[i] = true;
    else newActive[i] = false;
  }

  setActive(updateActiveState(index, active.length));

  setTimeout(() => {
    target.blur();
  }, 200);
}

function Options({ imgs, config, setConfig }) {
  var init = [];
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    var pref = "assets--panel";
    var component = img.name.split("_")[1];
    var type = img.name.split(`${component}_`)[1];
    var isActive = config[component] === type ? true : false;
    if(component == 'base') isActive = true; 
    init.push(isActive);
    
  }

  const [active, setActive] = useState(init);

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <>
      {imgs.map((img, index) => {
        return (
          <Fragment key={index}>
            <Graphic
              type="mask"
              img={img}
              background="background darker"
              className={`${pref} ${pref}__${active[index] ? "on" : "off"}`}
              tabIndex={0}
              data-component={component}
              data-type={type}
              onClick={(e) => {
                optionsHandleClick(e, config, setConfig, active, setActive);
              }}
            />
          </Fragment>
        );
      })}
    </>
  );
}

function Configurator() {
  const [material, setMaterial] = useState("755027");
  const [config, setConfig] = useState(defaultCongif);

  var materials = [];
  for (var key in SHIRT_COMPONENTS_GROUPS) {
    materials.push(key);
  }

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    var images = configGetProcessedImages(material, config);
    
    setImgs(images);
  }, [material, config]);



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
                <Options imgs={[MADE_IMGS.component_collar_wide, MADE_IMGS.component_collar_mini_wide, MADE_IMGS.component_collar_band]} config={config} setConfig={setConfig} />
              </div>
            </div>
          </div>

          <div className="assets--row">
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Plackets</b>
              </Heading>
              <div className="assets--inner">
                <Options imgs={[MADE_IMGS.component_placket_regular, MADE_IMGS.component_placket_tuxedo, MADE_IMGS.component_placket_hidden]} config={config} setConfig={setConfig} />
              </div>
            </div>
          </div>

          <div className="assets--row">
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Cuffs</b>
              </Heading>
              <div className="assets--inner">
                <Options imgs={[MADE_IMGS.component_cuff_regular, MADE_IMGS.component_cuff_french]} config={config} setConfig={setConfig} />
              </div>
            </div>
            <div className="assets--category">
              <Heading type="h3" className="configurator--title asset--heading">
                <b>Base</b>
              </Heading>
              <div className="assets--inner ">
                <Options imgs={[MADE_IMGS.component_base]} config={config} setConfig={setConfig} />
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
              <Preview imgs={imgs} />
            </div>

            <div className="viewer--materials"></div>
          </div>
        </div>
      </div>
    </>
  );
}

function Preview({ imgs }) {
  return (
    <div className="preview">
      {Object.entries(imgs).map(([key, value]) => {
        return (
          <React.Fragment key={key}>
            {value.map((img, index) => {
              var pref = "preview--component";
              var imgStyle = {
                "--preview-img-order": img.order,
              };
              var active = img.active ? "on" : "off";

              return <Graphic key={index} img={img} className={`${pref} ${pref}__${active}`} style={imgStyle} />;
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function configGetProcessedImages(material, config) {
  var images = [];
  var processed = {};
  configGetImgs(images, material, components);
  processed = configOrderImages(images, processed, material, order);
  processed = configGetImgActives(processed, config);
  return processed;
}

function configGetImgs(images, material) {
  if (!material) {
    images = [];
  } else {
    for (var i = 0; i < components.length; i++) {
      var img = SHIRT_COMPONENTS[`${components[i]}_${material}`];

      if (!images.some((image) => image.src === img.src)) {
        images.push(img);
      }
    }
  }
}

function configOrderImages(images, processed, material, order) {
  if (!images.length > 0 || !images[0].name.includes(material)) {
    for (var i = 0; i < order.length; i++) {
      var matchingImages = images.filter((img) => img.name.includes(order[i]));
      matchingImages.forEach((img) => {
        img.order = i;
      });
      images.push(...matchingImages);
    }
  }

  // turn images into an object of arrays, with the key being the shirt component name, base, placket, collar, cuff
  processed = {
    base: images.filter((img) => img.name.includes("base")),
    placket: images.filter((img) => img.name.includes("placket")),
    collar: images.filter((img) => img.name.includes("collar")),
    cuff: images.filter((img) => img.name.includes("cuff")),
  };
  return processed;
}

function configGetImgActives(processed, defaultConfig) {
  for (var key in processed) {
    var images = processed[key];
    if (images.length > 0) {
      images.forEach((img) => {
        img.active = img.name.includes(defaultConfig[key]);
      });
    }
  }
  return processed;
}

export default Configurator;
