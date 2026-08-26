export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string; // ISO date
  section: "Awareness" | "Events";
  eventCategory?: "Programs" | "Fundraiser & Awareness";
  mode?: "Online" | "Offline";
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "why-accessible-hiring-matters",
    title: "Why Accessible Hiring Isn't Just a CSR Checkbox",
    excerpt:
      "What actually changes when a company hires its first visually impaired employee, and what usually goes wrong.",
    image: "/img/nab/computer-training.jpg",
    date: "2026-06-02",
    section: "Awareness",
    body: [
      "Every year, a handful of the corporate partners we work with ask the same question once a hire is made: what now? Accessible hiring doesn't end at the offer letter. Screen readers, document formats, and a manager briefed on what independence actually looks like matter as much as the interview itself.",
      "The organisations that get this right treat accessibility as infrastructure, not accommodation. They build once, and every future hire benefits without a special request being filed.",
    ],
  },
  {
    slug: "braille-literacy-in-2026",
    title: "Braille Literacy Hasn't Gone Away: It's Changed Shape",
    excerpt: "Screen readers didn't replace braille. Here's what our classrooms actually look like today.",
    image: "/img/nab/care.jpg",
    date: "2026-04-18",
    section: "Awareness",
    body: [
      "There's a common assumption that text-to-speech has made braille redundant. In our own classrooms, the opposite has held true: braille remains the fastest route to spelling, grammar, and the kind of reading fluency that audio alone doesn't build.",
      "What has changed is the hardware: refreshable braille displays paired with a phone are now a normal part of a student's kit by the time they finish school with us.",
    ],
  },
  {
    slug: "csr-partner-playbook",
    title: "A Short Playbook for Corporates Starting Their First Disability-Inclusion CSR Programme",
    excerpt: "The three questions we ask every new CSR partner before we design a programme together.",
    image: "/img/nab/cover-page.jpg",
    date: "2026-02-10",
    section: "Awareness",
    body: [
      "Most CSR conversations start with a budget and a deadline. We've found the programmes that last start with three questions instead: who is this for, what does success look like in a year, and who on your side owns it after the ribbon-cutting.",
      "The partnerships that skip this step tend to fund a single event. The ones that don't tend to fund infrastructure that outlives the financial year.",
    ],
  },
  {
    slug: "annual-day-2025",
    title: "Annual Day 2025: Students Take the Stage",
    excerpt: "Recognising a year of vocational placements, exam results, and a graduating batch of ten.",
    image: "/img/nab/dance.jpg",
    date: "2025-12-14",
    section: "Events",
    eventCategory: "Programs",
    mode: "Offline",
    body: [
      "Our Annual Day closed out 2025 with performances, awards, and a graduating vocational-training batch of ten students moving into corporate and government placements.",
      "Family members, longtime donors, and this year's CSR partners joined us on campus for the full afternoon.",
    ],
  },
  {
    slug: "white-cane-day-walk-2025",
    title: "White Cane Day: The Blindfolded Walk Returns",
    excerpt: "Over 80 participants walked our guided route blindfolded, cane in hand, this October.",
    image: "/img/nab/eye-checkup.jpg",
    date: "2025-10-15",
    section: "Events",
    eventCategory: "Fundraiser & Awareness",
    mode: "Offline",
    body: [
      "Every White Cane Day, we open our blindfolded walk to the public: a short, guided route meant to make independent mobility without sight tangible rather than abstract.",
      "This year's walk raised funds toward our white cane distribution drive and drew a record number of first-time participants.",
    ],
  },
  {
    slug: "webinar-inclusive-workplaces-2025",
    title: "Webinar Recap: Building Inclusive Workplaces from Day One",
    excerpt: "HR leaders from three of our CSR partners joined an online panel on accessible onboarding.",
    image: "/img/nab/computer.jpg",
    date: "2025-08-22",
    section: "Events",
    eventCategory: "Programs",
    mode: "Online",
    body: [
      "This online panel brought together HR leaders from three corporate partners to talk through what accessible onboarding actually requires in the first ninety days of a new hire's employment.",
      "The full recording is available to CSR partners on request.",
    ],
  },
  {
    slug: "audiobook-fundraiser-2024",
    title: "The Audiobook Library Fundraiser Hit Its Target",
    excerpt: "A year-end online fundraiser fully funded our audiobook recording programme for 2025.",
    image: "/img/nab/teacher.jpg",
    date: "2024-12-05",
    section: "Events",
    eventCategory: "Fundraiser & Awareness",
    mode: "Online",
    body: [
      "Our year-end online fundraiser closed out fully funded, covering a full year of audiobook recording for our library, every session paid for by an individual donor.",
      "Recording continues through 2026 with volunteer readers from three partner colleges.",
    ],
  },
  {
    slug: "nukkad-naatak-2024",
    title: "Nukkad Naatak Takes to the Streets of Indira Nagar",
    excerpt: "Our students performed their first fully independent street play to a gathered neighbourhood crowd.",
    image: "/img/nab/compitions.jpg",
    date: "2024-09-20",
    section: "Events",
    eventCategory: "Programs",
    mode: "Offline",
    body: [
      "After weeks of training with professional street artists and theatre directors, our students performed their first fully independent nukkad naatak to a crowd gathered right outside our campus gates.",
      "The performance has since become an annual fixture on our events calendar.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}
