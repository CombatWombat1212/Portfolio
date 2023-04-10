import Section, { Chapter, Column, Description, Graphic, Heading, Title } from "@/components/sections/Sections";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { ABOUT_IMGS } from "@/data/ABOUT_IMGS";
import { STUDY_EXPLORATIONS } from "@/data/CASE_STUDIES";
import MAKERIGHT_IMGS from "@/data/MAKERIGHT_IMGS";

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
    position: "UX Engineer",
    // TODO: rewrite this
    description:
      "Graduated with Honours. Explored design, tech, and countless creative mediums, all with a user-centric focus. Built skills in empathy, ideation, and crafting digital and physical experiences. Practiced 2D/3D design, programming, and creative problem-solving.",
  },
  {
    title: "Virtual Pangea",
    timeframe: "Oct. 2021 - Sep. 2022",
    position: "UX Engineer",
    description: "Worked closely with both design and dev teams.  Leveraged UX knowledge to build and elevate web experiences.",
  },
  {
    title: "MADE Clothing Co.",
    timeframe: "Jul. 2020 - Jan 2021",
    position: "CGI Product Design / Rendering",
    description: "3D clothing product rendering for online dress-shirt customization utility, and for storefront previews.",
  },
  {
    title: "Prepr",
    timeframe: "May. 2020 - Sep. 2020",
    position: "UX Designer / UI Designer",
    description: "UX designer, and multidisciplinary designer.  Crafting user experiences, and marketing material.",
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
              <br />
              [Dr. Seuss Reference]
            </Heading>
          </Column>
          <Column>
            <Graphic img={ABOUT_IMGS.me} />
          </Column>
        </Section>

        <Section id="Intro--Focus" type="passthrough">
          <div className="focus">
            <div className="focus--head">
              <Heading type="h3">My Current Focus</Heading>
              <Title caps={false} innerClassName="color--primary">
                Began August 15th, 2021
              </Title>
            </div>

            <div className="focus--card">
              <Heading type="h5" className="focus--subtitle">
                Creating This Portfolio Site
              </Heading>
              <Description className="focus--description">
                <p>
                  This site's intermittent development began in 2021. All graphics, content, and code was made by me. This site is a labor of love.
                </p>
              </Description>
            </div>
          </div>
        </Section>

        <Section id="Intro--Toolbelt" type="passthrough">
          <div className="toolbelt">
            <Heading className="color--secondary">I Put the 'Discipline' in 'Multidisciplinary'</Heading>

            <div className="toolbelt--inner">
              {MULTIDISCIPLINARY.map(({ name, items }, index) => (
                <>
                  {index > 0 && <div className="toolbelt--divider"></div>}
                  <div className="toolbelt--section" key={name}>
                    <Heading type="h3" className="weight-reg toolbelt--title col-4">
                      {name}
                    </Heading>

                    <div className="toolbelt--body col-8">
                      <ul className="toolbelt--list">
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </Section>
      </Chapter>
    </div>
  );
}

export default About;
