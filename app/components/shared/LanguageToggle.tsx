"use client";

import { useLanguage } from "./LanguageContext";

/** Site-wide English/Hindi switch. Styled like the existing Volunteer
    header button (rounded-full, navy border) so it reads as part of the
    same control family rather than a bolted-on widget. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, toggle } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "en" ? "हिंदी में देखें" : "View in English"}
      className={
        "rounded-full border border-navy px-4 py-2 font-heading text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white " +
        className
      }
    >
      {lang === "en" ? "हिं" : "EN"}
    </button>
  );
}
