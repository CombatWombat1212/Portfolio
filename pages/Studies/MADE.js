import { getStudy } from "@/scripts/GetStudy";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import { MADE_IMGS, MADE_IMG_GROUPS } from "@/data/MADE_IMGS";
// import MAKERIGHT_IMGS from "/data/MAKERIGHT_IMGS";
// import Gantt from "/components/charts/Gantt";
// import BarGraph from "@/components/charts/BarGraph";
// import DLink from "@/components/utilities/DynamicLink";
// import PieChart from "@/components/charts/PieChart";
// import Button from "@/components/elements/Buttons";
// import Slideshow from "@/components/global/slideshow/Slideshow";
// import Pitch from "@/components/sections/Pitch";

function MADE({ setPopup }) {
  // TODO: just make it a prop
  const study = getStudy();

  // TODO: update intro image to match the mockups

  return (
    <>
      <CaseStudyPage id={study.id} study={study}>
        <Chapter id="Overview" name="Overview">
          <Section id="Overview--Client" type="columns" titled>
            <Title>Client</Title>
            <Heading>
              With a brand rooted in personalization, <br />
              MADE aimed to bring their bespoke offerings online
            </Heading>

            <Column>
              <Description className={"text-col-2 mt-3"}>
                <p>
                  An offering central to MADE’s image and reputation is having an <b>on-site stylist to support customers</b> in finding their best-suited look. However, at the time, <b>they didn’t feel their webstore reflected these offerings</b>.
                </p>
              </Description>
              <Graphic className="b-rad" img={MADE_IMGS.banner_client} />
            </Column>
          </Section>

          <Section id="Overview--Goal" type="columns" mainClassName={'gap-6'}>
            <Column>
              <Title>Goal</Title>
              <Heading>Provide online customers with the same flexibility as in-store clientele with a dress shirt configurator</Heading>
              <Description>
                <p><b>MADE needed identical images of their offerings to slot into their software</b>. These images would also become product thumbnails for their webstore, allowing customers to browse their catalogue <b>without MADE individually photographing each shirt</b>.</p>
                <p>With 3D renders being the most efficient way to complete this goal, MADE reached out to me to work together in creating this customization utility.</p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" img={MADE_IMGS.configurator_graphic} />
            </Column>
          </Section>
        </Chapter>

        <Chapter id="Closing" name="Closing"></Chapter>
      </CaseStudyPage>
    </>
  );
}

export default MADE;
