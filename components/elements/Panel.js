import Image from "next/image";
import PropTypes from "prop-types";
import Button from "../elements/Buttons";
import Tag from "../elements/Tag";
import { scrollToTarget } from "@/scripts/GlobalUtilities";

function PanelWrapper({ children, id, variant }) {
  return (
    <div className={`studypanel--wrapper studypanel--wrapper__${variant}`} {...(id != undefined ? { id: id } : {})}>
      {children}
    </div>
  );
}

function Panel({ children, id, className, reference, variant, ...props }) {
  return (
    <>
      <div id={id} className={`container container__wide studypanel ${className || ""}`} ref={reference} {...props}>
        {children}
      </div>
    </>
  );
}

function PanelDesc({ children, className, variant, reference, ...props }) {
  return (
    <>
      <div className={`studypanel--description studypanel--description__${variant} ${className || ""}`} ref={reference} {...props}>
        {children}
      </div>
    </>
  );
}

function PanelImg({ children, className, variant, effect, ...props }) {
  return (
    <>
      <div className={`studypanel--graphic studypanel--graphic__${variant} ${className || ""}`}>
        {/* <div className={`studypanel--img ${variant == "study" ? " studypanel--img" : ""}`} {...props}> */}
        <div className={`studypanel--img studypanel--img__${variant}`} {...props}>
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

function StudyPanel({ id, study, variant, button }) {
  var main, alt;
  main = study.imgs.main;
  if (study.imgs.alt) alt = study.imgs.alt;

  var img = main;

  if (variant == "home" || typeof study.imgs.alt == "undefined") {
    img = main;
  } else if (variant == "study" && study.imgs.alt) {
    img = alt;
  }

  var btnStyle = button == "" ? { opacity: 0 } : { opacity: 1 };

  const skipHandler = () => {
    const target = document.getElementById("Solution");
    scrollToTarget(target);
  };

  return (
    <>
      <PanelWrapper variant={variant}>
        <Panel id={id} className={`studypanel studypanel__${variant}`} variant={variant}>
          <PanelDesc className={``} variant={variant}>
            <h2 className="studypanel--heading color--secondary">{study.name}</h2>
            <h3 className="studypanel--subheading">{study.subtitle.jsx}</h3>

            {study.tags && (
              <div className="studypanel--tags tag--group">
                {study.tags.map((tag) => {
                  return <Tag key={tag.key}>{tag.name}</Tag>;
                })}
              </div>
            )}

            {variant == "home" ? (
              <>
                <Button
                  className={`studypanel--button studypanel--button__${variant}`}
                  type="regular"
                  icon={["arrow_right", "right", "mask"]}
                  animation={"pulse-right"}
                  href={study.link}
                  style={btnStyle}>
                  {button}
                </Button>
              </>
            ) : (
              variant == "study" &&
              study.type != "gallery" && (
                <>
                  {/* <Button
                    className={`studypanel--button studypanel--button__${variant}`}
                    type="regular"
                    icon={["arrow_down", "right", "mask"]}
                    animation={"pulse-down"}
                    // href={'#Delivery'}
                    onClick={skipHandler}>
                    Skip to Solution
                  </Button> */}
                </>
              )
            )}
          </PanelDesc>

          <PanelImg
            variant={variant}
            style={{
              "--img-aspect-width": img.width,
              "--img-aspect-height": img.height,
            }}
            /*effect="gradient-white"*/
          >
            <Image priority src={img.src} alt={img.alt} width={img.width} height={img.height} />
          </PanelImg>
        </Panel>
      </PanelWrapper>
    </>
  );
}

StudyPanel.defaultProps = {
  variant: "home",
  button: "",
};

StudyPanel.propTypes = {
  variant: PropTypes.oneOf(["home", "study"]),
};

PanelWrapper.displayName = "PanelWrapper";
Panel.displayName = "Panel";
PanelDesc.displayName = "PanelDesc";
PanelImg.displayName = "PanelImg";
StudyPanel.displayName = "StudyPanel";

export { PanelWrapper, Panel, PanelDesc, PanelImg, StudyPanel };
