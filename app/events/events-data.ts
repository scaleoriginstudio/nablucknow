import type { Bilingual } from "../components/shared/LanguageContext";

export type UpcomingEvent = {
  slug: string;
  title: Bilingual;
  date: string;
  time: string; // 24-hour "HH:MM", event's local time
  durationHours: number;
  mode: "Online" | "Offline";
  eventCategory: "Programs" | "Fundraiser & Awareness";
  cost: number;
  description: Bilingual;
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
    title: {
      en: "Talk with a Visually Impaired Bollywood Actor",
      hi: "एक दृष्टिबाधित बॉलीवुड अभिनेता के साथ बातचीत",
    },
    date: "2026-09-20",
    time: "18:00",
    durationHours: 2,
    mode: "Offline",
    eventCategory: "Fundraiser & Awareness",
    cost: 799,
    description: {
      en: "An evening of inspirational storytelling with a visually impaired actor from the Hindi film industry.",
      hi: "हिंदी फिल्म इंडस्ट्री के एक दृष्टिबाधित अभिनेता के साथ प्रेरणादायक कहानियों की एक शाम।",
    },
    image: "/img/placeholders/talk-inclusion.jpg",
    location: "Karwaan Studio, Lucknow",
  },
  {
    slug: "blindfolded-clay-moulding-2026",
    title: {
      en: "Blindfolded Clay Moulding",
      hi: "आँखों पर पट्टी बाँधकर मिट्टी की मूर्ति बनाना",
    },
    date: "2026-09-22",
    time: "11:00",
    durationHours: 2,
    mode: "Offline",
    eventCategory: "Fundraiser & Awareness",
    cost: 999,
    description: {
      en: "Blindfolded, shape your own clay diya for Ganesh Chaturthi — a hands-on way to feel what our students navigate by touch every day.",
      hi: "आँखों पर पट्टी बाँधकर गणेश चतुर्थी के लिए अपना खुद का मिट्टी का दीया बनाइए — यह महसूस करने का एक प्रत्यक्ष तरीका कि हमारे विद्यार्थी रोज़ स्पर्श के सहारे कैसे आगे बढ़ते हैं।",
    },
    image: "/img/placeholders/clay-diya.jpg",
    location: "NBC, Indira Nagar, Lucknow",
  },
];
