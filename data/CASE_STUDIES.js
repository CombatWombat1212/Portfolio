import {processGallery} from "@/scripts/processGallery";
import { v4 as uuidv4 } from "uuid";

var CASE_STUDIES = [
  {
    name: "MakeRight",
    id: "Makeright",
    type: "study",
    subtitle: {
      string: "Translating The Benefits of 3D Printing to Everyday Consumers",
      jsx: (
        <>
          Translating The Benefits of 3D Printing<br></br>to Everyday Consumers
        </>
      ),
    },
    tags: ["Thesis", "UX/UI Design", "User Research"],

    brief: {
      description: "For my undergraduate capstone, I created a service that directly connects owners of 3D printers to customers in need.  Based on a gig-economy model, like Uber or DoorDash, this service enables access to 3D printing without the barriers of cost, and know-how.",
      tools: ["Adobe XD / Figma", "Illustrator", "Mural", "HTML/CSS/JS", "After Effects", "InDesign"],
      deliverables: ["Hi-fidelity prototypes, of 2 user flows", "30+ Unique screens"],
      timeline: "6 Months",
      roles: ["UX/UI Designer", "UX Researcher", "Frontend Dev", "Graphic Design"],
    },

    imgs: {
      main: {
        src: "./assets/images/case_study_thumbnails/MakeRight.png",
        alt: "3D printed plastic elephant diving into a cardboard box",
        width: 1038,
        height: 944,
      },

      alt: {
        src: "./assets/images/case_study_thumbnails/MakeRight_Alt.png",
        alt: "3D printed plastic elephant sitting in a cardboard box",
        width: 1038,
        height: 716,
      },
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
          Product Rendering for a Toronto-Based<br></br>Men’s Fashion Brand
        </>
      ),
    },

    tags: ["Client", "3D Design", "Product Rendering"],

    brief: {
      description: "MADE Clothing Co. reached out to me to work together in creating a dress shirt customization tool for their webstore.  With the software already built, they needed an artist to create realistic renderings of their shirt components, and fabrics.",
      tools: ["Blender 3D", "Photoshop", "Python"],
      deliverables: ["10 object models", "50+ custom textures", "600+ unique images"],
      timeline: "3 active months of a 6 month partnership",
      roles: ["3D Designer / Generalist"],
    },

    imgs: {
      main: {
        src: "./assets/images/case_study_thumbnails/MADE.png",
        alt: "3D rendering of a blue dress-shirt",
        width: 526,
        height: 823,
      },

      // alt: {
      //   src: "./assets/images/case_study_thumbnails/MADE.png",
      //   alt: "3D rendering of a blue dress-shirt",
      //   width: 526,
      //   height: 823,
      // },
    },

    link: "/Studies/MADE",
  },
  {
    name: "KoalaKo",
    id: "Koalako",
    type: "study",
    subtitle: {
      string: "Supporting Parents in Fostering Adolescent Creative Development",
      jsx: (
        <>
          Supporting Parents in Fostering<br></br>Adolescent Creative Development
        </>
      ),
    },
    tags: ["UX/UI Design", "User Research", "Team Project"],

    brief: {
      description: "Supporting parents by providing a curated stream of unique, age-appropriate activities, and locations for play.  Easing the strain of fostering creative development by helping to fill gaps in a child’s exploration.",
      tools: ["Adobe XD / Figma", "Mural", "InDesign"],
      deliverables: ["Interactive prototype", "Video presentation & pitch"],
      timeline: "9 Weeks",
    },

    imgs: {
      main: {
        src: "./assets/images/case_study_thumbnails/KoalaKo.png",
        alt: "3D rendering of a phone with an app called 'KoalaKo' open on the screen",
        width: 738,
        height: 842,
      },

      // alt: {
      //   src: "./assets/images/case_study_thumbnails/KoalaKo.png",
      //   alt: "3D rendering of a phone with an app called 'KoalaKo' open on the screen",
      //   width: 738,
      //   height: 842,
      // },
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
          Undeserving of a case study,<br></br>but well-deserving of your attention
        </>
      ),
    },
    imgs: {
      main: {
        src: "./assets/images/case_study_thumbnails/Explorations.png",
        alt: "3D rendering of a worn steel compass",
        width: 730,
        height: 1626,
      },

      alt: {
        src: "./assets/images/case_study_thumbnails/Explorations_Alt.png",
        alt: "3D rendering of a worn steel compass on its side",
        width: 730,
        height: 1626,
      },
    },
    link: "/Explorations",
  },
];

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


CASE_STUDIES = caseStudiesInit(CASE_STUDIES);
const STUDY_MAKERIGHT = CASE_STUDIES[0];
const STUDY_MADE = CASE_STUDIES[1];
const STUDY_KOALAKO = CASE_STUDIES[2];
const STUDY_EXPLORATIONS = processGallery(CASE_STUDIES[3]);




export default CASE_STUDIES;
export { STUDY_MAKERIGHT, STUDY_MADE, STUDY_KOALAKO, STUDY_EXPLORATIONS };
export { caseStudiesInit, addKey };
