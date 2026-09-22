"use client";

import { useState } from "react";
import { GlassFormShell } from "../components/shared/GlassFormShell";
import { LeadForm } from "../components/shared/LeadForm";
import { VOLUNTEER_AREAS } from "../components/shared/constants";
import { useLanguage } from "../components/shared/LanguageContext";

const STATS = [
  { value: "150+", label: { en: "Active volunteers", hi: "सक्रिय स्वयंसेवक" } },
  { value: "30+", label: { en: "Years of programmes", hi: "वर्षों से चल रहे प्रोग्राम" } },
];

const COPY = {
  eyebrow: { en: "Volunteer", hi: "स्वयंसेवा" },
  title: { en: "Give your time, change a story", hi: "अपना समय दें, किसी की कहानी बदल दें" },
  intro: {
    en: "Tell us a little about yourself and how you would like to help. Our volunteer coordinator will get in touch within a few days to match you with a programme.",
    hi: "हमें अपने बारे में थोड़ा बताएं और यह भी कि आप किस तरह मदद करना चाहेंगे। हमारी वॉलंटियर कोऑर्डिनेटर कुछ ही दिनों में आपसे संपर्क करके आपको किसी प्रोग्राम से जोड़ेगी।",
  },
  quote: {
    en: "Every hour a volunteer gives here becomes a skill one of our students carries for life — a small saath (साथ) that stays with them long after.",
    hi: "यहाँ एक स्वयंसेवक का दिया हर घंटा हमारे किसी विद्यार्थी के लिए जीवन भर काम आने वाला कौशल बन जाता है।",
  },
  whichArea: { en: "Which area?", hi: "कौन सा क्षेत्र?" },
  chooseArea: { en: "Choose an area", hi: "एक क्षेत्र चुनें" },
  submitApplication: { en: "Submit application", hi: "आवेदन भेजें" },
  successBody: {
    en: "Thank you for offering your time. Our volunteer coordinator will be in touch shortly.",
    hi: "अपना समय देने की पेशकश के लिए धन्यवाद। हमारी वॉलंटियर कोऑर्डिनेटर जल्द ही आपसे संपर्क करेगी।",
  },
};

export function VolunteerStage() {
  const { t } = useLanguage();
  const [area, setArea] = useState("");

  return (
    <GlassFormShell
      variant="page"
      image="/img/nab/dance.jpg"
      imageAlt="A volunteer working with NAB students"
      eyebrow={t(COPY.eyebrow)}
      title={t(COPY.title)}
      intro={t(COPY.intro)}
      aside={
        <>
          <p className="font-body text-base italic leading-snug text-white/95">&ldquo;{t(COPY.quote)}&rdquo;</p>
          <div className="flex gap-8 border-t border-white/20 pt-4">
            {STATS.map((stat) => (
              <div key={stat.value}>
                <p className="font-heading text-2xl font-bold">{stat.value}</p>
                <p className="font-body text-xs text-white/70">{t(stat.label)}</p>
              </div>
            ))}
          </div>
        </>
      }
    >
      <LeadForm
        formType="Volunteer"
        select={{
          name: "area",
          label: t(COPY.whichArea),
          placeholder: t(COPY.chooseArea),
          // Options display in the active language; the stored/submitted
          // value stays the English area name — a stable key for the lead
          // sheet, independent of which language picked it.
          options: VOLUNTEER_AREAS.map((a) => t(a)),
          value: area ? t(VOLUNTEER_AREAS.find((a) => a.en === area) ?? { en: area, hi: area }) : "",
          onChange: (label) => {
            const match = VOLUNTEER_AREAS.find((a) => t(a) === label);
            setArea(match ? match.en : label);
          },
        }}
        // Overrides the submitted "area" field with the stable English key
        // instead of the select's own (possibly Hindi) displayed value.
        extraPayload={{ area }}
        submitLabel={t(COPY.submitApplication)}
        successBody={t(COPY.successBody)}
      />
    </GlassFormShell>
  );
}
