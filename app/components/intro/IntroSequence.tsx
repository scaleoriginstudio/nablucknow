"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useIsMobile } from "../../hooks/useIsMobile";
import { SIGHT_STAGES, stageForValue, type SightStage } from "./stages";
import { NAV_LINKS } from "../shared/constants";
import { Footer } from "../shared/Footer";
import { MobileNav } from "../shared/MobileNav";
import { CAUSES, formatINR } from "../../lib/causes-data";
import { useOverlay } from "../shared/OverlayContext";

gsap.registerPlugin(Flip);

const COUNTDOWN_SECONDS = 6;
const HEADER_HEIGHT = 96;
const TOTAL_STAGES = 10;
const HERO_HEADLINE = "Seeing the world differently, together.";
const STAGE1_HEADLINE =
  "Seeing the world differently with National Association for the Blind, State Chapter, Lucknow branch";
const STAGE2_PARAGRAPH =
  "An impact driven NGO that has devoted over 30+ years to the wellbeing of visually impaired individuals, right from primary education to family counselling up until employment support. And we strive to do it while giving them an environment as normal to their upbringing as possible.";
const STAGE2_STORIES = [
  {
    word: "Educate.",
    headline: "Our students dream of growing up to become teachers and doctors.",
    image: "/img/nab/care.jpg",
  },
  {
    word: "Empathise.",
    headline: "“Why should we care?” We're often asked at the start of our sessions.",
    image: "/img/nab/teacher.jpg",
  },
  {
    word: "Empower.",
    headline: "Our vocational graduates go on to build careers of their own.",
    image: "/img/nab/vocational.jpg",
  },
];
const STAGE3_HEADLINE = "Stories beyond Passion.\nStories about Resilience.";
const STAGE3_BODY =
  "An impact driven NGO that has devoted over 30+ years to the wellbeing of visually impaired individuals, right from primary education to family counselling up until employment support. And we strive to do it while giving them an environment as normal to their upbringing as possible.";
const JOURNEY_ENTRIES = [
  { year: "1997", text: "National Association for the Blind, State Chapter, Lucknow, is founded to serve visually impaired individuals across Uttar Pradesh." },
  { year: "2005", text: "Our first residential school opens, offering free primary education to visually impaired children." },
  { year: "2014", text: "A vocational training and employment support programme launches, placing graduates in corporate and government roles." },
  { year: "2023", text: "Family counselling and early-intervention services expand to reach families across the state." },
];
const JOURNEY_ENTRY_HEIGHT = 96;
const VISIBLE_JOURNEY_ROWS = 3;
const TIMELINE_WINDOW_HEIGHT = VISIBLE_JOURNEY_ROWS * JOURNEY_ENTRY_HEIGHT;
const IMPACT_STATS = [
  { value: "5,000+", label: "Individuals supported since 1997" },
  { value: "200+", label: "Students educated through our schools" },
  { value: "1,000+", label: "Families counselled and empowered" },
];
const TIMELINE_SHIFT_X = 180;
const TEAM_MEMBERS = [
  {
    photo: "/img/placeholderimg.png",
    name: "Anjali Verma",
    role: "Programme Director",
    message:
      "Every child who walks into our school for the first time reminds me why we do this. Watching them read braille independently, months later, is the moment that keeps this team going.",
  },
  {
    photo: "/img/placeholderimg.png",
    name: "Rohit Malhotra",
    role: "Head of Vocational Training",
    message:
      "We don't just teach skills. We open doors people assumed were shut for good. Every placement letter our students receive is proof that assumption was wrong.",
  },
  {
    photo: "/img/placeholderimg.png",
    name: "Kavita Nair",
    role: "Family Counsellor",
    message:
      "Parents often arrive here more afraid than their children. My job starts with them: once a family believes in their child's future, everything else becomes possible.",
  },
];
const SPONSORS = [
  "State Bank of India",
  "Jigyasa - Be The Change",
  "Bhawana (Bhartiya Varishtha Nagarik Sewa Samiti)",
  "S. J. Jindal Trust",
  "Sharda Sangh",
  "Amway India Enterprises",
  "Punjab National Bank",
  "Inner Wheel Club of Ladies",
  "Tata Capital (United Way, Mumbai)",
];
const DONATION_AMOUNTS = [500, 1000, 2500, 5000];
const STAGE8_SUB_COUNT = 2;
const CTA_TAB_META = {
  volunteer: { label: "Volunteer", image: "/img/nab/dance.jpg" },
  donate: { label: "Donate", image: "/img/nab/computer-training.jpg" },
  csr: { label: "CSR", image: "/img/nab/compitions.jpg" },
} as const;
const TESTIMONIALS = [
  {
    quote:
      "My daughter came to NAB unable to read a single word. Two years later, she reads Braille faster than I read print. I don't have words for what this place has given us.",
    name: "Parent of a student",
    role: "Lucknow",
  },
  {
    quote:
      "The vocational training didn't just teach me a skill. It gave me back my independence. I have a job now, and I got there on my own terms.",
    name: "Programme graduate",
    role: "Vocational Training batch of 2022",
  },
  {
    quote:
      "I've supported a lot of causes over the years. Few show you, as clearly as NAB does, exactly where your contribution goes and what it changes.",
    name: "Long-time donor",
    role: "Supporter since 2019",
  },
];
// Official UN SDG brand colors — the goals most directly tied to what NAB
// actually does, not a generic "all 17" claim.
const SDG_GOALS = [
  { number: 3, title: "Good Health & Well-being", color: "#4C9F38" },
  { number: 4, title: "Quality Education", color: "#C5192D" },
  { number: 8, title: "Decent Work & Economic Growth", color: "#A21942" },
  { number: 10, title: "Reduced Inequalities", color: "#DD1367" },
  { number: 17, title: "Partnerships for the Goals", color: "#19486A" },
];

type Layout = "countdown" | "compact" | "final";
type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

