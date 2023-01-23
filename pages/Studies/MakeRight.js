import { StudyPanel } from "/components/elements/Panel";
import getStudy from "../../scripts/GetStudy";
import CaseStudyPage from "/components/studies/CaseStudyPage";
import Brief from "/components/studies/Brief";

function MakeRight() {
  const study = getStudy();

  return (
    <>
      <CaseStudyPage id={study.id}>

          <StudyPanel variant="study" study={study} />
          <Brief brief={study.brief} />


       </CaseStudyPage>
    </>
  );
}

export default MakeRight;
