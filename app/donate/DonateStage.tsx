"use client";

import { useState } from "react";
import { GlassFormShell } from "../components/shared/GlassFormShell";
import { LeadForm } from "../components/shared/LeadForm";
import { CAUSES, formatINR, type Cause } from "../lib/causes-data";
import { TAX_EXEMPTION_NOTE } from "../components/shared/constants";

const DONATION_AMOUNTS = [500, 1000, 2500, 5000];

export function DonateStage() {
  const [causes, setCauses] = useState<Cause[]>(CAUSES);
  const [causeTitle, setCauseTitle] = useState(CAUSES[0].title);
  const [amount, setAmount] = useState<number | null>(null);
  const cause = causes.find((c) => c.title === causeTitle) ?? causes[0];
  const pct = Math.min(100, Math.round((cause.raisedAmount / cause.goalAmount) * 100));

  return (
    <GlassFormShell
      variant="page"
      image={cause.image}
      imageAlt=""
      eyebrow="Donate"
      title="Put your gift where you can see it"
      intro="Choose a cause and an amount, then leave your details. Online payment is not live yet, so our team will send UPI and bank transfer options to complete your gift."
      meta={`${formatINR(cause.raisedAmount)} raised of ${formatINR(cause.goalAmount)} goal`}
      aside={
        <div className="flex flex-col gap-2">
          <p className="font-heading text-sm font-bold">{cause.title}</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-orange transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="font-body text-xs text-white/80">
            {formatINR(cause.raisedAmount)} raised of {formatINR(cause.goalAmount)} goal
          </p>
        </div>
      }
    >
      <LeadForm
        formType="Donate"
        select={{
          name: "cause",
          label: "Which cause?",
          placeholder: "Choose a cause",
          options: causes.map((c) => c.title),
          value: causeTitle,
          onChange: (v) => {
            setCauseTitle(v);
            setAmount(null);
          },
        }}
        extra={
          <div className="flex flex-col gap-1.5">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-wide text-black/55">Amount</span>
            <div className="grid grid-cols-4 gap-2">
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
        }
        extraPayload={amount ? { amount } : undefined}
        disabled={!amount}
        submitLabel={amount ? `Pay ₹${amount} via Razorpay` : "Choose an amount"}
        feeNote={`Online payment is not live yet. We will email you UPI and bank transfer details to complete the donation. ${TAX_EXEMPTION_NOTE}`}
        successTitle="Pledge recorded"
        successBody="Thank you. We have your details and will send payment options shortly."
        onSubmitted={(payload) => {
          const value = Number(payload.amount);
          if (!value) return;
          setCauses((prev) =>
            prev.map((c) => (c.title === causeTitle ? { ...c, raisedAmount: c.raisedAmount + value } : c)),
          );
        }}
      />
    </GlassFormShell>
  );
}
