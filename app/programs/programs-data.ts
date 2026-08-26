export type Program = {
  slug: string;
  title: string;
  subtitle: string;
  format: string;
  audience: string;
  image: string;
  imageAlt: string;
  hook: string;
  highlights: string[];
  contributionAmount: string;
  impact: string;
};

// Every programme below is a fundraiser: corporates and schools book a
// session for their own people, and the contribution funds NAB's work
// directly. None of these are open to individual public registration.
export const PROGRAMS: Program[] = [
  {
    slug: "workplace-inclusivity",
    title: "True Inclusivity in the Workplace",
    subtitle: "A fundraising talk by Mrs. Amita Dubey, for corporate teams",
    format: "Fundraising Talk",
    audience: "Corporate teams",
    image: "/img/placeholders/talk-inclusion.jpg",
    imageAlt: "A speaker addressing an audience at a conference",
    hook:
      "An honest conversation on what workplace inclusion for people with visual impairment actually looks like beyond compliance: hiring practices, accessible tooling, and the everyday accommodations that let colleagues do their best work.",
    highlights: [
      "Unconscious bias in hiring",
      "Building accessible digital workplaces",
      "Live Q&A for HR teams",
    ],
    contributionAmount: "₹25,000 per session",
    impact: "Proceeds go toward NAB's vocational training programme.",
  },
  {
    slug: "nukkad-naatak",
    title: "Nukkad Naatak",
    subtitle: "A fundraising street play, booked for schools and corporate campuses",
    format: "Street Performance",
    audience: "Schools & corporate campuses",
    image: "/img/placeholders/street-performance.jpg",
    imageAlt: "Performers in traditional costume on an outdoor stage",
    hook:
      "A musical street play performed entirely by visually impaired students, trained over several weeks by professional street artists and theatre directors. No scripts read off a page, every line and cue learned by ear.",
    highlights: [
      "Performed entirely by visually impaired students",
      "Trained by professional street artists & theatre directors",
      "Every line and cue learned by ear, no scripts",
    ],
    contributionAmount: "₹15,000 per performance",
    impact: "Funds the students' continued theatre training.",
  },
  {
    slug: "walk-for-a-cause",
    title: "Walk for a Cause",
    subtitle: "A sponsored blindfolded walk for corporate and school groups",
    format: "Sponsored Walk",
    audience: "Corporate teams & school groups",
    image: "/img/placeholders/cane-walk.jpg",
    imageAlt: "A person walking outdoors with a white cane",
    hook:
      "Put on a blindfold, pick up a smart cane, and walk a short guided route the way many of our students do every day: a direct, physical way to understand what independent mobility without sight actually takes.",
    highlights: [
      "A guided route, walked blindfolded with a smart cane",
      "Volunteers & staff walk alongside every participant",
      "Smart canes provided by NAB",
    ],
    contributionAmount: "₹1,000 per participant",
    impact: "Contribution funds NAB's work directly.",
  },
];
