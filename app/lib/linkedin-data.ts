export type LinkedInPost = {
  title: string;
  excerpt: string;
  image: string;
  // No confirmed NAB Lucknow LinkedIn page exists yet, so every href is a
  // placeholder until real published posts are linked here, the same pattern
  // as the LinkedIn entry in FOOTER_SOCIALS.
  href: string;
};

export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    title: "Why Accessible Hiring Isn't Just a CSR Checkbox",
    excerpt: "What actually changes when a company hires its first visually impaired employee.",
    image: "/img/nab/computer-training.jpg",
    href: "#",
  },
  {
    title: "Braille Literacy Has Not Gone Away. It Has Changed Shape",
    excerpt: "Screen readers did not replace braille. This is what our classrooms look like today.",
    image: "/img/nab/care.jpg",
    href: "#",
  },
  {
    title: "A Short Playbook for First-Time CSR Partners",
    excerpt: "The three questions we ask every new corporate partner before we design a programme.",
    image: "/img/nab/cover-page.jpg",
    href: "#",
  },
  {
    title: "Annual Day 2025: Students Take the Stage",
    excerpt: "Recognising a graduating vocational-training batch of ten students.",
    image: "/img/nab/dance.jpg",
    href: "#",
  },
  {
    title: "Inside Our Vocational Training Workshop",
    excerpt: "A look at how classroom skills turn into corporate and government placements.",
    image: "/img/nab/vocational.jpg",
    href: "#",
  },
  {
    title: "Meet This Year's Teaching Team",
    excerpt: "The educators behind our primary and braille literacy programmes.",
    image: "/img/nab/teacher.jpg",
    href: "#",
  },
  {
    title: "White Cane Day: The Blindfolded Walk Returns",
    excerpt: "Over 80 participants walked our guided route blindfolded, cane in hand.",
    image: "/img/nab/eye-checkup.jpg",
    href: "#",
  },
  {
    title: "Free Eye Screenings, One Village at a Time",
    excerpt: "Our outreach camps bring diagnosis and referral within reach of families who need it most.",
    image: "/img/nab/compitions.jpg",
    href: "#",
  },
  {
    title: "What Independence Looks Like After Graduation",
    excerpt: "Three alumni on the jobs, routines, and skills they carried out of our programmes.",
    image: "/img/nab/computer.jpg",
    href: "#",
  },
];
