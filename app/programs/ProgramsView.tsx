"use client";

import { useState } from "react";
import Image from "next/image";
import { LeadForm } from "../components/shared/LeadForm";
import { Icon } from "../components/shared/Icon";
import { PROGRAMS } from "./programs-data";

// A Material Symbol per programme, used on the circular selectors.
const PROGRAM_ICON: Record<string, string> = {
  "workplace-inclusivity": "campaign",
  "nukkad-naatak": "theater_comedy",
  "walk-for-a-cause": "directions_walk",
};

/** The Programs screen, laid out to the notebook wireframe: the active
    programme's name rides the number line, its picture fills a white left
    column, the details scroll on the right, and a row of circular
    selectors along the bottom switches between programmes. */
export function ProgramsView() {
  const [index, setIndex] = useState(0);
  const program = PROGRAMS[index];

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-4 pt-2 md:gap-6">
      {/* Number line: a rule across the width with the active programme's
          name on it, where the stepper sits on the other pages. */}
      <div className="relative shrink-0">
        <div className="h-px w-full bg-black/15" />
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 font-heading text-sm font-bold text-navy sm:text-base">
          {program.title}
        </span>
      </div>

      {/* Image on the left (white field), details on the right. */}
      <div className="grid min-h-0 flex-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
        <div className="relative hidden overflow-hidden rounded-3xl bg-white ring-1 ring-black/10 md:block">
          <Image
            key={program.slug}
            src={program.image}
            alt={program.imageAlt}
            fill
            sizes="40vw"
            className="object-cover"
          />
        </div>

        <div
          data-stage-scroll=""
          className="min-h-0 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch]"
        >
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
            {program.format} · {program.audience}
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold leading-tight text-navy sm:text-3xl">
            Why {program.title}?
          </h1>
          <p className="mt-3 font-body text-sm leading-6 text-black/70 sm:text-base sm:leading-7">
            {program.hook}
          </p>

          <ul className="mt-4 flex flex-col gap-2">
            {program.highlights.map((point) => (
              <li key={point} className="flex items-start gap-2 font-body text-sm text-black/75">
                <span className="mt-0.5 shrink-0 text-orange">
                  <Icon name="check" size={16} weight={600} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-4 font-body text-sm font-semibold text-navy">
            {program.contributionAmount} · CSR eligible
          </p>

          <div className="mt-6 border-t border-black/10 pt-6">
            <h2 className="font-heading text-lg font-bold text-navy">Bring it to your team</h2>
            <p className="mt-1 font-body text-sm text-black/60">
              Leave your details and our partnerships team will confirm dates.
            </p>
            <div className="mt-4">
              <LeadForm
                formType="ProgramEnquiry"
                select={{
                  name: "programme",
                  label: "Which programme?",
                  placeholder: "Choose a programme",
                  options: PROGRAMS.map((p) => p.title),
                  value: program.title,
                  onChange: (v) => {
                    const i = PROGRAMS.findIndex((p) => p.title === v);
                    if (i >= 0) setIndex(i);
                  },
                }}
                feeNote={program.impact}
                submitLabel="Enquire"
                successBody="Thank you. Our partnerships team will reach out to confirm dates and details."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Circular programme selectors. */}
      <div className="flex shrink-0 items-start justify-center gap-6 pt-1 sm:gap-12">
        {PROGRAMS.map((p, i) => {
          const active = i === index;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={active}
              className="group flex w-24 flex-col items-center gap-1.5 sm:w-32"
            >
              <span
                className={
                  "flex h-12 w-12 items-center justify-center rounded-full ring-1 transition-colors sm:h-14 sm:w-14 " +
                  (active
                    ? "bg-navy text-white ring-navy"
                    : "bg-white text-navy/50 ring-black/15 group-hover:ring-navy group-hover:text-navy")
                }
              >
                <Icon name={PROGRAM_ICON[p.slug] ?? "interests"} size={22} />
              </span>
              <span
                className={
                  "text-center font-heading text-[11px] font-semibold leading-tight sm:text-xs " +
                  (active ? "text-navy" : "text-black/45")
                }
              >
                {p.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
