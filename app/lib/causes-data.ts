import type { Bilingual } from "../components/shared/LanguageContext";

export type Cause = {
  slug: string;
  image: string;
  title: Bilingual;
  description: Bilingual;
  /** Fundraising target and amount raised so far, in rupees. Leave both
      out until NAB has signed off on real figures: the progress bar only
      renders when both are present, so no invented numbers ever show. */
  goalAmount?: number;
  raisedAmount?: number;
};

/** Percent raised, or null when the cause has no confirmed figures. */
export function causeProgress(cause: Cause): number | null {
  if (!cause.goalAmount || cause.raisedAmount === undefined) return null;
  return Math.min(100, Math.round((cause.raisedAmount / cause.goalAmount) * 100));
}

export const CAUSES: Cause[] = [
  {
    slug: "inclusive-school",
    image: "/img/nab/braille-classroom.jpg",
    title: {
      en: "Build an Inclusive School for Visually Impaired Students",
      hi: "दृष्टिबाधित विद्यार्थियों के लिए एक समावेशी स्कूल का निर्माण",
    },
    description: {
      en: "A dedicated campus with accessible classrooms, hostel space and braille-equipped learning areas: a school designed around visually impaired students from the ground up, rather than retrofitted for them after the fact, so their vidya (विद्या) grows on solid ground.",
      hi: "सुलभ कक्षाओं, छात्रावास और ब्रेल-सुसज्जित लर्निंग एरिया वाला एक समर्पित परिसर — ऐसा स्कूल जो हमारे विद्यार्थियों को ध्यान में रखकर शुरू से बनाया गया हो, बाद में उनके लिए ढाला हुआ नहीं। नींव से लेकर छत तक, हर हिस्सा उन्हीं के लिए सोचा गया है।",
    },
  },
  {
    slug: "life-skills-workshops",
    image: "/img/nab/vocational.jpg",
    title: {
      en: "Workshops on Life Skills and Home Sciences for Visually Impaired Students",
      hi: "दृष्टिबाधित विद्यार्थियों के लिए जीवन-कौशल और गृह विज्ञान कार्यशालाएँ",
    },
    description: {
      en: "Hands-on sessions in cooking, personal care and household management, so that independence at home comes as naturally as independence at school or at work — apna ghar, apne haathon se.",
      hi: "खाना बनाने, स्वयं की देखभाल और घर के प्रबंधन की व्यावहारिक कार्यशालाएँ, ताकि घर पर आत्मनिर्भरता उतनी ही सहज बने जितनी स्कूल या काम पर। छोटी-छोटी आदतें ही असली हौसला बनाती हैं।",
    },
  },
];

export function formatINR(amount: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
}
