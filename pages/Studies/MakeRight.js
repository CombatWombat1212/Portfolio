import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import MAKERIGHT_IMGS from "@/data/MAKERIGHT_IMGS";
import QUOTE_TABLES from "@/data/QUOTE_TABLE";
import Gantt from "@/components/charts/Gantt";
import BarGraph from "@/components/charts/BarGraph";
import DLink from "@/components/utilities/DynamicLink";
import PieChart from "@/components/charts/PieChart";
import Button from "@/components/elements/Buttons";
import Slideshow from "@/components/global/slideshow/Slideshow";
import Pitch from "@/components/sections/Pitch";
import { STUDY_MAKERIGHT } from "@/data/CASE_STUDIES";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import Nobr from "@/components/utilities/Nobr";
import QuoteTable from "@/components/global/QuoteTable";
import ResponsiveText from "@/components/global/ResponsiveText";
import Seo from "@/components/head/Seo";

function MakeRight({ pop }) {
  const study = STUDY_MAKERIGHT;

  const { desktop, isBpAndDown, isBp, bp, loading } = useResponsive();
  const isLgAndDown = !(!isBpAndDown("lg") || loading);
  const isMdAndDown = !(!isBpAndDown("md") || loading);
  const isSmAndDown = !(!isBpAndDown("sm") || loading);
  const isMd = !(!isBp("md") || loading);
  const isSm = !(!isBp("sm") || loading);
  const isMdOrSm = isMd || isSm;

  return (
    <>
      <Seo page="makeright" />

      <CaseStudyPage id={study.id} study={study}>




      </CaseStudyPage>
    </>
  );
}

export default MakeRight;
