import type { Bilingual } from "./LanguageContext";

export const HEADER_HEIGHT = 96;

// Every text input, select and textarea the site collects data through.
// Underline-only, no box: transparent background, a single hairline on the
// bottom edge that turns navy on focus. Shared so the look stays identical
// across the lead form, the contact form and every overlay.
export const FIELD_CLASS =
  "w-full rounded-none border-0 border-b border-black/25 bg-transparent px-0 py-2 font-body text-sm text-black placeholder:text-black/40 transition-colors focus:border-navy focus:outline-none";

export const NAV_LINKS: { label: Bilingual; href: string }[] = [
  { label: { en: "Home", hi: "होम" }, href: "/" },
  { label: { en: "Events", hi: "इवेंट्स" }, href: "/events" },
  { label: { en: "Blog", hi: "ब्लॉग" }, href: "/blog" },
  { label: { en: "Programs", hi: "कार्यक्रम" }, href: "/programs" },
  { label: { en: "Contact us", hi: "संपर्क करें" }, href: "/contact" },
];

export const FOOTER_QUICK_LINKS: { label: Bilingual; href: string }[] = [
  { label: { en: "Home", hi: "होम" }, href: "/" },
  { label: { en: "Events", hi: "इवेंट्स" }, href: "/events" },
  { label: { en: "Blog", hi: "ब्लॉग" }, href: "/blog" },
  { label: { en: "Programs", hi: "कार्यक्रम" }, href: "/programs" },
  { label: { en: "Contact us", hi: "संपर्क करें" }, href: "/contact" },
];

// Single source for the two header/footer CTA buttons — imported wherever
// a "Volunteer" or "Donate" action needs the same word (StagePager,
// MobileNav, IntroSequence, FloatingActions), instead of each file hard-
// coding its own copy.
export const VOLUNTEER_LABEL: Bilingual = { en: "Volunteer", hi: "स्वयंसेवा करें" };
export const DONATE_LABEL: Bilingual = { en: "Donate", hi: "दान करें" };

export const FOOTER_GET_INVOLVED: Bilingual[] = [
  VOLUNTEER_LABEL,
  DONATE_LABEL,
  { en: "CSR Partnerships", hi: "CSR भागीदारी" },
];

// Shown wherever the site asks for a donation. NAB Lucknow is registered
// under Section 12A, and gifts qualify for a deduction under Section 80G.
export const TAX_EXEMPTION_NOTE: Bilingual = {
  en: "NAB Lucknow is registered under Section 12A. Every gift is seva that qualifies for a tax deduction under Section 80G of the Income Tax Act, 1961.",
  hi: "NAB Lucknow, Section 12A के अंतर्गत पंजीकृत है। हर दान, आयकर अधिनियम, 1961 की धारा 80G के तहत कर छूट के लिए पात्र है।",
};

// The single source for the "which area?" choice on every volunteer form
// (the overlay, the /volunteer page, and the homepage CTA tab).
export const VOLUNTEER_AREAS: Bilingual[] = [
  { en: "Teaching & literacy", hi: "शिक्षण और साक्षरता" },
  { en: "Vocational training", hi: "व्यावसायिक प्रशिक्षण" },
  { en: "Events & fundraising", hi: "आयोजन और धन-संग्रह" },
  { en: "Family counselling support", hi: "पारिवारिक परामर्श सहायता" },
  { en: "Admin & operations", hi: "प्रशासन और संचालन" },
  { en: "Digital & communications", hi: "डिजिटल और संचार" },
  { en: "Mentorship", hi: "मार्गदर्शन" },
];

export const FOOTER_CONTACT = {
  address: "1710, First Floor, Lekhraj Dollar, Near Fire Station, Indira Nagar, Lucknow - 226016",
  phones: ["(0522) 4234028", "+91 98398 42037"],
  email: "nablucknow1@gmail.com",
};

// LinkedIn has no confirmed real NAB Lucknow page yet, so this href is a placeholder.
export const FOOTER_SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/nablucknow1989/" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "https://www.instagram.com/nab_lucknow/" },
  { name: "Youtube", href: "https://www.youtube.com/channel/UCwo8D9N2W7c_7AAGVwOcV4g" },
];
