"use client";

import { useState } from "react";
import { FOOTER_CONTACT } from "../components/shared/constants";

const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FOOTER_CONTACT.address)}`;
const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(FOOTER_CONTACT.address)}&output=embed`;

export function ContactStage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/img/placeholders/contact-phone.jpg)" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy/85" />

      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-10 py-10 md:flex-row md:items-center md:gap-16">
        <div className="flex flex-col gap-6 text-white md:w-2/5">
          <h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">Get in touch</h1>
          <p className="font-body text-sm leading-6 text-white/80">
            Questions about volunteering, donating, or partnering with us on a CSR programme? We&apos;d love to hear
            from you.
          </p>

          <div className="flex flex-col gap-4 font-body text-sm text-white/90">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-wide text-white/60">Address</p>
              <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="leading-6 hover:underline">
                {FOOTER_CONTACT.address}
              </a>
              <div className="mt-3 h-32 w-full overflow-hidden rounded-lg border border-white/20">
                <iframe
                  title="Map to National Association for the Blind, State Chapter, Lucknow"
                  src={MAPS_EMBED_SRC}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-wide text-white/60">Phone</p>
              {FOOTER_CONTACT.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="block hover:underline">
                  {phone}
                </a>
              ))}
            </div>
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-wide text-white/60">Email</p>
              <a href={`mailto:${FOOTER_CONTACT.email}`} className="hover:underline">
                {FOOTER_CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        <form
          className="flex flex-col gap-5 rounded-2xl bg-white/95 p-8 shadow-xl md:w-3/5"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <p className="font-body text-sm text-navy">
              Thanks for reaching out. We&apos;ll get back to you shortly.
            </p>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="sr-only">Full name</span>
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    className="border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="sr-only">Email</span>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span className="sr-only">Message</span>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help?"
                  className="resize-none border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="mt-2 self-start rounded-full bg-orange px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
              >
                Send message
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
