import type { Bilingual } from "../components/shared/LanguageContext";

export type Post = {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  image: string;
  date: string; // ISO date
  section: "Awareness" | "Events";
  eventCategory?: "Programs" | "Fundraiser & Awareness";
  mode?: "Online" | "Offline";
  /** Where it was held. "Online" for remote events; a short venue for the
      rest. Shown on the Past Events cards. */
  location?: string;
  body: Bilingual[];
};

export const POSTS: Post[] = [
  {
    slug: "what-early-education-changes",
    title: {
      en: "What Starting School Early Changes for a Blind Child",
      hi: "जल्दी स्कूल शुरू करने से एक दृष्टिबाधित बच्चे के लिए क्या बदलता है",
    },
    excerpt: {
      en: "The gap between a child who begins braille at five and one who begins at ten rarely closes. This is why we push for early enrolment.",
      hi: "जो बच्चा पाँच साल की उम्र में ब्रेल सीखना शुरू करता है और जो दस साल की उम्र में शुरू करता है, उनके बीच का फ़ासला अक्सर कभी नहीं पटता। इसीलिए हम जल्दी दाखिले पर ज़ोर देते हैं।",
    },
    image: "/img/nab/braille-pegboard.jpg",
    date: "2026-07-01",
    section: "Awareness",
    body: [
      {
        en: "A five-year-old learning braille builds the same reading reflexes a sighted child builds with print: letters become words without conscious effort, and spelling and grammar follow from the page rather than from being taught as rules. Start that process at ten and the child is not only behind, they are learning to read while also learning everything else school expects of a ten-year-old.",
        hi: "पाँच साल की उम्र में ब्रेल सीखने वाला बच्चा वही रीडिंग रिफ्लेक्स बनाता है जो एक सामान्य दृष्टि वाला बच्चा छपे हुए अक्षरों से बनाता है: अक्षर बिना किसी सोच-विचार के शब्द बन जाते हैं, और स्पेलिंग-व्याकरण पन्ने से खुद-ब-खुद आते हैं, नियम के रूप में रटाए नहीं जाते। यही प्रक्रिया अगर दस साल की उम्र में शुरू हो, तो बच्चा न सिर्फ पीछे रह जाता है, बल्कि उसे पढ़ना सीखने के साथ-साथ स्कूल की बाकी सारी उम्मीदें भी एक साथ पूरी करनी पड़ती हैं।",
      },
      {
        en: "This is why our admissions work begins with families, often before a child is school age. Early braille literacy, orientation and mobility, and a classroom that assumes the child will keep up are what let our students sit the same board exams as everyone else and pass them.",
        hi: "इसीलिए हमारा दाखिला संबंधी काम परिवारों से शुरू होता है, अक्सर बच्चे के स्कूल जाने की उम्र से पहले ही। जल्दी ब्रेल साक्षरता, ओरिएंटेशन और मोबिलिटी ट्रेनिंग, और ऐसी कक्षा जो यह मान कर चले कि बच्चा साथ चलेगा, यही सब मिलकर हमारे विद्यार्थियों को बाकी सबके जैसे बोर्ड परीक्षा में बैठने और उसे पास करने लायक बनाते हैं।",
      },
      {
        en: "For most of our students, the years between five and eight decide whether school is a place they belong or a place they are visiting. We would rather not leave that to chance.",
        hi: "हमारे ज़्यादातर विद्यार्थियों के लिए पाँच से आठ साल की उम्र के बीच के ये साल तय करते हैं कि स्कूल उनकी अपनी जगह बनेगा या बस एक जगह जहाँ वे आते-जाते रहेंगे। हम इसे किस्मत पर नहीं छोड़ना चाहते।",
      },
    ],
  },
  {
    slug: "why-accessible-hiring-matters",
    title: {
      en: "What Changes After a Company's First Visually Impaired Hire",
      hi: "किसी कंपनी की पहली दृष्टिबाधित भर्ती के बाद क्या बदलता है",
    },
    excerpt: {
      en: "Accessible hiring does not end at the offer letter. Here is what the first few months usually require.",
      hi: "सुलभ भर्ती सिर्फ ऑफर लेटर पर खत्म नहीं होती। शुरुआती कुछ महीनों में आमतौर पर क्या ज़रूरी होता है, यह जानिए।",
    },
    image: "/img/nab/computer.jpg",
    date: "2026-06-02",
    section: "Awareness",
    body: [
      {
        en: "Once a hire is made, corporate partners tend to ask the same question: what now? Accessible hiring does not end at the offer letter. Screen readers, document formats, and a manager who understands what independence looks like matter as much as the interview.",
        hi: "भर्ती हो जाने के बाद कॉर्पोरेट पार्टनर अक्सर एक ही सवाल पूछते हैं: अब आगे क्या? सुलभ भर्ती केवल ऑफर लेटर पर खत्म नहीं होती। स्क्रीन रीडर, दस्तावेज़ों का सही फॉर्मेट, और ऐसा मैनेजर जो आत्मनिर्भरता का मतलब समझता हो, ये सब इंटरव्यू जितने ही ज़रूरी हैं।",
      },
      {
        en: "Organisations that get this right treat accessibility as infrastructure rather than accommodation. They build it once, and every future hire benefits without filing a special request.",
        hi: "जो संगठन इसे सही तरीके से करते हैं, वे सुलभता को एक विशेष सुविधा नहीं बल्कि बुनियादी ढाँचे की तरह देखते हैं। एक बार बना लेने पर आगे आने वाला हर कर्मचारी बिना किसी अलग अनुरोध के इसका फायदा उठाता है।",
      },
    ],
  },
  {
    slug: "braille-literacy-in-2026",
    title: {
      en: "Braille Literacy Has Not Gone Away. It Has Changed Shape",
      hi: "ब्रेल साक्षरता खत्म नहीं हुई, बस उसका रूप बदल गया है",
    },
    excerpt: {
      en: "Screen readers did not replace braille. This is what our classrooms look like today.",
      hi: "स्क्रीन रीडर ने ब्रेल की जगह नहीं ली। आज हमारी कक्षाएँ कुछ ऐसी दिखती हैं।",
    },
    image: "/img/nab/braille-class-boys.jpg",
    date: "2026-04-18",
    section: "Awareness",
    body: [
      {
        en: "It is often assumed that text-to-speech has made braille redundant. In our classrooms the opposite holds true. Braille is still the fastest route to spelling, grammar, and reading fluency that audio alone does not build.",
        hi: "अक्सर यह मान लिया जाता है कि टेक्स्ट-टू-स्पीच ने ब्रेल को बेकार बना दिया है। हमारी कक्षाओं में इसका उल्टा सच है। स्पेलिंग, व्याकरण और पढ़ने की रवानी तक पहुँचने का सबसे तेज़ रास्ता आज भी ब्रेल ही है, जो सिर्फ ऑडियो से नहीं बनती।",
      },
      {
        en: "What has changed is the hardware. By the time a student finishes school with us, a refreshable braille display paired with a phone is a normal part of their kit.",
        hi: "जो चीज़ बदली है वह है हार्डवेयर। हमारे साथ स्कूल पूरा करने तक, फोन के साथ जुड़ा रिफ्रेशेबल ब्रेल डिस्प्ले हमारे विद्यार्थियों के सामान का एक आम हिस्सा बन चुका होता है।",
      },
    ],
  },
  {
    slug: "csr-partner-playbook",
    title: {
      en: "Three Questions We Ask Before Designing a CSR Programme",
      hi: "CSR प्रोग्राम डिज़ाइन करने से पहले हम जो तीन सवाल पूछते हैं",
    },
    excerpt: {
      en: "What we ask every new corporate partner before any programme is planned.",
      hi: "किसी भी प्रोग्राम की योजना बनने से पहले हम हर नए कॉर्पोरेट पार्टनर से क्या पूछते हैं।",
    },
    image: "/img/nab/computer-training.jpg",
    date: "2026-02-10",
    section: "Awareness",
    body: [
      {
        en: "Most CSR conversations open with a budget and a deadline. The programmes that last tend to open with three questions instead: who is this for, what does success look like in a year, and who on your side owns it once the launch is over.",
        hi: "ज़्यादातर CSR बातचीत बजट और डेडलाइन से शुरू होती है। लेकिन जो प्रोग्राम टिकते हैं, वे आमतौर पर तीन सवालों से शुरू होते हैं: यह किसके लिए है, एक साल बाद सफलता कैसी दिखेगी, और लॉन्च के बाद आपकी तरफ से इसकी ज़िम्मेदारी कौन उठाएगा।",
      },
      {
        en: "Partners who skip that step usually fund a single event. Partners who do not usually fund something that outlives the financial year.",
        hi: "जो पार्टनर इस कदम को छोड़ देते हैं, वे अक्सर सिर्फ एक इवेंट को फंड कर पाते हैं। जो नहीं छोड़ते, वे ऐसी चीज़ को फंड करते हैं जो वित्तीय वर्ष से कहीं आगे तक चलती है।",
      },
    ],
  },
  // Real 2026 events, written from NAB Lucknow's own Facebook posts; the
  // photos are theirs too (public/img/nab/events).
  {
    slug: "white-cane-safety-day-2026",
    title: {
      en: "White Cane Safety Day 2026 at KMC Language University",
      hi: "KMC भाषा विश्वविद्यालय में व्हाइट केन सेफ्टी डे 2026",
    },
    excerpt: {
      en: "With the university's Enabling Unit, we marked White Cane Safety Day with young participants and white canes in hand.",
      hi: "विश्वविद्यालय की इनेबलिंग यूनिट के साथ हमने युवा प्रतिभागियों और उनके हाथों में व्हाइट केन के साथ व्हाइट केन सेफ्टी डे मनाया।",
    },
    image: "/img/nab/events/white-cane-day-2026.jpg",
    date: "2026-10-15",
    section: "Events",
    eventCategory: "Fundraiser & Awareness",
    mode: "Offline",
    location: "Khwaja Moinuddin Chishti Language University, Lucknow",
    body: [
      {
        en: "A white cane is more than a mobility aid. It is independence, confidence, and the right to move through the world on your own terms.",
        hi: "व्हाइट केन सिर्फ चलने-फिरने का साधन नहीं है। यह आत्मनिर्भरता, आत्मविश्वास और अपनी शर्तों पर दुनिया में आगे बढ़ने का अधिकार है।",
      },
      {
        en: "This International White Cane Safety Day, the Enabling Unit of Khwaja Moinuddin Chishti Language University, Lucknow, and NAB, U.P. State Branch came together to celebrate exactly that. Prof. Ajay Taneja (Hon. Vice Chancellor and Patron), Prof. Musheer Ahmad (Head and Nodal Officer) and Smt. Amita Dubey of NAB Lucknow led the conversation.",
        hi: "इस अंतरराष्ट्रीय व्हाइट केन सेफ्टी डे पर ख्वाजा मुईनुद्दीन चिश्ती भाषा विश्वविद्यालय, लखनऊ की इनेबलिंग यूनिट और NAB, यू.पी. स्टेट ब्रांच ने मिलकर यही उत्सव मनाया। प्रो. अजय तनेजा (माननीय कुलपति एवं संरक्षक), प्रो. मुशीर अहमद (विभागाध्यक्ष एवं नोडल अधिकारी) और NAB लखनऊ की श्रीमती अमिता दुबे ने चर्चा का नेतृत्व किया।",
      },
      {
        en: "Most of all, thank you to every young participant who filled the room with energy. Accessibility is not a favour. It is a shared responsibility.",
        hi: "सबसे बढ़कर, उन सभी युवा प्रतिभागियों का धन्यवाद जिन्होंने पूरे कमरे को ऊर्जा से भर दिया। सुलभता कोई एहसान नहीं, एक साझा ज़िम्मेदारी है।",
      },
    ],
  },
  {
    slug: "tiranga-yatra-2026",
    title: {
      en: "Independence Day 2026: Our Children's Tiranga Yatra",
      hi: "स्वतंत्रता दिवस 2026: हमारे बच्चों की तिरंगा यात्रा",
    },
    excerpt: {
      en: "Flags in hand, the children of NAB Lucknow, Indira Nagar, marched a tiranga yatra through the neighbourhood.",
      hi: "हाथों में तिरंगा लिए NAB लखनऊ, इंदिरा नगर के बच्चों ने मोहल्ले में तिरंगा यात्रा निकाली।",
    },
    image: "/img/nab/events/tiranga-yatra-2026.jpg",
    date: "2026-08-15",
    section: "Events",
    eventCategory: "Programs",
    mode: "Offline",
    location: "Indira Nagar, Lucknow",
    body: [
      {
        en: "On Independence Day, with the tiranga in their hands and the spirit of the nation in their hearts, the children of NAB Lucknow, Indira Nagar, led a tiranga yatra that made the celebration of freedom one to remember.",
        hi: "स्वतंत्रता दिवस के पावन अवसर पर, हाथों में तिरंगा और दिलों में हिंदुस्तानी जज़्बा लिए NAB लखनऊ, इंदिरा नगर के बच्चों ने शानदार तिरंगा यात्रा निकालकर आज़ादी के जश्न को यादगार बना दिया।",
      },
      {
        en: "Students, teachers, parents and volunteers walked together: the same saath we work for every day, out on the street for everyone to see.",
        hi: "विद्यार्थी, शिक्षक, अभिभावक और वॉलंटियर साथ-साथ चले: वही साथ जिसके लिए हम हर दिन काम करते हैं, इस बार सबके सामने सड़क पर।",
      },
    ],
  },
  {
    slug: "samagra-shiksha-teacher-training-2026",
    title: {
      en: "Training Master Trainers for Inclusive Classrooms",
      hi: "समावेशी कक्षाओं के लिए मास्टर ट्रेनर्स का प्रशिक्षण",
    },
    excerpt: {
      en: "Samagra Shiksha, Uttar Pradesh invited NAB Lucknow as a resource person for its state-level master trainers programme on inclusive education.",
      hi: "समग्र शिक्षा, उत्तर प्रदेश ने समावेशी शिक्षा पर अपने राज्य स्तरीय मास्टर ट्रेनर्स कार्यक्रम में NAB लखनऊ को रिसोर्स पर्सन के रूप में आमंत्रित किया।",
    },
    image: "/img/nab/events/teacher-training-2026.jpg",
    date: "2026-07-21",
    section: "Events",
    eventCategory: "Programs",
    mode: "Offline",
    location: "Lucknow",
    body: [
      {
        en: "Samagra Shiksha (SSA), Uttar Pradesh invited NAB Lucknow as a resource person for its three-day, state-level master trainers programme on teacher training for inclusive education.",
        hi: "समग्र शिक्षा (SSA), उत्तर प्रदेश द्वारा आयोजित समावेशी शिक्षा के अन्तर्गत शिक्षक प्रशिक्षण हेतु राज्य स्तरीय तीन दिवसीय मास्टर ट्रेनर्स प्रशिक्षण कार्यक्रम में NAB लखनऊ को रिसोर्स पर्सन के रूप में आमंत्रित किया गया।",
      },
      {
        en: "In sessions on 14 and 21 July 2026 we shared practical, hands-on guidance on the learning needs of visually impaired students, inclusive classroom management, braille, assistive technology, teaching and learning resources, and teaching strategies that work.",
        hi: "14 जुलाई और 21 जुलाई 2026 के प्रशिक्षण सत्रों में दृष्टिबाधित विद्यार्थियों की शैक्षिक आवश्यकताओं, समावेशी कक्षा प्रबंधन, ब्रेल, सहायक तकनीक (Assistive Technology), शिक्षण-अधिगम संसाधनों और प्रभावी शिक्षण रणनीतियों पर व्यावहारिक जानकारी साझा की गई।",
      },
      {
        en: "Later in July we met another group of special educators to swap experiences and talk openly about what is and is not working in the system. Inclusive education means quality education for all, without discrimination.",
        hi: "जुलाई के अंत में हम विशेष शिक्षकों के एक और समूह से मिले, अनुभव साझा किए और व्यवस्था में क्या ठीक है और क्या नहीं, इस पर खुलकर चर्चा हुई। समावेशी शिक्षा यानी सभी के लिए गुणवत्तापूर्ण शिक्षा, बिना किसी भेदभाव के।",
      },
    ],
  },
  {
    slug: "helen-keller-day-2026",
    title: {
      en: "Helen Keller Day 2026: Celebrating Our Alumni",
      hi: "हेलन केलर डे 2026: अपने पूर्व विद्यार्थियों का सम्मान",
    },
    excerpt: {
      en: "On Helen Keller Day we paid floral tribute to Helen Keller and honoured a former student for her outstanding Class 12 results.",
      hi: "हेलन केलर डे पर हमने हेलन केलर को पुष्पांजलि अर्पित की और एक पूर्व विद्यार्थी को कक्षा 12 के उत्कृष्ट परिणाम के लिए सम्मानित किया।",
    },
    image: "/img/nab/events/helen-keller-day-2026.jpg",
    date: "2026-06-27",
    section: "Events",
    eventCategory: "Programs",
    mode: "Offline",
    location: "Indira Nagar, Lucknow",
    body: [
      {
        en: "On Helen Keller Day, NAB Lucknow, U.P. State Chapter paid floral tribute to Helen Keller and honoured a former student, who began her schooling with us in Indira Nagar, for an outstanding result in her Class 12 examinations. The organisation presented her with a cheque as encouragement.",
        hi: "हेलन केलर डे के अवसर पर NAB लखनऊ, यू.पी. स्टेट चैप्टर ने हेलन केलर को पुष्पांजलि अर्पित की और इंदिरा नगर में हमारे साथ अपनी पढ़ाई शुरू करने वाली एक पूर्व विद्यार्थी को कक्षा 12 की परीक्षा में उत्कृष्ट परिणाम के लिए सम्मानित किया। संस्था की ओर से प्रोत्साहन स्वरूप उन्हें एक चेक भी प्रदान किया गया।",
      },
      {
        en: "Her result is proof that when the hausla is strong, no barrier can block the road to success.",
        hi: "उनकी उपलब्धि इस बात का प्रमाण है कि यदि हौसले बुलंद हों, तो कोई भी बाधा सफलता की राह नहीं रोक सकती।",
      },
    ],
  },
  {
    slug: "yoga-day-2026",
    title: {
      en: "International Yoga Day 2026 with Our Students",
      hi: "हमारे विद्यार्थियों के साथ अंतरराष्ट्रीय योग दिवस 2026",
    },
    excerpt: {
      en: "Visually impaired children at NAB Lucknow performed yoga asanas and pranayama: see possibilities, not limits.",
      hi: "NAB लखनऊ के दृष्टिबाधित बच्चों ने योगासन और प्राणायाम का प्रदर्शन किया: सीमाएँ नहीं, संभावनाएँ देखो।",
    },
    image: "/img/nab/events/yoga-day-2026.jpg",
    date: "2026-06-21",
    section: "Events",
    eventCategory: "Programs",
    mode: "Offline",
    location: "NAB Lucknow, Lekhraj Dollar, Indira Nagar",
    body: [
      {
        en: "Yoga taught us to see possibilities, not limits. On International Yoga Day 2026, visually impaired children at NAB Lucknow, Lekhraj Dollar, Indira Nagar gave a confident demonstration of yoga asanas and pranayama.",
        hi: "योग ने सिखाया: सीमाएँ नहीं, संभावनाएँ देखो। अंतरराष्ट्रीय योग दिवस 2026 के अवसर पर NAB लखनऊ, लेखराज डॉलर, इंदिरा नगर में दृष्टिबाधित बच्चों ने योगासन एवं प्राणायाम का सफल प्रदर्शन किया।",
      },
      {
        en: "The aim was to promote health, confidence and inclusion, and every participant joined in with enthusiasm.",
        hi: "कार्यक्रम का उद्देश्य स्वास्थ्य, आत्मविश्वास और समावेशिता को बढ़ावा देना था। सभी प्रतिभागियों ने उत्साहपूर्वक भाग लिया।",
      },
    ],
  },
  {
    slug: "annual-day-2025",
    title: {
      en: "Annual Day 2025: Students Take the Stage",
      hi: "वार्षिकोत्सव 2025: मंच पर विद्यार्थियों का हौसला",
    },
    excerpt: {
      en: "Recognising a year of vocational placements, exam results, and a graduating batch of ten.",
      hi: "एक साल की वोकेशनल प्लेसमेंट, परीक्षा परिणामों और दस विद्यार्थियों के ग्रेजुएटिंग बैच का सम्मान।",
    },
    image: "/img/nab/cover-page.jpg",
    date: "2025-12-14",
    section: "Events",
    eventCategory: "Programs",
    mode: "Offline",
    location: "NAB Lucknow campus, Indira Nagar",
    body: [
      {
        en: "Our Annual Day closed out 2025 with performances, awards, and a graduating vocational-training batch of ten students moving into corporate and government placements.",
        hi: "हमारे वार्षिकोत्सव ने 2025 का समापन प्रस्तुतियों, पुरस्कारों और वोकेशनल ट्रेनिंग पूरी कर रहे दस विद्यार्थियों के उस बैच के साथ किया, जो अब कॉर्पोरेट और सरकारी नौकरियों की ओर बढ़ रहे हैं।",
      },
      {
        en: "Family members, longtime donors, and this year's CSR partners joined us on campus for the full afternoon.",
        hi: "परिवार के सदस्य, पुराने दानदाता और इस साल के CSR पार्टनर पूरी दोपहर हमारे साथ परिसर में मौजूद रहे।",
      },
    ],
  },
  {
    slug: "white-cane-day-walk-2025",
    title: {
      en: "White Cane Day: The Blindfolded Walk Returns",
      hi: "व्हाइट केन डे: आँखों पर पट्टी बाँधकर वॉक फिर से लौटी",
    },
    excerpt: {
      en: "Over 80 participants walked our guided route blindfolded, cane in hand, this October.",
      hi: "इस अक्टूबर 80 से अधिक प्रतिभागियों ने आँखों पर पट्टी बाँधकर, हाथ में केन लिए हमारा निर्धारित मार्ग तय किया।",
    },
    image: "/img/nab/white-cane-handover.jpg",
    date: "2025-10-15",
    section: "Events",
    eventCategory: "Fundraiser & Awareness",
    mode: "Offline",
    location: "Indira Nagar, Lucknow",
    body: [
      {
        en: "Every White Cane Day, we open our blindfolded walk to the public: a short, guided route meant to make independent mobility without sight tangible rather than abstract.",
        hi: "हर व्हाइट केन डे पर हम अपनी ब्लाइंडफोल्डेड वॉक आम जनता के लिए खोलते हैं: एक छोटा, निर्धारित मार्ग, जिसका मकसद बिना दृष्टि के आत्मनिर्भर चलने-फिरने को महसूस करवाना है, सिर्फ सुनाना नहीं।",
      },
      {
        en: "This year's walk raised funds toward our white cane distribution drive and drew a record number of first-time participants.",
        hi: "इस साल की वॉक ने हमारे व्हाइट केन वितरण अभियान के लिए धन जुटाया और पहली बार शामिल होने वाले प्रतिभागियों की अब तक की सबसे बड़ी संख्या को आकर्षित किया।",
      },
    ],
  },
  {
    slug: "webinar-inclusive-workplaces-2025",
    title: {
      en: "Webinar Recap: Building Inclusive Workplaces from Day One",
      hi: "वेबिनार सार: पहले दिन से समावेशी कार्यस्थल बनाना",
    },
    excerpt: {
      en: "HR leaders from three of our CSR partners joined an online panel on accessible onboarding.",
      hi: "हमारे तीन CSR पार्टनरों के HR लीडर सुलभ ऑनबोर्डिंग पर एक ऑनलाइन पैनल में शामिल हुए।",
    },
    image: "/img/nab/care.jpg",
    date: "2025-08-22",
    section: "Events",
    eventCategory: "Programs",
    mode: "Online",
    location: "Online",
    body: [
      {
        en: "This online panel brought together HR leaders from three corporate partners to talk through what accessible onboarding actually requires in the first ninety days of a new hire's employment.",
        hi: "इस ऑनलाइन पैनल में तीन कॉर्पोरेट पार्टनरों के HR लीडर इकट्ठा हुए, यह समझाने के लिए कि किसी नए कर्मचारी की नौकरी के पहले नब्बे दिनों में सुलभ ऑनबोर्डिंग के लिए असल में क्या-क्या ज़रूरी होता है।",
      },
      {
        en: "The full recording is available to CSR partners on request.",
        hi: "पूरी रिकॉर्डिंग CSR पार्टनरों को अनुरोध पर उपलब्ध कराई जाती है।",
      },
    ],
  },
  {
    slug: "audiobook-fundraiser-2024",
    title: {
      en: "The Audiobook Library Fundraiser Hit Its Target",
      hi: "ऑडियोबुक लाइब्रेरी फंडरेज़र ने अपना लक्ष्य हासिल किया",
    },
    excerpt: {
      en: "A year-end online fundraiser fully funded our audiobook recording programme for 2025.",
      hi: "साल के अंत में हुए एक ऑनलाइन फंडरेज़र ने 2025 के लिए हमारे ऑडियोबुक रिकॉर्डिंग प्रोग्राम को पूरी तरह फंड किया।",
    },
    image: "/img/nab/bani.jpg",
    date: "2024-12-05",
    section: "Events",
    eventCategory: "Fundraiser & Awareness",
    mode: "Online",
    location: "Online",
    body: [
      {
        en: "Our year-end online fundraiser closed out fully funded, covering a full year of audiobook recording for our library, every session paid for by an individual donor.",
        hi: "हमारा साल के अंत का ऑनलाइन फंडरेज़र पूरी तरह फंडेड होकर समाप्त हुआ, जिसने हमारी लाइब्रेरी के लिए पूरे एक साल की ऑडियोबुक रिकॉर्डिंग को कवर किया। हर सेशन किसी न किसी व्यक्तिगत दानदाता के सहयोग से पूरा हुआ।",
      },
      {
        en: "Recording continues through 2026 with volunteer readers from three partner colleges.",
        hi: "रिकॉर्डिंग का काम 2026 में भी जारी है, तीन पार्टनर कॉलेजों के वॉलंटियर रीडर्स के साथ।",
      },
    ],
  },
  {
    slug: "nukkad-naatak-2024",
    title: {
      en: "Nukkad Naatak Takes to the Streets of Indira Nagar",
      hi: "नुक्कड़ नाटक इंदिरा नगर की गलियों में उतरा",
    },
    excerpt: {
      en: "Our students performed their first fully independent street play to a gathered neighbourhood crowd.",
      hi: "हमारे विद्यार्थियों ने पहली बार पूरी तरह स्वतंत्र रूप से इकट्ठा हुई पड़ोस की भीड़ के सामने नुक्कड़ नाटक प्रस्तुत किया।",
    },
    image: "/img/nab/dance.jpg",
    date: "2024-09-20",
    section: "Events",
    eventCategory: "Programs",
    mode: "Offline",
    location: "Indira Nagar, Lucknow",
    body: [
      {
        en: "After weeks of training with professional street artists and theatre directors, our students performed their first fully independent nukkad naatak to a crowd gathered right outside our campus gates.",
        hi: "पेशेवर स्ट्रीट आर्टिस्टों और थिएटर डायरेक्टरों के साथ हफ्तों की ट्रेनिंग के बाद, हमारे विद्यार्थियों ने अपने परिसर के गेट के ठीक बाहर इकट्ठा हुई भीड़ के सामने अपना पहला पूरी तरह स्वतंत्र नुक्कड़ नाटक प्रस्तुत किया।",
      },
      {
        en: "The performance has since become an annual fixture on our events calendar.",
        hi: "यह प्रस्तुति तभी से हमारे इवेंट कैलेंडर का एक सालाना हिस्सा बन गई है।",
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}
