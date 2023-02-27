import { StudyPanel } from "../elements/Panel";
import Section from "../sections/Sections";
import Brief from "./Brief";
import NextStudies from "./NextStudies";
import Indicator from "./Indicator";

function CaseStudyPage({ id, study, children }) {

  return (
    <div id={id} className="casestudy">


      <Indicator />

      <StudyPanel variant="study" study={study} />

      <Brief brief={study.brief} />


      {children}

      <Section type="passthrough" wrapperClassName={'pt-0'}><NextStudies study={study} /></Section>

    </div>
  );
}

export default CaseStudyPage;
