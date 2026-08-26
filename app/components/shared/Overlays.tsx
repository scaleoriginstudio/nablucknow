"use client";

import { useOverlay } from "./OverlayContext";
import { VolunteerOverlay } from "./VolunteerOverlay";
import { DonateOverlay } from "./DonateOverlay";

/** Renders whichever overlay (if any) is currently open, once at the app
    root, so it can sit above every page regardless of which page's header
    or footer triggered it. */
export function Overlays() {
  const { open, close } = useOverlay();
  if (open === "volunteer") return <VolunteerOverlay onClose={close} />;
  if (open === "donate") return <DonateOverlay onClose={close} />;
  return null;
}
