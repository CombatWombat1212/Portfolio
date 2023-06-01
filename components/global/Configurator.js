import { MADE_IMGS } from "@/data/MADE_IMGS";
import { SHIRT_COMPONENTS, SHIRT_COMPONENTS_GROUPS } from "@/data/SHIRT_COMPONENTS";
import { RESIZE_TIMEOUT, createUpdateConditions } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { setConfig } from "next/config";
import React, { Fragment, useRef } from "react";
import { useEffect, useState } from "react";
import Graphic from "../sections/graphic/Graphic";
import Heading from "../sections/Heading";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import useListener from "@/scripts/hooks/useListener";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import ReactDOM from "react-dom";
import useInView from "@/scripts/hooks/useInView";

// TODO: keyboard input support for tab navigation

const order = ["base", "placket", "collar", "cuff"];
const supportedMaterials = ["canvas_5", "755039", "755032", "755027"];
const defaultConfig = {
  base: "base",
  placket: "regular",
  collar: "wide",
  cuff: "regular",
  material: "canvas_5",
};

const components = [
  "base_shirt",
  "collar_band",
  "collar_mini_wide",
  "collar_wide",
  "cuff_regular",
  "cuff_french",
  "placket_hidden",
  "placket_regular",
  "placket_tuxedo",
];

function configImgPrefetch() {
  const prefetchContainer = document.createElement("div");
  prefetchContainer.style.display = "none";
  document.body.appendChild(prefetchContainer);

  var images = [];
  for (var i = 0; i < components.length; i++) {
    for (var j = 0; j < supportedMaterials.length; j++) {
      var img = SHIRT_COMPONENTS[`${components[i]}_${supportedMaterials[j]}`];
      if (!images.some((image) => image.src === img.src)) {
        fetch(img);
      }
    }
  }

  function fetch(img) {
    const prefetchImg = document.createElement("img");
    prefetchImg.src = img.src.startsWith(".") ? img.src.substring(1) : img.src;
    prefetchImg.alt = img.alt || "";
    prefetchImg.width = img.width;
    prefetchImg.height = img.height;

    prefetchContainer.appendChild(prefetchImg);
  }
}

function updateActiveState(index, length) {
  return Array.from({ length }, (_, i) => i === index);
}
function updateConfigState(config, component, value) {
  const updatedConfig = { ...config, [component]: value };
  return updatedConfig;
}

function configHandleClick(e, config, setConfig, active, setActive) {
  var target = e.target.closest(".assets--panel, .materials");
  var component = target.getAttribute("data-component");
  var type = target.getAttribute("data-type");
  var material = target.getAttribute("data-material");

  if (component && type) {
    var group = Array.from(target.closest(".assets--inner").children);
    var index = group.indexOf(target);

    setConfig(updateConfigState(config, component, type));
    setActive(updateActiveState(index, active.length));
  } else if (material) {
    var group = Array.from(target.closest(".materials--group").children);
    var index = group.indexOf(target);

    setConfig(updateConfigState(config, "material", material));
    setActive(updateActiveState(index, active.length));
  }

  setTimeout(() => {
    target.blur();
  }, 200);
}

function imageParseName(img) {
  var component = img.name.split("_")[1];
  var type = img.name.split(`${component}_`)[1];
  if (component == "base") type = "base";
  return { component, type };
}

function Options({ imgs, config, setConfig }) {
  var init = [];
  for (var i = 0; i < imgs.length; i++) {
    var { component, type } = imageParseName(imgs[i]);
    var isActive = config[component] === type ? true : false;
    if (component == "base") isActive = true;
    init.push(isActive);
  }

  const [active, setActive] = useState(init);

  return (
    <>
      {imgs.map((img, index) => {
        var pref = "assets--panel";
        var { component, type } = imageParseName(img);

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
                configHandleClick(e, config, setConfig, active, setActive);
              }}
            />
          </Fragment>
        );
      })}
    </>
  );
}

