import type { Bilingual } from "../components/shared/LanguageContext";

// Every claim on the CSR page is drawn from facts already published
// elsewhere on the site: the 1989 founding and the dated milestones in the
// homepage journey, the 12A/80G registration note, and the sponsors list.
// No impact figures are stated that NAB has not signed off on.

export const CSR_CREDENTIALS: { icon: string; value: Bilingual; label: Bilingual }[] = [
  {
    icon: "history",
    value: { en: "Since 1989", hi: "1989 से" },
    label: { en: "Working with visually impaired people across Uttar Pradesh", hi: "उत्तर प्रदेश भर में दृष्टिबाधित लोगों के साथ काम" },
  },
  {
    icon: "verified",
    value: { en: "12A & 80G", hi: "12A और 80G" },
    label: { en: "Registered under the Income Tax Act, 1961", hi: "आयकर अधिनियम, 1961 के तहत पंजीकृत" },
  },
  {
    icon: "gavel",
    value: { en: "Schedule VII", hi: "अनुसूची VII" },
    label: {
      en: "Special education and vocational skills for the differently abled, item (ii)",
      hi: "दिव्यांगजनों के लिए विशेष शिक्षा और व्यावसायिक कौशल, मद (ii)",
    },
  },
  {
    icon: "handshake",
    value: { en: "Trusted by", hi: "इनका भरोसा" },
    label: {
      en: "State Bank of India, Punjab National Bank, Amway India, Tata Capital and more",
      hi: "स्टेट बैंक ऑफ इंडिया, पंजाब नेशनल बैंक, Amway India, Tata Capital और अन्य",
    },
  },
];

export type FocusArea = {
  slug: string;
  icon: string;
  image: string;
  imageAlt: Bilingual;
  title: Bilingual;
  body: Bilingual;
  covers: Bilingual[];
  record: Bilingual;
};

export const FOCUS_AREAS: FocusArea[] = [
  {
    slug: "inclusive-schools",
    icon: "school",
    image: "/img/nab/bani.jpg",
    imageAlt: {
      en: "A student at a braille writer in class",
      hi: "कक्षा में ब्रेल राइटर पर एक विद्यार्थी",
    },
    title: { en: "Inclusive schools", hi: "समावेशी स्कूल" },
    body: {
      en: "Visually impaired children learning in the same classrooms as their sighted peers, from the earliest years. Early braille literacy is what decides whether a child keeps pace through school, so this is where your funding does the most lasting good.",
      hi: "दृष्टिबाधित बच्चे शुरुआती वर्षों से ही अपने सहपाठियों के साथ उन्हीं कक्षाओं में पढ़ते हैं। शुरुआती ब्रेल साक्षरता ही तय करती है कि बच्चा स्कूल में साथ चल पाएगा या नहीं — इसलिए यहाँ आपका निवेश सबसे लंबा असर छोड़ता है।",
    },
    covers: [
      { en: "Special educators and braille teachers", hi: "विशेष शिक्षक और ब्रेल शिक्षक" },
      { en: "Braille kits, slates, books and learning aids", hi: "ब्रेल किट, स्लेट, किताबें और सीखने के उपकरण" },
      { en: "Accessible classrooms, and our planned inclusive school campus", hi: "सुलभ कक्षाएँ, और हमारा प्रस्तावित समावेशी स्कूल परिसर" },
      { en: "Counselling that helps families keep their child in school", hi: "परिवारों के लिए काउंसलिंग, ताकि बच्चा स्कूल में बना रहे" },
    ],
    record: {
      en: "Integrated education since 1995, with Ministry of HRD support, grown to five districts and 20 units by 2009.",
      hi: "1995 से मानव संसाधन विकास मंत्रालय के सहयोग से इंटीग्रेटेड एजुकेशन, जो 2009 तक पाँच जिलों और 20 यूनिट्स तक पहुँचा।",
    },
  },
  {
    slug: "vocational-training",
    icon: "computer",
    image: "/img/nab/computer.jpg",
    imageAlt: {
      en: "A group of NAB Lucknow students and trainees",
      hi: "NAB Lucknow के विद्यार्थियों और प्रशिक्षुओं का एक समूह",
    },
    title: { en: "Vocational training", hi: "व्यावसायिक प्रशिक्षण" },
    body: {
      en: "Computer and job-ready skills for visually impaired young adults, followed by placement support that stays with them past the first month. It is the most direct route from education to an independent income.",
      hi: "दृष्टिबाधित युवाओं के लिए कंप्यूटर और नौकरी-योग्य कौशल, और उसके बाद प्लेसमेंट सहयोग जो पहले महीने के बाद भी साथ रहता है। शिक्षा से आत्मनिर्भर आमदनी तक का यही सबसे सीधा रास्ता है।",
    },
    covers: [
      { en: "Screen-reader computer training batches", hi: "स्क्रीन-रीडर के साथ कंप्यूटर ट्रेनिंग बैच" },
      { en: "Trainers, lab equipment and assistive software", hi: "प्रशिक्षक, लैब उपकरण और सहायक सॉफ़्टवेयर" },
      { en: "Life-skills and home-science workshops", hi: "जीवन-कौशल और गृह विज्ञान कार्यशालाएँ" },
      { en: "Placement and on-the-job support", hi: "प्लेसमेंट और नौकरी के दौरान सहयोग" },
    ],
    record: {
      en: "Computer training since 2012 with NAB India, continued and expanded with Amway's support from 2015.",
      hi: "2012 से NAB India के साथ कंप्यूटर ट्रेनिंग, जो 2015 से Amway के सहयोग से जारी है और बढ़ी है।",
    },
  },
];

