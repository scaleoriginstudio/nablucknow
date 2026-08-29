"use client";

import { forwardRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { SiteFooterContent } from "./SiteFooterContent";

/** The closing footer stage, identical on every page and always the last,
    unnumbered step in that page's sequence. It has no navbar of its own and
    fills the full viewport height, not just the space below the header:
    the header is hidden entirely while this is active. Opacity is driven
    directly by the `active` prop via a CSS transition rather than an
    imperative GSAP tween, so it can never end up out of sync with whichever
    stage is actually current. The content itself lives in SiteFooterContent,
    which the blog pages also use in a normal scrolling layout. */
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
      className="z-[16] flex flex-col items-center justify-center overflow-y-auto bg-navy px-8 py-10"
    >
      <SiteFooterContent />
    </div>
  );
});
