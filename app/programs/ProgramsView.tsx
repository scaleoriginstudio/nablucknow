"use client";

import { useState } from "react";
import Image from "next/image";
import { LeadForm } from "../components/shared/LeadForm";
import { Icon } from "../components/shared/Icon";
import { PROGRAMS } from "./programs-data";
import { useLanguage } from "../components/shared/LanguageContext";

// A Material Symbol per programme, used on the circular selectors.
const PROGRAM_ICON: Record<string, string> = {
  "workplace-inclusivity": "campaign",
  "nukkad-naatak": "theater_comedy",
  "walk-for-a-cause": "directions_walk",
};

function whyTitle(title: string) {
  return { en: `Why ${title}?`, hi: `${title} क्यों?` };
}

const COPY = {
  csrEligible: { en: "CSR eligible", hi: "CSR के लिए पात्र" },
  bringToTeam: { en: "Bring it to your team", hi: "इसे अपनी टीम तक लाएँ" },
  bringToTeamSub: {
    en: "Leave your details and our partnerships team will confirm dates.",
    hi: "अपनी जानकारी दें, हमारी पार्टनरशिप टीम तारीखें तय करेगी।",
  },
  whichProgramme: { en: "Which programme?", hi: "कौन सा प्रोग्राम?" },
  chooseProgramme: { en: "Choose a programme", hi: "एक प्रोग्राम चुनें" },
  enquire: { en: "Enquire", hi: "पूछताछ करें" },
  enquirySuccess: {
    en: "Thank you. Our partnerships team will reach out to confirm dates and details.",
    hi: "धन्यवाद। हमारी पार्टनरशिप टीम तारीखें और विवरण तय करने के लिए आपसे संपर्क करेगी।",
  },
};

/** The Programs screen, laid out to the notebook wireframe: the active
    programme's name rides the number line, its picture fills a white left
    column (a band on top on phones), the details scroll on the right, and
    a row of circular selectors along the bottom switches between them. */
export function ProgramsView() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const program = PROGRAMS[index];

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-3 pt-2 md:gap-6">
      {/* Number line: a rule across the width with the active programme's
          name on it, where the stepper sits on the other pages. */}
      <div className="relative shrink-0">
        <div className="h-px w-full bg-black/15" />
        <span className="absolute left-1/2 top-0 max-w-[88vw] -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-center font-heading text-xs font-bold leading-tight text-navy sm:max-w-none sm:px-4 sm:text-base">
          {t(program.title)}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:grid-rows-1 md:gap-10">
        {/* Photo: a band on phones, a full white column on md+. */}
        <div className="relative h-32 overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 sm:h-40 md:h-auto md:rounded-3xl">
          <Image
            key={program.slug}
            src={program.image}
            alt={program.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
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
          <h1 className="mt-1.5 font-heading text-xl font-bold leading-tight text-navy sm:mt-2 sm:text-3xl">
            {t(whyTitle(t(program.title)))}
          </h1>
          <p className="mt-2 font-body text-sm leading-6 text-black/70 sm:mt-3 sm:text-base sm:leading-7">
            {t(program.hook)}
          </p>

          <ul className="mt-3 flex flex-col gap-2 sm:mt-4">
            {program.highlights.map((point, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-black/75">
                <span className="mt-0.5 shrink-0 text-orange">
                  <Icon name="check" size={16} weight={600} />
                </span>
                {t(point)}
              </li>
            ))}
          </ul>

          <p className="mt-3 font-body text-sm font-semibold text-navy sm:mt-4">
            {program.contributionAmount} · {t(COPY.csrEligible)}
          </p>

          <div className="mt-5 border-t border-black/10 pt-5 sm:mt-6 sm:pt-6">
            <h2 className="font-heading text-lg font-bold text-navy">{t(COPY.bringToTeam)}</h2>
            <p className="mt-1 font-body text-sm text-black/60">{t(COPY.bringToTeamSub)}</p>
            <div className="mt-4">
              <LeadForm
                formType="ProgramEnquiry"
                select={{
                  name: "programme",
                  label: t(COPY.whichProgramme),
                  placeholder: t(COPY.chooseProgramme),
                  options: PROGRAMS.map((p) => t(p.title)),
                  value: t(program.title),
                  onChange: (v) => {
                    const i = PROGRAMS.findIndex((p) => t(p.title) === v);
                    if (i >= 0) setIndex(i);
                  },
                }}
                feeNote={t(program.impact)}
                // Overrides the submitted "programme" field with the stable
                // slug instead of the select's own (possibly Hindi)
                // displayed value.
                extraPayload={{ programme: program.slug }}
                submitLabel={t(COPY.enquire)}
                successBody={t(COPY.enquirySuccess)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Circular programme selectors — lifted clear of the floating action
          button on phones. */}
      <div className="flex shrink-0 items-start justify-center gap-4 pb-16 pt-1 sm:gap-12 sm:pb-0">
        {PROGRAMS.map((p, i) => {
          const active = i === index;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={active}
              className="group flex w-[30%] max-w-[8rem] flex-col items-center gap-1.5"
            >
              <span
                className={
                  "flex h-11 w-11 items-center justify-center rounded-full ring-1 transition-colors sm:h-14 sm:w-14 " +
                  (active
                    ? "bg-navy text-white ring-navy"
                    : "bg-white text-navy/50 ring-black/15 group-hover:text-navy group-hover:ring-navy")
                }
              >
                <Icon name={PROGRAM_ICON[p.slug] ?? "interests"} size={20} />
              </span>
              <span
                className={
                  "line-clamp-2 text-center font-heading text-[10px] font-semibold leading-tight sm:text-xs " +
                  (active ? "text-navy" : "text-black/45")
                }
              >
                {t(p.title)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
