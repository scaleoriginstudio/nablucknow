"use client";

import { useState } from "react";
import Image from "next/image";

const ROLES = ["Teaching & Tutoring", "Events & Fundraising", "Admin & Operations", "Mentorship"];

const STATS = [
  { value: "150+", label: "Active volunteers" },
  { value: "30+", label: "Years of programmes" },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M5 12.5 9.5 17 19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M5 12h13.5M13 6l6.5 6-6.5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const fieldClass =
  "rounded-lg border border-black/12 bg-white px-3.5 py-2.5 font-body text-sm text-black placeholder:text-black/40 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10";

export function VolunteerStage() {
  const [role, setRole] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="mx-auto grid h-full w-full max-w-6xl gap-8 py-4 md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
        {/* Editorial panel */}
        <div className="relative hidden overflow-hidden rounded-3xl md:block">
          <Image
            src="/img/nab/dance.jpg"
            alt="A volunteer working with NAB students"
            fill
            sizes="(min-width: 768px) 40vw, 0px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />
          <div className="relative flex h-full flex-col justify-between p-8 text-white">
            <span className="w-fit rounded-full bg-white/15 px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm">
              Get Involved
            </span>
            <div className="flex flex-col gap-5">
              <p className="font-body text-lg italic leading-snug text-white/95">
                &ldquo;Every hour a volunteer gives here becomes a skill one of our students carries for life.&rdquo;
              </p>
              <div className="flex gap-8 border-t border-white/20 pt-5">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl font-bold">{stat.value}</p>
                    <p className="font-body text-xs text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex flex-col justify-center gap-5 px-1">
          <div className="flex flex-col gap-1.5">
            <span className="font-heading text-xs font-bold uppercase tracking-wide text-orange">Volunteer</span>
            <h1 className="font-heading text-2xl font-bold leading-tight text-navy sm:text-3xl">
              Give your time, change a story
            </h1>
            <p className="max-w-md font-body text-sm leading-6 text-black/60">
              Tell us a little about yourself and how you&apos;d like to help. Our volunteer coordinator will get in
              touch within a few days to match you with a programme.
            </p>
          </div>

          {sent ? (
            <div className="flex items-start gap-3 rounded-xl border border-navy/15 bg-navy/5 p-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                <CheckIcon />
              </span>
              <p className="font-body text-sm leading-6 text-navy">
                Thank you for offering your time. We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-3.5"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <div className="flex flex-col gap-2">
                <p className="font-heading text-xs font-semibold uppercase tracking-wide text-black/50">
                  How would you like to help?
                </p>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((option) => {
                    const isSelected = role === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setRole(isSelected ? null : option)}
                        aria-pressed={isSelected}
                        className={
                          "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-heading text-xs font-semibold transition-colors " +
                          (isSelected
                            ? "border-navy bg-navy text-white"
                            : "border-black/15 text-black/60 hover:border-navy hover:text-navy")
                        }
                      >
                        {isSelected && <CheckIcon />}
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="font-heading text-xs font-semibold text-black/50">Full name</span>
                  <input required type="text" placeholder="Ananya Sharma" className={fieldClass} />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-heading text-xs font-semibold text-black/50">Phone number</span>
                  <input required type="tel" placeholder="+91 98765 43210" className={fieldClass} />
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span className="font-heading text-xs font-semibold text-black/50">Email</span>
                <input required type="email" placeholder="you@email.com" className={fieldClass} />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-heading text-xs font-semibold text-black/50">
                  Why should we have you volunteer with us?
                </span>
                <textarea
                  required
                  rows={2}
                  placeholder="A sentence or two is plenty"
                  className={fieldClass + " resize-none"}
                />
              </label>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={!role}
                  className="inline-flex items-center gap-2 self-start rounded-full bg-orange px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit application
                  <ArrowIcon />
                </button>
                {!role && (
                  <p className="font-body text-xs text-black/40">Pick a way to help to continue</p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
