"use client";

import { useState } from "react";
import Image from "next/image";
import { UPCOMING_EVENTS, type UpcomingEvent } from "./events-data";
import { GlassFormShell } from "../components/shared/GlassFormShell";
import { LeadForm } from "../components/shared/LeadForm";
import { StageIntro } from "../components/shared/StageIntro";
import { Icon } from "../components/shared/Icon";

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

// The sign-up form is a modal (the shared glass shell), so on this pinned,
// non-scrolling page the card itself never changes size. It collects
// details only: no payment is taken here, the entry fee is shown as a note.
function SignUpModal({ event, onClose, onRegistered }: { event: UpcomingEvent; onClose: () => void; onRegistered: () => void }) {
  const [selected, setSelected] = useState(event.title);

  return (
    <GlassFormShell
      variant="modal"
      titleId={`event-${event.slug}-title`}
      onClose={onClose}
      image={event.image}
      imageAlt=""
      eyebrow={`${event.eventCategory} · ${event.mode}`}
      title={event.title}
      intro={event.description}
      meta={`${formatDate(event.date)} · ${event.time} · ${event.location}`}
    >
      <LeadForm
        formType="EventSignup"
        select={{
          name: "event",
          label: "Which event?",
          placeholder: "Choose an event",
          options: UPCOMING_EVENTS.map((e) => e.title),
          value: selected,
          onChange: setSelected,
        }}
        feeNote={`Entry fee: ₹${event.cost}. We will share payment details once your place is confirmed.`}
        submitLabel="Register"
        successTitle="You are registered"
        successBody="Thank you for signing up. We will email you the details and payment options shortly."
        onSubmitted={onRegistered}
      />
    </GlassFormShell>
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
          <p className="flex items-center gap-1 font-body text-xs text-black/55">
            <Icon name="location_on" size={13} className="shrink-0 text-black/45" />
            {event.location}
          </p>
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
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-start gap-3 sm:gap-6">
      <StageIntro title="Upcoming Events" subtitle="Sign up and reserve your spot." />
      <div className="grid gap-2 sm:grid-cols-3 sm:gap-6">
        {UPCOMING_EVENTS.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
