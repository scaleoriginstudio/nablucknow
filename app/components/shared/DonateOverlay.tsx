"use client";

import { GlassFormShell } from "./GlassFormShell";
import { UpiDonationFlow } from "./UpiPayment";
import { CAUSES, causeProgress, formatINR } from "../../lib/causes-data";
import { useLanguage } from "./LanguageContext";

/** Not a cause photo: those already appear on the homepage cause cards. */
export const DONATE_IMAGE = "/img/nab/eye-checkup.jpg";

const EYEBROW = { en: "Support a cause", hi: "किसी अभियान का साथ दें" };
const TITLE = { en: "Donate to NAB Lucknow", hi: "NAB Lucknow को दान करें" };
const INTRO = {
  en: "Pay by UPI straight to our bank account. No gateway and no fees: every rupee reaches the work.",
  hi: "UPI से सीधे हमारे बैंक खाते में भुगतान करें। कोई गेटवे नहीं, कोई शुल्क नहीं। हर रुपया सीधे काम तक पहुँचता है।",
};
const SUPPORTS_LABEL = { en: "Your gift supports", hi: "आपका दान इन्हें सहारा देता है" };
const RAISED_OF_GOAL = (raised: string, goal: string) => ({
  en: `${raised} raised of ${goal} goal`,
  hi: `${goal} के लक्ष्य में से ${raised} जुट चुके हैं`,
});

/** Overlaid on the photo (wide screens): what a gift goes towards, with a
    progress bar per cause only once NAB has confirmed real figures. */
export function CausesAside() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-3">
      <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">{t(SUPPORTS_LABEL)}</p>
      {CAUSES.map((cause) => {
        const pct = causeProgress(cause);
        return (
          <div key={cause.slug} className="flex flex-col gap-1.5">
            <p className="font-heading text-sm font-bold leading-snug">{t(cause.title)}</p>
            {pct !== null && (
              <>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                  <div className="h-full rounded-full bg-orange" style={{ width: `${pct}%` }} />
                </div>
                <p className="font-body text-xs text-white/80">
                  {t(RAISED_OF_GOAL(formatINR(cause.raisedAmount ?? 0), formatINR(cause.goalAmount ?? 0)))}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function DonateOverlay({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <GlassFormShell
      variant="modal"
      titleId="donate-overlay-title"
      onClose={onClose}
      image={DONATE_IMAGE}
      imageAlt=""
      eyebrow={t(EYEBROW)}
      title={t(TITLE)}
      intro={t(INTRO)}
      aside={<CausesAside />}
    >
      <UpiDonationFlow />
    </GlassFormShell>
  );
}
