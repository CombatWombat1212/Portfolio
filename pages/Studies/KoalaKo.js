import { StudyPanel } from "/components/elements/Panel";
import getStudy from "../../scripts/GetStudy";






function KoalaKo() {

  const study = getStudy();


  
    return (
      <>

          <StudyPanel variant="study" study={study} />

      </>
    );
  }
  
  export default KoalaKo;
  