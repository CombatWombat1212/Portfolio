import { StudyPanel } from "../elements/Panel";
import Brief from "./Brief";
import NextStudies from "./NextStudies";

function CaseStudyPage({ id, study, children }) {
  return (
    <div id={id} className="casestudy">
      <StudyPanel variant="study" study={study} />

      <Brief brief={study.brief} />

      {children}

      <NextStudies study={study} />

    </div>
  );
}

export default CaseStudyPage;
