"use client";

import { useState } from "react";
import Image from "next/image";
import type { Program } from "./programs-data";

const fieldClass =
  "rounded-lg border border-black/12 bg-white px-3 py-2 font-body text-sm text-black placeholder:text-black/40 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
      <path d="M5 12.5 9.5 17 19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProgramStage({ program, reverse }: { program: Program; reverse?: boolean }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
        {/* Spacing reserved for the persistent stepper, which is a separate
            fixed element overlaid above this content — same convention the
            homepage's own stage stepper uses. */}
        <div className="mb-10 h-10 shrink-0" aria-hidden="true" />

        <div className="grid min-h-0 flex-1 gap-8 pb-4 md:grid-cols-2 md:items-stretch">
          <div className={"relative hidden overflow-hidden rounded-2xl md:block" + (reverse ? " md:order-2" : "")}>
            <Image
              src={program.image}
              alt={program.imageAlt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-wide text-navy shadow-sm backdrop-blur-sm">
              {program.format}
            </span>
          </div>

          <div className="flex flex-col justify-center gap-3 overflow-hidden">
          <div>
            <span className="mb-1 inline-block rounded-full bg-navy/8 px-2.5 py-0.5 font-heading text-[11px] font-bold uppercase tracking-wide text-navy md:hidden">
              {program.format}
            </span>
            <h2 className="font-heading text-xl font-bold leading-tight text-navy sm:text-2xl md:text-3xl">
              {program.title}
            </h2>
            <p className="mt-1 font-heading text-xs font-semibold text-orange sm:text-sm">{program.subtitle}</p>
          </div>

          <div className="hidden flex-col gap-2 sm:flex">
            <p className="font-body text-sm leading-6 text-black/70">{program.hook}</p>
            <ul className="flex flex-col gap-1">
              {program.highlights.map((point) => (
                <li key={point} className="flex items-start gap-2 font-body text-sm leading-5 text-black/70">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <CheckIcon />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 rounded-xl border border-navy/15 bg-navy/5 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-body text-[11px] uppercase tracking-wide text-black/50">Suggested contribution</p>
                <p className="font-heading text-lg font-bold text-navy">{program.contributionAmount}</p>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 font-heading text-[11px] font-semibold text-navy ring-1 ring-navy/15">
                {program.audience}
              </span>
            </div>
            <p className="font-body text-xs text-black/60">{program.impact}</p>

            {sent ? (
              <p className="font-body text-sm text-navy">
                Thank you. Our partnerships team will reach out to confirm details.
              </p>
            ) : (
              <form
                className="grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-navy/10 pt-2.5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <label className="col-span-2 flex flex-col gap-1 sm:col-span-1">
                  <span className="sr-only">Full name</span>
                  <input required type="text" placeholder="Full name" className={fieldClass} />
                </label>
                <label className="col-span-2 flex flex-col gap-1 sm:col-span-1">
                  <span className="sr-only">Organisation</span>
                  <input required type="text" placeholder="Organisation" className={fieldClass} />
                </label>
                <label className="col-span-2 flex flex-col gap-1 sm:col-span-1">
                  <span className="sr-only">Position</span>
                  <input required type="text" placeholder="Position" className={fieldClass} />
                </label>
                <label className="col-span-2 flex flex-col gap-1 sm:col-span-1">
                  <span className="sr-only">Work email</span>
                  <input required type="email" placeholder="Work email" className={fieldClass} />
                </label>
                <label className="col-span-2 flex flex-col gap-1 sm:col-span-1">
                  <span className="sr-only">Phone number</span>
                  <input required type="tel" placeholder="Phone number" className={fieldClass} />
                </label>
                <button
                  type="submit"
                  className="col-span-2 self-end rounded-full bg-orange px-5 py-2 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy sm:col-span-1"
                >
                  Request this fundraiser
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
