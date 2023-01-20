
import { useRouter } from "next/router";
import CASE_STUDIES from "../data/CASE_STUDIES";


function getStudy() {
  const router = useRouter();
  var pathname = router.pathname;
  var study = CASE_STUDIES.find((item) => {
    return item.link === pathname;
  });
  return study;
}

export default getStudy;