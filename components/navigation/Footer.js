import { useMountEffect } from "/scripts/hooks/useMountEffect";

import Button from "../elements/Buttons";
import { PanelDesc } from "../elements/Panel";
import DLink from "../utilities/DynamicLink";
import FOOTER_SITEMAP_ITEMS from "@/data/FOOTER_SITEMAP_ITEMS";

//TODO: Add links to footer, including the sitemap links inside the /data/ object

function Footer() {
  useMountEffect(() => {
    if (!document) return;

    function footerFocusFix() {
      var items = document.querySelectorAll(".sitemap--item, .sitemap--title");
      var itemsArr = Array.from(items);

      itemsArr.forEach((item) => {
        item.addEventListener("focusin", () => {
          item.classList.add("focus");
        });
        item.addEventListener("focusout", () => {
          item.classList.remove("focus");
        });
      });
    }

    footerFocusFix();
  });

  return (
    <>
      <footer className="footer">
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


{/* TODO: this is optional as all hell, but would it be cool if the text 'Sam Giustizia' animated to say 'Home' on mouseover? yes but feel free to say no this is very minor */}
        <div className="footer--sitemap col-6">
          <div className="sitemap">
            {FOOTER_SITEMAP_ITEMS.map((group) => {
              return (
                <div className="sitemap--group" key={group.key}>
                  <div className="sitemap--title">
                    <DLink className="" href={group.link}>
                      {group.name}
                    </DLink>
                  </div>
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
