import { useRef } from "react";
import FOOTER_SITEMAP_ITEMS from "../../data/FOOTER_SITEMAP_ITEMS";

import Button from "../elements/Buttons";
import { PanelDesc } from "../elements/Panel";
import DLink from "../utilities/DynamicLink";

//TODO: Add links to footer, including the sitemap links inside the /data/ object

function Footer() {



  return (
    <>
      <footer className="footer section">
        <PanelDesc className="footer--info col-6">
          <div className="footer--contact">
            <h3>We need to talk...</h3>
            <p className="text--body">Open to full-time positions, or just to say hi!</p>

            <div className="footer--actions">
              <Button icon={["email", "right", "mask"]} href={""}>
                Say whatup!
              </Button>
              <Button icon={["document", "alone", "mask"]} animation="scale-in" href={""} target="_blank" />
              <Button icon={["linkedin", "alone", "mask"]} animation="scale-in" href={""} target="_blank" />
              <Button icon={["instagram", "alone", "mask"]} animation="scale-in" href={""} target="_blank" />
            </div>
          </div>
        </PanelDesc>

        <div className="footer--sitemap col-6">
          <div className="sitemap">
            {FOOTER_SITEMAP_ITEMS.map((group) => {
              return (
                <div className="sitemap--group" key={group.key}>
                  <DLink className="sitemap--title" href={group.link}>
                    {group.name}
                  </DLink>

                  <ul className="sitemap--links">
                    {group.list.slice(0, 3).map((link) => {
                      return (
                          <li className="sitemap--item" key={link.key}>
                            <DLink key={link.key} href={link.link}>
                              {link.name}
                            </DLink>
                          </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
