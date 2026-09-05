"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { HEADER_HEIGHT, NAV_LINKS } from "./constants";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { useOverlay } from "./OverlayContext";
import { StageActiveProvider } from "./StageIntro";

function StageStepper({
  active,
  total,
  onSelect,
  onDark = false,
}: {
  active: number;
  total: number;
  onSelect: (n: number) => void;
  onDark?: boolean;
}) {
  const activeClass = onDark ? "text-2xl font-bold text-white sm:text-4xl" : "text-2xl font-bold text-navy sm:text-4xl";
  const idleClass = onDark
    ? "text-sm font-semibold text-white/40 sm:text-lg"
    : "text-sm font-semibold text-black/25 sm:text-lg";
  return (
    <div className="flex w-full items-baseline justify-center gap-4 font-body sm:gap-6">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onSelect(n)}
          aria-label={`Go to step ${n}`}
          aria-current={n === active ? "step" : undefined}
        >
          <span
            style={{ transition: "color 500ms ease-out, font-size 500ms ease-out" }}
            className={n === active ? activeClass : idleClass}
          >
            {String(n).padStart(2, "0")}
          </span>
        </button>
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
export function StagePager({
  stages,
  background,
  stageLabels,
}: {
  stages: React.ReactNode[];
  /** A full-bleed layer painted behind every stage (below the header and
      stepper). When set, the stages themselves render transparent so it
      shows through, and the glass panels on them have something to blur. */
  background?: React.ReactNode;
  /** One short label per stage, in order. When given, the next stage's
      label peeks in faint at the bottom edge and re-flies into place on
      every step — the same "here's what's next" ghost the homepage uses. */
  stageLabels?: string[];
}) {
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

    // A scroll gesture that starts inside a form/list that is actually
    // overflowing right now (marked data-stage-scroll) must scroll that
    // instead of stepping the stage — but only while it still has room to
    // move in the gesture's own direction. Without the boundary check,
    // once inside a scrollable panel a wheel/swipe could never step to
    // another stage again, even after reaching the top or bottom of it.
    const inScrollableRegion = (target: EventTarget | null): HTMLElement | null => {
      if (!(target instanceof Element)) return null;
      const el = target.closest<HTMLElement>("[data-stage-scroll]");
      if (!el) return null;
      const scrolls = el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;
      return scrolls ? el : null;
    };

    const scrollableHasRoom = (el: HTMLElement, dir: 1 | -1) => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 1) return false;
      return dir > 0 ? el.scrollTop < max - 1 : el.scrollTop > 1;
    };

    // A card's sign-up dialog (portalled to <body>, role="dialog") must
    // take the scroll for itself — stepping the stage underneath it while
    // it is open is exactly the bug the events audit flagged.
    const modalOpen = () => document.querySelector('[role="dialog"][aria-modal="true"]') !== null;

    const step = (delta: 1 | -1) => {
      if (overlayOpenRef.current || modalOpen()) return;
      goTo(Math.min(lastStage, Math.max(1, activeRef.current + delta)));
    };

    // One scroll gesture fires a burst of wheel/touch events; a cooldown
    // keeps that burst to a single stage step.
    let lastGesture = 0;
    const gatedStep = (delta: 1 | -1) => {
      const now = Date.now();
      if (now - lastGesture < 620) return;
      lastGesture = now;
      step(delta);
    };

    const onWheel = (event: WheelEvent) => {
      if (overlayOpenRef.current) return;
      if (Math.abs(event.deltaY) < 10) return;
      const dir = event.deltaY > 0 ? 1 : -1;
      const scrollEl = inScrollableRegion(event.target);
      if (scrollEl && scrollableHasRoom(scrollEl, dir)) return;
      event.preventDefault();
      gatedStep(dir);
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
    let touchScrollEl: HTMLElement | null = null;
    // Captured once, at the moment the finger lands — not re-checked at
    // touchend, where the native scroll this same gesture just caused would
    // otherwise make it look like the boundary was always there.
    let touchAtTop = false;
    let touchAtBottom = false;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      touchScrollEl = inScrollableRegion(event.target);
      if (touchScrollEl) {
        const max = touchScrollEl.scrollHeight - touchScrollEl.clientHeight;
        touchAtTop = touchScrollEl.scrollTop <= 1;
        touchAtBottom = touchScrollEl.scrollTop >= max - 1;
      }
    };
    const onTouchEnd = (event: TouchEvent) => {
      const dy = touchStartY - (event.changedTouches[0]?.clientY ?? 0);
      if (Math.abs(dy) < 40) return;
      const dir = dy > 0 ? 1 : -1;
      if (touchScrollEl && (dir > 0 ? !touchAtBottom : !touchAtTop)) return;
      gatedStep(dir);
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

  // Each stage doesn't just cross-fade: it flies. The one leaving lifts up
  // and out, the one arriving rises in from below — the same beat as the
  // homepage's 01 -> 02 step. Direction falls out of where a stage sits
  // relative to the active one, so no separate "which way" state is needed.
  const stageFly = (stageNum: number) => {
    const offset = stageNum === active ? 0 : stageNum < active ? -48 : 48;
    return {
      opacity: stageNum === active ? 1 : 0,
      transform: `translateY(${offset}px)`,
      pointerEvents: stageNum === active ? ("auto" as const) : ("none" as const),
      transition: prefersReducedMotion
        ? "none"
        : `opacity ${dur}s ease, transform ${dur}s cubic-bezier(0.22, 1, 0.36, 1)`,
    };
  };

  // The persistent logo glides into the footer's own (hidden) logo slot as
  // the footer flies up, and back to the header when it leaves — the
  // homepage's footer morph, now on every stage page.
  const logoRef = useRef<HTMLAnchorElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const wasFooterRef = useRef(false);
  useEffect(() => {
    const el = logoRef.current;
    if (!el || wasFooterRef.current === onFooter) {
      wasFooterRef.current = onFooter;
      return;
    }
    wasFooterRef.current = onFooter;
    const header = { x: 16, y: 8, w: 80 };
    // Measure the footer's own (hidden) logo slot so the morph lands on it
    // at any width — the footer is still sliding up as this runs, so undo
    // its live translateY to get the resting position.
    const slotEl = footerRef.current?.querySelector<HTMLElement>("[data-footer-logo]");
    let slot = { x: 16, y: window.innerHeight / 2 - 132, w: 60 };
    if (slotEl && footerRef.current) {
      const r = slotEl.getBoundingClientRect();
      const t = getComputedStyle(footerRef.current).transform;
      const ty = t && t !== "none" ? new DOMMatrixReadOnly(t).m42 : 0;
      slot = { x: Math.round(r.left), y: Math.round(r.top - ty), w: Math.round(r.width) || 60 };
    }
    const instant = prefersReducedMotion;
    if (onFooter) {
      gsap.to(el, {
        x: slot.x - header.x,
        y: slot.y - header.y,
        scale: slot.w / header.w,
        transformOrigin: "0 0",
        duration: instant ? 0.001 : 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    } else {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: instant ? 0.001 : 0.55,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => gsap.set(el, { clearProps: "transform,transformOrigin" }),
      });
    }
  }, [onFooter, prefersReducedMotion]);

  return (
    <>
      <a
        href="#main-stage"
        className="fixed left-2 top-2 z-50 -translate-y-16 rounded-md bg-navy px-4 py-2 font-heading text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div aria-live="polite" className="sr-only" ref={announceRef} />

      {background && (
        <div aria-hidden="true" className="fixed inset-0 z-0">
          {background}
        </div>
      )}

      <header
        style={fade(!onFooter)}
        className="fixed inset-x-0 top-0 z-30 flex h-24 items-center justify-end gap-6 bg-white px-5 sm:gap-8 sm:px-8"
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
          stage-1 jump. It stays visible on the footer, morphing into the
          footer's logo slot (white, chromeless) instead of fading out. */}
      <Link
        ref={logoRef}
        href="/"
        aria-label="Go to homepage"
        style={{
          position: "fixed",
          top: 8,
          left: 16,
          width: 80,
          height: 80,
          backgroundColor: onFooter ? "rgba(255,255,255,0)" : "#FFFFFF",
          borderRadius: onFooter ? 0 : 12,
          padding: onFooter ? 0 : 8,
          transition: prefersReducedMotion
            ? "none"
            : "background-color 0.4s ease, border-radius 0.4s ease, padding 0.4s ease",
        }}
        className="z-40 flex items-center justify-center"
      >
        <Image
          ref={logoImgRef}
          src="/img/logo.png"
          alt="National Association for the Blind"
          width={80}
          height={80}
          className="h-full w-full object-contain"
          style={{
            filter: onFooter ? "brightness(0) invert(1)" : "none",
            transition: prefersReducedMotion ? "none" : "filter 0.4s ease",
          }}
        />
      </Link>

      {hasStepper && (
        <div
          style={{ position: "fixed", top: HEADER_HEIGHT + 40, left: 0, width: "100vw", ...fade(!onFooter) }}
          className="z-20 px-5 sm:px-8 pointer-events-none"
        >
          <div className="mx-auto max-w-6xl">
            <StageStepper active={active} total={total} onSelect={goTo} onDark={!!background} />
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
                ...stageFly(stageNum),
              }}
              className={
                "z-10 flex flex-col items-center justify-start overflow-hidden px-5 sm:px-8 md:justify-center " +
                (background ? "" : "bg-white")
              }
            >
              <div
                ref={(el) => {
                  stageHeadingRefs.current[i] = el;
                }}
                tabIndex={-1}
                className={
                  "flex h-full w-full flex-col items-center justify-start outline-none md:justify-center " +
                  // Leave room for the fixed stepper strip (top: 136, ~50px
                  // tall) above the content. Without a stepper, almost none
                  // is needed.
                  (hasStepper ? "pt-20 md:pt-24" : "pt-3 md:pt-0")
                }
              >
                <StageActiveProvider value={isActive}>{content}</StageActiveProvider>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ghosted prelude: the next stage's heading peeking from the bottom
          edge, re-flying into place on every step (keyed on `active`), then
          the real StageIntro heading rises to meet it. Same hint the
          homepage gives between its sections. */}
      {stageLabels && !onFooter && stageLabels[active] && (
        <div
          key={active}
          aria-hidden="true"
          className="animate-prelude pointer-events-none fixed inset-x-0 bottom-0 z-[17] flex justify-center"
          style={{ "--prelude-opacity": "0.14" } as CSSProperties}
        >
          <span
            className={
              "font-heading text-2xl font-bold sm:text-4xl " + (background ? "text-white" : "text-navy")
            }
          >
            {stageLabels[active]}
          </span>
        </div>
      )}

      <Footer ref={footerRef} active={onFooter} morphLogo />
    </>
  );
}
