import Experience from "@/components/global/Experience";
import WhatIm from "@/components/global/WhatIm";
import Section, { Chapter, Column, Description, Graphic, Heading, Title } from "@/components/sections/Sections";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { ABOUT_IMGS } from "@/data/ABOUT_IMGS";
import { STUDY_EXPLORATIONS } from "@/data/CASE_STUDIES";
import MAKERIGHT_IMGS from "@/data/MAKERIGHT_IMGS";
import { Fragment } from "react";

const MULTIDISCIPLINARY = [
  {
    name: "Disciplines",
    items: [
      "3D / CG Design",
      "Web Development",
      "Physical Computing",
      "UX / UI Design",
      "Photography",
      "Motion Graphics",
      "UX Research",
      "Videography",
      "Print Layout Design",
    ],
  },
  {
    name: "Toolbelt",
    items: ["Blender 3D", "HTML/CSS/JS", "3D Printing", "Adobe XD / Figma", "Ableton Live", "React.js / Next.js", "Adobe Creative Suite"],
  },
];

const EXPERIENCE = [
  {
    title: "Honours Bachelor of Interaction Design",
    timeframe: "Graduated April 2021",
    position: "Sheridan College",
    // TODO: rewrite this
    description: {
      long: "Graduated with Honours.  Learned the fundamentals of user-centric design, and how to become a Swiss Army knife of digital production. I studied a range of subjects, from UX Research, to 3D design, to web development, and countless other disciplines.  All while working with talented and supportive peers.",
      short: "Graduated with Honours, developed skills in user-centric design and all-around digital production.",
      // short: "Graduated with Honours.  I honed skills in user-centric design and all-around digital production; including UX, 3D design, and web development.",
      // short: "Graduated with Honours.  I honed skills in user-centric design and all-around digital production; including UX Research, 3D design, and web development",
    },
    card: "long",
    img: ABOUT_IMGS.experience_sheridan,
  },
  {
    title: "Virtual Pangea",
    timeframe: "Oct. 2021 - Sep. 2022",
    position: "UX Engineer",
    description: "Worked closely with both design and dev teams.  Leveraged UX knowledge to build and elevate web experiences.",
    card: "short",
    img: ABOUT_IMGS.experience_vp,
  },
  {
    title: "MADE Clothing Co.",
    timeframe: "Jul. 2020 - Jan 2021",
    position: "CGI Product Design / Rendering",
    description: "3D clothing product rendering for online dress-shirt customization utility, and for storefront previews.",
    card: "short",
    img: ABOUT_IMGS.experience_made,
  },
  {
    title: "Prepr",
    timeframe: "May. 2020 - Sep. 2020",
    position: "UX Designer / UI Designer",
    description: "UX designer, and multidisciplinary designer.  Crafting user experiences, and marketing material.",
    card: "short",
    img: ABOUT_IMGS.experience_prepr,
  },
];

const WHATIM = [
  {
    category: "What I&rsquo;m Watching",
    items: ["Joe Pera Talks With You", "Regular Show", "Superstore", "Gravity Falls"],
  },
  {
    category: "What I&rsquo;m Doing",
    items: ["Biking", "Meditating", "Finding New Music", "Hangin&rsquo; with friends"],
  },
  {
    category: "What I&rsquo;m Making",
    items: [
      {
        name: "Music",
        link: "https://www.instagram.com/peanut.butter.and.sam/",
      },
      {
        name: "3D renders and graphics",
        link: "https://www.instagram.com/3dsammyg",
      },
      "Editing photos",
    ],
  },
  {
    category: "Who I&rsquo;m Following",
    items: [
      {
        name: "@JPAugurusa",
        link: "https://www.instagram.com/JPAugurusa/",
      },
      {
        name: "@masonthenesbitt",
        link: "https://www.instagram.com/masonthenesbitt/",
      },
      {
        name: "@noahbarnes.design",
        link: "https://www.instagram.com/noahbarnes.design/",
      },
      {
        name: "@elllie.creates",
        link: "https://www.instagram.com/elllie.creates/",
      },
    ],
  },
];

