"use client";

import { useState } from "react";
import { GlassFormShell } from "./GlassFormShell";
import { LeadForm } from "./LeadForm";
import { CAUSES, formatINR } from "../../lib/causes-data";
import { TAX_EXEMPTION_NOTE } from "./constants";
import { useLanguage } from "./LanguageContext";

const DONATION_AMOUNTS = [500, 1000, 2500, 5000];

const EYEBROW = { en: "Support a cause", hi: "किसी कारण का साथ दें" };
const TITLE = { en: "Donate to NAB Lucknow", hi: "NAB Lucknow को दान करें" };
const INTRO = {
  en: "Pick a cause, choose an amount, and leave your details. Our team will share UPI and bank transfer options to complete your gift.",
  hi: "एक कारण चुनें, राशि तय करें, और अपनी जानकारी छोड़ें। हमारी टीम आपका दान पूरा करने के लिए UPI और बैंक ट्रांसफर विकल्प भेजेगी।",
};
const RAISED_OF_GOAL = (raised: string, goal: string) => ({
  en: `${raised} raised of ${goal} goal`,
  hi: `${goal} लक्ष्य में से ${raised} जुट चुके हैं`,
});
const WHICH_CAUSE_LABEL = { en: "Which cause?", hi: "कौन सा कारण?" };
const CHOOSE_CAUSE_PLACEHOLDER = { en: "Choose a cause", hi: "एक कारण चुनें" };
const AMOUNT_LABEL = { en: "Amount", hi: "राशि" };
const CHOOSE_AMOUNT_LABEL = { en: "Choose an amount", hi: "एक राशि चुनें" };
const PAY_VIA_RAZORPAY = (amount: number) => ({
  en: `Pay ₹${amount} via Razorpay`,
  hi: `Razorpay से ₹${amount} भुगतान करें`,
});
const FEE_NOTE_INTRO = {
  en: "Online payment is not live yet. We will email you UPI and bank transfer details to complete the donation.",
  hi: "ऑनलाइन भुगतान अभी शुरू नहीं हुआ है। हम आपको दान पूरा करने के लिए UPI और बैंक ट्रांसफर विवरण ईमेल करेंगे।",
};
const SUCCESS_TITLE = { en: "Pledge recorded", hi: "संकल्प दर्ज हुआ" };
const SUCCESS_BODY = {
  en: "Thank you. We have your details and will send payment options shortly.",
  hi: "धन्यवाद। हमें आपकी जानकारी मिल गई है, हम जल्द ही भुगतान विकल्प भेजेंगे।",
};

export function DonateOverlay({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [causeSlug, setCauseSlug] = useState(CAUSES[0].slug);
  const [amount, setAmount] = useState<number | null>(null);
  const cause = CAUSES.find((c) => c.slug === causeSlug) ?? CAUSES[0];
  const pct = Math.min(100, Math.round((cause.raisedAmount / cause.goalAmount) * 100));
  const raisedOfGoal = t(RAISED_OF_GOAL(formatINR(cause.raisedAmount), formatINR(cause.goalAmount)));

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
      meta={raisedOfGoal}
      aside={
        <div className="flex flex-col gap-2">
          <p className="font-heading text-sm font-bold">{t(cause.title)}</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-orange" style={{ width: `${pct}%` }} />
          </div>
          <p className="font-body text-xs text-white/80">{raisedOfGoal}</p>
        </div>
      }
    >
      <LeadForm
        formType="Donate"
        select={{
          name: "cause",
          label: t(WHICH_CAUSE_LABEL),
          placeholder: t(CHOOSE_CAUSE_PLACEHOLDER),
          options: CAUSES.map((c) => t(c.title)),
          value: t(cause.title),
          onChange: (v) => {
            const match = CAUSES.find((c) => t(c.title) === v);
            setCauseSlug(match ? match.slug : causeSlug);
            setAmount(null);
          },
        }}
        extra={
          <div className="flex flex-col gap-1.5">
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-black/55">{t(AMOUNT_LABEL)}</span>
            <div className="grid grid-cols-4 gap-2">
              {DONATION_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  aria-pressed={amount === value}
                  className={
                    "rounded-lg border py-1.5 font-heading text-sm font-semibold transition-colors " +
                    (amount === value
                      ? "border-navy bg-navy text-white"
                      : "border-black/15 text-black/60 hover:border-navy hover:text-navy")
                  }
                >
                  ₹{value}
                </button>
              ))}
            </div>
          </div>
        }
        // extraPayload is spread after the select's own value, so this
        // overrides the submitted "cause" field with the stable slug
        // instead of the currently-displayed (possibly Hindi) cause title.
        extraPayload={{ cause: causeSlug, ...(amount ? { amount } : {}) }}
        disabled={!amount}
        submitLabel={amount ? t(PAY_VIA_RAZORPAY(amount)) : t(CHOOSE_AMOUNT_LABEL)}
        feeNote={`${t(FEE_NOTE_INTRO)} ${t(TAX_EXEMPTION_NOTE)}`}
        successTitle={t(SUCCESS_TITLE)}
        successBody={t(SUCCESS_BODY)}
      />
    </GlassFormShell>
  );
}
