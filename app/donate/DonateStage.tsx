"use client";

import { useState } from "react";
import { GlassFormShell } from "../components/shared/GlassFormShell";
import { LeadForm } from "../components/shared/LeadForm";
import { CAUSES, formatINR, type Cause } from "../lib/causes-data";
import { TAX_EXEMPTION_NOTE } from "../components/shared/constants";
import { useLanguage } from "../components/shared/LanguageContext";

const DONATION_AMOUNTS = [500, 1000, 2500, 5000];

const COPY = {
  eyebrow: { en: "Donate", hi: "दान करें" },
  title: {
    en: "Put your gift where you can see it",
    hi: "अपना योगदान वहाँ दें, जहाँ उसका असर आप खुद देख सकें",
  },
  intro: {
    en: "Choose a cause and an amount, then leave your details. Online payment is not live yet, so our team will send UPI and bank transfer options to complete your gift.",
    hi: "कोई कारण और राशि चुनें, फिर अपनी जानकारी दें। ऑनलाइन भुगतान अभी शुरू नहीं हुआ है, इसलिए हमारी टीम आपका दान पूरा करने के लिए UPI और बैंक ट्रांसफर के विकल्प भेजेगी।",
  },
  whichCause: { en: "Which cause?", hi: "कौन सा कारण?" },
  chooseCause: { en: "Choose a cause", hi: "एक कारण चुनें" },
  amount: { en: "Amount", hi: "राशि" },
  chooseAnAmount: { en: "Choose an amount", hi: "राशि चुनें" },
  successTitle: { en: "Pledge recorded", hi: "संकल्प दर्ज हुआ" },
  successBody: {
    en: "Thank you. We have your details and will send payment options shortly.",
    hi: "धन्यवाद। हमें आपकी जानकारी मिल गई है और हम जल्द ही भुगतान के विकल्प भेजेंगे।",
  },
};

function raisedOfGoal(raised: string, goal: string) {
  return { en: `${raised} raised of ${goal} goal`, hi: `${goal} के लक्ष्य में से अब तक ${raised} जुट चुके हैं` };
}

function pledgeLabel(value: number) {
  return { en: `Pledge ₹${value}`, hi: `₹${value} का संकल्प लें` };
}

function feeNoteCopy(taxNote: string): { en: string; hi: string } {
  return {
    en: `Online payment is not live yet. We will email you UPI and bank transfer details to complete the donation. ${taxNote}`,
    hi: `ऑनलाइन भुगतान अभी शुरू नहीं हुआ है। दान पूरा करने के लिए हम आपको ईमेल पर UPI और बैंक ट्रांसफर की जानकारी भेजेंगे। ${taxNote}`,
  };
}

export function DonateStage() {
  const { t } = useLanguage();
  const [causes, setCauses] = useState<Cause[]>(CAUSES);
  const [causeSlug, setCauseSlug] = useState(CAUSES[0].slug);
  const [amount, setAmount] = useState<number | null>(null);
  const cause = causes.find((c) => c.slug === causeSlug) ?? causes[0];
  const pct = Math.min(100, Math.round((cause.raisedAmount / cause.goalAmount) * 100));
  const raisedGoalText = t(raisedOfGoal(formatINR(cause.raisedAmount), formatINR(cause.goalAmount)));

  return (
    <GlassFormShell
      variant="page"
      image={cause.image}
      imageAlt=""
      eyebrow={t(COPY.eyebrow)}
      title={t(COPY.title)}
      intro={t(COPY.intro)}
      meta={raisedGoalText}
      aside={
        <div className="flex flex-col gap-2">
          <p className="font-heading text-sm font-bold">{t(cause.title)}</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-orange transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="font-body text-xs text-white/80">{raisedGoalText}</p>
        </div>
      }
    >
      <LeadForm
        formType="Donate"
        select={{
          name: "cause",
          label: t(COPY.whichCause),
          placeholder: t(COPY.chooseCause),
          options: causes.map((c) => t(c.title)),
          value: t(cause.title),
          onChange: (v) => {
            const match = causes.find((c) => t(c.title) === v);
            if (match) setCauseSlug(match.slug);
            setAmount(null);
          },
        }}
        extra={
          <div className="flex flex-col gap-1.5">
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-black/55">
              {t(COPY.amount)}
            </span>
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
        submitLabel={amount ? t(pledgeLabel(amount)) : t(COPY.chooseAnAmount)}
        feeNote={t(feeNoteCopy(t(TAX_EXEMPTION_NOTE)))}
        successTitle={t(COPY.successTitle)}
        successBody={t(COPY.successBody)}
        onSubmitted={(payload) => {
          const value = Number(payload.amount);
          if (!value) return;
          setCauses((prev) =>
            prev.map((c) => (c.slug === causeSlug ? { ...c, raisedAmount: c.raisedAmount + value } : c)),
          );
        }}
      />
    </GlassFormShell>
  );
}
