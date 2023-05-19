import CASE_STUDIES from "@/data/CASE_STUDIES";
import { PanelWrapper, PanelDesc, PanelImg, Panel, StudyPanel } from "@/components/elements/Panel";
import Mask from "/components/utilities/Mask";
import { useEffect, useRef, useState } from "react";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import ResponsiveText from "@/components/global/ResponsiveText";
import Nobr from "@/components/utilities/Nobr";
import useRandomString from "@/scripts/hooks/useRandomString";
import useElementWidth from "@/scripts/hooks/useElementWidth";
import useListener from "@/scripts/hooks/useListener";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import { splitPx } from "@/scripts/GlobalUtilities";
import AnimatedText from "@/components/global/AnimText";
import { squiggle } from "@/data/ICONS";
import { Graphic } from "@/components/sections/Sections";
import Seo from "@/components/head/Seo";

function Index() {
  const captions = ["Have a look-see", "Take a gander", "Check it", "I must know", "Gimme", "Go on...", "Do tell", "I'm all ears"];
  const chosen = useRandomString(captions, { localStorage: true, key: "studypanel--buttons", count: CASE_STUDIES.length });

  return (
    <>
      <Seo page="home" />

      <PanelWrapper id="Home" variant="home">
        <Panel id="Home--Hero" type="img-desc" className={`studypanel studypanel__home`}>
          <PanelDesc variant={"home"}>
            <h1 className="studypanel--heading">
              <MainHeading />
            </h1>
            {/* TODO: i really think this should be 2 lines not 3.  More about length than of element size, i think you can trim it a bit */}
            <h3 className="studypanel--subheading">
              I&apos;m a multidisciplinary designer,
              <br className="d-sm-none " /> <Nobr>and maker</Nobr> <Nobr>of digital solutions</Nobr>,
              <br className="d-sm-none " /> <Nobr>tailor-fitted</Nobr> to <Nobr>real-world</Nobr> problems.
            </h3>

            <p className="studypanel--paragraph text--body">This is my portfolio. Enjoy your stay :)</p>
          </PanelDesc>
          <PanelImg>
            <Graphic type="mask" img={squiggle} />
          </PanelImg>
        </Panel>
      </PanelWrapper>

      {CASE_STUDIES.map((item, i) => {
        var caption = chosen[i];
        return <StudyPanel id={`Home--${item.id}`} key={item.key} variant="home" study={item} button={caption} />;
      })}
    </>
  );
}

function MainHeading() {
  const TitleText = ({ children, className = "" }) => <span className={`studypanel--title ${className}`}>{children}</span>;

  const TitleName = () => {
    return (
      <>
        <TitleText className="color--secondary">Sam Giustizia</TitleText>
        {/* <AnimatedText className="studypanel--title color--secondary" innerClassName="studypanel--subtitle color--secondary" main="Giustizia" alternate="Juh-stee-zee-uh" /> */}
      </>
    );
  };

  return (
    <ResponsiveText>
      <xxl>
        <TitleText>Hi, I&apos;m </TitleText>
        <TitleName />
        <TitleText>
          , <br /> how are you?
        </TitleText>
      </xxl>
      <md>
        <TitleText>I&apos;m </TitleText>
        <TitleName />
        <TitleText>
          , <br /> how are you?
        </TitleText>
      </md>
      <sm>
        <TitleText>
          Hi I&apos;m <br />
        </TitleText>
        <TitleName />
        <TitleText>
          , <br /> how are you?
        </TitleText>
      </sm>
    </ResponsiveText>
  );
}

export default Index;
