import { StudyPanel } from "/components/elements/Panel";
import getStudy from "../../scripts/GetStudy";
import CaseStudyPage from "@/components/studies/CaseStudyPage";

function MakeRight() {
  const study = getStudy();

  return (
    <>
      <CaseStudyPage id={study.id}>

          <StudyPanel variant="study" study={study} />

       </CaseStudyPage>
    </>
  );
}

export default MakeRight;
