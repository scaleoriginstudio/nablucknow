"use client";

import { useState } from "react";
import { GlassFormShell } from "../components/shared/GlassFormShell";
import { LeadForm } from "../components/shared/LeadForm";
import { VOLUNTEER_AREAS } from "../components/shared/constants";

const STATS = [
  { value: "150+", label: "Active volunteers" },
  { value: "30+", label: "Years of programmes" },
];

export function VolunteerStage() {
  const [area, setArea] = useState("");

  return (
    <GlassFormShell
      variant="page"
      image="/img/nab/dance.jpg"
      imageAlt="A volunteer working with NAB students"
      eyebrow="Volunteer"
      title="Give your time, change a story"
      intro="Tell us a little about yourself and how you would like to help. Our volunteer coordinator will get in touch within a few days to match you with a programme."
      aside={
        <>
          <p className="font-body text-base italic leading-snug text-white/95">
            &ldquo;Every hour a volunteer gives here becomes a skill one of our students carries for life.&rdquo;
          </p>
          <div className="flex gap-8 border-t border-white/20 pt-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl font-bold">{stat.value}</p>
                <p className="font-body text-xs text-white/70">{stat.label}</p>
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
          label: "Which area?",
          placeholder: "Choose an area",
          options: VOLUNTEER_AREAS,
          value: area,
          onChange: setArea,
        }}
        submitLabel="Submit application"
        successBody="Thank you for offering your time. Our volunteer coordinator will be in touch shortly."
      />
    </GlassFormShell>
  );
}
