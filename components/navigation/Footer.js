import { useMountEffect } from "/scripts/hooks/useMountEffect";

import Button from "../elements/Buttons";
import { PanelDesc } from "../elements/Panel";
import DLink from "../utilities/DynamicLink";
import FOOTER_SITEMAP_ITEMS from "@/data/FOOTER_SITEMAP";
import useListener from "@/scripts/hooks/useListener";
import { useEffect, useState } from "react";
import { useBreakpointUtils, useResponsiveUtils } from "@/scripts/hooks/useBreakpoint";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import useScreenWidth from "@/scripts/hooks/useScreenWidth";
import { splitPx } from "@/scripts/GlobalUtilities";

//TODO: Add links to footer, including the sitemap links inside the /data/ object

function Footer() {
  return (
    <>
      <footer className="footer">
        <Contact />

        <div className="sitemap col-7 col-xl-12">
          <div className="sitemap--wrapper">
            {FOOTER_SITEMAP_ITEMS.map((group) => {
              return (
                <div className="sitemap--group" key={group.key}>
                  <div className="sitemap--title-wrapper">
                    <FooterLink href={group.link} name={group.name} className="sitemap--title" />
                  </div>
                  <ul className="sitemap--list">
                    {group.list.slice(0, 3).map((link) => {
                      return (
                        <li className="sitemap--item" key={link.key}>
                          <FooterLink className="sitemap--page" href={link.link} name={link.name} key={link.key} />
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

function FooterLink({ href, name, className }) {
  return (
    <DLink className={`sitemap--link ${className || ""}`} href={href}>
      {name}
    </DLink>
  );
}

function Contact() {
  const { isBpOrUp } = useResponsiveUtils({ debouceTime: 200 });

  const width = useScreenWidth({ debounceTime: 200, checkIf: isBpOrUp("xl") });
  const [ml, setMl] = useState(0);

  useEffect(() => {
    const ml = splitPx(getComputedStyle(document.querySelector(".nav--container")).getPropertyValue("margin-left"));
    setMl(ml);
  }, [width]);

  return (
    <>
      <div className="contact col-5 col-xl-12">
        {ml != 0 && (
          <div
            className="contact--wrapper"
            style={{
              "--contact-wrapper-pl": `${ml}px`,
            }}>
            <div className="contact--child contact--body">
              <h3 className="contact--heading">We need to talk...</h3>
              <p className="contact--description">Open to full-time positions, or just to say hi!</p>
            </div>

            <div className="contact--child contact--actions">
              <Button
                className="contact--button d-sm-none"
                icon={["email", "right", "mask"]}
                copy={"ssamgiustizia@outlook.com"}
                message="Email copied!"
                animation="scale-in">
                <span>Say whatup!</span>
              </Button>

              <Button
                className="contact--button d-sm-flex d-none"
                icon={["email", "alone", "mask"]}
                href={"mailto:ssamgiustizia@outlook.com"}
                animation="scale-in"
              />

              <div className="contact--socials">
                <Button
                  className="contact--button"
                  icon={["linkedin", "alone", "mask"]}
                  animation="scale-in"
                  href={"https://www.linkedin.com/in/sam-giustizia-76930b194/"}
                  target="_blank"
                />
                <Button
                  className="contact--button"
                  icon={["instagram", "alone", "mask"]}
                  animation="scale-in"
                  href={"https://www.instagram.com/peanut.butter.and.sam/"}
                  target="_blank"
                />
                <Button className="contact--button" icon={["document", "alone", "mask"]} animation="scale-in" target="_blank" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

Footer.displayName = "Footer";
FooterLink.displayName = "FooterLink";
Contact.displayName = "Contact";

export default Footer;
