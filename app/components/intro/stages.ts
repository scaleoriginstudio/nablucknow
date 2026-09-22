import type { Bilingual } from "../shared/LanguageContext";

export type SightStage = {
  /** Stage applies while the sight-loss value is above this number (100 -> 0). */
  above: number;
  label: Bilingual;
  /** Plain-language explanation, written for a general audience. */
  description: Bilingual;
};

export const SIGHT_STAGES: SightStage[] = [
  {
    above: 75,
    label: { en: "Total Blindness", hi: "पूर्ण दृष्टिहीनता" },
    description: {
      en: "No useful vision at all: everything is dark. People who are totally blind get around using touch, hearing, and memory, often with a cane, a guide dog, or braille.",
      hi: "कोई भी उपयोगी दृष्टि नहीं होती: सब कुछ अंधेरा होता है। पूर्ण रूप से दृष्टिहीन लोग स्पर्श, सुनने और स्मृति के सहारे चलते-फिरते हैं, अक्सर छड़ी, गाइड डॉग या ब्रेल की मदद से।",
    },
  },
  {
    above: 50,
    label: { en: "Advanced Glaucoma", hi: "उन्नत ग्लूकोमा" },
    description: {
      en: "Glaucoma damages the nerve that carries images from the eye to the brain. It usually takes away side vision first, so the world looks like it's being seen through a narrow tube, while central vision can remain for longer.",
      hi: "ग्लूकोमा उस नस को नुकसान पहुँचाता है जो आँख से दिमाग तक तस्वीरें ले जाती है। यह आमतौर पर पहले साइड (बगल) की दृष्टि छीनता है, जिससे दुनिया एक संकरी नली से देखी हुई लगती है, जबकि बीच की दृष्टि लंबे समय तक बनी रह सकती है।",
    },
  },
  {
    above: 25,
    label: { en: "Cataract", hi: "मोतियाबिंद" },
    description: {
      en: "A cataract is a clouding of the eye's naturally clear lens. It makes everything look blurry, hazy, or dim, similar to looking through a foggy window. Cataracts usually develop slowly and can often be treated with surgery.",
      hi: "मोतियाबिंद आँख के स्वाभाविक रूप से साफ लेंस का धुंधला हो जाना है। इससे हर चीज़ धुंधली, धुँधली या मद्धम दिखने लगती है, जैसे किसी धुंधले शीशे से देख रहे हों। मोतियाबिंद आमतौर पर धीरे-धीरे बढ़ता है और अक्सर सर्जरी से ठीक किया जा सकता है।",
    },
  },
  {
    above: 0,
    label: { en: "Macular Degeneration", hi: "मैकुलर डिजनरेशन" },
    description: {
      en: "This condition damages the macula, the part of the eye responsible for sharp, central vision. It creates a blurred or missing patch right in the middle of view, while side vision usually stays normal.",
      hi: "यह स्थिति मैकुला को नुकसान पहुँचाती है, आँख का वह हिस्सा जो तीक्ष्ण, केंद्रीय दृष्टि के लिए ज़िम्मेदार होता है। इससे नज़र के बीचों-बीच एक धुंधला या गायब हिस्सा बन जाता है, जबकि साइड की दृष्टि आमतौर पर सामान्य बनी रहती है।",
    },
  },
  {
    above: -1,
    label: { en: "Full Sight", hi: "पूर्ण दृष्टि" },
    description: {
      en: "Vision without impairment: clear and complete, in both the centre and the sides of view.",
      hi: "बिना किसी बाधा के दृष्टि: नज़र के बीच और बगल, दोनों तरफ साफ और पूरी।",
    },
  },
];

export function stageForValue(value: number): SightStage {
  return (
    SIGHT_STAGES.find((stage) => value > stage.above) ??
    SIGHT_STAGES[SIGHT_STAGES.length - 1]
  );
}