function useConfigImgPrefetch(configurator) {
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const inView = useInView(configurator, { threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    setMount(true);
  }, [inView]);

  useEffect(() => {
    setTimeout(() => {
      setMount(true);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!mount) return;
    setReady(true);
  }, [mount]);

  useEffect(() => {
    if (!ready) return;
    configImgPrefetch();
  }, [ready]);
}

function Configurator() {
  const [config, setConfig] = useState(defaultConfig);

  var materials = [];
  for (var key in SHIRT_COMPONENTS_GROUPS) {
    materials.push(key);
  }

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    var images = configGetProcessedImages(config);
    setImgs(images);
  }, [config]);

  const configurator = useRef(null);

  const { isBpAndDown, loading } = useResponsive();
  const mdAndDown = !(!isBpAndDown("md") || loading);

  const VIEWER_PROPS = {
    imgs,
    mdAndDown,
    supportedMaterials,
    config,
    setConfig,
  };

  useConfigImgPrefetch(configurator);

  return (
    <>
      <div className="configurator" ref={configurator}>
        <div className="configurator--panel assets">
          <div
            className="assets--row"
            style={{
              "--assets-categories-count": 1,
            }}>
            <div
              className="assets--category"
              style={{
                "--assets-options-count": 3,
                "--assets-columns-count": 1,
              }}>
              <Heading type="h3" className="configurator--title assets--heading">
                <b>Collars</b>
              </Heading>
              <div className="assets--inner">
                <Options
                  imgs={[MADE_IMGS.component_collar_wide, MADE_IMGS.component_collar_mini_wide, MADE_IMGS.component_collar_band]}
                  config={config}
                  setConfig={setConfig}
                />
              </div>
            </div>
          </div>

          <div
            className="assets--row"
            style={{
              "--assets-categories-count": 1,
            }}>
            <div
              className="assets--category"
              style={{
                "--assets-options-count": 3,
                "--assets-columns-count": 1,
              }}>
              <Heading type="h3" className="configurator--title assets--heading">
                <b>Plackets</b>
              </Heading>
              <div className="assets--inner">
                <Options
                  imgs={[MADE_IMGS.component_placket_regular, MADE_IMGS.component_placket_tuxedo, MADE_IMGS.component_placket_hidden]}
                  config={config}
                  setConfig={setConfig}
                />
              </div>
            </div>
          </div>

          <div
            className="assets--row"
            style={{
              "--assets-categories-count": 2,
            }}>
            <div
              className="assets--category"
              style={{
                "--assets-options-count": 2,
                "--assets-columns-count": 2,
              }}>
              <Heading type="h3" className="configurator--title assets--heading">
                <b>Cuffs</b>
              </Heading>
              <div className="assets--inner">
                <Options imgs={[MADE_IMGS.component_cuff_regular, MADE_IMGS.component_cuff_french]} config={config} setConfig={setConfig} />
              </div>
            </div>
            <div
              className="assets--category d-md-none"
              style={{
                "--assets-options-count": 1,
                "--assets-columns-count": 2,
              }}>
              <Heading type="h3" className="configurator--title assets--heading">
                <b>Base</b>
              </Heading>
              <div className="assets--inner ">
                <Options imgs={[MADE_IMGS.component_base]} config={config} setConfig={setConfig} />
              </div>
            </div>
          </div>
        </div>

        <div className="configurator--panel viewer--wrapper">
          {!mdAndDown ? (
            <ViewerBody props={VIEWER_PROPS} />
          ) : (
            <div className="viewer--body">
              <ViewerBody props={VIEWER_PROPS} />
            </div>
          )}
          {mdAndDown && <MaterialWrapper props={VIEWER_PROPS} />}
        </div>
      </div>
    </>
  );
}

function ViewerBody({ props }) {
  var { imgs, mdAndDown } = props;
  return (
    <>
      <Heading type="h3" className="configurator--title viewer--heading">
        <b>Preview</b>
      </Heading>
      <div className="viewer">
        <div className="viewer--inner">
          <div className="viewer--preview">
            <Preview imgs={imgs} />
          </div>
          {!mdAndDown && <MaterialWrapper props={props} />}
        </div>
      </div>
    </>
  );
}

function MaterialWrapper({ props: { supportedMaterials, config, setConfig } }) {
  return (
    <div className="viewer--materials materials--wrapper">
      <div className="materials--group">
        <Materials materials={supportedMaterials} config={config} setConfig={setConfig} />
      </div>
    </div>
  );
}

