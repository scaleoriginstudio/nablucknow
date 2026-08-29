"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useOverlay } from "./OverlayContext";
import { Icon } from "./Icon";
import { FOOTER_CONTACT } from "./constants";

// The mobile number, not the landline: wa.me needs a WhatsApp-reachable
// number, country code plus the last ten digits, nothing else.
const WHATSAPP_HREF = `https://wa.me/91${FOOTER_CONTACT.phones[1].replace(/\D/g, "").slice(-10)}`;

// Pages whose whole job is the same action the widget offers: the widget
// would just be a smaller duplicate of the page itself.
const HIDDEN_ON = ["/donate", "/volunteer"];

/** One collapsible action button, bottom-right on every page. Collapsed it
    is a single 48px circle; tapped it expands upward into Donate and
    WhatsApp. It replaces the old always-open stack of two buttons, which
    covered card actions and body text in the bottom-right corner. */
export function FloatingActions() {
  const { open: overlayOpen, openDonate } = useOverlay();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Hold off one beat after load so the widget never lands on top of an
  // intro animation or a first paint.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!ready || overlayOpen !== null || HIDDEN_ON.some((p) => pathname?.startsWith(p))) return null;

  return (
    <div
      ref={rootRef}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex flex-col items-end gap-3"
    >
      <div
        className={
          "flex flex-col items-end gap-3 transition-all duration-200 " +
          (open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0")
        }
      >
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#25D366] py-2 pl-3 pr-4 font-heading text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.001L2.05 21.95l5.075-1.33A9.943 9.943 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5c-1.66 0-3.201-.474-4.502-1.29l-.323-.192-3.234.85.862-3.147-.211-.325A8.474 8.474 0 0 1 3.5 12c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5z" />
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            openDonate();
          }}
          className="flex items-center gap-2 rounded-full bg-orange py-2 pl-3 pr-4 font-heading text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
        >
          <Icon name="volunteer_activism" size={20} weight={400} />
          Donate
        </button>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <Icon name={open ? "close" : "add"} size={24} weight={400} />
      </button>
    </div>
  );
}
