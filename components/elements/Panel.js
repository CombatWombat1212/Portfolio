import Image from "next/image";
import PropTypes from "prop-types";
import Button from "../elements/Buttons";
import Tag from "../elements/Tag";

function Panel({ children, id, className, reference, ...props }) {
  return (
    <>
      <div id={id} className={"container container__wide panel" + (className ? ` ${className}` : "")} ref={reference} {...props}>
        {children}
      </div>
    </>
  );
}

function PanelDesc({ children, className, reference, ...props }) {
  return (
    <>
      <div className={"panel--desc" + (className ? ` ${className}` : "")} ref={reference} {...props}>
        {children}
      </div>
    </>
  );
}

function PanelImg({ children, className, variant, effect, ...props }) {
  return (
    <>
      <div className={"panel--graphic" + (className ? ` ${className}` : "")} >
        <div className={"panel--img" + (variant == "study" ? ` studypanel--img` : "")} {...props}>
          {/* {effect == 'gradient-white' && <div className="img--gradient img--gradient__white "></div>} */}
          {children}
        </div>
      </div>
    </>
  );
}

PanelImg.defaultProps = {
  effect: "none",
  variant: "home",
};

PanelImg.propTypes = {
  effect: PropTypes.oneOf(["none", "gradient-white"]),
};

function StudyPanel({ id, study, variant }) {
  var main = study.imgs.main;
  if (study.imgs.alt) var alt = study.imgs.alt;

  var img = main;

  if (variant == "home" || typeof study.imgs.alt == "undefined") {
    img = main;
  } else if (variant == "study" && study.imgs.alt) {
    img = alt;
  }

  return (
    <>
      <Panel id={id} className={'studypanel' + ` studypanel__${variant}`}>
        <PanelDesc>
          <h2 className="color--secondary">{study.name}</h2>
          <h3>{study.subtitle.jsx}</h3>

          {study.tags && (
            <div className="panel--tags tag--group">
              {study.tags.map((tag) => {
                return <Tag key={tag.key}>{tag.name}</Tag>;
              })}
            </div>
          )}

          {variant == "home" ? (
            <>
              <Button className="panel--button" type="regular" icon={["arrow_right", "right", "mask"]} animation={"pulse-right"} href={study.link}>
                Have a look-see
              </Button>
            </>
          ) : (
            variant == "study" && (
              <>
                {/* TODO: link these buttons to the solution of each page's study */}
                <Button className="panel--button" type="regular" icon={["arrow_down", "right", "mask"]} animation={"pulse-down"} href={"#Delivery"}>
                  Skip to Solution
                </Button>
              </>
            )
          )}
        </PanelDesc>

        <PanelImg className="col-6" variant={variant} 
          style={{
            "--img-aspect-width": img.width,
            "--img-aspect-height": img.height,
          }}
                 /*effect="gradient-white"*/>
          <Image priority src={img.src} alt={img.alt} width={img.width} height={img.height} />
        </PanelImg>
      </Panel>
    </>
  );
}

StudyPanel.defaultProps = {
  variant: "home",
};

StudyPanel.propTypes = {
  variant: PropTypes.oneOf(["home", "study"]),
};

export { Panel, PanelDesc, PanelImg, StudyPanel };
