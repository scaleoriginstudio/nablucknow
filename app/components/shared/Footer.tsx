"use client";

import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { FOOTER_QUICK_LINKS, FOOTER_GET_INVOLVED, FOOTER_CONTACT, FOOTER_SOCIALS } from "./constants";

/** The closing footer stage — identical on every page, always the last,
    unnumbered step in that page's sequence. It has no navbar of its own and
    fills the full viewport height, not just the space below the header —
    the header is hidden entirely while this is active, so nothing needs to
    be reserved for it. Opacity is driven directly by the `active` prop via
    a CSS transition rather than an imperative GSAP tween, so it can never
    end up stuck out of sync with whichever stage is actually current. */
const FOOTER_GET_INVOLVED_HREF: Record<string, string> = {
  Volunteer: "/volunteer",
  Donate: "/donate",
};

export const Footer = forwardRef<HTMLDivElement, { active: boolean }>(function Footer({ active }, ref) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <div
      ref={ref}
      inert={!active}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
        transition: `opacity ${prefersReducedMotion ? 0.001 : 0.3}s ease`,
      }}
      className="z-[16] flex flex-col items-center justify-center overflow-hidden bg-navy px-8 py-8"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
          <Image src="/img/logo.png" alt="" width={48} height={48} className="h-12 w-12 object-contain" />
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
                  href={FOOTER_GET_INVOLVED_HREF[link] ?? "#"}
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

      <div className="mt-8 w-full max-w-6xl border-t border-white/15 pt-4 text-center">
        <p className="font-body text-xs text-white/50">
          © 2026 National Association for the Blind, State Chapter, Lucknow. All rights reserved.
        </p>
      </div>
    </div>
  );
});
