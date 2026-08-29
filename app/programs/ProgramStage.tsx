"use client";

import { useState } from "react";
import { GlassFormShell } from "../components/shared/GlassFormShell";
import { LeadForm } from "../components/shared/LeadForm";
import { Icon } from "../components/shared/Icon";
import { PROGRAMS, type Program } from "./programs-data";

export function ProgramStage({ program, reverse = false }: { program: Program; reverse?: boolean }) {
  const [selected, setSelected] = useState(program.title);

  return (
    <GlassFormShell
      variant="page"
      imageSide={reverse ? "right" : "left"}
      image={program.image}
      imageAlt={program.imageAlt}
      eyebrow={program.format}
      title={program.title}
      intro={program.hook}
      meta={`${program.contributionAmount} · CSR eligible`}
      aside={
        <>
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-white/70">{program.audience}</p>
          <ul className="flex flex-col gap-1.5">
            {program.highlights.map((point) => (
              <li key={point} className="flex items-start gap-2 font-body text-sm leading-5 text-white/95">
                <span className="mt-0.5 text-orange">
                  <Icon name="check" size={16} weight={600} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </>
      }
    >
      <LeadForm
        formType="ProgramEnquiry"
        select={{
          name: "programme",
          label: "Which programme?",
          placeholder: "Choose a programme",
          options: PROGRAMS.map((p) => p.title),
          value: selected,
          onChange: setSelected,
        }}
        feeNote={program.impact}
        submitLabel="Enquire"
        successBody="Thank you. Our partnerships team will reach out to confirm dates and details."
      />
    </GlassFormShell>
  );
}
