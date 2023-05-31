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
        <Chapter name="Prototyping" id="Prototyping">
          <Section id="Prototyping--Journey-Map" type="columns" titled="above" background="tertiary light" mainClassName="mb-3">
            <Title>Methodology</Title>
            <Column className="col-7">
              <Heading>
                Prototype scope covered the core journey of makers
                <br className="d-lg-none" /> and customers
              </Heading>
            </Column>
            <Column className="col-5">
              <Description>
                <p>
                  The two journeys included all the main touch-points from sign-up to order fulfillment. This development goal would allow me to
                  establish the foundation and core interactions of the service.
                </p>
              </Description>
            </Column>
            <Graphic type="image" background="tertiary" img={MAKERIGHT_IMGS["journey_map"]} />
          </Section>

          <Section
            id="Prototyping--Methodology"
            type="columns"
            titled
            arrows="background"
            background="tertiary light"
            mainClassName="gap-5"
            mainType="grid">
            <Title>Methodology</Title>
            <Heading>
              The workload was divided <br className="d-none d-md-block d-sm-none" />
              across <Nobr>4 project phases</Nobr>
            </Heading>
            <Description className="mt-1">
              <p>
                I broke development into 4 phases of 4-6 weeks. <br className="d-none d-lg-block d-sm-none" />
                Each containing their own cycles <Nobr className="d-md-none">of development, testing, and iteration.</Nobr>
              </p>
            </Description>

            <Column>
              <Graphic type="mask" background="tertiary" img={MAKERIGHT_IMGS["maker_journey_low_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 1:</b>
                </p>
                <p className="mt-less">
                  Maker Journey, <Nobr>Low-Fi</Nobr>
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["customer_journey_low_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 2:</b>
                </p>
                <p className="mt-less">
                  Customer Journey, <Nobr>Low-Fi</Nobr>
                </p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["maker_journey_high_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 3:</b>
                </p>
                <p className="mt-less">
                  Maker Journey, <Nobr>High-Fi</Nobr>
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="tertiary" color="background" img={MAKERIGHT_IMGS["customer_journey_high_fi"]} />
              <Description className="graphic--caption">
                <p>
                  <b>Phase 4:</b>
                </p>
                <p className="mt-less">
                  Customer Journey, <Nobr>High-Fi</Nobr>
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Progression" type="columns" margin="wide" arrows="background" background="tertiary" titled mainType="grid">
            <Title>Project Iterations</Title>
            <Heading>
              Progression <Nobr>& refinement</Nobr>
            </Heading>

            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p className="section--description-title">
                  <ResponsiveText
                    tag="Fragment"
                    data={{
                      xxl: "Customer Journey ",
                      xs: "Customer ",
                    }}
                  />
                  - Item Listing (Low-Fi)
                </p>
                <p className="section--description-phase">Phase 1</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_checkout_low_fi"]} lightbox pop={pop} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p className="section--description-title">
                  <ResponsiveText
                    tag="Fragment"
                    data={{
                      xxl: "Customer Journey ",
                      xs: "Customer ",
                    }}
                  />
                  - Item Listing (High-Fi)
                </p>
                <p className="section--description-phase">Phase 2</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_checkout_high_fi"]} lightbox pop={pop} />
            </Column>

            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p className="section--description-title">
                  <ResponsiveText
                    tag="Fragment"
                    data={{
                      xxl: "Maker Journey ",
                      xs: "Maker ",
                    }}
                  />
                  - File Checking (Low-Fi)
                </p>
                <p className="section--description-phase">Phase 1</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_file_checking_low_fi"]} lightbox pop={pop} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption graphic--caption__split">
                <p className="section--description-title">
                  <ResponsiveText
                    tag="Fragment"
                    data={{
                      xxl: "Maker Journey ",
                      xs: "Maker ",
                    }}
                  />
                  - File Checking (High-Fi)
                </p>
                <p className="section--description-phase">Phase 2</p>
              </Description>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["iterations_file_checking_high_fi"]} lightbox pop={pop} />
            </Column>
          </Section>

          <Section id="Prototyping--Feedback" background="tertiary light" titled="above">
            <Title>Noteable Feedback Changes</Title>
            <Column>
              <Heading>
                Significant issues addressed during <Nobr>testing and revision:</Nobr>
              </Heading>
            </Column>
            <Column>
              <Description>
                <p>
                  Some changes were a structural shift in the service&rsquo;s rules and mechanics, others were simply UI and UX improvements.
                  <br className="d-xl-none" /> Here is a smattering of the most notable issues addressed along the way.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Overview" titled type="columns" arrows="background anchored" background="tertiary">
            <Heading type="h3">The Manufacturer Overview</Heading>
            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_overview_before"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>
                  Aspiring makers need to understand the expectations of their new job. Originally, this was taught with an 8-page slideshow. But
                  users found it droning, hard to retain, and too easy to skip.
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic
                className="b-rad"
                type="image"
                img={MAKERIGHT_IMGS["feedback_overview_after"]}
                lightbox={MAKERIGHT_IMGS["feedback_overview_after_full"]}
                pop={pop}
              />
              <Description className="mt-more graphic--caption">
                <p>
                  Now, that info exists as a single inviting page. As well, I added a brief video chat at the end onboarding to ensure new Makers have
                  read the overview, and can ask questions.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Equipment" titled type="columns" arrows="background anchored" background="tertiary" mainType="grid">
            <Heading type="h3">Equipment verification</Heading>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_printers_before"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>User&rsquo;s noted: lack of parity between printer and filament inputs, and the inability to add multiple printers.</p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_printers_after"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>Redesign to match filament inputs, now with support for multiple printers, and integrated support via tooltips.</p>
              </Description>
            </Column>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_filament_before"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>Makers may have entire shelves of filament, so it would be useful to have more distinction between each added material.</p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_filament_after"]} lightbox pop={pop} />
              <Description className="mt-more graphic--caption">
                <p>
                  A stripe across the top of the cards match the real-world color of the inputted filament; making them much easier to differentiate.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Tutorial" titled type="columns" background="tertiary">
            <Heading type="h3">Tutorial system</Heading>

            <Column>
              <Graphic className="b-rad" type="image" img={MAKERIGHT_IMGS["feedback_tutorials"]} lightbox pop={pop} />
              <Description className={`mt-more graphic--caption gap-4 gap-lg-3 ${!isLgAndDown && "graphic--caption__split"}`}>
                <p>
                  Testers of the Maker journey were navigating much more fluidly halfway through each test. It was taking a few pages of exploration
                  before the terminology, and flow finally clicked.
                </p>
                <p>
                  To ease the friction of a user&rsquo;s first order fulfillment, I added an optional tutorial system. Boxes appear one by one
                  describing important elements, and directing the user through their task.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Closing" background="tertiary light">
            <Heading>
              With these and many other issues addressed, <br className="d-lg-none" />I had actualized the core functionality of the service.
            </Heading>
          </Section>
        </Chapter>

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
