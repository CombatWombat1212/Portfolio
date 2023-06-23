import { processGallery } from "@/scripts/processGallery";
import { v4 as uuidv4 } from "uuid";
import { HOME_IMGS } from "./HOME_IMGS";
import Nobr from "@/components/utilities/Nobr";

const CASE_STUDIES = caseStudiesInit([
  {
    name: "MakeRight",
    id: "Makeright",
    type: "study",
    // subtitle: {
    //   string: "Translating The Benefits of 3D Printing to Everyday Consumers",
    //   jsx: (
    //     <>
    //       Translating The Benefits of 3D Printing
    //       <br className="d-xxl-none" /> to Everyday Consumers
    //     </>
    //   ),
    // },
    subtitle: {
      string: "Removing the Barriers of 3D Printing for Everyday Consumers",
      jsx: (
        <>
          Removing the Barriers of 3D Printing
          <br className="d-xxl-none" /> for Everyday Consumers
        </>
      ),
    },
    tags: ["Thesis", "UX/UI Design", "User Research"],

    brief: {
      // description:
      //   "For my undergraduate capstone, I created a service that directly connects owners of 3D printers to customers in need.  Based on a gig-economy model, like Uber or DoorDash, this service enables access to 3D printing without the barriers of cost, and know-how.",
      description:
        "For my undergraduate capstone, I created a service that directly connects owners of 3D printers to customers in need.  Based on a gig-economy model, this service enables access to 3D printing without the barriers of cost, and know-how.",
      tools: ["Adobe XD / Figma", "Illustrator", "Mural", "HTML/CSS/JS", "After Effects", "InDesign"],
      deliverables: [
        {
          string: "Hi-fidelity prototypes, of 2 user flows",
          jsx: (
            <>
              Hi-fidelity prototypes, <br className=" d-md-block d-xl-none d-block" /> of 2 user flows
            </>
          ),
        },
        "30+ Unique screens",
      ],
      timeline: "6 Months",
      roles: ["UX/UI Designer", "UX Researcher", "Frontend Dev", "Graphic Design"],
    },

    imgs: {
      main: HOME_IMGS.makeright_main,
      alt: HOME_IMGS.makeright_alt,
    },

    link: "/Studies/MakeRight",
  },
  {
    name: "Made Clothing Co.",
    id: "Made",
    type: "study",
    subtitle: {
      string: "Product Rendering for a Toronto-Based Men’s Fashion Brand",
      jsx: (
        <>
          Product Rendering for a Toronto-Based
          <br className="d-xxl-none" /> Men’s Fashion Brand
        </>
      ),
    },

    tags: ["Client", "3D Design", "Product Rendering"],

    brief: {
      description:
        "MADE Clothing Co. reached out to me to work together in creating a dress shirt customization tool for their webstore.  With the software already built, they needed an artist to create realistic renderings of their shirt components, and fabrics.",
      tools: ["Blender 3D", "Photoshop", "Python"],
      deliverables: ["10 object models", "50+ custom textures", "600+ unique images"],

      timeline: {
        string: "3 active months of a 6 month partnership",
        jsx: (
          <>
            3 active months <br className="d-block d-sm-none" />
            of a 6 month partnership
          </>
        ),
      },
      roles: ["3D Designer / Generalist"],
    },

    imgs: {
      main: HOME_IMGS.made_main,
    },

    link: "/Studies/MADE",
  },
  {
    name: "KoalaKo",
    id: "Koalako",
    type: "study",
    // subtitle: {
    //   string: "Supporting Parents in Fostering Adolescent Creative Development",
    //   jsx: (
    //     <>
    //       Supporting Parents in Fostering
    //       <br className="d-lg-none" /> Adolescent Creative Development
    //     </>
    //   ),
    // },
    subtitle: {
      string: "Supporting Parents in Fostering Creative Development",
      jsx: (
        <>
          Supporting Parents in Fostering
          <br className="d-lg-none" /> Creative Development
        </>
      ),
    },
    tags: ["UX/UI Design", "User Research", "Team Project"],

    brief: {
      description:
        "Creative development thrives when kids can experience a range of mediums for self-expression.  We provide parents with a curated feed of unique activities, and locations for play.",
      tools: ["Adobe XD / Figma", "Mural", "InDesign"],
      deliverables: ["Interactive prototype", "Video presentation & pitch"],
      timeline: "9 Weeks",
    },

    imgs: {
      main: HOME_IMGS.koalako_main,
    },

    link: "/Studies/KoalaKo",
  },
  {
    name: "Explorations",
    id: "Explorations",
    type: "gallery",
    subtitle: {
      string: "Undeserving of a case study, but well-deserving of your attention",
      jsx: (
        <>
          Undeserving of a case study,
          <br className="d-lg-none" /> but well-deserving of your attention
        </>
      ),
      nextStudyJsx: (
        <>
          Undeserving of a case study, <Nobr>but well-deserving</Nobr> of your attention
        </>
      ),
    },
    imgs: {
      main: HOME_IMGS.explorations_main,
      alt: HOME_IMGS.explorations_alt,
    },
    link: "/Explorations",
  },
]);

function addKey(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = { name: arr[i], key: uuidv4() };
  }
  return arr;
}

function caseStudiesInit(arr) {
  if (!Array.isArray(arr)) arr = [arr];

  arr.forEach((item) => {
    item.key = uuidv4();
    if (item.tags) item.tags = addKey(item.tags);
    if (!item.brief) return;
    var brief = item.brief;
    if (brief.tools) brief.tools = addKey(brief.tools);
    if (brief.deliverables) brief.deliverables = addKey(brief.deliverables);
    if (brief.roles) brief.roles = addKey(brief.roles);
    if (brief.disciplines) brief.disciplines = addKey(brief.disciplines);
  });

  return arr;
}

const STUDY_LINKS = CASE_STUDIES.map((study) => study.link);
const STUDY_MAKERIGHT = CASE_STUDIES[0];
const STUDY_MADE = CASE_STUDIES[1];
const STUDY_KOALAKO = CASE_STUDIES[2];
const STUDY_EXPLORATIONS = processGallery(CASE_STUDIES[3]);

export default CASE_STUDIES;
export { STUDY_MAKERIGHT, STUDY_MADE, STUDY_KOALAKO, STUDY_EXPLORATIONS };
export { STUDY_LINKS };
export { caseStudiesInit, addKey };
