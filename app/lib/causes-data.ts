import type { Bilingual } from "../components/shared/LanguageContext";

export type Cause = {
  slug: string;
  image: string;
  title: Bilingual;
  description: Bilingual;
  goalAmount: number;
  raisedAmount: number;
};

// TODO(nab): confirm the real goal and raised figures for each cause with
// the organisation — both targets below are placeholders pending sign-off.
export const CAUSES: Cause[] = [
  {
    slug: "inclusive-school",
    image: "/img/nab/bani.jpg",
    title: {
      en: "Build an Inclusive School for Visually Impaired Students",
      hi: "दृष्टिबाधित विद्यार्थियों के लिए एक समावेशी स्कूल का निर्माण",
    },
    description: {
      en: "A dedicated campus with accessible classrooms, hostel space, and braille-equipped learning areas — a school built around our students from the ground up, not retrofitted for them after the fact, so their vidya (विद्या) grows on solid ground.",
      hi: "सुलभ कक्षाओं, छात्रावास और ब्रेल-सुसज्जित लर्निंग एरिया वाला एक समर्पित परिसर — ऐसा स्कूल जो हमारे विद्यार्थियों को ध्यान में रखकर शुरू से बनाया गया हो, बाद में उनके लिए ढाला हुआ नहीं। नींव से लेकर छत तक, हर हिस्सा उन्हीं के लिए सोचा गया है।",
    },
    goalAmount: 20000000,
    raisedAmount: 3500000,
  },
  {
    slug: "life-skills-workshops",
    image: "/img/nab/vocational.jpg",
    title: {
      en: "Workshops on Life Skills and Home Sciences for Visually Impaired Students",
      hi: "दृष्टिबाधित विद्यार्थियों के लिए जीवन-कौशल और गृह विज्ञान कार्यशालाएँ",
    },
    description: {
      en: "Hands-on sessions in cooking, personal care, and household management, so independence at home comes as naturally as independence at school or work — apna (अपना) ghar, apne hi haathon se sambhala hua.",
      hi: "खाना बनाने, स्वयं की देखभाल और घर के प्रबंधन की व्यावहारिक कार्यशालाएँ, ताकि घर पर आत्मनिर्भरता उतनी ही सहज बने जितनी स्कूल या काम पर। छोटी-छोटी आदतें ही असली हौसला बनाती हैं।",
    },
    goalAmount: 500000,
    raisedAmount: 180000,
  },
];

export function formatINR(amount: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
}
