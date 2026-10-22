"use client";

import { GlassFormShell } from "../components/shared/GlassFormShell";
import { UpiDonationFlow } from "../components/shared/UpiPayment";
import { CausesAside, DONATE_IMAGE } from "../components/shared/DonateOverlay";
import { useLanguage } from "../components/shared/LanguageContext";

const COPY = {
  eyebrow: { en: "Donate", hi: "दान करें" },
  title: {
    en: "Put your gift where you can see it",
    hi: "अपना योगदान वहाँ दें, जहाँ उसका असर आप खुद देख सकें",
  },
  intro: {
    en: "Pay by UPI straight to our bank account. No gateway and no fees: every rupee reaches the work.",
    hi: "UPI से सीधे हमारे बैंक खाते में भुगतान करें। कोई गेटवे नहीं, कोई शुल्क नहीं। हर रुपया सीधे काम तक पहुँचता है।",
  },
};

export function DonateStage() {
  const { t } = useLanguage();
  return (
    <GlassFormShell
      variant="page"
      image={DONATE_IMAGE}
      imageAlt=""
      eyebrow={t(COPY.eyebrow)}
      title={t(COPY.title)}
      intro={t(COPY.intro)}
      aside={<CausesAside />}
    >
      <UpiDonationFlow />
    </GlassFormShell>
  );
}
