"use client";

import { useEffect } from "react";

/** Opts a normal, long-form scrolling page (e.g. a blog article) out of
    the site-wide `body { overflow: hidden }` rule meant for the pinned,
    wheel-stepped stage pages. Mount once at the top of such a page. */
export function ScrollUnlock() {
  useEffect(() => {
    document.body.classList.add("scroll-unlocked");
    return () => {
      document.body.classList.remove("scroll-unlocked");
    };
  }, []);

  return null;
}
