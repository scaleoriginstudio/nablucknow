"use client";

import { useState } from "react";
import Image from "next/image";
import { UPCOMING_EVENTS, type UpcomingEvent } from "./events-data";
import { ModalShell } from "../components/shared/ModalShell";

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

// The sign-up form used to expand inline inside the card, which — on this
// pinned, non-scrolling page — pushed the other cards below the visible
// viewport with no way to reach them. It's a modal now (same ModalShell
// used for the Volunteer/Donate overlays), so the card itself never
// changes size.
function SignUpModal({ event, onClose, onRegistered }: { event: UpcomingEvent; onClose: () => void; onRegistered: () => void }) {
  return (
    <ModalShell titleId={`event-${event.slug}-title`} onClose={onClose}>
      <div className="hidden w-2/5 md:block">
        <Image src={event.image} alt="" width={600} height={800} className="h-full w-full object-cover" />
      </div>
      <div className="flex w-full flex-col gap-4 p-8 md:w-3/5">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-orange">
            {event.eventCategory} · {event.mode}
          </p>
          <h2 id={`event-${event.slug}-title`} className="mt-1 font-heading text-2xl font-bold text-navy">
            {event.title}
          </h2>
          <p className="mt-1 font-body text-sm text-black/60">{formatDate(event.date)}</p>
        </div>
        <p className="font-body text-sm leading-6 text-black/70">{event.description}</p>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onRegistered();
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
              <span className="sr-only">Email</span>
              <input
                required
                type="email"
                placeholder="Email"
                className="border-0 border-b border-black/20 bg-transparent pb-2 font-body text-sm placeholder:text-black/40 focus:border-navy focus:outline-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-1 self-start rounded-full bg-orange px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
          >
            Pay ₹{event.cost} via Razorpay
          </button>
          <p className="font-body text-[11px] text-black/40">Secured by Razorpay</p>
        </form>
      </div>
    </ModalShell>
  );
}

function EventCard({ event }: { event: UpcomingEvent }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

  return (
    <>
      <div className="flex w-full flex-row items-stretch gap-3 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-sm sm:flex-col sm:gap-0 sm:p-0">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-full sm:rounded-none">
          <Image src={event.image} alt="" width={400} height={200} className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:p-4">
          <div className="hidden items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-wide text-orange sm:flex">
            <span>{event.eventCategory}</span>
            <span className="text-black/30">·</span>
            <span>{event.mode}</span>
          </div>
          <h3 className="font-heading text-sm font-bold leading-tight text-navy sm:text-base">{event.title}</h3>
          <p className="font-body text-xs text-black/60">{formatDate(event.date)}</p>
          <p className="hidden font-body text-xs leading-5 text-black/70 sm:block">{event.description}</p>

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
            ) : (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-full border border-navy px-4 py-1.5 font-heading text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                Sign up · ₹{event.cost}
              </button>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <SignUpModal
          event={event}
          onClose={() => setModalOpen(false)}
          onRegistered={() => {
            setRegistered(true);
            setModalOpen(false);
          }}
        />
      )}
    </>
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
