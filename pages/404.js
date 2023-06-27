import Button from "@/components/elements/Buttons";
import Section, { Chapter, Column, Description, Graphic, Heading } from "@/components/sections/Sections";
import Nobr from "@/components/utilities/Nobr";
import { LOADING_IMGS } from "@/data/LOADING_IMGS";
import Head from "next/head";
// import useRandomString from "@/scripts/hooks/useRandomString";

function Custom404() {
  //   const messeges = ["ahh page not found my guy", "ruh roh"];
  //   const text = useRandomString(messeges, { localStorage: true, key: "404--messages" });

  return (
    <>
      <Head>
        <title>Page not found</title>
        <meta name="theme-color" content="#074391" />
      </Head>
      <div className="four-oh-four">
        <Section id="uh-oh">
          <Column caption="above" nocol>
            <Heading type="h1">404</Heading>
            <Heading type="h3">
              page not found <Nobr>my guy</Nobr>
            </Heading>
            <Graphic type="video" img={LOADING_IMGS.loading_snail} autoplay={true} loop muted={true} controls={false} className={"b-rad"} square />,
          </Column>
        </Section>
      </div>
    </>
  );
}

export default Custom404;
