"use client";

import { useState } from "react";
import Image from "next/image";
import { UPCOMING_EVENTS, type UpcomingEvent } from "./events-data";
import { GlassFormShell } from "../components/shared/GlassFormShell";
import { LeadForm } from "../components/shared/LeadForm";
import { StageIntro } from "../components/shared/StageIntro";
import { Icon } from "../components/shared/Icon";
import { useLanguage, type Lang } from "../components/shared/LanguageContext";

const COPY = {
  heading: { en: "Upcoming Events", hi: "आगामी कार्यक्रम" },
  subtitle: { en: "Sign up and reserve your spot.", hi: "पंजीकरण करें और अपनी जगह सुरक्षित करें।" },
  whichEvent: { en: "Which event?", hi: "कौन सा कार्यक्रम?" },
  chooseEvent: { en: "Choose an event", hi: "एक कार्यक्रम चुनें" },
  register: { en: "Register", hi: "पंजीकरण करें" },
  registeredTitle: { en: "You are registered", hi: "आपका पंजीकरण हो गया है" },
  registeredBody: {
    en: "Thank you for signing up. We will email you the details and payment options shortly.",
    hi: "पंजीकरण के लिए धन्यवाद। हम जल्द ही आपको ईमेल पर विवरण और भुगतान के विकल्प भेजेंगे।",
  },
  youAreRegistered: { en: "You're registered. See you there!", hi: "आपका पंजीकरण हो गया है। वहाँ मिलते हैं!" },
  addToCalendar: { en: "Add to Google Calendar", hi: "Google कैलेंडर में जोड़ें" },
  signUp: { en: "Sign up", hi: "साइन अप करें" },
};

function feeNoteCopy(cost: number) {
  return {
    en: `Entry fee: ₹${cost}. We will share payment details once your place is confirmed.`,
    hi: `प्रवेश शुल्क: ₹${cost}। आपकी जगह पक्की होते ही हम भुगतान की जानकारी साझा करेंगे।`,
  };
}

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// A plain URL template, no Google API or OAuth needed, that opens Google
// Calendar's own "add event" screen pre-filled with the event's details.
function googleCalendarUrl(event: UpcomingEvent, title: string, description: string) {
  const start = new Date(`${event.date}T${event.time}:00+05:30`);
  const end = new Date(start.getTime() + event.durationHours * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: description,
    location:
      event.mode === "Online" ? "Online" : "National Association for the Blind, State Chapter, Lucknow",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// The sign-up form is a modal (the shared glass shell), so on this pinned,
// non-scrolling page the card itself never changes size. It collects
// details only: no payment is taken here, the entry fee is shown as a note.
function SignUpModal({ event, onClose, onRegistered }: { event: UpcomingEvent; onClose: () => void; onRegistered: () => void }) {
  const { t, lang } = useLanguage();
  // Which event the dropdown currently has selected (only affects the
  // submitted payload, same as before — the modal's own title/intro/meta
  // always reflect the event that was clicked to open it).
  const [selectedSlug, setSelectedSlug] = useState(event.slug);
  const selectedEvent = UPCOMING_EVENTS.find((e) => e.slug === selectedSlug) ?? event;

  return (
    <GlassFormShell
      variant="modal"
      titleId={`event-${event.slug}-title`}
      onClose={onClose}
      image={event.image}
      imageAlt=""
      eyebrow={`${event.eventCategory} · ${event.mode}`}
      title={t(event.title)}
      intro={t(event.description)}
      meta={`${formatDate(event.date, lang)} · ${event.time} · ${event.location}`}
    >
      <LeadForm
        formType="EventSignup"
        select={{
          name: "event",
          label: t(COPY.whichEvent),
          placeholder: t(COPY.chooseEvent),
          options: UPCOMING_EVENTS.map((e) => t(e.title)),
          value: t(selectedEvent.title),
          onChange: (v) => {
            const match = UPCOMING_EVENTS.find((e) => t(e.title) === v);
            if (match) setSelectedSlug(match.slug);
          },
        }}
        feeNote={t(feeNoteCopy(event.cost))}
        // Overrides the submitted "event" field with the stable slug
        // instead of the select's own (possibly Hindi) displayed value.
        extraPayload={{ event: selectedSlug }}
        submitLabel={t(COPY.register)}
        successTitle={t(COPY.registeredTitle)}
        successBody={t(COPY.registeredBody)}
        onSubmitted={onRegistered}
      />
    </GlassFormShell>
  );
}

function EventCard({ event }: { event: UpcomingEvent }) {
  const { t, lang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const title = t(event.title);
  const description = t(event.description);

  return (
    <>
      <div className="flex w-full flex-row items-stretch gap-3 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-sm sm:flex-col sm:gap-0 sm:p-0">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-full sm:rounded-none">
          <Image src={event.image} alt="" width={400} height={200} className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:p-4">
          <div className="hidden items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-orange sm:flex">
            <span>{event.eventCategory}</span>
            <span className="text-black/30">·</span>
            <span>{event.mode}</span>
          </div>
          <h3 className="font-heading text-sm font-bold leading-tight text-navy sm:text-base">{title}</h3>
          <p className="font-body text-xs text-black/60">{formatDate(event.date, lang)}</p>
          <p className="flex items-center gap-1 font-body text-xs text-black/55">
            <Icon name="location_on" size={13} className="shrink-0 text-black/45" />
            {event.location}
          </p>
          <p className="hidden font-body text-xs leading-5 text-black/70 sm:block">{description}</p>

          <div className="mt-auto flex flex-col gap-2 sm:pt-2">
            {registered ? (
              <>
                <p className="font-body text-xs font-semibold text-navy">{t(COPY.youAreRegistered)}</p>
                <a
                  href={googleCalendarUrl(event, title, description)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xs font-semibold text-navy underline-offset-2 hover:underline"
                >
                  {t(COPY.addToCalendar)}
                </a>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-full border border-navy px-4 py-1.5 font-heading text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                {t(COPY.signUp)} · ₹{event.cost}
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
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-start gap-3 sm:gap-6">
      <StageIntro title={t(COPY.heading)} subtitle={t(COPY.subtitle)} />
      <div className="grid gap-2 sm:grid-cols-3 sm:gap-6">
        {UPCOMING_EVENTS.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
