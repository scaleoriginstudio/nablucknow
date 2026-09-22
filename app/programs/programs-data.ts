import type { Bilingual } from "../components/shared/LanguageContext";

export type Program = {
  slug: string;
  title: Bilingual;
  subtitle: Bilingual;
  format: string;
  audience: string;
  image: string;
  imageAlt: string;
  hook: Bilingual;
  highlights: Bilingual[];
  contributionAmount: string;
  impact: Bilingual;
};

// Every programme below is a fundraiser: corporates and schools book a
// session for their own people at a flat fee, and it funds NAB's work
// directly. None of these are open to individual public registration.
//
// Each falls under Schedule VII of the Companies Act, 2013 — "promoting
// education, including special education and employment enhancing
// vocation skills especially among... the differently abled" — so the
// fee is eligible CSR spend for companies with a CSR obligation under
// Section 135, not just a donation.
export const PROGRAMS: Program[] = [
  {
    slug: "workplace-inclusivity",
    title: {
      en: "True Inclusivity in the Workplace",
      hi: "कार्यस्थल में सच्ची समावेशिता",
    },
    subtitle: {
      en: "A fundraising talk by Mrs. Amita Dubey, for corporate teams",
      hi: "श्रीमती अमिता दुबे द्वारा कॉर्पोरेट टीमों के लिए एक फंडरेज़िंग टॉक",
    },
    format: "Fundraising Talk",
    audience: "Corporate teams",
    image: "/img/placeholders/talk-inclusion.jpg",
    imageAlt: "A speaker addressing an audience at a conference",
    hook: {
      en: "An honest conversation on what workplace inclusion for people with visual impairment actually looks like beyond compliance: hiring practices, accessible tooling, and the everyday accommodations that let colleagues do their best work — saath (साथ) chalna, sirf policy nahi.",
      hi: "इस बातचीत में यह ईमानदारी से बताया जाता है कि दृष्टिबाधित लोगों के लिए कार्यस्थल में समावेशिता कंप्लायंस से आगे असल में कैसी दिखती है: भर्ती की प्रक्रिया, सुलभ टूल्स, और वे रोज़मर्रा की व्यवस्थाएँ जो सहकर्मियों को अपना सर्वश्रेष्ठ काम करने देती हैं।",
    },
    highlights: [
      { en: "Unconscious bias in hiring", hi: "भर्ती में अनजाने पूर्वाग्रह" },
      { en: "Building accessible digital workplaces", hi: "सुलभ डिजिटल कार्यस्थल बनाना" },
      { en: "Live Q&A for HR teams", hi: "HR टीमों के लिए लाइव प्रश्नोत्तर सत्र" },
    ],
    contributionAmount: "₹25,000 per session",
    impact: {
      en: "Proceeds fund NAB's vocational training programme. The fee is eligible CSR spend under Schedule VII of the Companies Act, 2013.",
      hi: "इससे मिलने वाली राशि NAB के वोकेशनल ट्रेनिंग प्रोग्राम को फंड करती है। यह शुल्क कंपनी अधिनियम 2013 की अनुसूची VII के तहत पात्र CSR खर्च है।",
    },
  },
  {
    slug: "nukkad-naatak",
    title: {
      en: "Nukkad Naatak",
      hi: "नुक्कड़ नाटक",
    },
    subtitle: {
      en: "A fundraising street play, booked for schools and corporate campuses",
      hi: "स्कूलों और कॉर्पोरेट परिसरों के लिए बुक किया जाने वाला एक फंडरेज़िंग नुक्कड़ नाटक",
    },
    format: "Street Performance",
    audience: "Schools & corporate campuses",
    image: "/img/placeholders/street-performance.jpg",
    imageAlt: "Performers in traditional costume on an outdoor stage",
    hook: {
      en: "A musical street play performed entirely by visually impaired students, trained over several weeks by professional street artists and theatre directors. No scripts read off a page, every line and cue learned by ear — pure hausla (हौसला) on stage.",
      hi: "पूरी तरह दृष्टिबाधित विद्यार्थियों द्वारा प्रस्तुत एक संगीतमय नुक्कड़ नाटक, जिसे हफ्तों तक पेशेवर स्ट्रीट आर्टिस्टों और थिएटर डायरेक्टरों ने प्रशिक्षित किया है। कोई स्क्रिप्ट पढ़ी नहीं जाती, हर संवाद और क्यू कान से सीखा जाता है।",
    },
    highlights: [
      { en: "Performed entirely by visually impaired students", hi: "पूरी तरह दृष्टिबाधित विद्यार्थियों द्वारा प्रस्तुत" },
      { en: "Trained by professional street artists & theatre directors", hi: "पेशेवर स्ट्रीट आर्टिस्टों और थिएटर डायरेक्टरों द्वारा प्रशिक्षित" },
      { en: "Every line and cue learned by ear, no scripts", hi: "हर संवाद और क्यू कान से सीखा जाता है, कोई स्क्रिप्ट नहीं" },
    ],
    contributionAmount: "₹15,000 per performance",
    impact: {
      en: "Funds the students' continued theatre training. The fee is eligible CSR spend under Schedule VII of the Companies Act, 2013.",
      hi: "यह विद्यार्थियों की आगे की थिएटर ट्रेनिंग को फंड करता है। यह शुल्क कंपनी अधिनियम 2013 की अनुसूची VII के तहत पात्र CSR खर्च है।",
    },
  },
  {
    slug: "walk-for-a-cause",
    title: {
      en: "Walk for a Cause",
      hi: "वॉक फॉर अ कॉज़",
    },
    subtitle: {
      en: "A sponsored blindfolded walk for corporate and school groups",
      hi: "कॉर्पोरेट और स्कूल समूहों के लिए एक प्रायोजित ब्लाइंडफोल्डेड वॉक",
    },
    format: "Sponsored Walk",
    audience: "Corporate teams & school groups",
    image: "/img/placeholders/cane-walk.jpg",
    imageAlt: "A person walking outdoors with a white cane",
    hook: {
      en: "Put on a blindfold, pick up a smart cane, and walk a short guided route the way many of our students do every day: a direct, physical way to understand what independent mobility without sight actually takes — ek saath (एक साथ), step by step.",
      hi: "आँखों पर पट्टी बाँधिए, हाथ में स्मार्ट केन लीजिए, और वही छोटा-सा निर्धारित मार्ग तय कीजिए जो हमारे कई विद्यार्थी हर दिन तय करते हैं: बिना दृष्टि के आत्मनिर्भर चलने-फिरने को सीधे, शरीर से महसूस करने का एक तरीका।",
    },
    highlights: [
      { en: "A guided route, walked blindfolded with a smart cane", hi: "आँखों पर पट्टी बाँधकर, स्मार्ट केन के साथ एक निर्धारित मार्ग" },
      { en: "Volunteers & staff walk alongside every participant", hi: "वॉलंटियर और स्टाफ हर प्रतिभागी के साथ-साथ चलते हैं" },
      { en: "Smart canes provided by NAB", hi: "स्मार्ट केन NAB द्वारा उपलब्ध कराई जाती हैं" },
    ],
    contributionAmount: "₹1,000 per participant",
    impact: {
      en: "Funds NAB's work directly. The fee is eligible CSR spend under Schedule VII of the Companies Act, 2013.",
      hi: "यह सीधे NAB के काम को फंड करता है। यह शुल्क कंपनी अधिनियम 2013 की अनुसूची VII के तहत पात्र CSR खर्च है।",
    },
  },
];
