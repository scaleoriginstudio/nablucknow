import type { Bilingual } from "../components/shared/LanguageContext";
import { LINKEDIN_URL } from "../components/shared/constants";

export type LinkedInPost = {
  title: Bilingual;
  excerpt: Bilingual;
  image: string;
  // Each card opens NAB Lucknow's LinkedIn page; swap in an individual
  // post's URL here once it is published there.
  href: string;
};

export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    title: {
      en: "Inside Our Vocational Training Workshop",
      hi: "हमारी वोकेशनल ट्रेनिंग वर्कशॉप के भीतर एक झलक",
    },
    excerpt: {
      en: "A look at how classroom skills turn into corporate and government placements.",
      hi: "कक्षा में सीखे कौशल किस तरह कॉर्पोरेट और सरकारी नौकरियों में बदलते हैं।",
    },
    image: "/img/nab/vocational.jpg",
    href: LINKEDIN_URL,
  },
  {
    title: {
      en: "Meet This Year's Teaching Team",
      hi: "इस साल की हमारी टीचिंग टीम से मिलिए",
    },
    excerpt: {
      en: "The educators behind our primary and braille literacy programmes.",
      hi: "हमारे प्राइमरी और ब्रेल साक्षरता प्रोग्राम को चलाने वाले शिक्षक।",
    },
    image: "/img/nab/teacher.jpg",
    href: LINKEDIN_URL,
  },
  {
    title: {
      en: "Free Eye Screenings, One Village at a Time",
      hi: "मुफ्त नेत्र जाँच शिविर, गाँव-गाँव तक पहुँच",
    },
    excerpt: {
      en: "Our outreach camps bring diagnosis and referral within reach of families who need it most.",
      hi: "हमारे आउटरीच कैंप ज़रूरतमंद परिवारों तक जाँच और रेफरल की सुविधा पहुँचाते हैं।",
    },
    image: "/img/nab/eye-checkup.jpg",
    href: LINKEDIN_URL,
  },
  {
    title: {
      en: "What Independence Looks Like After Graduation",
      hi: "ग्रेजुएशन के बाद आत्मनिर्भरता कैसी दिखती है",
    },
    excerpt: {
      en: "Three alumni on the jobs, routines, and skills they carried out of our programmes.",
      hi: "तीन पूर्व विद्यार्थी बता रहे हैं वो नौकरी, दिनचर्या और कौशल, जो वे हमारे प्रोग्राम से साथ ले गए।",
    },
    image: "/img/nab/compitions.jpg",
    href: LINKEDIN_URL,
  },
];
