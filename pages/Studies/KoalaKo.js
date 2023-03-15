import { getStudy } from "@/scripts/GetStudy";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import MAKERIGHT_IMGS from "/data/MAKERIGHT_IMGS";
import Gantt from "/components/charts/Gantt";
import BarGraph from "@/components/charts/BarGraph";
import DLink from "@/components/utilities/DynamicLink";
import PieChart from "@/components/charts/PieChart";
import Button from "@/components/elements/Buttons";
import Slideshow from "@/components/global/slideshow/Slideshow";
import Pitch from "@/components/sections/Pitch";

function KoalaKo() {
  const study = getStudy();

  console.log(study);

  return (
    <CaseStudyPage id={study.id} study={study}>
      <Chapter id="Overview" name="Overview">
        <Section id="Overview--Background" type="overview">
          <Title>Background</Title>
          <Heading>3D printing is yet to reach its full potential</Heading>
          <Description>
            <p>
              Offering endless customization, cheap manufacturing, and fast production speeds.
              <br />
              3D printing has a vast potential to benefit everyday consumers.
            </p>
            <p>In the early 2010s, we were told they would be found in every home; giving consumer’s the power to create anything. But its barriers were too great to reach these expectations, and this reality fell flat. Now, 3D printing hardly has any impact on the average consumer’s life.</p>
          </Description>

          <Graphic type="mask" img={MAKERIGHT_IMGS["full_potential"]} />
        </Section>
      </Chapter>

      <Chapter name="Closing" id="Closing"></Chapter>

    </CaseStudyPage>
  );
}

export default KoalaKo;
