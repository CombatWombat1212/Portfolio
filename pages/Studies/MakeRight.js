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

  const { desktop, isBpAndDown, isBp, bp, loading } = useResponsive();
  const isLgAndDown = !(!isBpAndDown("lg") || loading);
  const isMdAndDown = !(!isBpAndDown("md") || loading);
  const isSmAndDown = !(!isBpAndDown("sm") || loading);
  const isMd = !(!isBp("md") || loading);
  const isSm = !(!isBp("sm") || loading);
  const isMdOrSm = isMd || isSm;

  return (
    <>
      <Seo page="makeright" />

      <CaseStudyPage id={study.id} study={study}>

        

        <Chapter name="Closing" id="Closing">
          <Section id="Closing--Copy" type="columns" titled mainClassName="gap-6 gap-lg-4 mt-6">
            <Title>Areas Of Growth</Title>
            <Heading>
              Considering entire userflows and journeys <br className="d-lg-none" />
              makes for far better UI than individual features
            </Heading>
            <Description className={`text-col-2 ${!isLgAndDown ? "text-gap-6" : "text-gap-4"}`}>
              <p>
                When I began planning my approach to prototyping, I chose a number of the service&rsquo;s most important features. From there, I
                intended to create mockups of each. Eventually, I reached the question of how the service would verify that makers were capable and
                trustworthy. My solution was to have them create a mock customer order. But to prototype this, I would need to mock up the entire
                order fulfillment process. Only having a few select screens would be too disjointed.
              </p>

              <p>
                At this moment, I decided the only way to consider all aspects of the service would be to build the 2 entire user flows. This caused a
                massive shift in my project approach. It allowed me to encounter numerous issues that would have gone unaddressed if I had only
                created separate feature screens.
              </p>

              <p>
                This moment reminds me to always focus on the entire context of a user&rsquo;s journey and experience. I need to avoid fixating on
                individual features without remembering the greater context of the system in which I&rsquo;m working. Good UX design isn&rsquo;t
                separated features in a vacuum, it&rsquo;s the creation of an entire experience.
              </p>
            </Description>

            <Column>
              <Title>Learning</Title>
              <Heading>The importance of involving users as early, and as often as possible</Heading>
              <Description>
                <p>
                  In this project, I spoke with 10 potential users, in two separate groups before becoming invested in any concept or solution. This
                  gave me important background information from which to build ideas. But equally valuable was my decision to involve this group once
                  again after I had developed an idea. This allowed me to gather feedback on my concept, before having created any semblance of a
                  prototype. Providing tangible validation that my ideas were worth pursuing, and a foundation of user feedback from which to expand
                  and build.
                </p>

                <p>
                  This moment reminded me to always involve users as early and as often as possible. Often, designers forgo interviewing users in a
                  project&rsquo;s early stages. This is usually done in favour of instead testing before ideation, or after a prototype has been
                  actualized. But, by keeping users close to my project at every stage, my solution became tailor fitted to the exact problem that I
                  had observed in the 3D printing space.
                </p>
              </Description>
            </Column>

            <Column>
              <Title>Sucesses</Title>
              <Heading>Creating actionable steps to achieving the core functionality of the service</Heading>
              <Description>
                <p>
                  I often questioned what the final outcome of this project should be. I felt strongly about this concept, and I needed to do it
                  justice. Around the end of the first month, after much planning and revision, I had defined my goal of creating 2 user journey
                  prototypes. With this finally established, I quickly fell into the groove of cycling through iterations week by week. I made
                  screens, found testers, gathered feedback, implemented changes, and repeated. In the end, all the pieces fell together. Resulting in
                  a polished, cohesive execution of my idea.
                </p>

                <p>
                  Despite many challenging time crunches during development, I steadily moved through each phase without any major snags. Working with
                  a clear end goal, and defining actionable steps to reach it, is what brought this project to life. For this reason, the planning and
                  organization of this project was its greatest success.
                </p>
              </Description>
            </Column>
          </Section>
        </Chapter>



      </CaseStudyPage>
    </>
  );
}

export default MakeRight;
