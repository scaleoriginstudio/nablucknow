"use client";

import { useState } from "react";
import { GlassFormShell } from "../components/shared/GlassFormShell";
import { UpiDonationFlow } from "../components/shared/UpiPayment";
import { CauseAside } from "../components/shared/DonateOverlay";
import { CAUSES } from "../lib/causes-data";
import { useLanguage } from "../components/shared/LanguageContext";

const COPY = {
  eyebrow: { en: "Donate", hi: "दान करें" },
  title: {
    en: "Put your gift where you can see it",
    hi: "अपना योगदान वहाँ दें, जहाँ उसका असर आप खुद देख सकें",
  },
  intro: {
    en: "Pay by UPI straight to our bank account, then tell us which cause your gift is for and where to send your 80G tax receipt. No gateway and no fees: every rupee reaches the work.",
    hi: "UPI से सीधे हमारे बैंक खाते में भुगतान करें, फिर बताएं कि आपका दान किस अभियान के लिए है और 80G कर-रसीद कहाँ भेजनी है। कोई गेटवे नहीं, कोई शुल्क नहीं — हर रुपया सीधे काम तक पहुँचता है।",
  },
  whichCause: { en: "Which cause?", hi: "कौन सा अभियान?" },
  chooseCause: { en: "Choose a cause", hi: "एक अभियान चुनें" },
};

export function DonateStage() {
  const { t } = useLanguage();
  const [causeSlug, setCauseSlug] = useState(CAUSES[0].slug);
  const cause = CAUSES.find((c) => c.slug === causeSlug) ?? CAUSES[0];

  return (
    <GlassFormShell
      variant="page"
      image={cause.image}
      imageAlt=""
      eyebrow={t(COPY.eyebrow)}
      title={t(COPY.title)}
      intro={t(COPY.intro)}
      aside={<CauseAside cause={cause} />}
    >
      <UpiDonationFlow
        causeSlug={causeSlug}
        causeSelect={{
          name: "cause",
          label: t(COPY.whichCause),
          placeholder: t(COPY.chooseCause),
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
