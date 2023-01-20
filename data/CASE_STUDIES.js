import { v4 as uuidv4 } from "uuid";

var CASE_STUDIES = [
  {
    name: "MakeRight",
    id: "Makeright",
    subtitle: {
      string: "Translating The Benefits of 3D Printing to Everyday Consumers",
      jsx: (
        <>
          Translating The Benefits of 3D Printing<br></br>to Everyday Consumers
        </>
      ),
    },
    tags: ["Thesis", "UX/UI Design", "User Research"],
    tools: ["Adobe XD / Figma", "Illustrator", "Mural", "HTML/CSS/JS", "After Effects", "InDesign"],

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
    subtitle: {
      string: "Product Rendering for a Toronto-Based Men’s Fashion Brand",
      jsx: (
        <>
          Product Rendering for a Toronto-Based<br></br>Men’s Fashion Brand
        </>
      ),
    },
    tags: ["Client", "3D Design", "Product Rendering"],
    tools: ["Blender 3D", "Photoshop", "Python"],

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
    subtitle: {
      string: "Supporting Parents in Fostering Adolescent Creative Development",
      jsx: (
        <>
          Supporting Parents in Fostering<br></br>Adolescent Creative Development
        </>
      ),
    },
    tags: ["UX/UI Design", "User Research", "Team Project"],
    tools: ["Adobe XD / Figma", "Mural", "InDesign"],

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
        src: "./assets/images/case_study_thumbnails/Explorations.png",
        alt: "3D rendering of a worn steel compass",
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
  arr.forEach((item) => {
    item.key = uuidv4();
    if (item.tags) item.tags = addKey(item.tags);
    if (item.tools) item.tools = addKey(item.tools);
  });

  return arr;
}





export default caseStudiesInit(CASE_STUDIES);
