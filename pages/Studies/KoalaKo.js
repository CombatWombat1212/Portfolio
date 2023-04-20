import { getStudy } from "@/scripts/GetStudy";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import Gantt from "@/components/charts/Gantt";
import { KOALAKO_IMGS } from "@/data/KOALAKO_IMGS";
import ICONS from "@/data/ICONS";
import { MADE_IMGS } from "@/data/MADE_IMGS";
import { STUDY_KOALAKO } from "@/data/CASE_STUDIES";
import { Fragment, useEffect } from "react";
import Findings from "@/components/global/Findings";
import Method from "@/components/global/Method";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";

function KoalaKo({ pop }) {
  const study = STUDY_KOALAKO;

  const { desktop, isBpAndDown, isBp, loading } = useResponsive();

  const isntMd = !isBp("md") || loading;

  return (
    <CaseStudyPage id={study.id} study={study}>
      <Chapter id="Overview" name="Overview">
        <Section id="Overview--Team" type="columns" titled mainClassName="mt-1 gap-5">
          <Title>The Team</Title>
          <Column>
            <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" />
            <Heading type="h3" className="text-align-center graphic--caption">
              Me
            </Heading>
            <Description className="text-align-center mt-1">
              <p>
                UX/UI Design <br />
                Research <br />
                Project Lead
              </p>
            </Description>
          </Column>
          <Column>
            <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" />
            <Heading type="h3" className="text-align-center graphic--caption">
              Jianing Li
            </Heading>
            <Description className="text-align-center mt-1">
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
            <Description className="text-align-center mt-1">
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
            <Description className="text-align-center mt-1">
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
            &ldquo;Creativity is in crisis&rdquo;
            <br className="d-none d-xl-block d-lg-none d-sm-block" /> - LEGO & AKQA
          </Heading>
          <Description>
            <p>
              International design agency AKQA hosts an annual innovation competition called &lsquo;Future Lions&rsquo;. Partnering with LEGO in 2021,
              their challenge targeted the growing problem of play being seen as a &lsquo;nice to have.&rsquo; Rather than a critical part of a
              child&rsquo;s development.
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
            <Heading type={`${desktop ? "h3" : "h5"}`} className={`mt-1 ${desktop ? "weight-reg" : ""}`}>
              “No open social platforms. ” - LEGO & AKQA
            </Heading>
            <p className="mt-1">
              Child-focused social media raises many security concerns.
              <br className="d-block d-sm-none" /> As well, children already spend countless hours a day on existing platforms.
            </p>
            <Heading type={`${desktop ? "h3" : "h5"}`} className={`mt-3 ${desktop ? "weight-reg" : ""}`}>
              Bring play back into the real world
            </Heading>
            <p className="mt-1">Emphasize physical, explorative play</p>
          </Description>

          <Graphic type="mask" img={KOALAKO_IMGS.background_kids} />
        </Section>

        <Section id="Overview--Opporunity">
          <Title>Opportunity</Title>
          <Heading>
            How might my team encourage explorative play <br className="d-block d-lg-none" />
            while following these considerations?
          </Heading>
        </Section>

        <Section id="Overview--Client" type="columns" titled>
          <Title>Solution</Title>
          <Heading>
            KoalaKo, the smart activity database, <br className="d-block d-md-none" />
            built to help parents help kids
          </Heading>

          <Column>
            <Description className={"text-col-2 text-col-lg-1 gap-3 gap-xl-4 mt-3"}>
              <p>
                This tool offers parents a curated stream of activities for kids of all ages and interests. Thereby easing the parental strain of
                regularly having to invent new games and types of play.
              </p>
              <p>
                It also helps parents foster creative development by encouraging a wide breadth of exploration. Activities range from social to
                independent, mental to physical, and everything in-between.
              </p>
            </Description>
            <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.banner_intro} />
          </Column>
        </Section>

        <Section id="Overview--Privacy" type="columns" background="tertiary">
          <Column className="solution--copy">
            <Graphic type="mask" img={KOALAKO_IMGS.solution_personal_info} />
            <Heading>
              No personal information <br className="d-block d-sm-none" />
              about the child
            </Heading>
            <Description>
              <p>
                Choosing to input your child&rsquo;s age enables KoalaKo&rsquo;s creative development support. Parents can then log a child&rsquo;s
                play experiences to receive smart suggestions based on the types of creativity your child is lacking.
              </p>
              <p>
                Without this enabled, the app still functions as a browsable activity database. Maintaining its value of being a helping hand to
                parents who need new ways to keep their children engaged.
              </p>
            </Description>
          </Column>

          <Column className="solution--graphics">
            <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_setup} lightbox pop={pop} />
            <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_skip_signup} lightbox pop={pop} />
          </Column>
        </Section>

        <Section id="Overview--Wordly" type="columns" background="tertiary">
          <Column className="solution--graphics">
            <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_location} lightbox pop={pop} />
            <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_map_item} lightbox pop={pop} />
          </Column>
          <Column className="solution--copy">
            <Graphic type="mask" img={KOALAKO_IMGS.solution_worldly_creativity} />
            <Heading>Encourages worldly creativity by providing safe nearby spots to explore</Heading>
            <Description>
              <p>
                Parents can browse locations that match their desired activity, or activities that match a desired location. Refine these searches
                with filters for cost, distance from home, and other important factors.
              </p>
              <p>This allows KoalaKo to fit any parent&rsquo;s needs. While still encouraging adventures outside the living room when possible. </p>
            </Description>
          </Column>
        </Section>

        <Section id="Overview--Banner" background={KOALAKO_IMGS.banner_building}>
          <Heading>Building KoalaKo</Heading>
        </Section>
      </Chapter>

      <Chapter name="Plan" id="Plan" wrapperClassName="pb-section-gap">
        <Section id="Plan--Gantt" className="flex-col">
          <Title>Project Plan</Title>
          <Heading>
            Roadmapping research exercises, deadlines, <br />
            and team expectations
          </Heading>
          <Gantt study="KoalaKo" className="mt-3" />
          <Description className="text-col-2 text-col-lg-1 gap-3 gap-xl-4 mt-4">
            <p>
              Our focus when designing this project plan was to ensure enough time to research our topic before developing ideas. From there we would
              distill concepts into those that were most promising.
            </p>
            <p>
              Before creating a rough prototype, to test and gather feedback from potential users. Repeating this process in cycles while addressing
              feedback, and refining our solution.
            </p>
          </Description>
        </Section>
      </Chapter>

      <Chapter name="Research" id="Research">
        <Section id="Research--Intro" type="columns" titled="above" background="background darker" mainClassName="gap-4 gap-md-2">
          <Title>Secondary Research</Title>
          <Column>
            <Heading>We began with secondary research, to gain footing within our topic</Heading>
          </Column>
          <Column>
            <Description className="">
              <p>
                The findings shown are those most relevant to the final project, not the entire scope of research. The full list of sources can be
                found at the end of the study.
              </p>
            </Description>
          </Column>
        </Section>

        <Section id="Research--Findings" type="columns" titled background="background darker" mainType="flex" mainClassName="mt-4">
          <Title>Findings</Title>
          <Heading>
            In exploring “creative play and development,” <br className="d-block d-lg-none" />
            we discovered the importance of play-style breadth
          </Heading>
          <Column>
            <Findings>
              <div type="main">
                <Heading type={"h3"}>Unique play experiences directly encourage different types of critical development.</Heading>
              </div>

              <div type="dropdown">
                <p>“Be sure to offer children a wide range of creative materials and experiences...”</p>
                <p>“...The more varied experiences children have in their lives, the wider the range of creative expression.”</p>
                <p className="test">“Play fosters mental development and new ways of thinking and problem solving...”</p>
                <h4>Creativity and Play: Fostering Creativity (PBS)</h4>
              </div>
            </Findings>
          </Column>
          <Column>
            <Findings>
              <div type="main">
                <Heading type={"h3"}>
                  Parents can further this development, and grow their child&rsquo;s skills by encouraging new types of play.
                </Heading>
              </div>
              <div type="dropdown">
                <p>
                  “Ask [them] to paint, draw, or tell a story, about how they&rsquo;re feeling. [activities like these help your child to] learn how
                  to express their feelings safely and creatively, allowing them to integrate into social settings and regulate their behavior more
                  appropriately.”
                </p>
                <h4>The Importance of Creative Play for Kids (The Little Gym)</h4>
              </div>
            </Findings>
          </Column>
        </Section>

        <Section id="Research--Summary">
          <Heading>
            With these findings in mind, we began searching <br className="d-block d-lg-none" />
            for solutions that might encourage explorative play.
          </Heading>
        </Section>
      </Chapter>

      <Chapter name="Develop" id="Develop">
        <Section id="Develop--Methods" mainType="grid" type="columns" background="background darker" titled line="method">
          <Column>
            <Method>
              <Title>Excersize 1 - Brainstorming</Title>
              <Heading type={`h3`}>Brainstorming the core of our solution</Heading>
              <p>
                Our team began with brainstorming to develop a range of potential solutions. We narrowed our ideas down into a combination of 2
                promising concepts deemed stronger than the sum of their parts.
              </p>
              <Graphic type="mask" img={KOALAKO_IMGS.exercise_brainstorming} />
            </Method>
          </Column>
          <Column>
            <Method>
              <Title>Exercise 2 - Crazy 8s</Title>
              <Heading type={`h3`}>Exploring execution through sketches</Heading>
              <p>
                Next we used the exercise &lsquo;Crazy 8s&rsquo; to consider the UX of our solution. Is it a physical location? An app? Through what
                interaction do user&rsquo;s receive the intended value? We combined our concepts into a rough framework of the service and its
                functionality.
              </p>
              <Graphic type="mask" img={KOALAKO_IMGS.exercise_crazy_8s} />
            </Method>
          </Column>
          <Column>
            <Method>
              <Title>Exercise 3 - Importance Vs. Difficulty Matrix</Title>
              <Heading type={`h3`}>Honing functionality by removing superfluous features</Heading>
              <p>
                To refine the focus of our solution, we used an &lsquo;Importance to User vs. Difficulty to Implement&rsquo; chart. Here we cut any
                features that didn&rsquo;t directly support our goal of helping parents encourage creativity. Leaving a tight, cohesive feature-set.
              </p>
              <Graphic type="mask" img={KOALAKO_IMGS.exercise_importance} />
            </Method>
          </Column>
          <Column>
            <Method>
              <Title className="title">Exercise 4 - Experience Roadmap</Title>
              <Heading type={`h3`}>Solidifying scope with an Experience Based Roadmap</Heading>
              <p>
                Using an experience-based roadmap we plotted 3 project delivery tiers from bare functionality to final service. To fit our tight
                timeline, we defined the target scope and featureset of our submission to be our service&rsquo;s &lsquo;minimum viable product&rsquo;.
              </p>
              <Graphic type="mask" img={KOALAKO_IMGS.exercise_roadmap} />
            </Method>
          </Column>
        </Section>
      </Chapter>

      <Chapter name="Prototyping" id="Prototyping">
        <Section id="Prototyping--LowFi" titled type="columns">
          <Title>Low-Fi Prototypes</Title>
          <Heading>Creating low-fi prototypes for user testing</Heading>

          <Column caption="above">
            <Heading type="p" className="graphic--caption__above color--tertiary" sameHeight="lowfi_prototype_heading">
              <b>Onboarding</b>
            </Heading>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_onboarding} />
          </Column>

          <Column caption="above">
            <Heading type="p" className="graphic--caption__above color--tertiary" sameHeight="lowfi_prototype_heading">
              <b>Homepage</b>
            </Heading>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_homepage} />
          </Column>

          <Column caption="above">
            <Heading type="p" className="graphic--caption__above color--tertiary" sameHeight="lowfi_prototype_heading">
              <b>Activities</b>
            </Heading>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_activities} />
          </Column>

          <Column caption="above">
            <Heading type="p" className="graphic--caption__above color--tertiary" sameHeight="lowfi_prototype_heading">
              <b>Location Browse</b>
            </Heading>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_map} />
          </Column>

          <Column caption="above">
            <Heading type="p" className="graphic--caption__above color--tertiary" sameHeight="lowfi_prototype_heading">
              <b>Statistics</b>
            </Heading>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototype_low_statistics} />
          </Column>

          <Description className="text-col-2 text-gap-4" below>
            <p>
              At this stage, my team defined the &lsquo;KoalaKo&rsquo; identity. Chosen as it denotes a certain lighthearted curiosity or playfulness
              that we hoped to embody. Like that of a growing koala joey.
            </p>
            <p>
              We also cemented our choice to develop from a mobile-first perspective. This offers users the flexibility to access the service at any
              time, from wherever play might occur.
            </p>
          </Description>
        </Section>

        <Section id="Prototyping--Testing" type="columns" background="background darker" mainClassName="mt-4">
          <Title>Testing</Title>
          <Heading>Gauging reception and feedback from users</Heading>

          <Column>
            <Title>Methodology</Title>
            <Heading type="h3" className="">
              &lsquo;Popcorn&rsquo; feedback, <br />
              and prepared questions
            </Heading>
            <Description>
              <p>
                We began with &lsquo;popcorn feedback&rsquo; to get a general sense of users&rsquo; immediate pain points and impressions. Once we led
                testers through each screen, I asked prepared questions to drill deeper into their thoughts and feelings.
              </p>
              <p>
                We tested with 4 classmates, unfamiliar with our project. We would&rsquo;ve liked to test entirely with parents, or even parents-child
                pairs. However, navigating the ethics of testing with children, and/or finding parents available to test, didn&rsquo;t fit our
                timeline.
              </p>
            </Description>
          </Column>

          <Column>
            <Title>Findings / Suggestions</Title>
            <Description className="mt-1">
              <p className="paragraph__background">
                With this feedback, we cemented the decision to keep the service parent-centered. In doing so we cut the few planned features intended
                to be used by kids. This refocused our team back on our original goals, and helped us avoid the pitfall of creating yet another reason
                for children to use screens.
              </p>
              <p className="paragraph__background">
                Make the location features work in two directions: Be able to browse both locations that match a desired activity, and activities that
                match a desired location.
              </p>
              <p className="paragraph__background">Try your best to receive feedback from actual parents.</p>
            </Description>
          </Column>
        </Section>

        <Section id="Prototyping--Testing" type="columns" background="background darker">
          <Title>Implimentation Plan</Title>
          <Heading>Noting suggestions, and refocusing our goals</Heading>

          <Column>
            <Description>
              <p>
                With this feedback, we cemented the decision to keep the service parent-centered. In doing so we cut the few planned features intended
                to be used by kids. This refocused our team back on our original goals, and helped us avoid the pitfall of creating yet another reason
                for children to use screens.
              </p>
            </Description>
          </Column>

          <Column>
            <Description>
              <p>
                Aside from this, we committed to making the suggested location feature a key part of the service&rsquo;s functionality. We had also
                made a point to gather feedback from parent users during the coming phases, to better understand our demographic&rsquo;s feelings
                towards solution.
              </p>
            </Description>
          </Column>
        </Section>

        <Section id="Prototyping--HiFi" type="columns">
          <Title>Hi-Fi Prototypes</Title>
          <Heading>KoalaKo&rsquo;s first hi-fi interactive prototype</Heading>

          <Column className="col-8" caption="above">
            <Heading type="p" className="graphic--caption__above color--tertiary">
              <b>Userflow Map</b>
            </Heading>
            <Graphic type="image" background="background darker" img={KOALAKO_IMGS.prototypes_userflow_map} />
          </Column>

          <Column className="col-2" caption="above">
            <Heading type="p" className="graphic--caption__above color--tertiary">
              <b>Onboarding</b>
            </Heading>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototypes_userflow_splash_screen} />
          </Column>

          <Column className="col-2" caption="above">
            <Heading type="p" className="graphic--caption__above color--tertiary">
              <b>Play Statistics</b>
            </Heading>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.prototypes_userflow_statistics} />
          </Column>
        </Section>

        <Section
          id="Prototyping--Features"
          type="columns"
          background="tertiary"
          mainType="grid"
          mainClassName="gap-6 mt-4"
          wrapperClassName="mb-less">
          <Heading>Features added at this stage include:</Heading>

          <Column>
            <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_child_profiles} />
            <Heading type="h3" className="graphic--caption mt-more">
              Optional child profiles
            </Heading>
            <Description className="mt-1">
              <p>
                Parents with privacy concerns can choose not to provide their child&rsquo;s age, disabling smart features. Allowing these users to
                still use KoalaKo as an activity database; widening it&rsquo;s reach, rather than turning these users away.
              </p>
            </Description>
          </Column>
          <Column>
            <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_selecting_interests} />
            <Heading type="h3" className="graphic--caption mt-more">
              Selecting interests
            </Heading>
            <Description className="mt-1">
              <p>
                Select a handful of your kid&rsquo;s favorite activities to receive suggestions based on their interests; helping parents to support
                their child&rsquo;s passions.
              </p>
            </Description>
          </Column>
          <Column>
            <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_statistics_page} />
            <Heading type="h3" className="graphic--caption mt-more">
              Refined statistics page
            </Heading>
            <Description className="mt-1">
              <p>
                Helpful, dynamic infographics with adjustable timeframes that explore your child&rsquo;s play-types, and any experiences they&rsquo;re
                yet to try. With a goal-setting system to encourage regular playtime.
              </p>
            </Description>
          </Column>

          <Column className="col-4">
            <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_community_feedback} sameHeight="features_last" />
            <Heading type="h3" className="graphic--caption mt-more">
              Community feedback
            </Heading>
            <Description className="mt-1">
              <p>
                User rating and feedback system for activities, to provide more accurate recommendations and bring poor activities to the attention of
                platform moderators.
              </p>
            </Description>
          </Column>
          <Column className="col-8">
            <Graphic className="b-rad" lightbox pop={pop} type="image" img={KOALAKO_IMGS.features_location_browsing} sameHeight="features_last" />
            <Heading type="h3" className="graphic--caption mt-more">
              Location browsing
            </Heading>
            <Description className="mt-1 col-9">
              <p>As suggested by our testers, users can now browse locations that match activities, and activities that match locations.</p>
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
                For this user test, we managed to include one parent in our group of 4 subjects. Scheduling and timeline restrictions prevented us
                from finding more than this, despite our best efforts. However, the feedback provided was invaluable.
              </p>
            </Description>
          </Column>
        </Section>

        <Section id="Prototyping--Methodology" background="background darker" mainClassName="gap-6">
          <Title>Methodology</Title>
          <Heading>User testing our first prototype involved:</Heading>

          <Column>
            <Graphic type="mask" img={KOALAKO_IMGS.testing_usability} background="background" />
            <Heading type="h3" className="graphic--caption mt-more">
              Usability Tasks
            </Heading>
            <Description className="mt-1">
              <p>Users were given tasks such as: locating a particular page, or feature in order to study the service&rsquo;s usability.</p>
            </Description>
          </Column>

          <Column>
            <Graphic type="mask" img={KOALAKO_IMGS.testing_questions} background="background" />
            <Heading type="h3" className="graphic--caption mt-more">
              Pre-written questions
            </Heading>
            <Description className="mt-1">
              <p>After the session was completed, testers were individually asked a set of questions, prepared by our team.</p>
            </Description>
          </Column>

          <Column>
            <Graphic type="mask" img={KOALAKO_IMGS.testing_popcorn} background="background" />
            <Heading type="h3" className="graphic--caption mt-more">
              Popcorn feedback
            </Heading>
            <Description className="mt-1">
              <p>Free-form, unstructured comments were encouraged throughout the test.</p>
            </Description>
          </Column>
        </Section>

        <Section id="Prototyping--Findings" background="background darkest" titled="above" wrapperClassName="mb-less">
          <Title>Findings</Title>
          <Column>
            <Heading>
              Testing revealed a need to reframe certain features,
              <br />
              and other minor changes
            </Heading>
          </Column>
          <Column>
            <Description>
              <p>
                Testers found the app well-assembled, and helpful, while also raising important concerns. With the aid of our parent tester, we
                discovered that certain features were failing to support our goal. In our next iteration, it was imperative to pivot from the
                &lsquo;dead weight&rsquo; features, and polish those that were well-received by testers.
              </p>
            </Description>
          </Column>
        </Section>

        <Section id="Prototyping--Findings-1" background="background darkest" wrapperClassName="mb-less">
          <Column className="col-4">
            <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.findings_stats} />
          </Column>
          <Column className="col-8">
            <Quote className="b-rad" background="background">
              “I think the &lsquo;goal setting&rsquo; feature might make me feel pressured; like if I fail to reach a goal I&rsquo;ve set, then I
              haven&rsquo;t done enough for my child”
              <br />
              <br />- User #1 (Parent)
            </Quote>
            <Quote className="b-rad" background="background">
              &ldquo;Digital achievements may help the activities feel more optional, and less like you must do them to develop your child&rsquo;s
              creativity&rdquo;
              <br />
              <br />- User #3
            </Quote>
          </Column>
        </Section>

        <Section id="Prototyping--Findings-2" background="background darkest">
          <Column className="col-4">
            <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.findings_games} sameHeight="test" />
          </Column>
          <Column className="col-8" sameHeight="test">
            <Quote className="b-rad" background="background">
              &ldquo;It would be great to see a filter for one-on-one activities or team activities, or budget to play the games&rdquo;
              <br />
              <br />- User #2
            </Quote>
          </Column>
        </Section>

        <Section id="Prototyping--Conclusion">
          <Heading>
            We began implementing our fixes, <br />
            and preparing the project for delivery
          </Heading>
        </Section>
      </Chapter>

      <Chapter name="Refine" id="Refine">
        <Section id="Refine--Stats" className="gap-6" background="background darker">
          <Column className="">
            <Heading>Reframing statistics by removing goal-setting</Heading>
            <Description>
              <p>
                We cut the goal-setting feature entirely, as it created a sense of pressure in our parent tester. This changed the page&rsquo;s tone
                from one of enforcing an expectation, to one of watching your child learn and grow.
              </p>
            </Description>
          </Column>
          <Column className="flex-row gap-4">
            <div className="col-6">
              <Graphic type="image" className="b-rad border-tertiary" img={KOALAKO_IMGS.refine_stats_before} lightbox pop={pop} />
              <Title className="mt-1">Before</Title>
            </div>
            <div className="col-6">
              <Graphic type="image" className="b-rad border-tertiary" img={KOALAKO_IMGS.refine_stats_after} lightbox pop={pop} />
              <Title className="mt-1">After</Title>
            </div>
          </Column>
        </Section>

        <Section id="Refine--Trophies" className="gap-6" background="background darker">
          <Column>
            <Heading>Further reframing with unlockable trophies</Heading>
            <Description>
              <p>
                Trophies are awarded liberally; giving parents instant gratification for reaching various creative play milestones with their child.
                Making the act of reaching goals a proud achievement, rather than something expected of the parents.
              </p>
              <p>
                Our parent user tester was thrilled to see their concerns addressed, stating that it was, “my only worry with using the service. This
                could be a very useful tool for parents.”
              </p>
            </Description>
          </Column>
          <Column className="flex-row gap-4">
            <Graphic type="image" className="b-rad border-tertiary" img={KOALAKO_IMGS.refine_trophies_location} lightbox pop={pop} />
            <Graphic type="image" className="b-rad border-tertiary" img={KOALAKO_IMGS.refine_trophies_page} lightbox pop={pop} />
          </Column>
        </Section>

        <Section id="Refine--Trophies" className="gap-6" background="background darker">
          <Column className="">
            <Heading>
              Many minor UX updates,
              <br />
              Ex. Post-activity screen
            </Heading>
            <Description>
              <p>
                Sharing feedback with “Begin survey” used to be the primary option for users, second to the vague option of “Next.” Flawed in that
                most users will prefer to move on, than share feedback.
              </p>
              <p>
                Now, users are greeted with a celebratory graphic, a clear primary option to exit with &lsquo;Done,&rsquo; and an appropriately
                secondary option to “share feedback.”
              </p>
            </Description>
          </Column>
          <Column className="flex-row gap-4">
            <div className="col-6">
              <Graphic type="image" className="b-rad border-tertiary" img={KOALAKO_IMGS.refine_post_activity_before} lightbox pop={pop} />
              <Title className="mt-1">Before</Title>
            </div>
            <div className="col-6">
              <Graphic type="image" className="b-rad border-tertiary" img={KOALAKO_IMGS.refine_post_activity_after} lightbox pop={pop} />
              <Title className="mt-1">After</Title>
            </div>
          </Column>
        </Section>
      </Chapter>

      <Chapter name="Deliver" id="Deliver">
        <Section id="Deliver--Banner" background={KOALAKO_IMGS.banner_delivery}>
          <Heading>Final Submission</Heading>
        </Section>

        <Section id="Deliver--Submission-Description-1" titled="above">
          <Title>Submission</Title>
          <Column>
            <Heading>
              KoalaKo: helping parents <br />
              help kids grow.
            </Heading>
          </Column>

          <Column>
            <Description>
              <p>
                A smart, accessible tool that provides parents with a curated stream of fun, engaging activities for their kids. Games that fit any
                parent&rsquo;s needs, and any child&rsquo;s interests.
              </p>
              <p>Easing the parental strain of constantly inventing varied play experiences that foster critical development.</p>
              <p>Built for parents of children ages 4-11.</p>
            </Description>
          </Column>
        </Section>

        <Section id="Deliver--Submission-Graphics-1" wrapperClassName="mt-less">
          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_login} />
          </Column>

          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_interests} />
          </Column>

          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_activities} />
          </Column>

          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_game_listing} />
          </Column>

          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_map} />
          </Column>
        </Section>

        <Section id="Deliver--Submission-Description-2" titled="above">
          <Title>Submission</Title>
          <Column>
            <Heading>
              A digital-age solution <br />
              to the crisis in creativity.
            </Heading>
          </Column>

          <Column>
            <Description>
              <p>KoalaKo answers LEGO & AKQA&rsquo;s call to bring creativity back into the forefront of adolescence.</p>
              <p>Achieving this by making it easier for parents to keep their kids engaged, entertained, and constantly growing.</p>
            </Description>
          </Column>
        </Section>

        <Section id="Deliver--Submission-Graphics-2" wrapperClassName="mt-less">
          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_post_activity} />
          </Column>

          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_trophies} />
          </Column>

          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_profile_parent} />
          </Column>

          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_profile_child} />
          </Column>

          <Column>
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_statistics} />
          </Column>
        </Section>

        <Section id="Deliver--Features">
          <Column caption="split">
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_location} />
            <Heading type="h3" className="weight-reg">
              Fostering growth through <br />
              exploration and adventure
            </Heading>
            <Description className="graphic--caption">
              Search your local area for safe, age-appropriate play spots. Break the mondainity of indoor and backyard play with countless suggestions
              for places to adventure. All with reviews and ratings from other parents, and activities that perfectly suit each location.
            </Description>
          </Column>

          <Column caption="split">
            <Graphic className="b-rad border-tertiary" lightbox pop={pop} type="image" img={KOALAKO_IMGS.delivery_games} />
            <Heading type="h3" className="weight-reg">
              Accessible to parents of <br />
              any timeframe or budget
            </Heading>
            <Description className="graphic--caption">
              Robust filtering tools allow you to browse activities based on cost to play, time required, indoor or outdoor, and the type of creative
              engagement. With a host of activities for any child, and the preferences of any parent.
            </Description>
          </Column>
        </Section>

        <Section id="Deliver--Closing" background={KOALAKO_IMGS.banner_closing} />
      </Chapter>

      <Chapter name="Closing" id="Closing">
        <Section id="Closing--Copy" type="columns" titled mainClassName="gap-6 mt-6">
          <Title>Areas Of Growth</Title>
          <Heading>
            Addressing security concerns, <br /> and improving the first impression
          </Heading>
          <Description className="text-col-2 text-gap-6">
            <p>
              During testing, some users voiced concerns about personal information being saved in the app. Which, later tests proved we had solved by
              making child profile setup optional. These concerns could be further addressed by making the initial account setup optional as well.
              Currently, we require an email and password to store user data to an account. But, if we save data locally to the user&rsquo;s device,
              an account wouldn&rsquo;t be needed. Going forward, this ability to skip account setup will be an important addition. Creating lower
              friction by not requiring sign-up, and giving privacy concerned users greater flexibility.
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
                Deadline and timing restraints meant that, despite our efforts, we could only involve one parent in our testing groups. Despite this,
                the parent present offered an incredible amount of valuable comments and suggestions. Enough to greatly elevate our project past what
                we could have learned using secondary research, without their help. Working around this restriction reminded me of the importance of
                testing with a relevant demographic. To account for this in the future, I plan to place a greater priority on finding relevant testers
                as early as possible. Beginning the search as soon as a demographic has been defined, and reaching out on a wider array of platforms.
              </p>
            </Description>
          </Column>
        </Section>
      </Chapter>
    </CaseStudyPage>
  );
}

export default KoalaKo;
