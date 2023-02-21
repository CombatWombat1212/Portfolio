
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

function getAdjacentStudy(currentStudy, n) {
  const studyCount = CASE_STUDIES.length;
  const currentStudyIndex = CASE_STUDIES.findIndex((study) => study.link === currentStudy.link);
  const nextStudyIndex = (currentStudyIndex + n + studyCount) % studyCount;
  return CASE_STUDIES[nextStudyIndex];
}


export { getStudy, getAdjacentStudy };