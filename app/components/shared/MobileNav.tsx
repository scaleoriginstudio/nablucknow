"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./constants";

/** Hamburger toggle + dropdown panel shown below `lg`, where the full inline
    nav + Volunteer/Donate buttons no longer fit next to the logo. Rendered
    inside the site header so it fades/hides in step with it. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/10 lg:hidden"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#23398D" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <>
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          style={{ position: "fixed", top: 96, left: 0, width: "100vw" }}
          className="z-30 flex flex-col gap-6 border-t border-black/10 bg-white px-8 py-6 shadow-lg lg:hidden"
        >
          <nav aria-label="Primary" className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => {
              const isCurrent = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  aria-current={isCurrent ? "page" : undefined}
                  className={
                    "font-body text-lg font-semibold text-black transition-colors hover:text-navy" +
                    (isCurrent ? " text-navy underline decoration-orange decoration-2 underline-offset-4" : "")
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3">
            <Link
              href="/volunteer"
              onClick={close}
              className="rounded-full border border-navy px-5 py-2 text-center font-heading text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              onClick={close}
              className="rounded-full bg-orange px-5 py-2 text-center font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
