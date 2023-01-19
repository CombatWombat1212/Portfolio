import { PanelDesc } from "../elements/Panel";

import Button from "../elements/Buttons";

function Footer() {
  return (
    <>
      <footer className="footer">
        <PanelDesc className="footer--info col-6">
          <h3>We need to talk...</h3>
          <p className="text--body">Open to full-time positions, or just to say hi!</p>
          <div className="footer--actions">
            <Button icon={["email", "right", "mask"]} href={''}>Have a look see</Button>
            <Button icon={["document", "alone", "mask"]} href={''} target="_blank" />
            <Button icon={["linkedin", "alone", "mask"]} href={'/'} target="_blank" />
            <Button icon={["instagram", "alone", "mask"]} href={'/'} target="_blank" />
          </div>
        </PanelDesc>
        <div className="footer--links"></div>
      </footer>
    </>
  );
}

export default Footer;
