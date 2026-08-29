"use client";

import { useState } from "react";
import Image from "next/image";
import type { Program } from "./programs-data";

const fieldClass =
  "border-0 border-b-2 border-black/15 bg-transparent px-0 py-1 font-body text-sm text-black placeholder:text-black/35 transition-colors focus:border-navy focus:outline-none md:py-1.5";

const labelClass = "font-heading text-[11px] font-semibold uppercase tracking-wide text-black/55";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
      <path d="M5 12.5 9.5 17 19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <path d="M5 12h13.5M13 6l6.5 6-6.5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProgramStage({ program }: { program: Program; reverse?: boolean }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
        <div className="grid min-h-0 flex-1 items-start gap-5 overflow-hidden pb-2 md:gap-10 md:grid-cols-[0.8fr_1fr_1fr] md:pb-4">
          {/* Column 1: photo */}
          <div className="hidden md:flex md:items-start md:justify-center">
            <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl shadow-sm">
              <Image src={program.image} alt={program.imageAlt} fill sizes="260px" className="object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-wide text-navy shadow-sm backdrop-blur-sm">
                {program.format}
              </span>
            </div>
          </div>

          {/* Column 2: the pitch */}
          <div className="flex flex-col gap-2 overflow-hidden md:gap-3">
            <span className="w-fit rounded-full bg-navy/8 px-2.5 py-0.5 font-heading text-[11px] font-bold uppercase tracking-wide text-navy md:hidden">
              {program.format}
            </span>
            <div>
              <h2 className="font-heading text-lg font-bold leading-tight text-navy md:text-2xl">
                {program.title}
              </h2>
              <p className="mt-1 font-heading text-xs font-semibold text-orange md:text-sm">{program.subtitle}</p>
            </div>

            <p className="hidden font-body text-sm leading-5 text-black/70 md:block">{program.hook}</p>

            <ul className="hidden flex-col gap-1 md:flex">
              {program.highlights.map((point) => (
                <li key={point} className="flex items-start gap-2 font-body text-sm leading-5 text-black/70">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <CheckIcon />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            {/* Mobile only: the photo column above is hidden entirely below
                md, which left the gap between the program name and the form
                empty. Fills it instead of just being cropped out. */}
            <div className="relative mt-1 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-sm md:hidden">
              <Image src={program.image} alt={program.imageAlt} fill sizes="100vw" className="object-cover" />
            </div>
          </div>

          {/* Column 3: the ask */}
          <div className="flex flex-col gap-3 overflow-hidden md:gap-4">
            <div className="flex flex-col gap-1.5 md:gap-2">
              <div>
                <p className={labelClass}>Program fee</p>
                <p className="font-heading text-xl font-bold text-navy md:text-2xl">{program.contributionAmount}</p>
              </div>
              <div className="hidden flex-wrap items-center gap-2 md:flex">
                <span className="rounded-full bg-navy/8 px-2.5 py-1 font-heading text-[11px] font-semibold text-navy">
                  {program.audience}
                </span>
                <span className="rounded-full bg-orange/10 px-2.5 py-1 font-heading text-[11px] font-semibold text-orange">
                  CSR eligible
                </span>
              </div>
              <p className="hidden font-body text-xs leading-5 text-black/55 md:block">{program.impact}</p>
            </div>

            {sent ? (
              <div className="flex items-start gap-2 border-t border-black/8 pt-3 md:pt-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                  <CheckIcon />
                </span>
                <p className="font-body text-sm leading-5 text-navy">
                  Thank you. Our partnerships team will reach out to confirm details.
                </p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-3 border-t border-black/8 pt-3 md:gap-3 md:pt-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Name</span>
                    <input required type="text" placeholder="Jane Doe" className={fieldClass} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Number</span>
                    <input required type="tel" placeholder="+91 98765 43210" className={fieldClass} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Email</span>
                    <input required type="email" placeholder="you@email.com" className={fieldClass} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Date</span>
                    <input required type="date" className={fieldClass} />
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-1 flex items-center justify-center gap-2 self-start rounded-full bg-orange px-8 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
                >
                  Enquire
                  <ArrowIcon />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
