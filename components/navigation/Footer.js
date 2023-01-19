import FOOTER_SITEMAP_ITEMS from "../../data/FOOTER_SITEMAP_ITEMS";


import Button from "../elements/Buttons";
import { PanelDesc } from "../elements/Panel";


//TODO: Add links to footer, including the sitemap links inside the /data/ object

function Footer() {


  return (
    <>

      <footer className="footer section">

        <PanelDesc className="footer--info col-6">

          <h3>We need to talk...</h3>
          <p className="text--body">Open to full-time positions, or just to say hi!</p>

          <div className="footer--actions">
            <Button icon={["email", "right", "mask"]} href={''}>Say whatup!</Button>
            <Button icon={["document", "alone", "mask"]} animation="scale-in" href={''} target="_blank" />
            <Button icon={["linkedin", "alone", "mask"]} animation="scale-in" href={''} target="_blank" />
            <Button icon={["instagram", "alone", "mask"]} animation="scale-in" href={''} target="_blank" />
          </div>


        </PanelDesc>

        <div className="footer--links col-6">
          <div ></div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