function StageStepper({ active }: { active: number }) {
  return (
    <div className="flex w-full items-baseline justify-center gap-6 font-body">
      {Array.from({ length: TOTAL_STAGES }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          style={{ transition: "color 500ms ease-out, font-size 500ms ease-out" }}
          className={n === active ? "text-4xl font-bold text-navy" : "text-lg font-semibold text-black/25"}
        >
          {String(n).padStart(2, "0")}
        </span>
      ))}
    </div>
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const logoStyle = (layout: Layout, isMobile: boolean): CSSProperties =>
  layout === "final"
    ? {
        position: "fixed",
        top: 8,
        left: 16,
        width: 80,
        height: 80,
        transform: "none",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 8,
      }
    : {
        position: "fixed",
        top: "38%",
        left: "50%",
        width: isMobile ? 130 : 200,
        height: isMobile ? 130 : 200,
        transform: "translate(-50%, -50%)",
      };

// On mobile the hero video stays a horizontal 16:9 band under the header
// instead of stretching to fill the remaining viewport height — the
// headline then sits below it rather than overlaid on top.
const MOBILE_HERO_VIDEO_HEIGHT = "56.25vw";

const videoStyle = (layout: Layout, isMobile: boolean): CSSProperties =>
  layout === "final"
    ? isMobile
      ? {
          position: "fixed",
          top: HEADER_HEIGHT,
          left: 0,
          width: "100vw",
          height: MOBILE_HERO_VIDEO_HEIGHT,
          transform: "none",
          borderRadius: 0,
          opacity: 1,
        }
      : {
          position: "fixed",
          top: HEADER_HEIGHT,
          left: 0,
          width: "100vw",
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          transform: "none",
          borderRadius: 0,
          opacity: 1,
        }
    : {
        position: "fixed",
        top: "64%",
        left: "50%",
        width: isMobile ? 200 : 260,
        height: isMobile ? 112 : 146,
        transform: "translate(-50%, -50%)",
        borderRadius: 16,
        opacity: layout === "compact" ? 1 : 0,
        pointerEvents: "none",
      };

const headlineStyle = (layout: Layout, isMobile: boolean): CSSProperties =>
  layout === "final"
    ? isMobile
      ? {
          position: "fixed",
          top: `calc(${HEADER_HEIGHT}px + ${MOBILE_HERO_VIDEO_HEIGHT} + 24px)`,
          bottom: "auto",
          left: 20,
          width: "calc(100vw - 40px)",
          maxWidth: "calc(100vw - 40px)",
          transform: "none",
          color: "#23398D",
          fontSize: 28,
          textAlign: "center",
        }
      : {
          position: "fixed",
          top: "auto",
          bottom: 56,
          left: 56,
          width: 820,
          maxWidth: "calc(100vw - 112px)",
          transform: "none",
          color: "#FFFFFF",
          fontSize: 68,
          textAlign: "left",
        }
    : {
        position: "fixed",
        top: "82%",
        left: "50%",
        width: 520,
        maxWidth: "calc(100vw - 48px)",
        transform: "translate(-50%, -50%)",
        color: "#23398D",
        fontSize: isMobile ? 18 : 22,
        textAlign: "center",
        opacity: layout === "compact" ? 1 : 0,
        pointerEvents: "none",
      };

export default function IntroSequence() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const panelId = useId();

  const [layout, setLayout] = useState<Layout>("countdown");
  const [isPaused, setIsPaused] = useState(false);
  const [currentStage, setCurrentStage] = useState<SightStage>(SIGHT_STAGES[0]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [ctaTab, setCtaTab] = useState<"volunteer" | "donate" | "csr">("donate");
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<Stage>(0);
  const { open: overlayOpen, openVolunteer, openDonate } = useOverlay();
  const overlayOpenRef = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const conditionRef = useRef<HTMLSpanElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const macularRef = useRef<HTMLDivElement>(null);
  const pauseButtonRef = useRef<HTMLButtonElement>(null);
  const panelHeadingRef = useRef<HTMLHeadingElement>(null);

  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage1PhotoSlotRef = useRef<HTMLDivElement>(null);
  const stage1HeadlineSlotRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [storyIndex, setStoryIndex] = useState(0);
  const storyIndexRef = useRef(0);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage2WordsRef = useRef<HTMLDivElement>(null);
  const stage2WordsSlotRef = useRef<HTMLDivElement>(null);
  const stage2PhotoRef = useRef<HTMLDivElement>(null);
  const stage2PhotoImgRef = useRef<HTMLImageElement>(null);
  const stage2TextRef = useRef<HTMLDivElement>(null);
  const stage2HeadlineRef = useRef<HTMLHeadingElement>(null);

  const setStory = useCallback((index: number) => {
    storyIndexRef.current = index;
    setStoryIndex(index);
  }, []);

  const [teamIndex, setTeamIndexState] = useState(0);
  const teamIndexRef = useRef(0);
  const setTeam = useCallback((index: number) => {
    teamIndexRef.current = index;
    setTeamIndexState(index);
  }, []);

  const stage8SubIndexRef = useRef(0);
  const stage8MarqueeBlockRef = useRef<HTMLDivElement>(null);
  const stage8CtaBlockRef = useRef<HTMLDivElement>(null);
  const stage8CtaImageRef = useRef<HTMLDivElement>(null);
  const stage8CtaFormRef = useRef<HTMLDivElement>(null);

  const wipeBoxRef = useRef<HTMLDivElement>(null);
  const stepperGroupRef = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage3VisionRef = useRef<HTMLDivElement>(null);
  const stage3PhotoRef = useRef<HTMLDivElement>(null);
  const stage3HeadlineRef = useRef<HTMLHeadingElement>(null);
  const stage3MissionRef = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);
  const journeyHeadingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineListRef = useRef<HTMLDivElement>(null);
  const journeyEntryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const journeyConnectorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const journeyIndexRef = useRef(0);
  const impactStatsRef = useRef<HTMLDivElement>(null);
  const impactStatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const impactIndexRef = useRef(0);
  const causesWipeRef = useRef<HTMLDivElement>(null);
  const stage6Ref = useRef<HTMLDivElement>(null);
  const stage7Ref = useRef<HTMLDivElement>(null);
  const stage7PhotoRef = useRef<HTMLDivElement>(null);
  const stage7TextRef = useRef<HTMLDivElement>(null);
  const stage7PhotoImgRef = useRef<HTMLImageElement>(null);
  const stage7MessageRef = useRef<HTMLDivElement>(null);
  const stage8Ref = useRef<HTMLDivElement>(null);
  const stage9Ref = useRef<HTMLDivElement>(null);
  const stage10Ref = useRef<HTMLDivElement>(null);
  const stage11Ref = useRef<HTMLDivElement>(null);

  const countdownTweenRef = useRef<gsap.core.Tween | null>(null);
  const compactTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const lastLabelRef = useRef<string | null>(null);
  const introSettledRef = useRef(false);
  const activeStageRef = useRef<Stage>(0);
  const isTransitioningRef = useRef(false);
  const transitionTokenRef = useRef(0);
  // The logo's "jump home" walks back one adjacent stage at a time (the only
  // transition shape goToStage knows how to run), forced instant so the walk
  // reads as a single jump rather than a rewind through every stage.
  const goToStageRef = useRef<(next: Stage) => void>(() => {});
  const forceInstantRef = useRef(false);

  useEffect(() => {
    overlayOpenRef.current = overlayOpen !== null;
  }, [overlayOpen]);

  const update = useCallback((v: number) => {
    const pct = Math.max(0, Math.round(v));
    if (percentageRef.current) percentageRef.current.textContent = `${pct}%`;

    const stage = stageForValue(v);
    if (stage.label !== lastLabelRef.current) {
      lastLabelRef.current = stage.label;
      setCurrentStage(stage);
      if (conditionRef.current) conditionRef.current.textContent = stage.label;
    }

    const t = 1 - v / 100; // 0 -> 1 as sight "returns"
    const bgT = Math.pow(t, 2.4);
    const shade = Math.round(lerp(0, 255, bgT));
    if (sectionRef.current) {
      sectionRef.current.style.backgroundColor = `rgb(${shade},${shade},${shade})`;
    }
    const textColor = bgT > 0.55 ? "#23398D" : "#FFFFFF";
    if (percentageRef.current) percentageRef.current.style.color = textColor;
    if (conditionRef.current) conditionRef.current.style.color = textColor;

    const blur = 26 * Math.pow(1 - t, 1.3);
    const contrast = 0.5 + 0.5 * t;
    const grayscale = 1 - t;
    const brightness = 0.35 + 0.65 * t;
    if (logoImgRef.current) {
      logoImgRef.current.style.filter = `blur(${blur.toFixed(1)}px) contrast(${contrast.toFixed(2)}) grayscale(${grayscale.toFixed(2)}) brightness(${brightness.toFixed(2)})`;
    }

    const tunnelStart = 0.25;
    const tunnelEnd = 0.5;
    if (tunnelRef.current) {
      if (t >= tunnelStart && t <= tunnelEnd) {
        const bp = (t - tunnelStart) / (tunnelEnd - tunnelStart);
        let fade = bp < 0.15 ? bp / 0.15 : 1 - bp < 0.15 ? (1 - bp) / 0.15 : 1;
        fade = Math.min(1, Math.max(0, fade));
        const size = lerp(30, 1400, bp);
        tunnelRef.current.style.width = `${size}px`;
        tunnelRef.current.style.height = `${size}px`;
        tunnelRef.current.style.opacity = String(fade);
      } else {
        tunnelRef.current.style.opacity = "0";
      }
    }

    const macStart = 0.75;
    const macEnd = 0.99;
    if (macularRef.current) {
      if (t >= macStart && t <= macEnd) {
        const mp = (t - macStart) / (macEnd - macStart);
        macularRef.current.style.opacity = Math.sin(mp * Math.PI).toFixed(2);
      } else {
        macularRef.current.style.opacity = "0";
      }
    }
  }, []);

  const goFinal = useCallback(() => {
    const targets = [logoWrapRef.current, videoBoxRef.current, headlineRef.current].filter(
      (el) => el !== null,
    ) as HTMLElement[];
    flipStateRef.current = Flip.getState(targets, { props: "color,fontSize" });
    setLayout("final");
  }, []);

  /** Kills every pending intro tween/timeline and snaps straight to the finished layout. */
  const handleSkip = useCallback(() => {
    countdownTweenRef.current?.kill();
    compactTimelineRef.current?.kill();
    flipStateRef.current = null;
    if (logoImgRef.current) logoImgRef.current.style.filter = "none";
    update(0);
    setLayout("final");
  }, [update]);

  // The logo is a permanent "go home" control once the intro has settled —
  // goToStage only knows how to move one adjacent stage at a time, so this
  // walks that same path back to stage 1, forced instant so it reads as a
  // single jump rather than a rewind through every stage in between.
  const handleLogoClick = useCallback(() => {
    if (layout !== "final" || activeStageRef.current <= 1) return;
    forceInstantRef.current = true;
    const advance = () => {
      if (activeStageRef.current <= 1) {
        forceInstantRef.current = false;
        return;
      }
      goToStageRef.current((activeStageRef.current - 1) as Stage);
      // Polled with setTimeout, not requestAnimationFrame — rAF can stall
      // in a backgrounded/throttled tab, which would strand this cascade
      // partway through. setTimeout always fires, just slower when throttled.
      const waitForRelease = () => {
        if (isTransitioningRef.current) {
          window.setTimeout(waitForRelease, 16);
        } else {
          advance();
        }
      };
      window.setTimeout(waitForRelease, 16);
    };
    advance();
  }, [layout]);

  // Phase 1: the sight-loss countdown — the homepage's default landing
  // experience, simulating vision loss before it "returns" into stage 1.
  useGSAP(
    () => {
      if (layout !== "countdown") return;
      if (prefersReducedMotion) {
        handleSkip();
        return;
      }

      update(100);
      const counter = { v: 100 };
      const tween = gsap.to(counter, {
        v: 0,
        duration: COUNTDOWN_SECONDS,
        ease: "power1.inOut",
        onUpdate: () => update(counter.v),
        onComplete: () => {
          update(0);
          if (logoImgRef.current) logoImgRef.current.style.filter = "none";
          gsap.delayedCall(0.5, () => setLayout("compact"));
        },
      });
      countdownTweenRef.current = tween;
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, layout] },
  );

  // Phase 2: video + headline fly in below the held logo, then hand off to phase 3.
  useLayoutEffect(() => {
    if (layout !== "compact" || prefersReducedMotion) return;

    const tl = gsap.timeline();
    tl.fromTo(
      videoBoxRef.current,
      { opacity: 0, y: 24, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out" },
    );
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.25",
    );
    tl.call(goFinal, [], "+=0.6");
    compactTimelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [layout, prefersReducedMotion, goFinal]);

  // Phase 3: morph the compact card into the header + full-bleed hero.
  useLayoutEffect(() => {
    if (layout !== "final") return;

    if (flipStateRef.current && !prefersReducedMotion) {
      Flip.from(flipStateRef.current, {
        duration: 1.1,
        ease: "power2.inOut",
        props: "color,fontSize",
        onComplete: () => {
          introSettledRef.current = true;
        },
      });
      flipStateRef.current = null;
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" },
      );
    } else {
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
      introSettledRef.current = true;
    }
  }, [layout, prefersReducedMotion]);

  // Once settled on the hero, wheel/keyboard/touch gestures step between the
  // hero and stage 1 — the viewport itself never scrolls; content flies
  // out and the next stage's content flies in to replace it.
  useEffect(() => {
    // Shared release path for every lock set by a stage/sub-stage
    // transition below: clears the lock, guarded by the generation token so
    // a stale timer can't release a lock a newer transition now owns.
    const unlock = (myToken: number) => {
      if (transitionTokenRef.current !== myToken) return;
      isTransitioningRef.current = false;
    };

    const rectsOverlap = (a: DOMRect, b: DOMRect) =>
      a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

    // Returns a per-frame callback that recolors the header links and the
    // stage-2 stepper based on whether the wipe box's *current* rect
    // actually overlaps each element right now — a real crossing check,
    // not a guess at timing.
    const colorInverter = (activeNumber: number) => () => {
      const box = wipeBoxRef.current;
      if (!box) return;
      const boxRect = box.getBoundingClientRect();

      if (headerRef.current) {
        const headerCovered = rectsOverlap(boxRect, headerRef.current.getBoundingClientRect());
        headerRef.current.style.backgroundColor = headerCovered ? "transparent" : "#FFFFFF";
      }

      (headerRef.current?.querySelectorAll("a") ?? []).forEach((el) => {
        // The Donate button has its own solid orange fill and always keeps
        // white text — it doesn't participate in the invert.
        if (el.classList.contains("bg-orange")) return;
        const covered = rectsOverlap(boxRect, el.getBoundingClientRect());
        const isVolunteer = el.classList.contains("border-navy");
        el.style.color = covered ? "#FFFFFF" : isVolunteer ? "#23398D" : "#000000";
        if (isVolunteer) el.style.borderColor = covered ? "#FFFFFF" : "#23398D";
      });

      (stepperGroupRef.current?.querySelectorAll("span") ?? []).forEach((el, i) => {
        const covered = rectsOverlap(boxRect, el.getBoundingClientRect());
        const isActive = i + 1 === activeNumber;
        el.style.color = covered
          ? isActive
            ? "#FFFFFF"
            : "rgba(255,255,255,0.35)"
          : isActive
            ? "#23398D"
            : "rgba(0,0,0,0.25)";
      });
    };

    const goToStage = (next: Stage) => {
      const current = activeStageRef.current;
      if (isTransitioningRef.current || next === current) return;
      isTransitioningRef.current = true;
      // Flip the "which stage is active" state (and with it, the stepper
      // number and inert flags) right when the transition starts, in step
      // with the content that begins animating immediately — not at the
      // end, which left the stepper showing the old number while the new
      // stage's content was already on screen.
      activeStageRef.current = next;
      setActiveStage(next);
      try {
      const dur = prefersReducedMotion || forceInstantRef.current ? 0.001 : undefined;
      const flipTargets = [videoBoxRef.current, headlineRef.current].filter(
        (el) => el !== null,
      ) as HTMLElement[];
      const newTargets = [paragraphRef.current, ctaRef.current];
      const stage2Targets = [stage2PhotoRef.current, stage2TextRef.current];

      // A generation token guards the unlock: only the most recent
      // transition's own completion (or its safety-net timeout, in case
      // onComplete is ever missed) is allowed to release the lock.
      transitionTokenRef.current += 1;
      const myToken = transitionTokenRef.current;
      const release = () => {
        unlock(myToken);
      };
      const tl = gsap.timeline({ onComplete: release });
      window.setTimeout(release, 2000);

      if (current === 1 && next === 2) {
        setStory(0);
        const slotRect = stage2WordsSlotRef.current?.getBoundingClientRect();

        tl.set(stage1Ref.current, { pointerEvents: "none" });
        tl.to([...newTargets, videoBoxRef.current, headlineRef.current], {
          opacity: 0,
          y: -60,
          duration: dur ?? 0.4,
          stagger: dur ? 0 : 0.05,
          ease: "power2.in",
        });
        tl.to(stage1Ref.current, { opacity: 0, duration: dur ?? 0.3 }, dur ? 0 : "-=0.2");
        tl.set(stage2Ref.current, { pointerEvents: "auto" });
        tl.to(stage2Ref.current, { opacity: 1, duration: dur ?? 0.35 }, dur ? 0 : "-=0.1");
        // The word list that was peeking up from the bottom of stage 1
        // is the very same element — it just flies up into its resting spot.
        if (slotRect) {
          tl.to(
            stage2WordsRef.current,
            {
              top: slotRect.top,
              left: slotRect.left,
              width: slotRect.width,
              opacity: 1,
              duration: dur ?? 0.7,
              ease: "power2.out",
            },
            dur ? 0 : "-=0.5",
          );
        }
        tl.fromTo(
          stage2Targets,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: dur ?? 0.6, stagger: dur ? 0 : 0.1, ease: "power2.out" },
          dur ? 0 : "-=0.15",
        );
      } else if (current === 2 && next === 1) {
        const slotRect = stage2WordsSlotRef.current?.getBoundingClientRect();

        tl.set(stage2Ref.current, { pointerEvents: "none" });
        tl.to(stage2Targets.slice().reverse(), {
          opacity: 0,
          y: 60,
          duration: dur ?? 0.35,
          stagger: dur ? 0 : 0.06,
          ease: "power2.in",
        });
        if (slotRect) {
          tl.to(
            stage2WordsRef.current,
            {
              top: window.innerHeight - 64,
              left: slotRect.left,
              opacity: 0.15,
              duration: dur ?? 0.5,
              ease: "power2.in",
            },
            0,
          );
        }
        tl.to(stage2Ref.current, { opacity: 0, duration: dur ?? 0.3 }, dur ? 0 : "-=0.2");
        tl.set(stage1Ref.current, { pointerEvents: "auto" });
        tl.to(stage1Ref.current, { opacity: 1, duration: dur ?? 0.3 }, dur ? 0 : "-=0.1");
        tl.fromTo(
          [...newTargets, videoBoxRef.current, headlineRef.current],
          { opacity: 0, y: -60 },
          { opacity: 1, y: 0, duration: dur ?? 0.5, stagger: dur ? 0 : 0.08, ease: "power2.out" },
          dur ? 0 : "-=0.1",
        );
      } else if (current === 2 && next === 3) {
        // The corner tab grows to cover the whole viewport; the header and
        // stepper invert to white exactly where the navy edge has reached —
        // checked against real geometry every frame, not just timed to hope
        // it lines up.
        const stage3Targets = [
          stage3HeadlineRef.current,
          stage3VisionRef.current,
          stage3PhotoRef.current,
          stage3MissionRef.current,
        ];
        const invert = colorInverter(3);

        tl.set(stage2Ref.current, { pointerEvents: "none" });
        tl.to(stage2Targets, { opacity: 0, duration: dur ?? 0.3, ease: "power1.out" }, 0);
        tl.set(wipeBoxRef.current, { pointerEvents: "auto" });
        tl.to(
          wipeBoxRef.current,
          {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            duration: dur ?? 0.9,
            ease: "power2.inOut",
            onUpdate: invert,
          },
          0,
        );
        tl.set(stage3Ref.current, { pointerEvents: "auto" });
        tl.fromTo(
          stage3Targets,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: dur ?? 0.6, stagger: dur ? 0 : 0.12, ease: "power2.out" },
          dur ? 0 : "-=0.2",
        );
        tl.call(invert);
      } else if (current === 3 && next === 2) {
        setStory(STAGE2_STORIES.length - 1);
        const stage3Targets = [
          stage3HeadlineRef.current,
          stage3VisionRef.current,
          stage3PhotoRef.current,
          stage3MissionRef.current,
        ];
        const invert = colorInverter(3);

        tl.set(stage3Ref.current, { pointerEvents: "none" });
        tl.to(stage3Targets.slice().reverse(), {
          opacity: 0,
          y: 40,
          duration: dur ?? 0.35,
          stagger: dur ? 0 : 0.08,
          ease: "power2.in",
        });
        tl.to(
          wipeBoxRef.current,
          {
            top: "auto",
            bottom: 40,
            left: "auto",
            right: 40,
            width: 160,
            height: 120,
            borderRadius: "16px 0 16px 0",
            duration: dur ?? 0.7,
            ease: "power2.inOut",
            onUpdate: invert,
          },
          dur ? 0 : 0.1,
        );
        tl.set(wipeBoxRef.current, { pointerEvents: "none" });
        tl.set(stage2Ref.current, { pointerEvents: "auto" });
        tl.to(stage2Targets, { opacity: 1, duration: dur ?? 0.3, ease: "power1.in" }, dur ? 0 : "-=0.2");
        tl.call(invert);
        // The wipe box has fully retreated off-screen — clear the inline
        // colors it wrote so the stepper/header fall back to their normal
        // class-driven colors instead of staying stuck on a stale value
        // from this wipe the next time a completely unrelated stage
        // transition (e.g. stage2 <-> stage1) runs.
        tl.call(() => {
          gsap.set(stepperGroupRef.current?.querySelectorAll("span") ?? [], { clearProps: "color" });
          gsap.set(headerRef.current?.querySelectorAll("a") ?? [], { clearProps: "color,borderColor" });
          if (headerRef.current) gsap.set(headerRef.current, { clearProps: "backgroundColor" });
        });
      } else if (current === 3 && next === 4) {
        // Same navy field as stage 3 — the Vision/Photo/Mission row clears
        // out and "Our Journey" flies into the exact spot the "Stories
        // beyond Passion" headline just vacated.
        const stage3Grid = [stage3VisionRef.current, stage3PhotoRef.current, stage3MissionRef.current];

        // Always arrive at the Journey timeline fresh, heading-only —
        // any previously revealed entries collapse back instantly, and the
        // scroll window resets to its start.
        journeyIndexRef.current = 0;
        gsap.set(timelineListRef.current, { y: 0 });
        gsap.set(journeyEntryRefs.current.filter(Boolean), { opacity: 0, y: 40 });
        gsap.set(journeyConnectorRefs.current.filter(Boolean), { scaleY: 0 });
        // The wipe box never moves during this transition (it's already
        // fully expanded from stage 3), so the stepper's white-on-navy
        // contrast just needs recomputing once for the new active number.
        colorInverter(4)();

        tl.set(stage3Ref.current, { pointerEvents: "none" });
        tl.to(stage3Grid, { opacity: 0, y: -20, duration: dur ?? 0.35, stagger: dur ? 0 : 0.05, ease: "power2.in" }, 0);
        tl.to(stage3HeadlineRef.current, { opacity: 0, y: -30, duration: dur ?? 0.4, ease: "power2.in" }, 0);
        tl.set(stage4Ref.current, { pointerEvents: "auto" });
        tl.to(stage4Ref.current, { opacity: 1, duration: dur ?? 0.3 }, dur ? 0 : "-=0.2");
        tl.fromTo(
          journeyHeadingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: dur ?? 0.5, ease: "power2.out" },
          dur ? 0 : "-=0.25",
        );
      } else if (current === 4 && next === 3) {
        const stage3Grid = [stage3VisionRef.current, stage3PhotoRef.current, stage3MissionRef.current];

        colorInverter(3)();
        tl.set(stage4Ref.current, { pointerEvents: "none" });
        tl.to(journeyHeadingRef.current, { opacity: 0, y: 30, duration: dur ?? 0.35, ease: "power2.in" });
        tl.to(stage4Ref.current, { opacity: 0, duration: dur ?? 0.3 }, dur ? 0 : "-=0.2");
        tl.set(stage3Ref.current, { pointerEvents: "auto" });
        tl.fromTo(
          stage3HeadlineRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: dur ?? 0.5, ease: "power2.out" },
          dur ? 0 : "-=0.2",
        );
        tl.fromTo(
          stage3Grid,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: dur ?? 0.5, stagger: dur ? 0 : 0.06, ease: "power2.out" },
          dur ? 0 : "-=0.3",
        );
      } else if (current === 4 && next === 5) {
        // The timeline (heading stays put) slides right to make room, and
        // the first impact stat flies up into the space it vacated on the
        // left — both part of the same scroll that leaves the timeline.
        impactIndexRef.current = 1;
        gsap.set(impactStatRefs.current.filter(Boolean), { opacity: 0, y: 60 });
        colorInverter(5)();

        tl.to(timelineRef.current, { x: TIMELINE_SHIFT_X, duration: dur ?? 0.6, ease: "power2.inOut" }, 0);
        tl.fromTo(
          impactStatRefs.current[0],
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: dur ?? 0.5, ease: "power2.out" },
          dur ? 0 : 0.15,
        );
      } else if (current === 5 && next === 4) {
        colorInverter(4)();
        impactIndexRef.current = 0;
        tl.to(timelineRef.current, { x: 0, duration: dur ?? 0.6, ease: "power2.inOut" }, 0);
        tl.to(impactStatRefs.current.filter(Boolean), { opacity: 0, y: 60, duration: dur ?? 0.3, ease: "power2.in" }, 0);
      } else if (current === 5 && next === 6) {
        // A white curtain grows from the bottom-right corner to cover the
        // whole screen in one continuous motion, then retreats the same
        // way — no separate scale-in step, so it reads as one sweep, not
        // several. The Causes section is already sitting there at full
        // opacity the whole time; the curtain's motion is the only thing
        // that reveals it, not a fade-in.
        tl.set(causesWipeRef.current, { pointerEvents: "auto" });
        tl.to(causesWipeRef.current, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          duration: dur ?? 0.8,
          ease: "power2.inOut",
        });
        tl.set(stage4Ref.current, { pointerEvents: "none" });
        // Flip opacity instantly (no tween) while fully covered, so the
        // reveal reads as "the curtain moved," never as a fade.
        tl.set(stage6Ref.current, { opacity: 1, pointerEvents: "auto" });
        tl.call(() => {
          gsap.set(stepperGroupRef.current?.querySelectorAll("span") ?? [], { clearProps: "color" });
          gsap.set(headerRef.current?.querySelectorAll("a") ?? [], { clearProps: "color,borderColor" });
          if (headerRef.current) gsap.set(headerRef.current, { clearProps: "backgroundColor" });
        });
        tl.to(causesWipeRef.current, {
          top: "auto",
          bottom: 40,
          left: "auto",
          right: 40,
          width: 0,
          height: 0,
          borderRadius: "16px 0 16px 0",
          duration: dur ?? 0.8,
          ease: "power2.inOut",
        });
        tl.set(causesWipeRef.current, { pointerEvents: "none" });
      } else if (current === 6 && next === 5) {
        tl.set(causesWipeRef.current, { pointerEvents: "auto" });
        tl.to(causesWipeRef.current, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          duration: dur ?? 0.8,
          ease: "power2.inOut",
        });
        tl.set(stage6Ref.current, { opacity: 0, pointerEvents: "none" });
        tl.set(stage4Ref.current, { pointerEvents: "auto" });
        tl.call(() => colorInverter(5)());
        tl.to(causesWipeRef.current, {
          top: "auto",
          bottom: 40,
          left: "auto",
          right: 40,
          width: 0,
          height: 0,
          borderRadius: "16px 0 16px 0",
          duration: dur ?? 0.8,
          ease: "power2.inOut",
        });
        tl.set(causesWipeRef.current, { pointerEvents: "none" });
      } else if (current === 6 && next === 7) {
        // Both stages sit on the same white field — a plain fly, no wipe
        // needed since there's no backdrop color to hand off.
        setTeam(0);
        tl.set(stage6Ref.current, { pointerEvents: "none" });
        tl.to(stage6Ref.current, { opacity: 0, y: -40, duration: dur ?? 0.4, ease: "power2.in" });
        tl.set(stage7Ref.current, { opacity: 1, pointerEvents: "auto" });
        tl.fromTo(
          [stage7PhotoRef.current, stage7TextRef.current],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: dur ?? 0.6, stagger: dur ? 0 : 0.1, ease: "power2.out" },
          dur ? 0 : "-=0.15",
        );
      } else if (current === 7 && next === 6) {
        tl.set(stage7Ref.current, { pointerEvents: "none" });
        tl.to(
          [stage7PhotoRef.current, stage7TextRef.current],
          { opacity: 0, y: 40, duration: dur ?? 0.35, stagger: dur ? 0 : 0.06, ease: "power2.in" },
        );
        tl.set(stage7Ref.current, { opacity: 0 }, dur ? 0 : "+=0.05");
        tl.set(stage6Ref.current, { pointerEvents: "auto" });
        tl.to(stage6Ref.current, { opacity: 1, y: 0, duration: dur ?? 0.5, ease: "power2.out" });
      } else if (current === 7 && next === 8) {
        // Same white field again — plain fly, no wipe needed. Always
        // arrive at stage 8 fresh, showing the marquee sub-section.
        // The CTA starts as a ghosted peek from the bottom edge, hinting
        // there's more below, so it can snap fully into place later
        // instead of fading in from nothing.
        stage8SubIndexRef.current = 0;
        gsap.set(stage8MarqueeBlockRef.current, { opacity: 1, y: 0, pointerEvents: "auto" });
        gsap.set(stage8CtaBlockRef.current, { yPercent: 55, opacity: 0.35, pointerEvents: "none" });
        tl.set(stage7Ref.current, { pointerEvents: "none" });
        tl.to(
          [stage7PhotoRef.current, stage7TextRef.current],
          { opacity: 0, y: -40, duration: dur ?? 0.4, stagger: dur ? 0 : 0.06, ease: "power2.in" },
        );
        tl.set(stage7Ref.current, { opacity: 0 }, dur ? 0 : "+=0.05");
        tl.set(stage8Ref.current, { opacity: 1, pointerEvents: "auto" });
      } else if (current === 8 && next === 7) {
        // A symmetric crossfade (both tweened, not one instant + one
        // slow) so there's never a window where neither's opaque white
        // background is covering what's underneath.
        tl.set(stage8Ref.current, { pointerEvents: "none" });
        tl.set(stage7Ref.current, { pointerEvents: "auto" });
        tl.to(stage8Ref.current, { opacity: 0, duration: dur ?? 0.3 }, 0);
        tl.to(stage7Ref.current, { opacity: 1, duration: dur ?? 0.3 }, 0);
        tl.fromTo(
          [stage7PhotoRef.current, stage7TextRef.current],
          { opacity: 0, y: -40 },
          { opacity: 1, y: 0, duration: dur ?? 0.5, stagger: dur ? 0 : 0.08, ease: "power2.out" },
          dur ? 0 : "-=0.1",
        );
      } else if (current === 8 && next === 9) {
        // Same white field again — symmetric crossfade, same pattern as
        // 7<->8 and 8<->7.
        tl.set(stage8Ref.current, { pointerEvents: "none" });
        tl.set(stage9Ref.current, { pointerEvents: "auto" });
        tl.to(stage8Ref.current, { opacity: 0, duration: dur ?? 0.3 }, 0);
        tl.to(stage9Ref.current, { opacity: 1, duration: dur ?? 0.3 }, 0);
      } else if (current === 9 && next === 8) {
        tl.set(stage9Ref.current, { pointerEvents: "none" });
        tl.set(stage8Ref.current, { pointerEvents: "auto" });
        tl.to(stage9Ref.current, { opacity: 0, duration: dur ?? 0.3 }, 0);
        tl.to(stage8Ref.current, { opacity: 1, duration: dur ?? 0.3 }, 0);
      } else if (current === 9 && next === 10) {
        tl.set(stage9Ref.current, { pointerEvents: "none" });
        tl.set(stage10Ref.current, { pointerEvents: "auto" });
        tl.to(stage9Ref.current, { opacity: 0, duration: dur ?? 0.3 }, 0);
        tl.to(stage10Ref.current, { opacity: 1, duration: dur ?? 0.3 }, 0);
      } else if (current === 10 && next === 9) {
        tl.set(stage10Ref.current, { pointerEvents: "none" });
        tl.set(stage9Ref.current, { pointerEvents: "auto" });
        tl.to(stage10Ref.current, { opacity: 0, duration: dur ?? 0.3 }, 0);
        tl.to(stage9Ref.current, { opacity: 1, duration: dur ?? 0.3 }, 0);
      } else if (current === 10 && next === 11) {
        // The footer isn't a numbered step and has no navbar of its own —
        // hide the header and stepper entirely rather than inverting them.
        // The footer's own opacity is driven by the Footer component itself
        // (from the `active` prop derived off activeStage), not tweened
        // here — it owns a hardcoded full-viewport inline style, and a
        // GSAP write here would just get overwritten on the next render.
        tl.set(stage10Ref.current, { pointerEvents: "none" });
        tl.set(headerRef.current, { pointerEvents: "none" });
        tl.set(stepperGroupRef.current, { pointerEvents: "none" });
        tl.to(stage10Ref.current, { opacity: 0, duration: dur ?? 0.3 }, 0);
        tl.to(headerRef.current, { opacity: 0, duration: dur ?? 0.3 }, 0);
        tl.to(stepperGroupRef.current, { opacity: 0, duration: dur ?? 0.3 }, 0);
      } else if (current === 11 && next === 10) {
        tl.set(stage10Ref.current, { pointerEvents: "auto" });
        tl.set(headerRef.current, { pointerEvents: "auto" });
        tl.set(stepperGroupRef.current, { pointerEvents: "auto" });
        tl.to(stage10Ref.current, { opacity: 1, duration: dur ?? 0.3 }, 0);
        tl.to(headerRef.current, { opacity: 1, duration: dur ?? 0.3 }, 0);
        tl.to(stepperGroupRef.current, { opacity: 1, duration: dur ?? 0.3 }, 0);
      } else if (next === 1 && current === 0) {
        // The hero video shrinks and snaps into the photo slot; the hero
        // heading carries over into the stage 1 heading position — one
        // continuous element for each, not a fade-out/fade-in swap.
        const photoRect = stage1PhotoSlotRef.current?.getBoundingClientRect();
        const headlineRect = stage1HeadlineSlotRef.current?.getBoundingClientRect();
        const flipState = Flip.getState(flipTargets, { props: "color,fontSize,borderRadius" });

        if (photoRect) {
          gsap.set(videoBoxRef.current, {
            position: "fixed",
            top: photoRect.top,
            left: photoRect.left,
            width: photoRect.width,
            height: photoRect.height,
            borderRadius: 16,
          });
        }
        if (headlineRef.current) headlineRef.current.textContent = STAGE1_HEADLINE;
        if (headlineRect) {
          gsap.set(headlineRef.current, {
            position: "fixed",
            top: headlineRect.top,
            bottom: "auto",
            left: headlineRect.left,
            width: headlineRect.width,
            color: "#23398D",
            fontSize: 32,
            textAlign: "center",
          });
        }

        tl.set(videoBoxRef.current, { pointerEvents: "none" });
        tl.set(stage1Ref.current, { pointerEvents: "auto" });
        tl.add(
          Flip.from(flipState, { duration: dur ?? 0.9, ease: "power2.inOut", props: "color,fontSize,borderRadius" }),
          0,
        );
        tl.to(stage1Ref.current, { opacity: 1, duration: dur ?? 0.35 }, 0);
        tl.fromTo(
          [stepperGroupRef.current, ...newTargets],
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: dur ?? 0.6, stagger: dur ? 0 : 0.1, ease: "power2.out" },
          dur ? 0 : 0.3,
        );
      } else if (next === 0 && current === 1) {
        const flipState = Flip.getState(flipTargets, { props: "color,fontSize,borderRadius" });

        if (headlineRef.current) headlineRef.current.textContent = HERO_HEADLINE;
        gsap.set(videoBoxRef.current, videoStyle("final", isMobile));
        gsap.set(headlineRef.current, headlineStyle("final", isMobile));

        tl.set(stage1Ref.current, { pointerEvents: "none" });
        tl.to([...newTargets, stepperGroupRef.current].reverse(), {
          opacity: 0,
          y: 60,
          duration: dur ?? 0.35,
          stagger: dur ? 0 : 0.06,
          ease: "power2.in",
        });
        tl.add(
          Flip.from(flipState, { duration: dur ?? 0.9, ease: "power2.inOut", props: "color,fontSize,borderRadius" }),
          dur ? 0 : 0.15,
        );
        tl.to(stage1Ref.current, { opacity: 0, duration: dur ?? 0.35 }, dur ? 0 : 0.15);
        tl.set(videoBoxRef.current, { pointerEvents: "auto" });
      }
      } catch {
        isTransitioningRef.current = false;
      }
    };
    goToStageRef.current = goToStage;

    const cycleStory = (nextIndex: number) => {
      isTransitioningRef.current = true;
      setStory(nextIndex);
      // Same generation-token guard as goToStage's release: if a stage
      // transition starts before this unlock fires, this stale timer must
      // not clear a lock that transition now owns.
      transitionTokenRef.current += 1;
      const myToken = transitionTokenRef.current;
      window.setTimeout(
        () => {
          unlock(myToken);
        },
        prefersReducedMotion ? 50 : 450,
      );
    };

    const cycleTeam = (nextIndex: number) => {
      isTransitioningRef.current = true;
      setTeam(nextIndex);
      transitionTokenRef.current += 1;
      const myToken = transitionTokenRef.current;
      window.setTimeout(
        () => {
          unlock(myToken);
        },
        prefersReducedMotion ? 50 : 450,
      );
    };

    // Crossfades between stage 8's sub-sections (marquee, donate CTA, and
    // more to come) — these are structurally different layouts, not a
    // text swap, so each gets its own persistent block faded in turn.
    const cycleStage8Sub = (nextIndex: number) => {
      isTransitioningRef.current = true;
      stage8SubIndexRef.current = nextIndex;
      const dur = prefersReducedMotion ? 0.05 : 0.4;
      // A real timeline (not parallel gsap.to calls) so the outgoing
      // section is fully gone before the incoming one starts moving in —
      // no window where both are visible and overlapping.
      const tl = gsap.timeline();

      if (nextIndex === 1) {
        gsap.set(stage8MarqueeBlockRef.current, { pointerEvents: "none" });
        tl.to(stage8MarqueeBlockRef.current, { opacity: 0, y: -40, duration: dur, ease: "power2.in" });
        tl.set(stage8CtaBlockRef.current, { pointerEvents: "auto" });
        tl.to(stage8CtaBlockRef.current, { yPercent: 0, opacity: 1, duration: dur, ease: "power2.out" });
      } else {
        tl.set(stage8CtaBlockRef.current, { pointerEvents: "none" });
        tl.to(stage8CtaBlockRef.current, { yPercent: 55, opacity: 0.35, duration: dur, ease: "power2.in" });
        tl.set(stage8MarqueeBlockRef.current, { pointerEvents: "auto" });
        tl.to(stage8MarqueeBlockRef.current, { opacity: 1, y: 0, duration: dur, ease: "power2.out" });
      }

      transitionTokenRef.current += 1;
      const myToken = transitionTokenRef.current;
      window.setTimeout(
        () => {
          unlock(myToken);
        },
        dur * 2 * 1000,
      );
    };

    // Reveals (or hides) one more journey entry inside a fixed-height
    // window: once entries outnumber what the window can show, the list
    // scrolls up so the newest entry lands at the bottom while the oldest
    // leaves from the top — same sub-stepping pattern as cycleStory.
    const cycleJourney = (nextIndex: number) => {
      isTransitioningRef.current = true;
      const prevIndex = journeyIndexRef.current;
      journeyIndexRef.current = nextIndex;
      const dur = prefersReducedMotion ? 0.05 : 0.5;

      const scrollOffset = Math.max(0, nextIndex - VISIBLE_JOURNEY_ROWS) * JOURNEY_ENTRY_HEIGHT;
      gsap.to(timelineListRef.current, {
        y: -scrollOffset,
        duration: dur,
        ease: "power2.out",
      });

      if (nextIndex > prevIndex) {
        const i = nextIndex - 1;
        const entryEl = journeyEntryRefs.current[i];
        const connectorEl = journeyConnectorRefs.current[i];
        if (connectorEl) gsap.to(connectorEl, { scaleY: 1, duration: dur, ease: "power2.out" });
        if (entryEl) gsap.fromTo(entryEl, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: "power2.out" });
      } else if (nextIndex < prevIndex) {
        const i = prevIndex - 1;
        const entryEl = journeyEntryRefs.current[i];
        const connectorEl = journeyConnectorRefs.current[i];
        if (entryEl) gsap.to(entryEl, { opacity: 0, y: 40, duration: dur, ease: "power2.in" });
        if (connectorEl) gsap.to(connectorEl, { scaleY: 0, duration: dur, ease: "power2.in" });
      }

      // Same generation-token guard as cycleStory's unlock.
      transitionTokenRef.current += 1;
      const myToken = transitionTokenRef.current;
      window.setTimeout(
        () => {
          unlock(myToken);
        },
        dur * 1000,
      );
    };

    // Reveals (or hides) one more impact stat within stage 5 — the first
    // one already flew in as part of the 4->5 transition itself, so this
    // only ever handles the second and third.
    const cycleImpact = (nextIndex: number) => {
      isTransitioningRef.current = true;
      const prevIndex = impactIndexRef.current;
      impactIndexRef.current = nextIndex;
      const dur = prefersReducedMotion ? 0.05 : 0.5;

      if (nextIndex > prevIndex) {
        const el = impactStatRefs.current[nextIndex - 1];
        if (el) gsap.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: dur, ease: "power2.out" });
      } else if (nextIndex < prevIndex) {
        const el = impactStatRefs.current[prevIndex - 1];
        if (el) gsap.to(el, { opacity: 0, y: 60, duration: dur, ease: "power2.in" });
      }

      transitionTokenRef.current += 1;
      const myToken = transitionTokenRef.current;
      window.setTimeout(
        () => {
          unlock(myToken);
        },
        dur * 1000,
      );
    };

    const step = (delta: 1 | -1) => {
      if (isTransitioningRef.current || overlayOpenRef.current) return;

      // Stage 2 has its own sub-steps (the three stories) that must be
      // exhausted before moving on to the next/previous stage.
      if (activeStageRef.current === 2) {
        const nextStory = storyIndexRef.current + delta;
        if (nextStory >= 0 && nextStory < STAGE2_STORIES.length) {
          cycleStory(nextStory);
          return;
        }
        goToStage((delta > 0 ? 3 : 1) as Stage);
        return;
      }

      // Stage 4 has its own sub-steps — one more journey entry revealed
      // per step — that must be exhausted before stepping back to stage 3
      // or forward into stage 5.
      if (activeStageRef.current === 4) {
        const nextJourney = journeyIndexRef.current + delta;
        if (nextJourney >= 0 && nextJourney <= JOURNEY_ENTRIES.length) {
          cycleJourney(nextJourney);
          return;
        }
        goToStage((delta > 0 ? 5 : 3) as Stage);
        return;
      }

      // Stage 5 has its own sub-steps — the second and third impact stats
      // — that must be exhausted before stepping back to stage 4 or
      // forward into stage 6.
      if (activeStageRef.current === 5) {
        const nextImpact = impactIndexRef.current + delta;
        if (nextImpact >= 1 && nextImpact <= IMPACT_STATS.length) {
          cycleImpact(nextImpact);
          return;
        }
        goToStage((delta > 0 ? 6 : 4) as Stage);
        return;
      }

      // Stage 7 has its own sub-steps (each team member) that must be
      // exhausted before stepping back to stage 6 or forward into stage 8.
      if (activeStageRef.current === 7) {
        const nextTeam = teamIndexRef.current + delta;
        if (nextTeam >= 0 && nextTeam < TEAM_MEMBERS.length) {
          cycleTeam(nextTeam);
          return;
        }
        goToStage((delta > 0 ? 8 : 6) as Stage);
        return;
      }

      // Stage 8 has its own sub-sections (marquee, donate CTA, and more to
      // come) that must be exhausted before stepping back to stage 7.
      // There's nothing built past the CTA yet, so exhausting forward is
      // a no-op for now.
      if (activeStageRef.current === 8) {
        const nextSub = stage8SubIndexRef.current + delta;
        if (nextSub >= 0 && nextSub < STAGE8_SUB_COUNT) {
          cycleStage8Sub(nextSub);
          return;
        }
        goToStage((delta > 0 ? 9 : 7) as Stage);
        return;
      }

      const target = Math.min(11, Math.max(0, activeStageRef.current + delta)) as Stage;
      goToStage(target);
    };

    const onWheel = (event: WheelEvent) => {
      if (!introSettledRef.current) return;
      if (Math.abs(event.deltaY) < 4) return;
      event.preventDefault();
      step(event.deltaY > 0 ? 1 : -1);
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!introSettledRef.current) return;
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
      if (!introSettledRef.current) return;
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
  }, [prefersReducedMotion, isMobile, setStory, setTeam]);

  useEffect(() => {
    if (isPaused) panelHeadingRef.current?.focus();
  }, [isPaused]);

  // Story 0/1/2 within stage 2 crossfades on every change — driven purely by
  // scroll/keyboard steps, never on a timer.
  useEffect(() => {
    if (!stage2HeadlineRef.current) return;
    const dur = prefersReducedMotion ? 0.001 : 0.4;
    gsap.fromTo(
      stage2HeadlineRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: dur, ease: "power2.out" },
    );
    if (stage2PhotoImgRef.current) {
      gsap.fromTo(stage2PhotoImgRef.current, { opacity: 0 }, { opacity: 1, duration: dur, ease: "power2.out" });
    }
  }, [storyIndex, prefersReducedMotion]);

  // Team member 0/1/2 within stage 7 crossfades on every change — same
  // pattern as the stage 2 stories.
  useEffect(() => {
    if (!stage7MessageRef.current) return;
    const dur = prefersReducedMotion ? 0.001 : 0.4;
    gsap.fromTo(
      stage7MessageRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: dur, ease: "power2.out" },
    );
    if (stage7PhotoImgRef.current) {
      gsap.fromTo(stage7PhotoImgRef.current, { opacity: 0 }, { opacity: 1, duration: dur, ease: "power2.out" });
    }
  }, [teamIndex, prefersReducedMotion]);

  // The CTA tab's form and image tint crossfade on every switch — same
  // pattern as the stage 2 stories and stage 7 team members.
  useEffect(() => {
    if (!stage8CtaFormRef.current) return;
    const dur = prefersReducedMotion ? 0.001 : 0.35;
    gsap.fromTo(
      stage8CtaFormRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: dur, ease: "power2.out" },
    );
    if (stage8CtaImageRef.current) {
      gsap.fromTo(stage8CtaImageRef.current, { opacity: 0 }, { opacity: 1, duration: dur, ease: "power2.out" });
    }
  }, [ctaTab, prefersReducedMotion]);

  // The corner tab flies in (scales up from its own corner) exactly when
  // "Empower" is reached, and flies back out the moment it isn't showing —
  // never a plain opacity fade.
  useEffect(() => {
    if (!wipeBoxRef.current) return;
    const showing =
      activeStage === 3 ||
      activeStage === 4 ||
      activeStage === 5 ||
      activeStage === 6 ||
      (activeStage === 2 && storyIndex === STAGE2_STORIES.length - 1);
    gsap.to(wipeBoxRef.current, {
      scale: showing ? 1 : 0,
      duration: prefersReducedMotion ? 0.001 : 0.45,
      ease: showing ? "back.out(1.6)" : "power2.in",
    });
  }, [activeStage, storyIndex, prefersReducedMotion]);

  const handleTogglePause = useCallback(() => {
    const tween = countdownTweenRef.current;
    if (!tween) return;
    if (tween.paused()) {
      tween.play();
      setIsPaused(false);
    } else {
      tween.pause();
      setIsPaused(true);
    }
  }, []);

  const handleResume = useCallback(() => {
    countdownTweenRef.current?.play();
    setIsPaused(false);
    pauseButtonRef.current?.focus();
  }, []);

  const handlePanelKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") handleResume();
    },
    [handleResume],
  );

  const handleToggleVideo = useCallback(() => {
    const video = videoElRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {layout === "countdown" && (
        <p className="sr-only">
          Welcome to National Association for the Blind. This intro briefly
          illustrates what different levels of vision loss look like. Use the
          Skip button to go straight to the site, or Pause to read about each
          condition in plain language.
        </p>
      )}

      {/* Decorative vision-simulation layers — purely visual, hidden from AT. */}
      {layout === "countdown" && (
        <>
          <div
            ref={tunnelRef}
            aria-hidden="true"
            className="pointer-events-none fixed top-1/2 left-1/2 z-50 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
            style={{ boxShadow: "0 0 0 9999px #000000" }}
          />
          <div
            ref={macularRef}
            aria-hidden="true"
            className="pointer-events-none fixed top-1/2 left-1/2 z-50 h-45 w-45 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-md"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 75%)",
            }}
          />
        </>
      )}

      {/* Header: fades in once the hero settles into its final layout. */}
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-30 flex h-24 items-center justify-end gap-8 bg-white px-8 opacity-0"
      >
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.href === "/" ? "page" : undefined}
              className={
                "font-body text-sm font-semibold text-black transition-colors hover:text-navy" +
                (link.href === "/" ? " underline decoration-orange decoration-2 underline-offset-4" : "")
              }
            >
              {link.label}
            </Link>
          ))}
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

      {/* The persistent logo — one continuous element from the countdown through to the header. */}
      <div
        ref={logoWrapRef}
        style={logoStyle(layout, isMobile)}
        className={"z-40 flex items-center justify-center" + (layout === "final" ? " cursor-pointer" : "")}
        onClick={layout === "final" ? handleLogoClick : undefined}
        role={layout === "final" ? "button" : undefined}
        aria-label={layout === "final" ? "Go to homepage" : undefined}
        tabIndex={layout === "final" ? 0 : undefined}
        onKeyDown={
          layout === "final"
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleLogoClick();
                }
              }
            : undefined
        }
      >
        <Image
          ref={logoImgRef}
          src="/img/logo.png"
          alt="National Association for the Blind"
          width={200}
          height={200}
          priority
          className="h-full w-full object-contain"
          style={
            layout === "countdown"
              ? { filter: "blur(26px) contrast(0.5) grayscale(1) brightness(0.35)" }
              : undefined
          }
        />
      </div>

      {layout === "countdown" && (
        <div
          className="pointer-events-none fixed top-[54%] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-1 font-heading"
          aria-hidden="true"
        >
          <span ref={percentageRef} className="text-5xl font-semibold tabular-nums">
            100%
          </span>
          <span ref={conditionRef} className="text-lg tracking-wide">
            Total Blindness
          </span>
        </div>
      )}

      <div
        ref={videoBoxRef}
        style={videoStyle(layout, isMobile)}
        className="z-20 overflow-hidden"
        inert={layout === "final" && activeStage !== 0}
      >
        <video
          ref={videoElRef}
          className="h-full w-full object-cover"
          src="/img/heroplacement.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {layout === "final" && (
          <button
            type="button"
            onClick={handleToggleVideo}
            aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
            className="absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg ring-1 ring-black/10 transition-colors hover:bg-orange hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            {isVideoPlaying ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M7 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 7 5.5Z" />
              </svg>
            )}
          </button>
        )}
      </div>

      <h1 ref={headlineRef} style={headlineStyle(layout, isMobile)} className="z-20 font-heading font-semibold leading-tight">
        {HERO_HEADLINE}
      </h1>

      {/* The persistent stepper — one continuous element for the whole
          journey; only which number is bold ever changes, never a swap. */}
      {layout === "final" && (
        <div
          style={{ position: "fixed", top: HEADER_HEIGHT + 40, left: 0, width: "100vw" }}
          className="z-20 px-8 pointer-events-none"
        >
          <div className="mx-auto max-w-6xl">
            <div ref={stepperGroupRef} style={{ opacity: 0 }}>
              <StageStepper active={activeStage === 0 ? 0 : activeStage} />
            </div>
          </div>
        </div>
      )}

      {/* The word list that peeks up from stage 1 and flies into stage 2's
          left column — one continuous element, never faded out and swapped. */}
      {layout === "final" && (
        <div
          ref={stage2WordsRef}
          aria-hidden={activeStage !== 2}
          className="z-[11] flex flex-col gap-1 font-heading text-3xl"
          style={{ position: "fixed", top: "calc(100vh - 64px)", left: 64, opacity: 0.15 }}
        >
          {STAGE2_STORIES.map((story, i) => (
            <span
              key={story.word}
              className={
                "transition-colors duration-300 " +
                (i === storyIndex ? "font-bold text-navy" : "font-normal text-black/25")
              }
            >
              {story.word}
            </span>
          ))}
        </div>
      )}

      {/* Stage 1: flies in over the hero once the visitor advances — no page scroll involved. */}
      {layout === "final" && (
        <div
          ref={stage1Ref}
          inert={activeStage !== 1}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="z-10 flex flex-col items-center justify-center overflow-hidden bg-white px-8 opacity-0 pointer-events-none"
        >
          <div className="mx-auto w-full max-w-6xl">
            {/* Spacing reserved for the persistent stepper, which is a
                separate fixed element overlaid above this content. */}
            <div className="mb-10 h-10" aria-hidden="true" />

            <div className="grid items-center gap-4 md:gap-14 md:grid-cols-2">
              {/* Invisible spacers: reserve the exact rects the video and
                  headline Flip-morph into, measured at transition time. */}
              <div
                ref={stage1PhotoSlotRef}
                className="h-[20vh] max-h-[170px] min-h-[120px] w-full rounded-2xl md:h-[50vh] md:max-h-[480px] md:min-h-[280px]"
                style={{ visibility: "hidden" }}
              />

              <div className="flex flex-col items-center gap-3 text-center md:gap-6">
                <div ref={stage1HeadlineSlotRef} style={{ visibility: "hidden" }} className="w-full">
                  <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">
                    {STAGE1_HEADLINE}
                  </h2>
                </div>
                <p ref={paragraphRef} className="hidden font-body text-black/70 opacity-0 md:block md:text-base md:leading-7">
                  An impact driven NGO that has devoted over 30+ years to the
                  wellbeing of visually impaired individuals, right from
                  primary education to family counselling up until
                  employment support. And we strive to do it while giving
                  them an environment as normal to their upbringing as
                  possible.
                </p>
                <div ref={ctaRef} className="flex items-center gap-3 opacity-0">
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      openVolunteer();
                    }}
                    className="rounded-full border border-navy px-5 py-2 font-heading text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    Volunteer
                  </a>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      openDonate();
                    }}
                    className="rounded-full bg-orange px-5 py-2 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
                  >
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: the "Educate. Empathise. Empower." story carousel. */}
      {layout === "final" && (
        <div
          ref={stage2Ref}
          inert={activeStage !== 2}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="z-10 flex flex-col items-center justify-center overflow-hidden bg-white px-8 opacity-0 pointer-events-none"
        >
          <div className="mx-auto w-full max-w-6xl">
            {/* Spacing reserved for the persistent stepper. */}
            <div className="mb-10 h-10" aria-hidden="true" />

            <div className="grid items-start gap-4 md:gap-10 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)_minmax(0,1fr)]">
              {/* Invisible spacer: reserves the exact rect the word list
                  (a persistent, independently-positioned element) flies into. */}
              <div
                ref={stage2WordsSlotRef}
                className="hidden flex-col gap-1 font-heading text-3xl md:flex"
                style={{ visibility: "hidden" }}
              >
                {STAGE2_STORIES.map((story) => (
                  <span key={story.word}>{story.word}</span>
                ))}
              </div>

              <div
                ref={stage2PhotoRef}
                className="h-[22vh] max-h-[180px] min-h-[140px] overflow-hidden rounded-2xl opacity-0 md:h-[46vh] md:max-h-[420px] md:min-h-[260px]"
              >
                <Image
                  ref={stage2PhotoImgRef}
                  src={STAGE2_STORIES[storyIndex].image}
                  alt=""
                  width={836}
                  height={964}
                  className="h-full w-full object-cover"
                />
              </div>

              <div
                ref={stage2TextRef}
                className="flex flex-col gap-3 opacity-0 md:h-[46vh] md:max-h-[420px] md:min-h-[260px] md:gap-6"
              >
                <h2
                  ref={stage2HeadlineRef}
                  className="font-heading text-xl font-bold leading-tight text-navy sm:text-3xl"
                >
                  {STAGE2_STORIES[storyIndex].headline}
                </h2>
                <p className="hidden font-body text-base leading-7 text-black/70 md:block">{STAGE2_PARAGRAPH}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-orange hover:text-navy md:mt-auto"
                >
                  Read More
                  <Image src="/img/arrow.svg" alt="" width={14} height={14} />
                </a>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* The corner tab that grows to cover the screen for stage 3 — only
          visible once "Empower" is showing (or once stage 3 is active). */}
      {layout === "final" && (
        <div
          ref={wipeBoxRef}
          aria-hidden="true"
          className="pointer-events-none fixed z-[15] bg-navy"
          style={{
            bottom: 40,
            right: 40,
            left: "auto",
            top: "auto",
            width: 160,
            height: 120,
            borderRadius: "16px 0 16px 0",
            transform: "scale(0)",
            transformOrigin: "bottom right",
          }}
        />
      )}

      {/* The white curtain that flies in from the same corner to cover the
          screen for the 5<->6 handoff, then retreats back out — the
          Causes section underneath never fades, only this moves. */}
      {layout === "final" && (
        <div
          ref={causesWipeRef}
          aria-hidden="true"
          className="pointer-events-none fixed z-[19] bg-white"
          style={{
            bottom: 40,
            right: 40,
            left: "auto",
            top: "auto",
            width: 0,
            height: 0,
            borderRadius: "16px 0 16px 0",
          }}
        />
      )}

      {/* Stage 3: Vision and Mission, on the navy field the tab reveals. */}
      {layout === "final" && (
        <div
          ref={stage3Ref}
          inert={activeStage !== 3}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="z-[16] flex flex-col items-center justify-center overflow-hidden px-8 pointer-events-none"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:gap-10">
            <h2
              ref={stage3HeadlineRef}
              className="text-center font-heading text-2xl leading-tight font-bold whitespace-pre-line text-white opacity-0 sm:text-4xl"
            >
              {STAGE3_HEADLINE}
            </h2>

            <div className="grid items-center gap-3 md:gap-10 md:grid-cols-3">
              <div ref={stage3VisionRef} className="opacity-0">
                <h3 className="font-heading text-lg font-bold text-white md:mb-3 md:text-2xl">Our Vision</h3>
                <p className="hidden font-body text-base leading-7 text-white/80 md:block">{STAGE3_BODY}</p>
              </div>

              <div ref={stage3PhotoRef} className="overflow-hidden rounded-2xl opacity-0">
                <Image
                  src="/img/nab/children.jpg"
                  alt=""
                  width={836}
                  height={964}
                  className="h-[20vh] max-h-[160px] min-h-[120px] w-full object-cover md:h-[42vh] md:max-h-[380px] md:min-h-[240px]"
                />
              </div>

              <div ref={stage3MissionRef} className="text-right opacity-0">
                <p className="hidden font-body text-base leading-7 text-white/80 md:block">{STAGE3_BODY}</p>
                <h3 className="font-heading text-lg font-bold text-white md:mt-3 md:text-2xl">Our Mission</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 4: Our Journey — same navy field as stage 3. The heading is
          the only element that participates in centering, so it stays put
          no matter what the timeline below it does. The timeline itself is
          a fixed-height window: once entries outnumber what fits, the list
          scrolls so the newest entry lands at the bottom and the oldest
          leaves from the top. */}
      {layout === "final" && (
        <div
          ref={stage4Ref}
          inert={activeStage !== 4 && activeStage !== 5}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="z-[16] flex flex-col items-center justify-center overflow-hidden px-8 pb-40 opacity-0 pointer-events-none"
        >
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center">
            <h2
              ref={journeyHeadingRef}
              className="text-center font-heading text-3xl leading-tight font-bold text-white opacity-0 sm:text-4xl"
            >
              Our Journey
            </h2>

            <div ref={timelineRef} className="absolute top-full mt-10 w-full max-w-xl">
              {/* Impact stats live outside the scroll window's overflow
                  clip, anchored to the timeline's own (possibly shifted)
                  box so they always fly in just to its left. */}
              <div
                ref={impactStatsRef}
                className="absolute top-0 right-full mr-12 w-56 text-right"
                style={{ height: TIMELINE_WINDOW_HEIGHT }}
              >
                {IMPACT_STATS.map((stat, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      impactStatRefs.current[i] = el;
                    }}
                    className="absolute inset-x-0 opacity-0"
                    style={{ top: i * JOURNEY_ENTRY_HEIGHT }}
                  >
                    <div className="font-body text-3xl font-bold text-white">{stat.value}</div>
                    <p className="mt-1 font-body text-xs leading-5 text-white/80">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden" style={{ height: TIMELINE_WINDOW_HEIGHT }}>
                <div ref={timelineListRef} className="relative">
                  {JOURNEY_ENTRIES.map((entry, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        journeyEntryRefs.current[i] = el;
                      }}
                      className="absolute left-8 flex items-start gap-6 opacity-0"
                      style={{ top: i * JOURNEY_ENTRY_HEIGHT }}
                    >
                      {i > 0 && (
                        <span
                          ref={(el) => {
                            journeyConnectorRefs.current[i] = el;
                          }}
                          aria-hidden="true"
                          className="absolute w-px origin-top scale-y-0 bg-white/30"
                          style={{ left: -26.5, top: -JOURNEY_ENTRY_HEIGHT + 9, height: JOURNEY_ENTRY_HEIGHT }}
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 h-1.5 w-1.5 rounded-full bg-white"
                        style={{ left: -29 }}
                      />
                      <span className="w-16 shrink-0 font-body text-lg text-white">{entry.year}</span>
                      <p className="max-w-md font-body text-base leading-6 text-white">{entry.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 6: Our Causes — a full context switch to a white field,
          revealed entirely by the curtain's motion rather than a fade. */}
      {layout === "final" && (
        <div
          ref={stage6Ref}
          inert={activeStage !== 6}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="z-[16] flex flex-col items-center overflow-hidden bg-white px-8 pt-16 pb-6 opacity-0 pointer-events-none"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
            <h2 className="text-center font-heading text-2xl font-bold text-navy sm:text-4xl">Our Causes</h2>

            <div className="grid gap-3 md:gap-6 md:grid-cols-3">
              {CAUSES.map((cause) => (
                <div
                  key={cause.title}
                  className="flex flex-row items-center overflow-hidden rounded-2xl bg-orange shadow-lg md:flex-col md:items-stretch"
                >
                  <div className="p-2 md:w-full">
                    <Image
                      src={cause.image}
                      alt=""
                      width={640}
                      height={520}
                      className="h-16 w-16 rounded-xl object-cover md:h-36 md:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 py-2 pr-4 text-left text-white md:flex-none md:gap-2 md:px-5 md:pb-5 md:pt-0 md:text-center">
                    <h3 className="font-heading text-sm font-bold md:text-xl">{cause.title}</h3>
                    <p className="hidden font-body text-xs leading-5 text-white/90 md:block">{cause.description}</p>
                    <p className="font-body text-xs text-white/90 md:mt-1 md:border-b md:border-white/50 md:pb-1">
                      Goal: {formatINR(cause.goalAmount)}
                    </p>
                    <div className="flex items-center gap-2 md:mt-2 md:justify-center">
                      <button
                        type="button"
                        onClick={openVolunteer}
                        className="rounded-full border border-white px-3 py-1 font-heading text-xs font-semibold text-white transition-colors hover:bg-white hover:text-orange"
                      >
                        Volunteer
                      </button>
                      <button
                        type="button"
                        onClick={openDonate}
                        className="rounded-full bg-white px-3 py-1 font-heading text-xs font-semibold text-orange transition-colors hover:bg-navy hover:text-white"
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stage 7: Team spotlight — same white field as stage 6, a plain fly
          since there's no backdrop color to hand off between them. */}
      {layout === "final" && (
        <div
          ref={stage7Ref}
          inert={activeStage !== 7}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="z-[16] flex flex-col items-center justify-center overflow-hidden bg-white px-8 opacity-0 pointer-events-none"
        >
          <div className="mx-auto grid w-full max-w-5xl items-center gap-6 md:gap-14 md:grid-cols-2">
            <div ref={stage7PhotoRef} className="hidden opacity-0 md:block">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-3xl shadow-lg">
                <Image
                  ref={stage7PhotoImgRef}
                  src={TEAM_MEMBERS[teamIndex].photo}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-1.5 w-full bg-orange" />
              </div>
            </div>

            <div ref={stage7TextRef} className="flex flex-col gap-2 opacity-0 md:gap-4">
              <span aria-hidden="true" className="hidden font-heading text-6xl leading-none text-orange md:block">
                &ldquo;
              </span>
              <div ref={stage7MessageRef} className="md:-mt-6">
                <p className="font-body text-base leading-6 text-black/80 italic md:text-xl md:leading-8">
                  {TEAM_MEMBERS[teamIndex].message}
                </p>
                <div className="mt-2 md:mt-4">
                  <p className="font-heading text-lg font-bold text-navy md:text-xl">{TEAM_MEMBERS[teamIndex].name}</p>
                  <p className="font-body text-sm text-black/60">{TEAM_MEMBERS[teamIndex].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 8: sponsors marquee + donate CTA so far, crossfading as
          sub-sections within the same white field. SDGs and footer land
          here in later passes. */}
      {layout === "final" && (
        <div
          ref={stage8Ref}
          inert={activeStage !== 8}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="z-[16] overflow-hidden bg-white opacity-0 pointer-events-none"
        >
          <div className="relative h-full w-full">
            <div
              ref={stage8MarqueeBlockRef}
              className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-8 pt-16 md:pt-28"
            >
              <h2 className="text-center font-heading text-3xl font-bold text-navy sm:text-4xl">Our Sponsors</h2>

              <div
                className="w-full max-w-6xl overflow-hidden"
                style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}
              >
                <div className="flex w-max animate-marquee items-center gap-16">
                  {[...SPONSORS, ...SPONSORS].map((sponsor, i) => (
                    <span
                      key={i}
                      className="shrink-0 whitespace-nowrap font-heading text-2xl font-semibold text-black/40"
                    >
                      {sponsor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              ref={stage8CtaBlockRef}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 pt-16 opacity-0 pointer-events-none md:pt-28"
            >
              <div className="grid w-full max-w-5xl items-center gap-4 md:gap-10 md:grid-cols-[1fr_1.3fr]">
                <div
                  ref={stage8CtaImageRef}
                  className="relative mx-auto hidden aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl shadow-lg md:block"
                >
                  <Image src={CTA_TAB_META[ctaTab].image} alt="" fill sizes="320px" className="object-cover" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-heading text-xs font-semibold text-black/70">
                    {CTA_TAB_META[ctaTab].label}
                  </span>
                </div>

                <div className="flex flex-col gap-3 md:gap-4">
                  <h2 className="font-heading text-xl font-bold text-navy sm:text-4xl">Support Our Mission</h2>

                  <div className="flex gap-2">
                    {(["volunteer", "donate", "csr"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setCtaTab(tab)}
                        className={
                          "rounded-full px-4 py-1.5 font-heading text-sm font-semibold transition-colors " +
                          (ctaTab === tab
                            ? "bg-navy text-white"
                            : "border border-navy/30 text-navy hover:bg-navy/10")
                        }
                      >
                        {tab === "volunteer" ? "Volunteer" : tab === "donate" ? "Donate" : "CSR"}
                      </button>
                    ))}
                  </div>

                  <div ref={stage8CtaFormRef}>
                    {ctaTab === "donate" && (
                      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-3 md:gap-5">
                        <div>
                          <p className="mb-1.5 font-heading text-sm font-semibold text-black/70 md:mb-2">
                            Choose an amount
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {DONATION_AMOUNTS.map((amount) => (
                              <button
                                key={amount}
                                type="button"
                                onClick={() => setDonationAmount(amount)}
                                aria-pressed={donationAmount === amount}
                                className={
                                  "rounded-lg border py-1.5 font-heading text-sm font-semibold transition-colors md:py-2 " +
                                  (donationAmount === amount
                                    ? "border-orange bg-orange text-white"
                                    : "border-navy/30 text-navy hover:bg-navy hover:text-white")
                                }
                              >
                                ₹{amount}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:gap-5">
                          <label className="flex flex-col">
                            <span className="sr-only">Full name</span>
                            <input
                              type="text"
                              placeholder="Full name"
                              className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                            />
                          </label>
                          <label className="flex flex-col">
                            <span className="sr-only">Email</span>
                            <input
                              type="email"
                              placeholder="Email"
                              className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col gap-3 border-t border-black/10 pt-3 sm:flex-row sm:items-center sm:gap-6 md:gap-4 md:pt-4">
                          <button
                            type="submit"
                            className="self-start rounded-full bg-orange px-8 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy md:py-3"
                          >
                            Donate Now
                          </button>
                          <div className="hidden items-center gap-3 sm:flex sm:border-l sm:border-black/10 sm:pl-6">
                            <div
                              aria-hidden="true"
                              className="h-12 w-12 shrink-0 rounded-md border border-black/15"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(0deg, black 0 3px, transparent 3px 6px), repeating-linear-gradient(90deg, black 0 3px, transparent 3px 6px)",
                                backgroundBlendMode: "multiply",
                                backgroundColor: "white",
                                opacity: 0.8,
                              }}
                            />
                            <div className="font-body text-xs leading-snug text-black/50">
                              <p>Scan to pay via UPI</p>
                              <p>Secured by Razorpay</p>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}

                    {ctaTab === "volunteer" && (
                      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-3 md:gap-5">
                        <div className="grid grid-cols-2 gap-3 md:gap-5">
                          <label className="flex flex-col">
                            <span className="sr-only">Full name</span>
                            <input
                              type="text"
                              placeholder="Full name"
                              className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                            />
                          </label>
                          <label className="flex flex-col">
                            <span className="sr-only">Phone number</span>
                            <input
                              type="tel"
                              placeholder="Phone number"
                              className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                            />
                          </label>
                        </div>
                        <label className="flex flex-col">
                          <span className="sr-only">Email</span>
                          <input
                            type="email"
                            placeholder="Email"
                            className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                          />
                        </label>
                        <label className="flex flex-col">
                          <span className="sr-only">How would you like to help?</span>
                          <input
                            type="text"
                            placeholder="How would you like to help? (teaching, events, admin...)"
                            className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                          />
                        </label>
                        <button
                          type="submit"
                          className="self-start rounded-full bg-orange px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
                        >
                          Sign Up to Volunteer
                        </button>
                      </form>
                    )}

                    {ctaTab === "csr" && (
                      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-3 md:gap-5">
                        <div className="grid grid-cols-2 gap-3 md:gap-5">
                          <label className="flex flex-col">
                            <span className="sr-only">Company name</span>
                            <input
                              type="text"
                              placeholder="Company name"
                              className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                            />
                          </label>
                          <label className="flex flex-col">
                            <span className="sr-only">Contact person</span>
                            <input
                              type="text"
                              placeholder="Contact person"
                              className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                            />
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:gap-5">
                          <label className="flex flex-col">
                            <span className="sr-only">Work email</span>
                            <input
                              type="email"
                              placeholder="Work email"
                              className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                            />
                          </label>
                          <label className="flex flex-col">
                            <span className="sr-only">Phone number</span>
                            <input
                              type="tel"
                              placeholder="Phone number"
                              className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                            />
                          </label>
                        </div>
                        <label className="flex flex-col">
                          <span className="sr-only">Area of partnership interest</span>
                          <input
                            type="text"
                            placeholder="Area of partnership interest"
                            className="border-0 border-b border-black/20 bg-transparent px-0.5 py-1 font-body text-sm text-black outline-none focus:border-navy md:py-2"
                          />
                        </label>
                        <button
                          type="submit"
                          className="self-start rounded-full bg-orange px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
                        >
                          Submit CSR Inquiry
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 9: Testimonials — same white field, symmetric crossfade. */}
      {layout === "final" && (
        <div
          ref={stage9Ref}
          inert={activeStage !== 9}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="z-[16] flex flex-col items-center justify-center overflow-hidden bg-white px-8 pt-12 opacity-0 pointer-events-none md:pt-28"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 md:gap-10">
            <h2 className="text-center font-heading text-2xl font-bold text-navy sm:text-4xl">What People Say</h2>

            <div className="grid gap-3 md:gap-8 md:grid-cols-3">
              {TESTIMONIALS.map((testimonial, i) => (
                <div key={i} className="flex flex-col gap-2 rounded-2xl border border-black/10 p-3 md:gap-4 md:p-6">
                  <span aria-hidden="true" className="hidden font-heading text-5xl leading-none text-orange md:block">
                    &ldquo;
                  </span>
                  <p className="font-body text-xs leading-5 text-black/80 italic md:-mt-4 md:text-sm md:leading-6">
                    {testimonial.quote}
                  </p>
                  <div className="mt-auto">
                    <p className="font-heading text-sm font-bold text-navy">{testimonial.name}</p>
                    <p className="font-body text-xs text-black/50">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stage 10: SDGs — same white field, symmetric crossfade. */}
      {layout === "final" && (
        <div
          ref={stage10Ref}
          inert={activeStage !== 10}
          style={{
            position: "fixed",
            top: HEADER_HEIGHT,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
          className="z-[16] flex flex-col items-center justify-center overflow-hidden bg-white px-8 pt-16 opacity-0 pointer-events-none md:pt-28"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 md:gap-4">
            <h2 className="text-center font-heading text-xl font-bold text-navy sm:text-4xl">
              Aligned with the UN Sustainable Development Goals
            </h2>
            <p className="mx-auto hidden max-w-2xl text-center font-body text-sm leading-6 text-black/60 sm:block">
              Our work maps directly onto five of the UN&apos;s Sustainable Development Goals.
            </p>

            <div className="mt-2 grid grid-cols-5 gap-1.5 sm:mt-4 sm:gap-4">
              {SDG_GOALS.map((goal) => (
                <div
                  key={goal.number}
                  className="flex aspect-square flex-col items-center justify-center gap-0.5 rounded-lg p-1 text-center text-white shadow-md sm:gap-2 sm:rounded-2xl sm:p-4"
                  style={{ backgroundColor: goal.color }}
                >
                  <span className="font-heading text-base font-bold sm:text-4xl">{goal.number}</span>
                  <span className="hidden font-body text-xs leading-tight font-semibold sm:block">{goal.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stage 11: Footer — same shared component every other page ends
          on, just wired into this page's own symmetric-crossfade stage
          machine instead of the generic StagePager's. */}
      {layout === "final" && <Footer ref={stage11Ref} active={activeStage === 11} />}

      {layout === "countdown" && (
        <div className="fixed top-6 right-6 z-50 flex gap-3">
          {!prefersReducedMotion && (
            <button
              ref={pauseButtonRef}
              type="button"
              onClick={handleTogglePause}
              aria-expanded={isPaused}
              aria-controls={panelId}
              className="rounded-full bg-white px-5 py-2.5 font-heading text-sm font-semibold text-black shadow-lg ring-1 ring-black/10 transition-colors hover:bg-orange hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              {isPaused ? "Resume intro" : "Pause & learn more"}
            </button>
          )}
          <button
            type="button"
            onClick={handleSkip}
            className="rounded-full bg-white px-5 py-2.5 font-heading text-sm font-semibold text-black shadow-lg ring-1 ring-black/10 transition-colors hover:bg-orange hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            Skip intro
          </button>
        </div>
      )}

      {layout === "countdown" && isPaused && (
        <div
          id={panelId}
          role="region"
          aria-label={`About ${currentStage.label}`}
          onKeyDown={handlePanelKeyDown}
          className="fixed inset-x-6 bottom-6 z-50 mx-auto max-w-xl rounded-2xl bg-white p-6 text-left shadow-2xl ring-1 ring-black/10 sm:p-8"
        >
          <h2
            ref={panelHeadingRef}
            tabIndex={-1}
            className="font-heading text-2xl font-semibold text-navy outline-none"
          >
            {currentStage.label}
          </h2>
          <p className="mt-3 text-base leading-7 text-black/80">{currentStage.description}</p>
          <button
            type="button"
            onClick={handleResume}
            className="mt-5 rounded-full bg-navy px-5 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            Resume intro
          </button>
        </div>
      )}
    </section>
  );
}