export const ALSO_SUPPORTED: Bilingual[] = [
  { en: "Eye camps & health check-ups", hi: "नेत्र शिविर और स्वास्थ्य जाँच" },
  { en: "Family counselling", hi: "पारिवारिक काउंसलिंग" },
  { en: "Aids & appliances", hi: "सहायक उपकरण" },
  { en: "Community awareness", hi: "सामुदायिक जागरूकता" },
];

export const CSR_STEPS: { title: Bilingual; body: Bilingual }[] = [
  {
    title: { en: "Talk to us", hi: "हमसे बात करें" },
    body: {
      en: "Tell us your CSR budget, timeline and the change you want to see.",
      hi: "हमें अपना CSR बजट, समय-सीमा और जो बदलाव आप देखना चाहते हैं, बताएं।",
    },
  },
  {
    title: { en: "Co-design", hi: "साथ मिलकर योजना" },
    body: {
      en: "We scope a programme together, with clear outcomes and a line-item budget.",
      hi: "हम साथ मिलकर स्पष्ट परिणामों और मदवार बजट के साथ प्रोग्राम तय करते हैं।",
    },
  },
  {
    title: { en: "Agree & fund", hi: "समझौता और फंडिंग" },
    body: {
      en: "An MoU sets out scope and milestones; funds can be released in tranches.",
      hi: "MoU में दायरा और पड़ाव तय होते हैं; राशि किस्तों में जारी की जा सकती है।",
    },
  },
  {
    title: { en: "Implement", hi: "क्रियान्वयन" },
    body: {
      en: "Our team delivers on the ground. Your people are welcome to visit and volunteer.",
      hi: "हमारी टीम ज़मीन पर काम करती है। आपके लोग आकर देख सकते हैं और स्वयंसेवा कर सकते हैं।",
    },
  },
  {
    title: { en: "Report", hi: "रिपोर्टिंग" },
    body: {
      en: "Progress reports, photographs and a utilisation certificate for your CSR records.",
      hi: "आपके CSR रिकॉर्ड के लिए प्रगति रिपोर्ट, तस्वीरें और उपयोगिता प्रमाणपत्र।",
    },
  },
];

export const PARTNER_WAYS: { icon: string; title: Bilingual; body: Bilingual; href?: string }[] = [
  {
    icon: "volunteer_activism",
    title: { en: "Fund a programme", hi: "किसी प्रोग्राम को फंड करें" },
    body: {
      en: "Underwrite a school unit, a training batch, or part of the new school campus.",
      hi: "किसी स्कूल यूनिट, ट्रेनिंग बैच या नए स्कूल परिसर के हिस्से का खर्च उठाएं।",
    },
  },
  {
    icon: "groups",
    title: { en: "Engage your employees", hi: "अपने कर्मचारियों को जोड़ें" },
    body: {
      en: "Inclusion talks, a nukkad naatak or a blindfolded walk for your teams.",
      hi: "आपकी टीमों के लिए समावेशन टॉक, नुक्कड़ नाटक या ब्लाइंडफोल्डेड वॉक।",
    },
    href: "/programs",
  },
  {
    icon: "devices",
    title: { en: "Give in kind", hi: "सामग्री के रूप में दें" },
    body: {
      en: "Computers, braille devices, white canes and other assistive equipment.",
      hi: "कंप्यूटर, ब्रेल उपकरण, व्हाइट केन और अन्य सहायक उपकरण।",
    },
  },
  {
    icon: "work",
    title: { en: "Hire our graduates", hi: "हमारे प्रशिक्षितों को नौकरी दें" },
    body: {
      en: "Become a placement partner for trained, job-ready candidates.",
      hi: "प्रशिक्षित, नौकरी के लिए तैयार उम्मीदवारों के लिए प्लेसमेंट पार्टनर बनें।",
    },
  },
];

export const CSR_INTEREST_OPTIONS: Bilingual[] = [
  { en: "Inclusive schools", hi: "समावेशी स्कूल" },
  { en: "Vocational training", hi: "व्यावसायिक प्रशिक्षण" },
  { en: "Employee engagement", hi: "कर्मचारी सहभागिता" },
  { en: "In-kind / assistive devices", hi: "सामग्री / सहायक उपकरण" },
  { en: "Hiring partnership", hi: "भर्ती साझेदारी" },
  { en: "Not sure yet", hi: "अभी तय नहीं" },
];
