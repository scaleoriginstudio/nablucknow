export type UpcomingEvent = {
  slug: string;
  title: string;
  date: string;
  time: string; // 24-hour "HH:MM", event's local time
  durationHours: number;
  mode: "Online" | "Offline";
  eventCategory: "Programs" | "Fundraiser & Awareness";
  cost: number;
  description: string;
  image: string;
  /** Where it is held. "Online" for remote events; a short venue for the
      rest. Shown on the event card and in the sign-up dialog. */
  location: string;
};

// Every upcoming event is paid: registration always goes through the
// Razorpay step, no free sign-ups.
export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    slug: "talk-with-visually-impaired-bollywood-actor",
    title: "Talk with a Visually Impaired Bollywood Actor",
    date: "2026-09-20",
    time: "18:00",
    durationHours: 2,
    mode: "Offline",
    eventCategory: "Fundraiser & Awareness",
    cost: 799,
    description: "An evening of inspirational storytelling with a visually impaired actor from the Hindi film industry.",
    image: "/img/placeholders/talk-inclusion.jpg",
    location: "Karwaan Studio, Lucknow",
  },
  {
    slug: "blindfolded-clay-moulding-2026",
    title: "Blindfolded Clay Moulding",
    date: "2026-09-22",
    time: "11:00",
    durationHours: 2,
    mode: "Offline",
    eventCategory: "Fundraiser & Awareness",
    cost: 999,
    description: "Blindfolded, shape your own clay diya for Ganesh Chaturthi — a hands-on way to feel what our students navigate by touch every day.",
    image: "/img/placeholders/clay-diya.jpg",
    location: "NBC, Indira Nagar, Lucknow",
  },
];
