import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { STUDY_EXPLORATIONS } from "@/data/CASE_STUDIES";




function Explorations({ setPopup }) {
  const study = STUDY_EXPLORATIONS;
  return (
    <>
      <CaseStudyPage id={study.id} study={study}>


      </CaseStudyPage>
    </>
  );
}

export default Explorations;
