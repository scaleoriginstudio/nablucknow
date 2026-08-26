"use client";

import { createContext, useContext, useMemo, useState } from "react";

type OverlayKind = "volunteer" | "donate" | null;

type OverlayContextValue = {
  open: OverlayKind;
  openVolunteer: () => void;
  openDonate: () => void;
  close: () => void;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);

/** Wraps the whole app so the "Volunteer" and "Donate" controls in the
    header and footer of every page can open the same two overlays,
    regardless of which page's component tree they live in. */
export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<OverlayKind>(null);

  const value = useMemo<OverlayContextValue>(
    () => ({
      open,
      openVolunteer: () => setOpen("volunteer"),
      openDonate: () => setOpen("donate"),
      close: () => setOpen(null),
    }),
    [open],
  );

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must be used within an OverlayProvider");
  return ctx;
}
