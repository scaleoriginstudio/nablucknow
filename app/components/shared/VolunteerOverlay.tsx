"use client";

import { useState } from "react";
import { GlassFormShell } from "./GlassFormShell";
import { LeadForm } from "./LeadForm";
import { VOLUNTEER_AREAS } from "./constants";
import { useLanguage } from "./LanguageContext";

const EYEBROW = { en: "Get involved", hi: "जुड़ें" };
const TITLE = { en: "Volunteer with us", hi: "हमारे साथ स्वयंसेवा करें" };
const INTRO = {
  en: "Tell us a little about yourself and how you would like to help. Our volunteer coordinator will get in touch to match you with a programme.",
  hi: "अपने बारे में और आप किस तरह मदद करना चाहते हैं, यह हमें बताएं। हमारा स्वयंसेवक समन्वयक आपसे संपर्क कर आपको सही कार्यक्रम से जोड़ेगा।",
};
const IMAGE_ALT = { en: "A volunteer working with NAB students", hi: "एक स्वयंसेवक NAB के विद्यार्थियों के साथ काम करते हुए" };
const WHICH_AREA_LABEL = { en: "Which area?", hi: "कौन सा क्षेत्र?" };
const CHOOSE_AREA_PLACEHOLDER = { en: "Choose an area", hi: "एक क्षेत्र चुनें" };
const SUCCESS_BODY = {
  en: "Thank you for offering your time. Our volunteer coordinator will be in touch shortly.",
  hi: "अपना समय देने के लिए धन्यवाद। हमारा स्वयंसेवक समन्वयक जल्द ही आपसे संपर्क करेगा।",
};

export function VolunteerOverlay({ onClose }: { onClose: () => void }) {
  const [area, setArea] = useState("");
  const { t } = useLanguage();

  return (
    <GlassFormShell
      variant="modal"
      titleId="volunteer-overlay-title"
      onClose={onClose}
      image="/img/nab/dance.jpg"
      imageAlt={t(IMAGE_ALT)}
      eyebrow={t(EYEBROW)}
      title={t(TITLE)}
      intro={t(INTRO)}
    >
      <LeadForm
        formType="Volunteer"
        select={{
          name: "area",
          label: t(WHICH_AREA_LABEL),
          placeholder: t(CHOOSE_AREA_PLACEHOLDER),
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
        successBody={t(SUCCESS_BODY)}
      />
    </GlassFormShell>
  );
}
