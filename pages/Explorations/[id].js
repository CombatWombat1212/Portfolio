// pages/Explorations/[id].js
import { useRouter } from "next/router";
import Explorations from "@/pages/Explorations/index";
import Seo from "@/components/head/Seo";
import { useEffect, useState } from "react";

export default function Id({ pop }) {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState(null);

  // removed seo for now, it needs more work to get it to work with dynamic pages
  return (
    <>
      {/* <Seo project={project} /> */}
      <Explorations id={id} pop={pop} project={project} setProject={setProject} />
    </>
  );
}
