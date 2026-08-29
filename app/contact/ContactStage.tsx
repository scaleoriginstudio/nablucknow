"use client";

import { useState, type FormEvent } from "react";
import { GlassFormShell } from "../components/shared/GlassFormShell";
import { Icon } from "../components/shared/Icon";
import { FOOTER_CONTACT } from "../components/shared/constants";
import { submitLead } from "../lib/forms";

const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FOOTER_CONTACT.address)}`;

const fieldClass =
  "w-full rounded-lg border border-black/15 bg-white/85 px-3.5 py-2.5 font-body text-sm text-black shadow-sm placeholder:text-black/40 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelClass = "font-heading text-[11px] font-semibold uppercase tracking-wide text-black/55";

export function ContactStage() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    setBusy(true);
    await submitLead("Contact", {
      name: String(data.get("name") ?? ""),
      number: String(data.get("number") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    setBusy(false);
    setSent(true);
  };

  return (
    <GlassFormShell
      variant="page"
      image="/img/nab/care.jpg"
      imageAlt=""
      eyebrow="Contact"
      title="Get in touch"
      intro="Questions about volunteering, donating, or partnering with us on a CSR programme? We would love to hear from you."
      aside={
        <div className="flex flex-col gap-3 font-body text-sm text-white/90">
          <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="leading-6 hover:underline">
            {FOOTER_CONTACT.address}
          </a>
          <div className="flex flex-col gap-0.5">
            {FOOTER_CONTACT.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:underline">
                {phone}
              </a>
            ))}
            <a href={`mailto:${FOOTER_CONTACT.email}`} className="hover:underline">
              {FOOTER_CONTACT.email}
            </a>
          </div>
        </div>
      }
    >
      {sent ? (
        <div className="flex items-start gap-3 rounded-xl border border-navy/15 bg-navy/5 p-4">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-white">
            <Icon name="check" size={16} weight={500} />
          </span>
          <div>
            <p className="font-heading text-sm font-bold text-navy">Message sent</p>
            <p className="mt-1 font-body text-sm leading-6 text-black/70">
              Thanks for reaching out. We will get back to you shortly.
            </p>
          </div>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className={labelClass}>Name</span>
              <input required name="name" type="text" autoComplete="name" placeholder="Full name" className={fieldClass} />
            </label>
            <label className="flex flex-col gap-1">
              <span className={labelClass}>Number</span>
              <input
                required
                name="number"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                className={fieldClass}
              />
            </label>
          </div>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Email</span>
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              className={fieldClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Message</span>
            <textarea
              required
              name="message"
              rows={4}
              placeholder="How can we help?"
              className={fieldClass + " resize-none"}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="mt-1 inline-flex items-center justify-center gap-2 self-start rounded-full bg-orange px-7 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-45"
          >
            {busy ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </GlassFormShell>
  );
}
