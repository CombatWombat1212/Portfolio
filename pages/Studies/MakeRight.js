import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import MAKERIGHT_IMGS from "@/data/MAKERIGHT_IMGS";
import QUOTE_TABLES from "@/data/QUOTE_TABLE";
import Gantt from "@/components/charts/Gantt";
import BarGraph from "@/components/charts/BarGraph";
import DLink from "@/components/utilities/DynamicLink";
import PieChart from "@/components/charts/PieChart";
import Button from "@/components/elements/Buttons";
import Slideshow from "@/components/global/slideshow/Slideshow";
import Pitch from "@/components/sections/Pitch";
import { STUDY_MAKERIGHT } from "@/data/CASE_STUDIES";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import Nobr from "@/components/utilities/Nobr";
import QuoteTable from "@/components/global/QuoteTable";
import ResponsiveText from "@/components/global/ResponsiveText";
import Seo from "@/components/head/Seo";

function MakeRight({ pop }) {
  const study = STUDY_MAKERIGHT;

  // const { desktop, isBpAndDown, isBp, bp, loading } = useResponsive();
  // const isLgAndDown = !(!isBpAndDown("lg") || loading);
  // const isMdAndDown = !(!isBpAndDown("md") || loading);
  // const isSmAndDown = !(!isBpAndDown("sm") || loading);
  // const isMd = !(!isBp("md") || loading);
  // const isSm = !(!isBp("sm") || loading);
  // const isMdOrSm = isMd || isSm;

  // const { desktop, isBpAndDown, isBp, bp, loading } = useResponsive();
  const desktop = true;
  const isLgAndDown = true;
  const isMdAndDown = false;
  const isMdOrSm = false;




  return (
    <>
      <Seo page="makeright" />

      <CaseStudyPage id={study.id} study={study}>
        

        <Chapter name="Delivery" id="Delivery">

          <Section id="Delivery--Conclusion" type="columns" titled background="tertiary light">
            <Heading>Bringing 3D printing to everyday consumers</Heading>

            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["connecting_consumers"]} />
              <Heading className="graphic--caption" type={isMdOrSm ? "p" : "h3"}>
                Connecting consumers to local hobbyist makers for cheap, customizable manufacturing
              </Heading>
            </Column>
            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["browseable_storefront"]} />
              <Heading className="graphic--caption" type={isMdOrSm ? "p" : "h3"}>
                A browsable online storefront of ready-to-print 3D models, sourced from around the internet
              </Heading>
            </Column>

            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["maker_profit"]} />
              <Heading className="graphic--caption" type={isMdOrSm ? "p" : "h3"}>
                Enabling makers to profit off of their equipment and skills in their spare time
              </Heading>
            </Column>
          </Section>

        </Chapter>



      </CaseStudyPage>
    </>
  );
}

export default MakeRight;
