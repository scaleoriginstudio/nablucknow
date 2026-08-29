"use client";

import { useState } from "react";
import Image from "next/image";
import { UPCOMING_EVENTS, type UpcomingEvent } from "./events-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// A plain URL template, no Google API or OAuth needed, that opens Google
// Calendar's own "add event" screen pre-filled with the event's details.
function googleCalendarUrl(event: UpcomingEvent) {
  const start = new Date(`${event.date}T${event.time}:00+05:30`);
  const end = new Date(start.getTime() + event.durationHours * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: event.description,
    location:
      event.mode === "Online" ? "Online" : "National Association for the Blind, State Chapter, Lucknow",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function EventCard({ event }: { event: UpcomingEvent }) {
  const [open, setOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  // The sign-up form needs real width to be readable — squeezed into the
  // narrow text column next to a fixed 64px thumbnail (the compact
  // browsing layout), it looked lopsided. Once it's open, stack the card
  // full-width on mobile too, same shape as desktop always uses.
  const stacked = open || registered;

  return (
    <div
      className={
        "flex w-full items-stretch gap-3 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm sm:flex-col sm:items-stretch sm:gap-0 sm:p-0 " +
        (stacked ? "flex-col p-3" : "flex-row p-2")
      }
    >
      <div
        className={
          "shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-full sm:rounded-none " +
          (stacked ? "h-28 w-full" : "h-16 w-16")
        }
      >
        <Image src={event.image} alt="" width={400} height={200} className="h-full w-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:p-4">
        <div
          className={
            "items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-wide text-orange sm:flex " +
            (stacked ? "flex" : "hidden")
          }
        >
          <span>{event.eventCategory}</span>
          <span className="text-black/30">·</span>
          <span>{event.mode}</span>
        </div>
        <h3 className="font-heading text-sm font-bold leading-tight text-navy sm:text-base">{event.title}</h3>
        <p className="font-body text-xs text-black/60">{formatDate(event.date)}</p>
        <p
          className={
            "font-body text-xs leading-5 text-black/70 sm:block " + (stacked ? "block" : "hidden")
          }
        >
          {event.description}
        </p>

        <div className="mt-auto flex flex-col gap-2 sm:pt-2">
          {registered ? (
            <>
              <p className="font-body text-xs font-semibold text-navy">You&apos;re registered. See you there!</p>
              <a
                href={googleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xs font-semibold text-navy underline-offset-2 hover:underline"
              >
                Add to Google Calendar
              </a>
            </>
          ) : open ? (
            <form
              className="flex flex-col gap-1.5"
              onSubmit={(e) => {
                e.preventDefault();
                setRegistered(true);
              }}
            >
              <input
                required
                type="text"
                placeholder="Full name"
                className="border-0 border-b border-black/20 bg-transparent pb-0.5 font-body text-xs placeholder:text-black/40 focus:border-navy focus:outline-none"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="border-0 border-b border-black/20 bg-transparent pb-0.5 font-body text-xs placeholder:text-black/40 focus:border-navy focus:outline-none"
              />
              <button
                type="submit"
                className="mt-0.5 rounded-full bg-orange px-4 py-1.5 font-heading text-xs font-semibold text-white transition-colors hover:bg-navy"
              >
                Pay ₹{event.cost} via Razorpay
              </button>
              <p className="text-center font-body text-[10px] text-black/40">Secured by Razorpay</p>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-navy px-4 py-1.5 font-heading text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Sign up · ₹{event.cost}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function UpcomingEventsStage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-3 sm:gap-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-navy sm:text-3xl">Upcoming Events</h1>
        <p className="mt-1 font-body text-sm text-black/60">Sign up and reserve your spot.</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3 sm:gap-6">
        {UPCOMING_EVENTS.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