function Preview({ imgs }) {
  const [mounted, setMounted] = useState(false);

  const preview = {
    refs: {
      self: useRef(null),
      component: useRef(null),
    },
    mounted,
    setMounted,
    elem: null,
    height: 0,
    width: 0,
    isResizing: null,
  };

  useEffect(() => {
    if (!preview.refs.self.current) return;
    if (!preview.refs.component.current) return;
    if (!imgs || imgs == []) return;
    if (preview.mounted) return;
    preview.setMounted(true);
  }, [preview.refs.self, preview.refs.component, imgs]);

  useEffect(() => {
    if (!preview.mounted) return;
    preview.elem = preview.refs.self.current;
    previewInit(preview);
  }, [preview.mounted]);

  function previewInit(preview) {
    preview.elem.classList.remove("preview__loading");
    run();
  }

  function run() {
    previewGetDimensions(preview);
    previewSetDimensions(preview);
  }

  function ran() {
    window.clearTimeout(preview.isResizing);
    preview.isResizing = setTimeout(function () {
      run();
    }, RESIZE_TIMEOUT);
  }

  useHorizontalResize(ran);

  return (
    <div className="preview preview__loading" ref={preview.refs.self}>
      {Object.entries(imgs).map(([key, value]) => {
        return (
          <Fragment key={key}>
            {value.map((img, index) => {
              var pref = "preview--component";
              var imgStyle = {
                "--preview-img-order": img.order,
              };
              var active = img.active ? "on" : "off";

              return <Graphic key={index} img={img} className={`${pref} ${pref}__${active}`} style={imgStyle} reference={preview.refs.component} />;
            })}
          </Fragment>
        );
      })}
    </div>
  );
}

function previewSetDimensions(preview) {
  if (!preview || !preview.refs || !preview.refs.self || !preview.refs.self.current) return;
  const elem = preview.refs.self.current.closest(".configurator");
  if (!elem) return;

  elem.style.setProperty("--image-width", preview.width + "px");
  elem.style.setProperty("--image-height", preview.height + "px");
}

function previewGetDimensions(preview) {
  if (!preview || !preview.refs || !preview.refs.component || !preview.refs.component.current) return;

  const lastImg = preview.refs.component.current;
  const width = lastImg.offsetWidth;
  const height = lastImg.offsetHeight;

  preview.width = width;
  preview.height = height;
}

function configGetProcessedImages(config) {
  var images = [];
  var processed = {};
  configGetImgs(images, config, components);
  processed = configOrderImages(images, processed, order);
  processed = configGetImgActives(processed, config);
  return processed;
}

function configGetImgs(images, config, components) {
  for (var i = 0; i < components.length; i++) {
    var img = SHIRT_COMPONENTS[`${components[i]}_${config.material}`];
    if (!images.some((image) => image.src === img.src)) {
      images.push(img);
    }
  }
}

function configOrderImages(images, processed, order) {
  for (var i = 0; i < order.length; i++) {
    var matchingImages = images.filter((img) => img.name.includes(order[i]));
    matchingImages.forEach((img) => {
      img.order = i;
      images.filter((image) => image.name.includes(img.name))[0].order = i;
    });
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

function configGetImgActives(processed, config) {
  for (var key in processed) {
    var images = processed[key];
    if (images.length > 0) {
      images.forEach((img) => {
        img.active = img.name.includes(config[key]);
      });
    }
  }
  return processed;
}

function Materials({ materials, config, setConfig }) {
  var init = [];
  for (var i = 0; i < materials.length; i++) {
    var isActive = config.material === materials[i] ? true : false;
    init.push(isActive);
  }

  const [active, setActive] = useState(init);

  const materialOnClick = (e) => {
    configHandleClick(e, config, setConfig, active, setActive);
  };

  return (
    <>
      {materials.map((material, index) => {
        var name = `thumbnail_${material}`.toLowerCase();
        var image = SHIRT_COMPONENTS[name];

        var pref = "materials";
        var on = active[index] ? "on" : "off";

        return (
          <a className={`${pref} ${pref}__${on}`} tabIndex={0} key={index} onClick={materialOnClick} data-material={material}>
            <Graphic type="image" className={`materials--graphic`} img={image} />
          </a>
        );
      })}
    </>
  );
}

Options.displayName = "Options";
Configurator.displayName = "Configurator";
ViewerBody.displayName = "ViewerBody";
MaterialWrapper.displayName = "MaterialWrapper";
Preview.displayName = "Preview";
Materials.displayName = "Materials";

export default Configurator;
