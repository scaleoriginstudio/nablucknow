"use client";

import { useState } from "react";
import Image from "next/image";
import { CAUSES, formatINR, type Cause } from "../lib/causes-data";

const DONATION_AMOUNTS = [500, 1000, 2500, 5000];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
      <path d="M5 12.5 9.5 17 19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 5 6.3v5.1c0 4.5 3 7.8 7 9.1 4-1.3 7-4.6 7-9.1V6.3L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 12.2l2.1 2.1L15.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const fieldClass =
  "rounded-lg border border-black/12 bg-white px-3 py-2 font-body text-sm text-black placeholder:text-black/40 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10";

export function DonateStage() {
  const [causes, setCauses] = useState<Cause[]>(CAUSES);
  const [causeSlug, setCauseSlug] = useState(CAUSES[0].slug);
  const [amount, setAmount] = useState<number | null>(null);
  const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);
  const cause = causes.find((c) => c.slug === causeSlug) ?? causes[0];

  const selectCause = (slug: string) => {
    setCauseSlug(slug);
    setConfirmedAmount(null);
    setAmount(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!amount) return;
    // No real payment gateway in this build — a confirmed donation just
    // credits the cause's running total locally, so the progress bar and
    // raised-amount figure reflect it immediately.
    setCauses((prev) =>
      prev.map((c) => (c.slug === causeSlug ? { ...c, raisedAmount: c.raisedAmount + amount } : c)),
    );
    setConfirmedAmount(amount);
    setAmount(null);
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-2 sm:gap-5">
      <div className="flex flex-col gap-1">
        <span className="hidden font-heading text-xs font-bold uppercase tracking-wide text-orange sm:block">
          Donate
        </span>
        <h1 className="font-heading text-xl font-bold leading-tight text-navy sm:text-2xl md:text-3xl">
          Put your gift where you can see it
        </h1>
        <p className="hidden font-body text-sm leading-6 text-black/60 sm:block">
          Choose a cause to see its progress update in real time as you give.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-[1.15fr_1fr] md:items-start md:gap-5">
        {/* Cause list */}
        <div className="flex flex-col gap-1.5 sm:gap-2.5">
          {causes.map((c) => {
            const pct = Math.min(100, Math.round((c.raisedAmount / c.goalAmount) * 100));
            const isSelected = c.slug === causeSlug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => selectCause(c.slug)}
                aria-pressed={isSelected}
                className={
                  "flex items-center gap-2 rounded-xl border bg-white p-1.5 text-left transition-all sm:gap-3 sm:p-2.5 " +
                  (isSelected ? "border-orange shadow-md ring-2 ring-orange/25" : "border-black/10 hover:border-navy/30 hover:shadow-sm")
                }
              >
                <div className="relative h-9 w-11 shrink-0 overflow-hidden rounded-lg sm:h-14 sm:w-16">
                  <Image src={c.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-heading text-sm font-bold text-navy">{c.title}</h3>
                    <span className="shrink-0 font-heading text-xs font-bold text-orange">{pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/8">
                    <div
                      className="h-full rounded-full bg-orange transition-[width] duration-500 ease-out"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="hidden font-body text-[11px] text-black/50 sm:block">
                    {formatINR(c.raisedAmount)} raised of {formatINR(c.goalAmount)} goal
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className={
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors " +
                    (isSelected ? "border-orange bg-orange text-white" : "border-black/15 text-transparent")
                  }
                >
                  <CheckIcon />
                </span>
              </button>
            );
          })}
        </div>

        {/* Donation panel */}
        <div className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-white p-3 shadow-lg sm:gap-3.5 sm:p-5">
          <div>
            <p className="font-body text-[11px] uppercase tracking-wide text-black/45">Donating to</p>
            <p className="font-heading text-sm font-bold text-navy">{cause.title}</p>
          </div>

          {confirmedAmount ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 rounded-lg border border-navy/15 bg-navy/5 p-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                  <CheckIcon />
                </span>
                <p className="font-body text-sm leading-5 text-navy">
                  Thank you! Your {formatINR(confirmedAmount)} gift to {cause.title} is already reflected above.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setConfirmedAmount(null)}
                className="self-start font-heading text-xs font-semibold text-navy underline-offset-2 hover:underline"
              >
                Make another donation
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-2 sm:gap-3.5" onSubmit={handleSubmit}>
              <div>
                <p className="mb-1.5 font-heading text-xs font-semibold uppercase tracking-wide text-black/50">
                  Choose an amount
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {DONATION_AMOUNTS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value)}
                      aria-pressed={amount === value}
                      className={
                        "rounded-lg border py-1.5 font-heading text-sm font-semibold transition-colors " +
                        (amount === value
                          ? "border-navy bg-navy text-white"
                          : "border-black/15 text-black/60 hover:border-navy hover:text-navy")
                      }
                    >
                      ₹{value}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-1">
                <span className="font-heading text-xs font-semibold text-black/50">Full name</span>
                <input required type="text" placeholder="Full name" className={fieldClass} />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-heading text-xs font-semibold text-black/50">Phone number</span>
                <input required type="tel" placeholder="Phone number (for Razorpay)" className={fieldClass} />
              </label>
              <button
                type="submit"
                disabled={!amount}
                className="mt-0.5 flex items-center justify-center rounded-full bg-orange px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-40"
              >
                {amount ? `Pay ₹${amount} via Razorpay` : "Choose an amount"}
              </button>
              <div className="hidden items-center gap-1.5 font-body text-xs text-black/50 sm:flex">
                <ShieldIcon />
                Secured by Razorpay
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
