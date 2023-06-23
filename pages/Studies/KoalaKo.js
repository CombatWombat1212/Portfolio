// Imports - Components
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import Gantt from "@/components/charts/Gantt";
import Findings from "@/components/global/Findings";
import Method from "@/components/global/Method";

// Imports - Data
import { KOALAKO_IMGS } from "@/data/KOALAKO_IMGS";
import ICONS from "@/data/ICONS";
import { STUDY_KOALAKO } from "@/data/CASE_STUDIES";

// Imports - Scripts
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import Seo from "@/components/head/Seo";
import Nobr from "@/components/utilities/Nobr";

function KoalaKo({ pop }) {
  const study = STUDY_KOALAKO;

  const { desktop, isBpAndDown, isBp, loading } = useResponsive();

  const isntMd = !isBp("md") || loading;
  const mdAndDown = !(!isBpAndDown("md") || loading);
  const smAndDown = !(!isBpAndDown("sm") || loading);
  const isSm = !(!isBp("sm") || loading);

  return (
    <>
      <Seo page="koalako" />
      <CaseStudyPage id={study.id} study={study}>
        <Chapter id="Overview" name="Overview">
          <Section id="Overview--Team" type="columns" titled mainClassName="mts-1 gap-5">
            <Title>The Team</Title>
            <Column>
              <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" />
              <Heading type="h3" className="text-align-center graphic--caption">
                Me
              </Heading>
              <Description className="text-align-center mts-1">
                <p>
                  <b className="color--secondary" style={{ display: "inline-block", "margin-bottom": "0.1rem" }}>
                    Project Lead
                  </b>
                  <br />
                  UX/UI Design <br />
                  Research <br />
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" />
              <Heading type="h3" className="text-align-center graphic--caption">
                Jianing Li
              </Heading>
              <Description className="text-align-center mts-1">
                <p>
                  UX/UI Design <br />
                  Research
                </p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" />
              <Heading type="h3" className="text-align-center graphic--caption">
                Marko Prodanovic
              </Heading>
              <Description className="text-align-center mts-1">
                <p>
                  UX/UI Design <br />
                  Research
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" />
              <Heading type="h3" className="text-align-center graphic--caption">
                Zhiyi Liu
              </Heading>
              <Description className="text-align-center mts-1">
                <p>
                  UX/UI Design <br />
                  Research
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Overview--Background" type="overview">
            <Title>Background</Title>
            <Heading>
              &ldquo;Creativity is in crisis&rdquo; <Nobr>- LEGO & AKQA</Nobr>
            </Heading>
            <Description>
              <p>
                Design agency AKQA hosts an annual competition called &lsquo;Future Lions.&rsquo; Partnering with LEGO in 2021, their challenge
                targeted the growing problem of play being seen as a &lsquo;nice to have,&rsquo; rather than a critical part of a child&rsquo;s
                development.
              </p>
            </Description>

            <Graphic type="mask" img={KOALAKO_IMGS.background_bulb} />
          </Section>

          <Section id="Overview--Challenge" type="overview" loading={loading}>
            <Title>Background</Title>
            <Heading>
              Create a digital-age solution that reinforces <br className="d-block d-xxl-none" />
              the importance of creativity, and play
            </Heading>
            <Description>
              <Heading type={desktop ? "h3" : "h5"} className={desktop ? "weight-reg" : ""}>
                No open social platforms
              </Heading>
              <p className="mt-1">
                Child-focused social media raises many security concerns.
                <br className="d-block d-sm-none" /> As well, children already spend countless hours a day on existing platforms.
              </p>
              <Heading type={desktop ? "h3" : "h5"} className={`${desktop ? "weight-reg" : ""} mts-2`}>
                Bring play back into the real world
              </Heading>
              <p className="mt-1">Emphasize physical, explorative play</p>
            </Description>

            <Graphic type="mask" img={KOALAKO_IMGS.background_kids} />
          </Section>

          <Section id="Overview--Opporunity">
            <Title>Opportunity</Title>
            <Heading>
              How might we encourage explorative play <br className="d-block d-lg-none" />
              while following these considerations?
            </Heading>
          </Section>

          <Section id="Overview--Client" type="columns" titled>
            <Title id="Solution">Solution</Title>
            <Heading>
              KoalaKo, the smart activity database <br className="d-block d-md-none" />
              built to help parents help kids
            </Heading>

            <Column>
              <Description className={"text-col-2 text-col-lg-1 gap-3 gap-xl-4 mts-3"}>
                <p>
                  Entertaining kids can be a challenge. To help keep play easy and fun, KoalaKo provides parents with a toolbelt of games and
                  locations to explore.
                </p>
                <p>
                  Variety is a strong focus, as it encourages creative development. Activities range from social to solo, mental to physical, and lots
                  more.
                </p>
              </Description>
              <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.banner_intro} />
            </Column>
          </Section>

          <Section id="Overview--Exploration" type="columns" background="tertiary">
            <Column className="solution--copy">
              <Graphic type="mask" img={KOALAKO_IMGS.solution_worldly_creativity} />
              <Heading>
                Find activities <br className="d-sm-none" />
                that inspire exploration
              </Heading>
              <Description>
                <p>
                  Get activity suggestions relevant to your child&rsquo;s interest, <Nobr>to help</Nobr> grow their passions and hobbies.
                </p>
                <p>
                  As well as activities that push your child&rsquo;s creativity <Nobr>into new territory.</Nobr>
                </p>
              </Description>
            </Column>
            <Column className="solution--graphics">
              <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_location} lightbox pop={pop} />
              <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_map_item} lightbox pop={pop} />
            </Column>
          </Section>

          <Section id="Overview--Wordly" type="columns" background="tertiary">
            <Column className="solution--graphics">
              <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_location} lightbox pop={pop} />
              <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_map_item} lightbox pop={pop} />
            </Column>
            <Column className="solution--copy">
              <Graphic type="mask" img={KOALAKO_IMGS.solution_worldly_creativity} />
              <Heading>
                Search local spots <Nobr>for worldly</Nobr> creativity
              </Heading>
              <Description>
                <p>Find a space that perfectly matches your activity, or activities that match your space!</p>
                <p>Filters allow anyone to adventure outside the living room. These include distance from home, and entry fee versus free.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Overview--Privacy" type="columns" background="tertiary">
            <Column className="solution--copy">
              <Graphic type="mask" img={KOALAKO_IMGS.solution_personal_info} />
              <Heading>
                No personal information <br className="d-block d-sm-none" />
                required from the child
              </Heading>
              <Description>
                <p>
                  If parents provide a child&rsquo;s name and age, they enable smart activity suggestions. These keep games age-appropriate, and
                  varied, based on past experiences.
                </p>
                <p>
                  If they opt out, the app still functions as a treasure trove of activities. Searchable and browseable, just not as
                  &lsquo;smart.&rsquo;
                </p>
              </Description>
            </Column>

            <Column className="solution--graphics">
              <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_setup} lightbox pop={pop} />
              <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_skip_signup} lightbox pop={pop} />
            </Column>
          </Section>

          <Section id="Overview--Banner" background={KOALAKO_IMGS.banner_building}>
            <Heading>Building KoalaKo</Heading>
          </Section>
        </Chapter>

        <Chapter name="Plan" id="Plan">
          <Section id="Plan--Gantt" className="flex-col" wrapperClassName="pb-section-gap">
            <Title>Project Plan</Title>
            <Heading>Plotting timeline, and team expectations</Heading>
            <Gantt study="KoalaKo" className="mts-3" />
            <Description className="text-col-2 text-col-lg-1 gap-3 gap-xl-4 mts-4 mts-md-3">
              <p>Our plan ensured enough time to research our topic before ideation. From there, we would distill the promising concepts.</p>
              <p>Next, we&rsquo;d test and get feedback with a prototype. Rinse and repeat to address feedback, and refine our solution.</p>
            </Description>
          </Section>
        </Chapter>

        <Chapter name="Research" id="Research">
          <Section id="Research--Findings" type="columns" titled background="background darker" mainType="flex" mainClassName="mts-4">
            <Title>Findings</Title>
            <Heading>
              Secondary research into creative development <br className="d-block d-lg-none" />
              revealed the importance of play-style breadth
            </Heading>
            <Column>
              <Findings>
                <div type="main">
                  <Heading type={"h3"}>Unique play experiences create&nbsp;different types of critical&nbsp;development</Heading>
                </div>

                <div type="dropdown">
                  <p>&ldquo;Be sure to offer children a wide range of creative materials and experiences...&rdquo;</p>
                  <p>&ldquo;...The more varied experiences children have in their lives, the wider the range of creative expression.&rdquo;</p>
                  <p>&ldquo;Play fosters mental development and new ways of thinking and problem solving...&rdquo;</p>
                  <h4>Creativity and Play: Fostering Creativity (PBS)</h4>
                </div>
              </Findings>
            </Column>
            <Column>
              <Findings>
                <div type="main">
                  <Heading type={"h3"}>Encouraging self expression through creativity can further this development</Heading>
                </div>
                <div type="dropdown">
                  <p>
                    &ldquo;Ask [them] to paint, draw, or tell a story, about how they&rsquo;re feeling. [activities like these help your child to]
                    learn how to express their feelings safely and creatively, allowing them to integrate into social settings and regulate their
                    behavior more appropriately.&rdquo;
                  </p>
                  <h4>The Importance of Creative Play for Kids (The Little Gym)</h4>
                </div>
              </Findings>
            </Column>
          </Section>

          <Section id="Research--Summary">
            <Heading>
              With these in mind, we began searching for solutions
              <br className="d-block d-lg-none" /> to encourage explorative play.
            </Heading>
          </Section>
        </Chapter>

        <Chapter name="Develop" id="Develop">
          <Section id="Develop--Methods" mainType="grid" type="columns" background="background darker" titled line="method">
            <Column>
              <Method mirrorstyle={!mdAndDown && "koala_method_1 match height"}>
                <Title>Brainstorming</Title>
                <Heading type={`h3`}>Finding ideas</Heading>
                <p>
                  Rapid fire idea creation, narrowed down to a <Nobr>promising</Nobr> concept.
                </p>
                <Graphic type="mask" img={KOALAKO_IMGS.exercise_brainstorming_simplified} />
              </Method>
            </Column>
            <Column>
              <Method mirrorstyle={!mdAndDown && "koala_method_1 match height"}>
                <Title>Crazy 8s</Title>
                <Heading type={`h3`}>Exploring medium</Heading>
                <p>
                  Comic-style sketches of a user&rsquo;s journey to help us find our medium. Is it a location? An app? How does <Nobr>a user</Nobr>{" "}
                  receive the intended value?
                </p>
                <Graphic type="mask" img={KOALAKO_IMGS.exercise_crazy_8s_simplified} />
              </Method>
            </Column>
            <Column>
              <Method mirrorstyle={!mdAndDown && "koala_method_2 match height"}>
                <Title>Importance Vs. Difficulty Matrix</Title>
                <Heading type={`h3`}>Removing fluff</Heading>
                <p>
                  We plotted our ideas on a chart of value to the user vs. difficulty to implement. We then cut ideas that didn&rsquo;t directly
                  support parents in fostering creativity.
                </p>
                <Graphic type="mask" img={KOALAKO_IMGS.exercise_importance_simplified} />
              </Method>
            </Column>
            <Column>
              <Method mirrorstyle={!mdAndDown && "koala_method_2 match height"}>
                <Title className="title">Experience Roadmap</Title>
                <Heading type={`h3`}>Solidifying scope</Heading>
                <p>
                  From MVP to polished service, we defined 3 project tiers: cupcake, cake, and wedding cake. We picked the level that fit our
                  requirements, and goals.
                </p>
                <Graphic type="mask" img={KOALAKO_IMGS.exercise_roadmap_simplified} />
              </Method>
            </Column>
          </Section>
        </Chapter>

        <Chapter name="Prototyping" id="Prototyping">
          <Section id="Prototyping--LowFi" titled type="columns">
            <Title>Low-Fi Prototypes</Title>
            <Heading>Low-fi prototypes for user testing</Heading>

            <Column caption="above">
              <Heading type="p" className="graphic--caption__above color--tertiary" mirrorstyle="lowfi_prototype_heading_desk match height">
                <b>Onboarding</b>
              </Heading>
              <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_onboarding} />
            </Column>

            <Column caption="above">
              <Heading type="p" className="graphic--caption__above color--tertiary" mirrorstyle="lowfi_prototype_heading_desk match height">
                <b>Homepage</b>
              </Heading>
              <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_homepage} />
            </Column>

            <Column caption="above">
              <Heading type="p" className="graphic--caption__above color--tertiary" mirrorstyle="lowfi_prototype_heading_desk match height">
                <b>Activities</b>
              </Heading>
              <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_activities} />
            </Column>

            <Column caption="above">
              <Heading type="p" className="graphic--caption__above color--tertiary" mirrorstyle="lowfi_prototype_heading_desk match height">
                <b>Location Browse</b>
              </Heading>
              <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_map} />
            </Column>

            <Column caption="above">
              <Heading type="p" className="graphic--caption__above color--tertiary" mirrorstyle="lowfi_prototype_heading_desk match height">
                <b>Statistics</b>
              </Heading>
              <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_statistics} />
            </Column>

            <Description className="text-col-2 text-col-lg-1 gap-3 gap-xl-4" below={desktop ? true : false}>
              <p>
                Here we chose the name &lsquo;KoalaKo.&rsquo; It&rsquo;s playful and curious, <Nobr>like the</Nobr> koala joey it accompanies.
              </p>
              <p>Our platform would be mobile-first, prioritizing quick access from wherever play might occur.</p>
            </Description>
          </Section>

          <Section id="Prototyping--Testing-Overview" type="columns" titled="above" background="background darker">
            <Title>Testing</Title>
            <Column>
              <Heading>
                Valuable feedback <Nobr className="d-sm-none">despite obstacles</Nobr> <br className="d-sm-none" /> in our user sample
              </Heading>
            </Column>
            <Column>
              <Description>
                <p>Finding available parents, or navigating the ethics of testing with children, was difficult within our timeline. </p>
                <p>We instead tested with 4 young adults, some of whom helped raise much younger siblings.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Testing-Results" type="columns" background="background darker">
            <Column>
              <Title>Methodology</Title>
              <Heading type="h3" className={!smAndDown && "mt-1"}>
                Freeform comments, <br className="d-md-none" />
                <Nobr>and prepared questions</Nobr>
              </Heading>
              <Description className={"mt-less"}>
                <p>
                  Immediate impressions and pain points, then <Nobr>digging deeper into</Nobr> thoughts / feelings.
                </p>
              </Description>
            </Column>

            <Column>
              <Title>Findings / Suggestions</Title>
              <Description className="mts-1">
                <p className="paragraph__background">Finalize the user, do kids use the app? Or just parents?</p>
                <p className="paragraph__background">Activity recs should take a child&rsquo;s interests into account</p>
                <p className="paragraph__background">
                  The location feature should work in two directions: <Nobr>ability to</Nobr> browse locations that match a desired activity, and
                  activities that match a desired location.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Implimentation" background="background darker">
            <Title>Implimentation Plan</Title>
            <Heading>Noting suggestions, and refocusing our goals</Heading>

            <Description className={"text-col-2 text-col-lg-1 gap-3 gap-xl-4"}>
              <p>
                We finalized our decision to make the service parent-centered. This allowed us to cut features planned for child use, and avoid the
                pitfall of creating yet another reason for kids to use screens.
              </p>

              <p>
                The suggested location feature became a main focal point. Lastly, we decided it was imperative to gather parent feedback in the next
                phase, to better understand our demographic.
              </p>
            </Description>
          </Section>

          <Section id="Prototyping--HiFi" type="columns">
            <Title>Hi-Fi Prototypes</Title>
            <Heading>KoalaKo&rsquo;s first hi-fi interactive prototype</Heading>

            <Column className={`${desktop ? "col-8" : "e-col-12"}`} caption="above">
              <Heading type="p" className="graphic--caption__above color--tertiary">
                <b>Userflow Map</b>
              </Heading>
              <Graphic
                type="image"
                background="background darker"
                img={KOALAKO_IMGS.prototypes_userflow_map}
                lightbox={KOALAKO_IMGS.prototypes_userflow_map_background}
                pop={pop}
              />
            </Column>

            <Column className={`${desktop ? "col-2" : "col-"}`} caption="above">
              <Heading type="p" className="graphic--caption__above color--tertiary">
                <b>Onboarding</b>
              </Heading>
              <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototypes_userflow_splash_screen} />
            </Column>

            <Column className={`${desktop ? "col-2" : "col-"}`} caption="above">
              <Heading type="p" className="graphic--caption__above color--tertiary">
                <b>Play Statistics</b>
              </Heading>
              <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototypes_userflow_statistics} />
            </Column>
          </Section>

          <Section id="Prototyping--Features" type="columns" background="tertiary" mainType="grid" mainClassName="gap- mts-4 mts-md-3 mts-sm-3">
            <Heading>Features added at this stage include:</Heading>

            <Column>
              <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_child_profiles} />
              <Heading type={`${desktop ? "h3" : "h5"}`} className="graphic--caption mt-more">
                Optional child profiles
              </Heading>
              <Description className="mts-1">
                <p>
                  Parents can decline sharing their child&rsquo;s age or name, opting out of smart features, making the activity database accessible
                  to all parents.
                </p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_selecting_interests} />
              <Heading type={`${desktop ? "h3" : "h5"}`} className="graphic--caption mt-more">
                Selecting interests
              </Heading>
              <Description className="mts-1">
                <p>Choosing a child&rsquo;s interests at sign-up allows us to better support their passions through suggested activities.</p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_statistics_page} />
              <Heading type={`${desktop ? "h3" : "h5"}`} className="graphic--caption mt-more">
                Refined statistics page
              </Heading>
              <Description className="mts-1">
                <p>
                  Explore play history, and the find which experiences your child is yet to try. Goal-setting helps to encourage regular playtime.
                </p>
              </Description>
            </Column>

            <Column>
              <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_community_feedback} />
              <Heading type={`${desktop ? "h3" : "h5"}`} className="graphic--caption mt-more">
                Community feedback
              </Heading>
              <Description className="mts-1">
                <p>Activity and location rating for better recs, and to bring poor suggestions to platform&rsquo;s attention.</p>
              </Description>
            </Column>
            <Column>
              <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_location_browsing} />
              <Heading type={`${desktop ? "h3" : "h5"}`} className="graphic--caption mt-more">
                Location browsing
              </Heading>
              <Description className="mts-1 col-9 col-xxl-12">
                <p>Users can now browse locations that match activities, and activities that match locations, as suggested by our testers.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Test-2" background="background darker" titled="above">
            <Title>Testing 2</Title>
            <Column>
              <Heading>Round 2. TEST.</Heading>
            </Column>
            <Column>
              <Description>
                <p>
                  We managed to include 1 parent in our group of 4 testers. Scheduling and timeline made it difficult to find more, despite our best
                  efforts. However, their feedback was invaluable.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Methodology" background="background darker" mainClassName="gap-6 gap-xxl-5 gap-xl-4 gap-lg-3 gap-sm-5">
            <Title>Methodology</Title>
            <Heading>User testing involved:</Heading>

            <Column>
              <Graphic type="mask" img={KOALAKO_IMGS.testing_usability} background="background" />
              <Heading type={!isSm ? "h3" : "h5"} className="graphic--caption mt-more">
                Usability Tasks
              </Heading>
              <Description className="mts-1">
                <p>Find the pain points throughout the core pages and features.</p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" img={KOALAKO_IMGS.testing_popcorn} background="background" />
              <Heading type={!isSm ? "h3" : "h5"} className="graphic--caption mt-more">
                Popcorn feedback
              </Heading>
              <Description className="mts-1">
                <p>Free-form, unstructured comments were encouraged during the test.</p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" img={KOALAKO_IMGS.testing_questions} background="background" />
              <Heading type={!isSm ? "h3" : "h5"} className="graphic--caption mt-more">
                Pre-written questions
              </Heading>
              <Description className="mts-1">
                <p>Questions for each tester helped us find more specific information.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Prototyping--Findings" background="background darkest" wrapperClassName="mb-less">
            <Title>Findings</Title>
            <Heading>Discovering a need to reframe, and add features</Heading>
          </Section>

          <Section id="Prototyping--Findings-1" background="background darkest" wrapperClassName="mb-less">
            <Column className={"col-4 col-md-5 col-sm-7"}>
              <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.findings_stats} />
            </Column>
            <Column className={"col-8 col-md-9 col-sm-12"}>
              <Quote className="b-rad" background="background">
                &ldquo;The &lsquo;goal setting&rsquo; feature makes me feel pressured, like if I fail to reach a goal then I haven&rsquo;t done
                enough for my child&rdquo;
                <br />
                <span style={{ display: "block" }} className="mts-1"></span>- User #1 (Parent)
              </Quote>
              <Quote className="b-rad" background="background">
                &ldquo;Achievements may help the activities feel more optional, and less like <Nobr className="d-sm-nond">you must do them</Nobr> to
                support your child&rdquo;
                <br />
                <span style={{ display: "block" }} className="mts-1"></span>- User #3
              </Quote>
            </Column>
          </Section>

          <Section id="Prototyping--Findings-2" background="background darkest">
            <Column className={"col-4 col-md-5 col-sm-7"}>
              <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.findings_games} />
            </Column>
            <Column className={"col-8 col-md-9 col-sm-12"}>
              <Quote className="b-rad" background="background">
                &ldquo;It would be great to see a filter for one-on-one activities or team activities, or budget to play the games&rdquo;
                <br />
                <span style={{ display: "block" }} className="mts-1"></span>- User #2
              </Quote>
            </Column>
          </Section>
        </Chapter>

        <Chapter name="Refine" id="Refine">
          <Section id="Refine--Hi-Fi-2" type="columns" titled="above" background="background">
            <Title>Hi-Fi Prototype 2</Title>
            <Column>
              <Heading>
                Honoring the efforts <Nobr>of parents</Nobr>, rather than setting expectations
              </Heading>
            </Column>
            <Column>
              <Description>
                <p>Testing revealed a didactic tone. Features like play time goals were telling parents what to do, rather than being encouraging.</p>
                <p>We aimed to bring their efforts back into the spotlight during this next round of improvements and tweaks.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Refine--Stats" background="background darker">
            <Column nocol className="gap-">
              <Heading>
                Removing play time <Nobr>goal-setting</Nobr>
              </Heading>
              <Description>
                <p>
                  Visualizing play as a meter that needs to be filled was <Nobr>creating a</Nobr> sense of pressure during user testing.
                </p>
                <p>
                  Without this feature, we were no longer enforcing requirements on parents, simply providing a place{" "}
                  <Nobr className="d-sm-none">to watch your</Nobr> child grow.
                </p>
              </Description>
            </Column>
            <Column className="flex-row just-bet gap-" nocol>
              <div className="section--inner-column">
                <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.refine_stats_before} lightbox pop={pop} />
                <Title className="mts-1">Before</Title>
              </div>
              <div className="section--inner-column">
                <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.refine_stats_after} lightbox pop={pop} />
                <Title className="mts-1">After</Title>
              </div>
            </Column>
          </Section>

          <Section id="Refine--Feedback" background="background darker">
            <Column nocol className="gap-">
              <Heading>
                Improving <Nobr>positive feedback</Nobr>
              </Heading>
              <Description className={"mts-2"}>
                <p>Trophies honor the achievements of both the children and the parents, furthering the supportive tone and messaging.</p>
                <p>As well, a redesigned post-activity screen celebrates the time they chose to spend having fun with their child.</p>
              </Description>
            </Column>
            <Column className="flex-row just-bet gap-" nocol>
              <div className="section--inner-column">
                <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.refine_stats_before} lightbox pop={pop} />
              </div>
              <div className="section--inner-column">
                <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.refine_stats_after} lightbox pop={pop} />
              </div>
            </Column>
          </Section>

          <Section id="Refine--Hi-Fi-3" type="columns" titled="above" background="background">
            <Title>Hi-Fi Prototype 3</Title>
            <Column>
              <Heading>
                Revisiting the project <Nobr>with a</Nobr> visual refresh
              </Heading>
            </Column>
            <Column>
              <Description>
                <p>In making this case study I decided to overhaul the UI design. This was an earlier project of mine, and its age was showing.</p>
                <p>
                  The screens lacked cohesion. As well, I felt the value in the service&rsquo;s concept didn&rsquo;t quite shine through in execution.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Refine--Visuals" background="background darker">
          <Column className="flex-row just-bet gap-" nocol>
              <div className="section--inner-column">
                <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.refine_stats_before} lightbox pop={pop} />
                <Title className="mts-1">Before</Title>
              </div>
              <div className="section--inner-column">
                <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.refine_stats_after} lightbox pop={pop} />
                <Title className="mts-1">After</Title>
              </div>
            </Column>

            <Column nocol className="gap-">
              <Heading>Visual consistency</Heading>
              <Description>
                <p>
                  The original screens lacked whitespace, and had too many elements with differing design styles. Usability suffered with all the
                  cluttered elements and text on screen.
                </p>
                <p>Typesetting, and breathing room were a strong focus. Above all, I aimed to make the service more approachable.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Refine--Features" background="background darker">
            <Column className="flex-row just-bet gap-" nocol>
              <div className="section--inner-column">
                <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.refine_stats_before} lightbox pop={pop} />
                <Title className="mts-1">Before</Title>
              </div>
              <div className="section--inner-column">
                <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.refine_stats_after} lightbox pop={pop} />
                <Title className="mts-1">After</Title>
              </div>
            </Column>
            <Column nocol className="gap-">
              <Heading>Fleshing-out features</Heading>
              <Description>
                <p>There was some noticeably underdeveloped functionality. Activity listings, for example, were missing crucial info.</p>
                <p>
                  In the redesign, parents can see the number of players, and game length, at a glance. As well as a clear call to action for the
                  &lsquo;how-to&rsquo; details, like set-up, rules, and supplies.
                </p>
              </Description>
            </Column>

          </Section>
        </Chapter>

        <Chapter name="Delivery" id="Delivery">
          <Section id="Delivery--Banner" background={KOALAKO_IMGS.banner_delivery}>
            <Heading>Final Submission</Heading>
          </Section>

          <Section id="Delivery--Submission-Description-1" titled="above" background="background darkest" wrapperClassName={"mb-less-2"}>
            <Title>Submission</Title>
            <Column>
              <Heading>
                Helping parents <br className="d-lg-none" />
                help kids grow
              </Heading>
            </Column>

            <Column>
              <Description>
                <p>KoalaKo is a smart, accessible tool for parents who need a helping hand with keeping their kids engaged, and creative. </p>
                <p>Built for the needs of any parent, and the interests of any child.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Delivery--Submission-Graphics-1" wrapperClassName="mt-less-2" background="background darkest">
            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_login} />
            </Column>

            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_interests} />
            </Column>

            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_activities} />
            </Column>

            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_game_listing} />
            </Column>

            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_map} />
            </Column>
          </Section>

          <Section id="Delivery--Submission-Description-2" titled="above" background="background darkest" wrapperClassName={"mb-less-2"}>
            <Title>Submission</Title>
            <Column>
              <Heading>
                A digital-age solution <br />
                to the crisis in creativity.
              </Heading>
            </Column>

            <Column>
              <Description>
                <p>Our platform answers LEGO and AKQA&rsquo;s call to bring creativity back to center stage by supporting parents in keeping playtime unique and exciting.</p>
              </Description>
            </Column>
          </Section>

          <Section id="Delivery--Submission-Graphics-2" wrapperClassName="mt-less-2" background="background darkest">
            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_post_activity} />
            </Column>

            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_trophies} />
            </Column>

            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_profile_parent} />
            </Column>

            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_profile_child} />
            </Column>

            <Column>
              <Graphic className="b-rad border-tertiary-none" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_statistics} />
            </Column>
          </Section>
{/* 
          <Section id="Delivery--Features">
            <Column caption="split">
              <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_location} />
              <Heading type="h3" className="weight-reg">
                Fostering growth through <br className="d-lg-none" />
                exploration and adventure
              </Heading>
              <Description className="graphic--caption">
                Search your local area for safe, age-appropriate play spots. Break the mondainity of indoor and backyard play with countless
                suggestions for places to adventure. All with reviews and ratings from other parents, and activities that perfectly suit each
                location.
              </Description>
            </Column>

            <Column caption="split">
              <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_games} />
              <Heading type="h3" className="weight-reg">
                Accessible to parents of <br className="d-lg-none" />
                any timeframe or budget
              </Heading>
              <Description className="graphic--caption">
                Robust filtering tools allow you to browse activities based on cost to play, time required, indoor or outdoor, and the type of
                creative engagement. With a host of activities for any child, and the preferences of any parent.
              </Description>
            </Column>
          </Section> */}


          <Section id="Delivery--Closing" background={KOALAKO_IMGS.banner_closing} />
        </Chapter>

        <Chapter name="Closing" id="Closing">
          <Section id="Closing--Copy" type="columns" titled mainClassName="gap-6 mts-6 mts-xl-4 gap-xl-4">
            <Title>Areas Of Growth</Title>
            <Heading>
              Addressing security concerns, <br className="d-lg-none" /> and improving the first impression
            </Heading>
            <Description className="text-col-2 text-col-md-1 gap-6 gap-xl-4">
              <p>
                During testing, some users voiced concerns about personal information being saved in the app. Which, later tests proved we had solved
                by making child profile setup optional. These concerns could be further addressed by making the initial account setup optional as
                well. Currently, we require an email and password to store user data to an account. But, if we save data locally to the user&rsquo;s
                device, an account wouldn&rsquo;t be needed. Going forward, this ability to skip account setup will be an important addition. Creating
                lower friction by not requiring sign-up, and giving privacy concerned users greater flexibility.
                <span style={{ marginBottom: "8rem" }}></span>
              </p>

              <p>
                Furthermore, the initial login page is a first-impression that can be better utilized to hook user attention. Prefacing the login
                screen, I plan to add a series of captioned graphics to convey the service&rsquo;s value. This would be a more effective start to the
                experience, as it captures user attention, pushing them through the friction of getting started.
              </p>
            </Description>

            <Column>
              <Title>Successes</Title>
              <Heading>Answering LEGO & AQKA&rsquo;s call, and the strength of our collaboration</Heading>
              <Description>
                <p>
                  Our project was tailor-fitted to the challenge of recentering user attention on the importance of play. Throughout development, our
                  team kept this goal as close to our project as possible. Maintaining an unwavering willingness to pivot, and cut features when the
                  target outcome wasn&rsquo;t being met. Further contributing to this success was my team&rsquo;s synergy and passion for the topic.
                  Developed through a mutual intrinsic interest in the topic, strong communication, and organization. Leading to a project well-suited
                  for this challenge, that would be a genuinely helpful tool in practice.
                </p>
              </Description>
            </Column>

            <Column>
              <Title>Learning</Title>
              <Heading>Prioritizing demographic during user testing</Heading>
              <Description>
                <p>
                  Deadline and timing restraints meant that, despite our efforts, we could only involve one parent in our testing groups. Despite
                  this, the parent present offered an incredible amount of valuable comments and suggestions. Enough to greatly elevate our project
                  past what we could have learned using secondary research, without their help. Working around this restriction reminded me of the
                  importance of testing with a relevant demographic. To account for this in the future, I plan to place a greater priority on finding
                  relevant testers as early as possible. Beginning the search as soon as a demographic has been defined, and reaching out on a wider
                  array of platforms.
                </p>
              </Description>
            </Column>
          </Section>
        </Chapter>
      </CaseStudyPage>
    </>
  );
}

export default KoalaKo;
