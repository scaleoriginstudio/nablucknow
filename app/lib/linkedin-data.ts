import type { Bilingual } from "../components/shared/LanguageContext";

export type LinkedInPost = {
  title: Bilingual;
  excerpt: Bilingual;
  image: string;
  // No confirmed NAB Lucknow LinkedIn page exists yet, so every href is a
  // placeholder until real published posts are linked here, the same pattern
  // as the LinkedIn entry in FOOTER_SOCIALS.
  href: string;
};

export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    title: {
      en: "Why Accessible Hiring Isn't Just a CSR Checkbox",
      hi: "सुलभ भर्ती केवल एक CSR खानापूर्ति क्यों नहीं है",
    },
    excerpt: {
      en: "What actually changes when a company hires its first visually impaired employee.",
      hi: "जब कोई कंपनी अपना पहला दृष्टिबाधित कर्मचारी रखती है, तो असल में क्या बदलता है।",
    },
    image: "/img/nab/computer-training.jpg",
    href: "#",
  },
  {
    title: {
      en: "Braille Literacy Has Not Gone Away. It Has Changed Shape",
      hi: "ब्रेल साक्षरता खत्म नहीं हुई, बस उसका रूप बदल गया है",
    },
    excerpt: {
      en: "Screen readers did not replace braille. This is what our classrooms look like today.",
      hi: "स्क्रीन रीडर ने ब्रेल की जगह नहीं ली। आज हमारी कक्षाएँ कुछ ऐसी दिखती हैं।",
    },
    image: "/img/nab/care.jpg",
    href: "#",
  },
  {
    title: {
      en: "A Short Playbook for First-Time CSR Partners",
      hi: "पहली बार CSR पार्टनर बन रहे संगठनों के लिए एक संक्षिप्त गाइड",
    },
    excerpt: {
      en: "The three questions we ask every new corporate partner before we design a programme.",
      hi: "किसी भी नए कॉर्पोरेट पार्टनर से प्रोग्राम डिज़ाइन करने से पहले हम जो तीन सवाल पूछते हैं।",
    },
    image: "/img/nab/cover-page.jpg",
    href: "#",
  },
  {
    title: {
      en: "Annual Day 2025: Students Take the Stage",
      hi: "वार्षिकोत्सव 2025: मंच पर विद्यार्थियों का हौसला",
    },
    excerpt: {
      en: "Recognising a graduating vocational-training batch of ten students.",
      hi: "वोकेशनल ट्रेनिंग पूरी कर रहे दस विद्यार्थियों के बैच का सम्मान।",
    },
    image: "/img/nab/dance.jpg",
    href: "#",
  },
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
    href: "#",
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
    href: "#",
  },
  {
    title: {
      en: "White Cane Day: The Blindfolded Walk Returns",
      hi: "व्हाइट केन डे: आँखों पर पट्टी बाँधकर वॉक फिर से लौटी",
    },
    excerpt: {
      en: "Over 80 participants walked our guided route blindfolded, cane in hand.",
      hi: "80 से अधिक प्रतिभागियों ने आँखों पर पट्टी बाँधकर, हाथ में केन लिए हमारा निर्धारित मार्ग तय किया।",
    },
    image: "/img/nab/eye-checkup.jpg",
    href: "#",
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
    image: "/img/nab/compitions.jpg",
    href: "#",
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
    image: "/img/nab/computer.jpg",
    href: "#",
  },
];