function About() {
  return (
    <div id="About" className="page">
      <Chapter id="Intro" name="Intro">
        <Section id="Intro--Hero" background="background darker">
          <Column className="intro--heading">
            <Heading className="color--secondary">
              I am Sam,
              <br /> [Dr. Seuss Reference]
            </Heading>
          </Column>
          <Column className="column-1 gap-main">
            <Graphic img={ABOUT_IMGS.me} />
          </Column>
        </Section>

        <Section id="Intro--Focus" type="passthrough">
          <div className="myfocus">
            <div className="myfocus--head">
              <Heading type="h3">My Current Focus</Heading>
              <Title caps={false} innerClassName="color--primary">
                Began August 15th, 2021
              </Title>
            </div>

            <div className="myfocus--card">
              <Heading type="h5" className="myfocus--subtitle">
                Creating This Portfolio Site
              </Heading>
              <Description className="myfocus--description">
                <p>Intermittent development started way back in 2021. All graphics, content, and code was made by me. A labor of love.</p>
              </Description>
            </div>
          </div>
        </Section>

        <Section id="Intro--Toolbelt" type="passthrough">
          <div className="toolbelt">
            <Heading className="color--secondary">
              I Put the &lsquo;Discipline&rsquo; <br className="d-none d-md-flex d-sm-none" />
              in &lsquo;Multidisciplinary&rsquo;
            </Heading>

            <div className="toolbelt--inner">
              {MULTIDISCIPLINARY.map(({ name, items }, index) => {
                function Head({ className }) {
                  return (
                    <Heading type="h3" className={`weight-med toolbelt--title col-4 ${className || ""}`}>
                      {name}
                    </Heading>
                  );
                }

                return (
                  <Fragment key={index}>
                    {index > 0 && <div className="toolbelt--divider"></div>}
                    <div className="toolbelt--section" key={name}>
                      <Head className={"d-block d-sm-none"} />

                      <div className="toolbelt--body col-8  col-sm-12 ">
                        <ul className="toolbelt--list">
                          <li className="toolbelt--title d-none d-sm-block">
                            <Head />
                          </li>

                          {items.map((item) => {
                            return <li key={item}>{item}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </Section>

        <Section id="Intro--Experience">
          <Heading className="color--secondary experience--heading">
            And the
            <br className="d-block d-lg-none d-lg-block  d-sm-none" /> &lsquo;Education & Experience&rsquo; <br className="d-none d-lg-block  d-sm-none" />
            in &lsquo;Education & Experience&rsquo;
          </Heading>

          <Experience data={EXPERIENCE} />
        </Section>

        <Section id="Intro--Quote" title="below">
          <Heading type="h2" className="color--secondary weight-reg" italic>
            “Human-centered designs <br className="d-none d-xxl-block d-sm-none"/> from a human-centered human”
          </Heading>
          <Title innerClassName={"color--primary"} caps={false}>
            - Me, on me
          </Title>
        </Section>

        <Section id="Intro--Interests" type="columns" titled mainClassName="mt-2" mainType="grid">
          <Column>
            <Graphic type="mask" background="background darker" img={ABOUT_IMGS.interests_music} />
            <Description className="graphic--caption text--center">
              <h3>
                <b>Obsessive Music Nerd </b>
              </h3>
            </Description>
          </Column>

          <Column>
            <Graphic type="mask" background="background darker" img={ABOUT_IMGS.interests_gaming} />
            <Description className="graphic--caption text--center">
              <h3>
                <b>Casual Gamer</b>
              </h3>
            </Description>
          </Column>

          <Column>
            <Graphic type="mask" background="background darker" img={ABOUT_IMGS.interests_animation} />
            <Description className="graphic--caption text--center">
              <h3>
                <b>Animated Storytelling Fanatic</b>
              </h3>
            </Description>
          </Column>

          <Column>
            <Graphic type="mask" background="background darker" img={ABOUT_IMGS.interests_walks} />
            <Description className="graphic--caption text--center">
              <h3>
                <b>Nature Walker</b>
              </h3>
            </Description>
          </Column>
        </Section>

        <Section id="Intro--WhatIm" background="background darker" type="passthrough">
          <WhatIm data={WHATIM} />
        </Section>

        <Section id="Intro--Closer">
          <Heading type="h2" className="color--secondary weight-reg" italic>
            Let&rsquo;s work together and solve real-world problems
            <br className="d-block d-lg-none" /> with digital-world solutions.
          </Heading>
        </Section>
      </Chapter>
    </div>
  );
}

export default About;
