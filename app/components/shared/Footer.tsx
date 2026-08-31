"use client";

import { forwardRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { SiteFooterContent } from "./SiteFooterContent";

/** The closing footer stage, identical on every page and always the last,
    unnumbered step in that page's sequence. It has no navbar of its own and
    fills the full viewport height, not just the space below the header:
    the header is hidden entirely while this is active. Position/opacity are
    driven directly by the `active` prop via a CSS transition rather than an
    imperative GSAP tween, so it can never end up out of sync with whichever
    stage is actually current — it slides up from below the viewport, the
    same "solid panel flying in" motion as the stage-2→3 wipe. The content
    itself lives in SiteFooterContent, which the blog pages also use in a
    normal scrolling layout.

    `morphLogo` (homepage only) hides the footer's own logo so the
    persistent header logo can animate into its place and colour instead. */
export const Footer = forwardRef<HTMLDivElement, { active: boolean; morphLogo?: boolean }>(
  function Footer({ active, morphLogo = false }, ref) {
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
          transform: active ? "translateY(0)" : "translateY(100%)",
          opacity: active ? 1 : 0,
          pointerEvents: active ? "auto" : "none",
          transition: prefersReducedMotion
            ? "none"
            : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
        }}
        className="z-[16] flex flex-col items-center justify-center overflow-y-auto bg-navy px-8 py-10"
      >
        <SiteFooterContent hideLogo={morphLogo} />
      </div>
    );
  },
);
