import { processGroups, processImages } from "@/scripts/ProcessImages";



const LOADING_IMGS = processImages({
  loading_snail: {
    name: "loading_snail",
    src: "/assets/loading/loading_snail_full.webm",
    alt: "a video of a snail in the shower",
    width: 406,
    height: 720,
  },
});

const LOADING_IMG_GROUPS = processGroups(LOADING_IMGS);


export { LOADING_IMGS, LOADING_IMG_GROUPS}
