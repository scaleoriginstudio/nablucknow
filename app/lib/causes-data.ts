export type Cause = {
  slug: string;
  image: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
};

// TODO(nab): confirm the real goal and raised figures for each cause with
// the organisation — both targets below are placeholders pending sign-off.
export const CAUSES: Cause[] = [
  {
    slug: "inclusive-school",
    image: "/img/nab/bani.jpg",
    title: "Build an Inclusive School for Visually Impaired Students",
    description:
      "A dedicated campus with accessible classrooms, hostel space, and braille-equipped learning areas — a school built around our students from the ground up, not retrofitted for them after the fact.",
    goalAmount: 20000000,
    raisedAmount: 3500000,
  },
  {
    slug: "life-skills-workshops",
    image: "/img/nab/vocational.jpg",
    title: "Workshops on Life Skills and Home Sciences for Visually Impaired Students",
    description:
      "Hands-on sessions in cooking, personal care, and household management, so independence at home comes as naturally as independence at school or work.",
    goalAmount: 500000,
    raisedAmount: 180000,
  },
];

export function formatINR(amount: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
}
