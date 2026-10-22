"use client";

import { useState } from "react";
import { GlassFormShell } from "./GlassFormShell";
import { UpiDonationFlow } from "./UpiPayment";
import { CAUSES, causeProgress, formatINR, type Cause } from "../../lib/causes-data";
import { useLanguage } from "./LanguageContext";

const EYEBROW = { en: "Support a cause", hi: "किसी अभियान का साथ दें" };
const TITLE = { en: "Donate to NAB Lucknow", hi: "NAB Lucknow को दान करें" };
const INTRO = {
  en: "Pay by UPI straight to our bank account, then send us your details for an 80G tax receipt.",
  hi: "UPI से सीधे हमारे बैंक खाते में भुगतान करें, फिर 80G कर-रसीद के लिए अपनी जानकारी भेजें।",
};
const WHICH_CAUSE_LABEL = { en: "Which cause?", hi: "कौन सा अभियान?" };
const CHOOSE_CAUSE_PLACEHOLDER = { en: "Choose a cause", hi: "एक अभियान चुनें" };
const RAISED_OF_GOAL = (raised: string, goal: string) => ({
  en: `${raised} raised of ${goal} goal`,
  hi: `${goal} के लक्ष्य में से ${raised} जुट चुके हैं`,
});

/** Overlaid on the cause photo (wide screens): the cause itself, and its
    progress bar only once NAB has confirmed real figures for it. */
export function CauseAside({ cause }: { cause: Cause }) {
  const { t } = useLanguage();
  const pct = causeProgress(cause);
  return (
    <div className="flex flex-col gap-2">
      <p className="font-heading text-sm font-bold">{t(cause.title)}</p>
      <p className="line-clamp-3 font-body text-xs leading-5 text-white/85">{t(cause.description)}</p>
      {pct !== null && (
        <>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-orange transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="font-body text-xs text-white/80">
            {t(RAISED_OF_GOAL(formatINR(cause.raisedAmount ?? 0), formatINR(cause.goalAmount ?? 0)))}
          </p>
        </>
      )}
    </div>
  );
}

export function DonateOverlay({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [causeSlug, setCauseSlug] = useState(CAUSES[0].slug);
  const cause = CAUSES.find((c) => c.slug === causeSlug) ?? CAUSES[0];

  return (
    <GlassFormShell
      variant="modal"
      titleId="donate-overlay-title"
      onClose={onClose}
      image={cause.image}
      imageAlt=""
      eyebrow={t(EYEBROW)}
      title={t(TITLE)}
      intro={t(INTRO)}
      aside={<CauseAside cause={cause} />}
    >
      <UpiDonationFlow
        causeSlug={causeSlug}
        causeSelect={{
          name: "cause",
          label: t(WHICH_CAUSE_LABEL),
          placeholder: t(CHOOSE_CAUSE_PLACEHOLDER),
          options: CAUSES.map((c) => t(c.title)),
          value: t(cause.title),
          onChange: (v) => {
            const match = CAUSES.find((c) => t(c.title) === v);
            if (match) setCauseSlug(match.slug);
          },
        }}
      />
    </GlassFormShell>
  );
}
