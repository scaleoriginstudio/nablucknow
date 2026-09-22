"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { FOOTER_QUICK_LINKS, FOOTER_GET_INVOLVED, FOOTER_CONTACT, FOOTER_SOCIALS } from "./constants";

const GET_INVOLVED_HREF: Record<string, string> = {
  Volunteer: "/volunteer",
  Donate: "/donate",
  "CSR Partnerships": "/programs",
};

const ORG_NAME = "National Association for the Blind";
const TAGLINE = { en: "State Chapter, Lucknow", hi: "राज्य शाखा, लखनऊ" };
const QUICK_LINKS_HEADING = { en: "Quick Links", hi: "मुख्य लिंक" };
const GET_INVOLVED_HEADING = { en: "Get Involved", hi: "जुड़ें" };
const CONTACT_HEADING = { en: "Contact", hi: "संपर्क" };

/** The footer's actual content, with no positioning of its own. Rendered
    both by the fixed full-viewport stage `Footer` (homepage + StagePager
    pages) and by the normally-scrolling blog pages, so every page closes on
    the same footer. */
export function SiteFooterContent({ hideLogo = false }: { hideLogo?: boolean } = {}) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
          {/* data-footer-logo: the homepage measures this to fly its
              persistent logo into place; hideLogo keeps the slot laid out
              but invisible so there is never a duplicate. */}
          <Image
            src="/img/logo.png"
            alt=""
            width={64}
            height={64}
            data-footer-logo=""
            className="h-16 w-16 object-contain"
            style={{ filter: "brightness(0) invert(1)", visibility: hideLogo ? "hidden" : "visible" }}
          />
          <p className="font-heading text-sm font-bold text-white">{ORG_NAME}</p>
          <p className="font-body text-xs text-white/60">{t(TAGLINE)}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {FOOTER_SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-white/70 underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-bold text-white">{t(QUICK_LINKS_HEADING)}</h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-body text-xs text-white/70 transition-colors hover:text-white">
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-bold text-white">{t(GET_INVOLVED_HEADING)}</h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_GET_INVOLVED.map((link) => (
              <li key={link.en}>
                <Link
                  href={GET_INVOLVED_HREF[link.en] ?? "#"}
                  className="font-body text-xs text-white/70 transition-colors hover:text-white"
                >
                  {t(link)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h3 className="mb-3 font-heading text-sm font-bold text-white">{t(CONTACT_HEADING)}</h3>
          <p className="font-body text-xs leading-5 text-white/70">{FOOTER_CONTACT.address}</p>
          <p className="mt-2 font-body text-xs text-white/70">{FOOTER_CONTACT.phones.join(" · ")}</p>
          <p className="mt-1 font-body text-xs text-white/70">{FOOTER_CONTACT.email}</p>
        </div>
      </div>

      <div className="mt-8 w-full border-t border-white/15 pt-4 text-center">
        <p className="font-body text-xs text-white/50">
          {t({
            en: `© 2026 ${ORG_NAME}, State Chapter, Lucknow. All rights reserved.`,
            hi: `© 2026 ${ORG_NAME}, राज्य शाखा, लखनऊ। सर्वाधिकार सुरक्षित।`,
          })}
        </p>
      </div>
    </div>
  );
}
