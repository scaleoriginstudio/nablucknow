"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "../hooks/useIsMobile";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const IMAGES = [
  "/img/nab/care.jpg",
  "/img/nab/teacher.jpg",
  "/img/nab/vocational.jpg",
  "/img/nab/dance.jpg",
  "/img/nab/computer-training.jpg",
];

/** Auto-advancing background carousel: slides top-to-bottom on desktop
    (next image enters from below), left-to-right on mobile (next image
    enters from the right) — same stack of images, just a different slide
    axis per viewport. Pauses entirely when the OS asks for reduced
    motion, instead of jumping between images with no transition. */
export function ContactCarousel() {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {IMAGES.map((src, i) => {
        const offset = i - index;
        const transform = isMobile ? `translateX(${offset * 100}%)` : `translateY(${offset * 100}%)`;
        return (
          <div
            key={src}
            className="absolute inset-0 transition-transform duration-700 ease-in-out"
            style={{ transform }}
          >
            <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          </div>
        );
      })}
    </div>
  );
}
