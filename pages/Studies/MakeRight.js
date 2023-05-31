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
          <Section id="Delivery--Banner-Intro" background={MAKERIGHT_IMGS.delivered_project_banner}>
            <Heading>Delivered Project</Heading>
          </Section>
          <Section type="passthrough" id="Delivery--Maker" background="tertiary" margin="none">
            {/* TODO: i think maybe these should be the non-tutorial versions :/ what do you think?? */}
            {/* TODO: yeah i do think these should be the non-tutorial versions */}
            {/* TODO: Okay so the way you do it is none of them should have tutorials, except one that you think is a really good example of the tutorials.  For that one, show the non-tutorial first, then after it show the tutorial version and comment on what that is */}

            <Slideshow img={MAKERIGHT_IMGS.maker_screen_10}>
              <Heading>
                <ResponsiveText tag="Fragment">
                  <xxl>Maker user journey</xxl>
                  <lg>Maker journey</lg>
                </ResponsiveText>
              </Heading>
            </Slideshow>
          </Section>

          <Section type="passthrough" id="Delivery--Customer" background="tertiary" margin="none">
            <Slideshow img={MAKERIGHT_IMGS.customer_screen_06}>
              <Heading>
                <ResponsiveText tag="Fragment">
                  <xxl>Customer user journey</xxl>
                  <lg>Customer journey</lg>
                  <xs>Cust. journey</xs>
                </ResponsiveText>
              </Heading>
            </Slideshow>
          </Section>

          {/* TODO: next up just finish up this page, making the last component you need */}

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

          <Section id="Delivery--Forward" type="columns" titled background="tertiary light">
            <Heading>Going Forward</Heading>

            <Column>
              <Description>
                <p>
                  This project has only just begun. With every feature added, countless more had to be sidelined for the sake of scope. Some of the
                  planned future additions to the project include:
                </p>
                <ul>
                  <li>
                    <span>A full branding refresh (the logo and name are temporary)</span>
                  </li>
                  <li>
                    <span>Wider testing with relevant users, both customers and makers</span>
                  </li>
                  <li>
                    <span>Overhauling the visuals and UX of the store page</span>
                  </li>
                  <li>
                    <span>UX of user profiles</span>
                  </li>
                  <li>
                    <span>Real-world tests with owners of 3D printers</span>
                  </li>
                </ul>
              </Description>
            </Column>
            <Column>
              <Description>
                <p>
                  Several team members would need to be added in order to become a dedicated company. Like algorithm engineers to help design the
                  systems that assign orders to makers, and determine how much they get paid per job. Other additions include:
                </p>
                <ul>
                  <li>
                    <span>More UX designers</span>
                  </li>
                  <li>
                    <span>Wider testing with relevant users, both customers and makers</span>
                  </li>
                  <li>
                    <span>Backend developers (some with cyber-security experience)</span>
                  </li>
                  <li>
                    <span>Financial advisors</span>
                  </li>
                </ul>
              </Description>
            </Column>
          </Section>

          <Section id="Delivery--Banner-Closing" background={MAKERIGHT_IMGS["closing_banner"]}></Section>
        </Chapter>



      </CaseStudyPage>
    </>
  );
}

export default MakeRight;
