"use client";

import { useState } from "react";
import { GlassFormShell } from "./GlassFormShell";
import { LeadForm } from "./LeadForm";
import { VOLUNTEER_AREAS } from "./constants";

export function VolunteerOverlay({ onClose }: { onClose: () => void }) {
  const [area, setArea] = useState("");

  return (
    <GlassFormShell
      variant="modal"
      titleId="volunteer-overlay-title"
      onClose={onClose}
      image="/img/nab/dance.jpg"
      imageAlt="A volunteer working with NAB students"
      eyebrow="Get involved"
      title="Volunteer with us"
      intro="Tell us a little about yourself and how you would like to help. Our volunteer coordinator will get in touch to match you with a programme."
    >
      <LeadForm
        formType="Volunteer"
        select={{
          name: "area",
          label: "Which area?",
          placeholder: "Choose an area",
          options: VOLUNTEER_AREAS,
          value: area,
          onChange: setArea,
        }}
        successBody="Thank you for offering your time. Our volunteer coordinator will be in touch shortly."
      />
    </GlassFormShell>
  );
}
