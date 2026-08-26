"use client";

import { useState } from "react";
import Image from "next/image";
import { ModalShell } from "./ModalShell";
import { CAUSES, formatINR } from "../../lib/causes-data";

const DONATION_AMOUNTS = [500, 1000, 2500, 5000];

export function DonateOverlay({ onClose }: { onClose: () => void }) {
  const [causeSlug, setCauseSlug] = useState(CAUSES[0].slug);
  const [amount, setAmount] = useState<number | null>(null);
  const cause = CAUSES.find((c) => c.slug === causeSlug) ?? CAUSES[0];

  return (
    <ModalShell titleId="donate-overlay-title" onClose={onClose}>
      <div className="flex max-h-[85vh] w-full flex-col gap-6 overflow-y-auto p-8">
        <div>
          <h2 id="donate-overlay-title" className="font-heading text-2xl font-bold text-navy">
            Donate to a cause
          </h2>
          <p className="mt-1 font-body text-sm text-black/60">
            Choose a cause to see its progress, then complete your donation below.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {CAUSES.map((c) => {
            const pct = Math.min(100, Math.round((c.raisedAmount / c.goalAmount) * 100));
            const isSelected = c.slug === causeSlug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCauseSlug(c.slug)}
                aria-pressed={isSelected}
                className={
                  "flex flex-col overflow-hidden rounded-xl border text-left transition-colors " +
                  (isSelected ? "border-orange ring-2 ring-orange/40" : "border-black/10 hover:border-navy/40")
                }
              >
                <div className="h-24 w-full overflow-hidden">
                  <Image src={c.image} alt="" width={300} height={160} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col gap-1 p-3">
                  <h3 className="font-heading text-sm font-bold text-navy">{c.title}</h3>
                  <p className="font-body text-xs leading-5 text-black/60">{c.description}</p>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                    <div className="h-full rounded-full bg-orange" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="font-body text-xs text-black/60">
                    {formatINR(c.raisedAmount)} raised of {formatINR(c.goalAmount)} goal
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 border-t border-black/10 pt-6 md:grid-cols-[1.2fr_1fr]">
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <p className="font-heading text-sm font-semibold text-navy">Donating to: {cause.title}</p>
            <label className="flex flex-col gap-1">
              <span className="sr-only">Full name</span>
              <input
                required
                type="text"
                placeholder="Full name"
                className="border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {DONATION_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  aria-pressed={amount === value}
                  className={
                    "rounded-full border px-4 py-1.5 font-heading text-sm font-semibold transition-colors " +
                    (amount === value
                      ? "border-navy bg-navy text-white"
                      : "border-black/15 text-black/60 hover:border-navy hover:text-navy")
                  }
                >
                  ₹{value}
                </button>
              ))}
            </div>
            <label className="flex flex-col gap-1">
              <span className="sr-only">Phone number</span>
              <input
                required
                type="tel"
                placeholder="Phone number (for Razorpay)"
                className="border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={!amount}
              className="mt-1 self-start rounded-full bg-orange px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
            >
              {amount ? `Pay ₹${amount} via Razorpay` : "Choose an amount"}
            </button>
          </form>

          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-black/10 p-4">
            <svg viewBox="0 0 100 100" className="h-32 w-32" role="img" aria-label="QR code to donate via UPI">
              <rect width="100" height="100" fill="white" />
              {Array.from({ length: 10 }).map((_, row) =>
                Array.from({ length: 10 }).map((_, col) =>
                  (row + col) % 3 === 0 ? (
                    <rect key={`${row}-${col}`} x={col * 10} y={row * 10} width={10} height={10} fill="#23398D" />
                  ) : null,
                ),
              )}
            </svg>
            <p className="font-body text-xs text-black/60">Scan to pay via UPI</p>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
