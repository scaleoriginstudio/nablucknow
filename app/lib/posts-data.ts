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
    title: "What Changes After a Company's First Visually Impaired Hire",
    excerpt:
      "Accessible hiring does not end at the offer letter. Here is what the first few months usually require.",
    image: "/img/nab/computer-training.jpg",
    date: "2026-06-02",
    section: "Awareness",
    body: [
      "Once a hire is made, corporate partners tend to ask the same question: what now? Accessible hiring does not end at the offer letter. Screen readers, document formats, and a manager who understands what independence looks like matter as much as the interview.",
      "Organisations that get this right treat accessibility as infrastructure rather than accommodation. They build it once, and every future hire benefits without filing a special request.",
    ],
  },
  {
    slug: "braille-literacy-in-2026",
    title: "Braille Literacy Has Not Gone Away. It Has Changed Shape",
    excerpt: "Screen readers did not replace braille. This is what our classrooms look like today.",
    image: "/img/nab/care.jpg",
    date: "2026-04-18",
    section: "Awareness",
    body: [
      "It is often assumed that text-to-speech has made braille redundant. In our classrooms the opposite holds true. Braille is still the fastest route to spelling, grammar, and reading fluency that audio alone does not build.",
      "What has changed is the hardware. By the time a student finishes school with us, a refreshable braille display paired with a phone is a normal part of their kit.",
    ],
  },
  {
    slug: "csr-partner-playbook",
    title: "Three Questions We Ask Before Designing a CSR Programme",
    excerpt: "What we ask every new corporate partner before any programme is planned.",
    image: "/img/nab/cover-page.jpg",
    date: "2026-02-10",
    section: "Awareness",
    body: [
      "Most CSR conversations open with a budget and a deadline. The programmes that last tend to open with three questions instead: who is this for, what does success look like in a year, and who on your side owns it once the launch is over.",
      "Partners who skip that step usually fund a single event. Partners who do not usually fund something that outlives the financial year.",
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
