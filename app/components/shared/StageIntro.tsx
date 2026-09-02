"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/** True when the stage this subtree belongs to is the one on screen. The
    StagePager wraps every stage in a provider; the default is `true` so a
    stage component rendered on its own still shows its heading. */
const StageActiveContext = createContext(true);
export const StageActiveProvider = StageActiveContext.Provider;
export const useStageActive = () => useContext(StageActiveContext);

/** The heading block every numbered stage opens with: a title and an
    optional line of supporting text, held a constant distance below the
    number line (the stage's own top-aligned layout does that) and flown up
    into place each time the stage becomes active — the same beat on every
    page, so Events, Blog and the rest read as one system. */
export function StageIntro({
  title,
  subtitle,
  headingLevel = "h1",
  trailing,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  headingLevel?: "h1" | "h2";
  /** Optional controls that share the heading's row (e.g. filter chips),
      right-aligned on wide screens. */
  trailing?: ReactNode;
}) {
  const active = useStageActive();
  const prefersReducedMotion = usePrefersReducedMotion();
  const Heading = headingLevel;

  // Fly in a beat after the stage's crossfade rather than with it, so the
  // heading reads as arriving rather than simply appearing. Reset the
  // moment the stage leaves so the next visit replays it.
  const [flown, setFlown] = useState(false);
  useEffect(() => {
    if (!active) {
      setFlown(false);
      return;
    }
    const t = window.setTimeout(() => setFlown(true), 60);
    return () => window.clearTimeout(t);
  }, [active]);

  const shown = flown || prefersReducedMotion;
  const rise = (delay: number) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(24px)",
    transition: prefersReducedMotion
      ? "none"
      : `opacity 0.5s ease ${delay}ms, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });

  return (
    <div className={trailing ? "flex flex-wrap items-center justify-between gap-3" : undefined}>
      <div style={rise(0)}>
        <Heading className="font-heading text-xl font-bold text-navy sm:text-3xl">{title}</Heading>
        {subtitle && <p className="mt-1 font-body text-sm text-black/60">{subtitle}</p>}
      </div>
      {trailing && <div style={rise(80)}>{trailing}</div>}
    </div>
  );
}
