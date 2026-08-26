"use client";

import { useState } from "react";
import Image from "next/image";
import { ModalShell } from "./ModalShell";

export function VolunteerOverlay({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <ModalShell titleId="volunteer-overlay-title" onClose={onClose}>
      <div className="hidden w-2/5 md:block">
        <Image
          src="/img/nab/dance.jpg"
          alt="A volunteer working with NAB students"
          width={600}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full flex-col gap-4 p-8 md:w-3/5">
        <h2 id="volunteer-overlay-title" className="font-heading text-2xl font-bold text-navy">
          Volunteer with us
        </h2>
        <p className="font-body text-sm leading-6 text-black/70">
          Tell us a little about yourself and how you&apos;d like to help. Our volunteer coordinator will get in
          touch to match you with a programme.
        </p>

        {sent ? (
          <p className="font-body text-sm text-navy">
            Thank you for offering your time. We&apos;ll be in touch shortly.
          </p>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
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
                <span className="sr-only">Phone number</span>
                <input
                  required
                  type="tel"
                  placeholder="Phone number"
                  className="border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1">
              <span className="sr-only">Email</span>
              <input
                required
                type="email"
                placeholder="Email"
                className="border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="sr-only">Role you&apos;re interested in</span>
              <input
                required
                type="text"
                placeholder="Role you're interested in"
                className="border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="sr-only">Why should we have you volunteer with us?</span>
              <textarea
                required
                rows={3}
                placeholder="Why should we have you volunteer with us?"
                className="resize-none border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-1 self-start rounded-full bg-orange px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </ModalShell>
  );
}
