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
    slug: "workplace-inclusivity-talk",
    title: "True Inclusivity in the Workplace",
    date: "2026-09-12",
    time: "15:00",
    durationHours: 2,
    mode: "Offline",
    eventCategory: "Programs",
    cost: 500,
    description: "A talk by Mrs. Amita Dubey on building genuinely accessible workplaces.",
    image: "/img/placeholders/talk-inclusion.jpg",
    location: "NAB Lucknow campus, Indira Nagar",
  },
  {
    slug: "walk-for-a-cause-2026",
    title: "Walk for a Cause",
    date: "2026-10-15",
    time: "07:00",
    durationHours: 2,
    mode: "Offline",
    eventCategory: "Fundraiser & Awareness",
    cost: 500,
    description: "A blindfolded walk with a smart white cane, experiencing independent mobility firsthand.",
    image: "/img/placeholders/cane-walk.jpg",
    location: "Gomti Riverfront, Lucknow",
  },
  {
    slug: "nukkad-naatak-2026",
    title: "Nukkad Naatak",
    date: "2026-11-08",
    time: "17:30",
    durationHours: 1,
    mode: "Offline",
    eventCategory: "Programs",
    cost: 300,
    description: "A street play performed by our visually impaired students.",
    image: "/img/placeholders/street-performance.jpg",
    location: "Indira Nagar, Lucknow",
  },
];
