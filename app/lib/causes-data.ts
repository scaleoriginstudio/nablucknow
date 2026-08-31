export type Cause = {
  slug: string;
  image: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
};

// TODO(nab): confirm the real goal and raised figures for each cause with
// the organisation. "Office Infrastructure" and "White Cane Distribution"
// currently share an identical 1,50,00,000 goal, which looks like a
// placeholder pasted twice rather than two independently-set targets.
export const CAUSES: Cause[] = [
  {
    slug: "office-infra",
    image: "/img/nab/cover-page.jpg",
    title: "Office Infrastructure",
    description:
      "We need to relocate to a larger space to accommodate our growing team and programmes, with proper accessible classrooms, training rooms, and counselling spaces.",
    goalAmount: 15000000,
    raisedAmount: 4200000,
  },
  {
    slug: "audiobooks",
    image: "/img/nab/computer.jpg",
    title: "Audiobook Library",
    description:
      "Help us record an audiobook library for visually impaired individuals. Every session is paid work for our readers, and every recording stays free for our students.",
    goalAmount: 100000,
    raisedAmount: 62000,
  },
  {
    slug: "white-cane",
    image: "/img/nab/eye-checkup.jpg",
    title: "White Cane Distribution",
    description:
      "We source and distribute white canes to our visually impaired beneficiaries at no cost to them, so mobility never depends on ability to pay.",
    goalAmount: 15000000,
    raisedAmount: 950000,
  },
];

export function formatINR(amount: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
}
