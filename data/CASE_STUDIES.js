import { v4 as uuidv4 } from "uuid";

const CASE_STUDIES = [
  {
    key: uuidv4(),
    name: "MakeRight",
    id: "Makeright",
    description: {
      string: "Translating The Benefits of 3D Printing to Everyday Consumers",
      jsx: (
        <>
          Translating The Benefits of 3D Printing<br></br>to Everyday Consumers
        </>
      ),
    },
    tags: ["Thesis", "UX/UI Design", "User Research"],
    img: {
      src: "/assets/images/case_study_thumbnails/MakeRight.png",
      alt: "3D printed plastic elephant diving into a cardboard box",
      width: 1038,
      height: 944,
    },
  },
  {
    key: uuidv4(),
    name: "Made Clothing Co.",
    id: "Made",
    description: {
      string: "Product Rendering for a Toronto-Based Men’s Fashion Brand",
      jsx: (
        <>
          Product Rendering for a Toronto-Based<br></br>Men’s Fashion Brand
        </>
      ),
    },
    tags: ["Client", "3D Design", "Product Rendering"],
    img: {
      src: "/assets/images/case_study_thumbnails/MADE.png",
      alt: "3D rendering of a blue dress-shirt",
      width: 526,
      height: 823,
    },
  },
  {
    key: uuidv4(),
    name: "KoalaKo",
    id: "Koalako",
    description: {
      string: "Supporting Parents in Fostering Adolescent Creative Development",
      jsx: (
        <>
          Supporting Parents in Fostering<br></br>Adolescent Creative Development
        </>
      ),
    },
    tags: ["UX/UI Design", "User Research", "Team Project"],
    img: {
      src: "/assets/images/case_study_thumbnails/KoalaKo.png",
      alt: "3D rendering of a phone with an app called 'KoalaKo' open on the screen",
      width: 738,
      height: 842,
    },
  },
  {
    key: uuidv4(),
    name: "Explorations",
    id: "Explorations",
    description: {
      string: "Undeserving of a case study, but well-deserving of your attention",
      jsx: (
        <>
          Undeserving of a case study,<br></br>but well-deserving of your attention
        </>
      ),
    },
    img: {
      src: "/assets/images/case_study_thumbnails/Explorations.png",
      alt: "3D rendering of a worn steel compass",
      width: 730,
      height: 1626,
    },
  },
];

export default CASE_STUDIES;
