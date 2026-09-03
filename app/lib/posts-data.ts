export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string; // ISO date
  section: "Awareness" | "Events";
  eventCategory?: "Programs" | "Fundraiser & Awareness";
  mode?: "Online" | "Offline";
  /** Where it was held. "Online" for remote events; a short venue for the
      rest. Shown on the Past Events cards. */
  location?: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "what-early-education-changes",
    title: "What Starting School Early Changes for a Blind Child",
    excerpt:
      "The gap between a child who begins braille at five and one who begins at ten rarely closes. This is why we push for early enrolment.",
    image: "/img/nab/care.jpg",
    date: "2026-07-01",
    section: "Awareness",
    body: [
      "A five-year-old learning braille builds the same reading reflexes a sighted child builds with print: letters become words without conscious effort, and spelling and grammar follow from the page rather than from being taught as rules. Start that process at ten and the child is not only behind, they are learning to read while also learning everything else school expects of a ten-year-old.",
      "This is why our admissions work begins with families, often before a child is school age. Early braille literacy, orientation and mobility, and a classroom that assumes the child will keep up are what let our students sit the same board exams as everyone else and pass them.",
      "For most of our students, the years between five and eight decide whether school is a place they belong or a place they are visiting. We would rather not leave that to chance.",
    ],
  },
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
    location: "NAB Lucknow campus, Indira Nagar",
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
    location: "Indira Nagar, Lucknow",
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
    location: "Online",
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
    location: "Online",
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
    location: "Indira Nagar, Lucknow",
    body: [
      "After weeks of training with professional street artists and theatre directors, our students performed their first fully independent nukkad naatak to a crowd gathered right outside our campus gates.",
      "The performance has since become an annual fixture on our events calendar.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}
