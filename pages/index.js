import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

import CASE_STUDIES from "/data/CASE_STUDIES";

function Index() {
  return (
    <>
      <div className="container hero">
        <div className="hero--desc col-6">
          <h1 className="hero--title">
            Hi, I'm <span className="hero--name">Sam Giustizia</span>,<br></br>how are you?
          </h1>
          <p className="text--h3">
            I'm a multidisciplinary designer,<br></br>
            and a creator of digital solutions,<br></br>
            tailor-fitted to real-world problems.
          </p>
          <p>This is my portfolio. Enjoy your stay :)</p>
        </div>
        <div className="hero--graphic col-5">
          <div className="hero--img">
            {/* TODO: fix the pixelated look of this img */}
            <Image src="/assets/images/flair/Arrow_Squiggle.png" alt="Squiggly arrow pointing downwards" width={651} height={1003} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
