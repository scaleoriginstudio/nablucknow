"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { HEADER_HEIGHT, NAV_LINKS } from "./constants";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { useOverlay } from "./OverlayContext";

function StageStepper({ active, total }: { active: number; total: number }) {
  return (
    <div className="flex w-full items-baseline justify-center gap-4 font-body sm:gap-6">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          style={{ transition: "color 500ms ease-out, font-size 500ms ease-out" }}
          className={n === active ? "text-2xl font-bold text-navy sm:text-4xl" : "text-sm font-semibold text-black/25 sm:text-lg"}
        >
          {String(n).padStart(2, "0")}
        </span>
      ))}
    </div>
  );
}

/** Fixed-viewport, numbered-step page shell shared by every page except the
    homepage (which has its own bespoke intro sequence). Wheel/keyboard/touch
    step between the given stages with a plain symmetric crossfade, then a
    final unnumbered, full-height footer stage with no navbar of its own —
    same shape as the homepage's stage 11.

    Opacity/pointer-events are driven straight from React state via inline
    style, not by an imperative GSAP timeline: an earlier version used GSAP
    and its default (unpositioned) .set() calls landed at the wrong point in
    the timeline, silently leaving the footer's pointer-events — and on a
    misfire, its opacity — stuck at rest. Plain state-driven CSS transitions
    can't drift out of sync with the state that owns them. */
export function StagePager({ stages }: { stages: React.ReactNode[] }) {
  const total = stages.length;
  const lastStage = total + 1;
  const hasStepper = total > 1;
  const [active, setActive] = useState(1);
  const activeRef = useRef(1);
  const isTransitioningRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const dur = prefersReducedMotion ? 0.001 : 0.3;
  const pathname = usePathname();
  const { open } = useOverlay();
  const overlayOpenRef = useRef(false);
  const stageHeadingRefs = useRef<(HTMLElement | null)[]>([]);
  const announceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    overlayOpenRef.current = open !== null;
  }, [open]);

  const goTo = useCallback(
    (next: number) => {
      const current = activeRef.current;
      if (isTransitioningRef.current || next === current || next < 1 || next > lastStage) return;
      isTransitioningRef.current = true;
      activeRef.current = next;
      setActive(next);
      window.setTimeout(() => {
        isTransitioningRef.current = false;
      }, dur * 1000 + 50);

      // Move focus to the new stage's heading and announce it, so keyboard
      // and screen-reader users track the jump the same way a sighted wheel
      // user sees it — arrow/wheel stepping otherwise leaves focus behind
      // on whatever the previous stage last had.
      window.setTimeout(() => {
        const heading = next === lastStage ? null : stageHeadingRefs.current[next - 1];
        heading?.focus();
        if (announceRef.current) {
          announceRef.current.textContent =
            next === lastStage ? "Footer" : `Step ${next} of ${total}`;
        }
      }, dur * 1000);
    },
    [lastStage, total, dur],
  );

  useEffect(() => {
    const isFormField = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
    };

    const step = (delta: 1 | -1) => {
      if (overlayOpenRef.current) return;
      goTo(Math.min(lastStage, Math.max(1, activeRef.current + delta)));
    };

    const onWheel = (event: WheelEvent) => {
      if (overlayOpenRef.current) return;
      if (Math.abs(event.deltaY) < 4) return;
      event.preventDefault();
      step(event.deltaY > 0 ? 1 : -1);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (overlayOpenRef.current) return;
      if (isFormField(event.target)) return;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        step(-1);
      }
    };
    let touchStartY = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const dy = touchStartY - (event.changedTouches[0]?.clientY ?? 0);
      if (Math.abs(dy) < 40) return;
      step(dy > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo, lastStage]);

  const onFooter = active === lastStage;
  const fade = (isActive: boolean) => ({
    opacity: isActive ? 1 : 0,
    pointerEvents: isActive ? ("auto" as const) : ("none" as const),
    transition: `opacity ${dur}s ease`,
  });

  return (
    <>
      <a
        href="#main-stage"
        className="fixed left-2 top-2 z-50 -translate-y-16 rounded-md bg-navy px-4 py-2 font-heading text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div aria-live="polite" className="sr-only" ref={announceRef} />

      <header
        style={fade(!onFooter)}
        className="fixed inset-x-0 top-0 z-30 flex h-24 items-center justify-end gap-8 bg-white px-8"
      >
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isCurrent = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isCurrent ? "page" : undefined}
                className={
                  "font-body text-sm font-semibold text-black transition-colors hover:text-navy" +
                  (isCurrent ? " underline decoration-orange decoration-2 underline-offset-4" : "")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/volunteer"
            className="rounded-full border border-navy px-5 py-2 font-heading text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Volunteer
          </Link>
          <Link
            href="/donate"
            className="rounded-full bg-orange px-5 py-2 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
          >
            Donate
          </Link>
        </div>
        <MobileNav />
      </header>

      {/* The logo is a "go home" control everywhere outside the homepage
          itself, so it's a plain link rather than the homepage's in-place
          stage-1 jump. */}
      <Link
        href="/"
        aria-label="Go to homepage"
        style={{ position: "fixed", top: 8, left: 16, width: 80, height: 80, ...fade(!onFooter) }}
        className="z-40 flex items-center justify-center rounded-xl bg-white p-2"
      >
        <Image
          src="/img/logo.png"
          alt="National Association for the Blind"
          width={80}
          height={80}
          className="h-full w-full object-contain"
        />
      </Link>

      {hasStepper && (
        <div
          style={{ position: "fixed", top: HEADER_HEIGHT + 40, left: 0, width: "100vw", ...fade(!onFooter) }}
          className="z-20 px-8 pointer-events-none"
        >
          <div className="mx-auto max-w-6xl">
            <StageStepper active={active} total={total} />
          </div>
        </div>
      )}

      <div id="main-stage">
        {stages.map((content, i) => {
          const stageNum = i + 1;
          const isActive = active === stageNum;
          return (
            <div
              key={i}
              inert={!isActive}
              style={{
                position: "fixed",
                top: HEADER_HEIGHT,
                left: 0,
                width: "100vw",
                // dvh, not vh: on mobile, vh includes space hidden behind a
                // collapsible browser toolbar, which pushes centered content
                // below what's actually visible on screen.
                height: `calc(100dvh - ${HEADER_HEIGHT}px)`,
                ...fade(isActive),
              }}
              className="z-10 flex flex-col items-center justify-start overflow-hidden bg-white px-8 md:justify-center"
            >
              <div
                ref={(el) => {
                  stageHeadingRefs.current[i] = el;
                }}
                tabIndex={-1}
                className="flex h-full w-full flex-col items-center justify-start pt-20 outline-none md:justify-center md:pt-0"
              >
                {content}
              </div>
            </div>
          );
        })}
      </div>

      <Footer active={onFooter} />
    </>
  );
}
