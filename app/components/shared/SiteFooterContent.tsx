import Image from "next/image";
import Link from "next/link";
import { FOOTER_QUICK_LINKS, FOOTER_GET_INVOLVED, FOOTER_CONTACT, FOOTER_SOCIALS } from "./constants";

const GET_INVOLVED_HREF: Record<string, string> = {
  Volunteer: "/volunteer",
  Donate: "/donate",
  "CSR Partnerships": "/programs",
};

/** The footer's actual content, with no positioning of its own. Rendered
    both by the fixed full-viewport stage `Footer` (homepage + StagePager
    pages) and by the normally-scrolling blog pages, so every page closes on
    the same footer. */
export function SiteFooterContent() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
          <Image
            src="/img/logo.png"
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="font-heading text-sm font-bold text-white">National Association for the Blind</p>
          <p className="font-body text-xs text-white/60">State Chapter, Lucknow</p>
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
          <h3 className="mb-3 font-heading text-sm font-bold text-white">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="font-body text-xs text-white/70 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-bold text-white">Get Involved</h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_GET_INVOLVED.map((link) => (
              <li key={link}>
                <Link
                  href={GET_INVOLVED_HREF[link] ?? "#"}
                  className="font-body text-xs text-white/70 transition-colors hover:text-white"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h3 className="mb-3 font-heading text-sm font-bold text-white">Contact</h3>
          <p className="font-body text-xs leading-5 text-white/70">{FOOTER_CONTACT.address}</p>
          <p className="mt-2 font-body text-xs text-white/70">{FOOTER_CONTACT.phones.join(" · ")}</p>
          <p className="mt-1 font-body text-xs text-white/70">{FOOTER_CONTACT.email}</p>
        </div>
      </div>

      <div className="mt-8 w-full border-t border-white/15 pt-4 text-center">
        <p className="font-body text-xs text-white/50">
          © 2026 National Association for the Blind, State Chapter, Lucknow. All rights reserved.
        </p>
      </div>
    </div>
  );
}
