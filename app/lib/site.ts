import type { Bilingual } from "../components/shared/LanguageContext";

// Current live origin. Override with NEXT_PUBLIC_SITE_URL once a custom
// domain (e.g. nablucknow.org) is pointed at the deployment — canonical
// URLs, OpenGraph tags, the sitemap and robots.txt all derive from this.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nablucknow.vercel.app";

export const SITE_NAME = "National Association for the Blind, State Chapter, Lucknow";

// NOTE: app/layout.tsx reads SITE_DESCRIPTION.en directly for server-rendered
// <head> metadata (title/OpenGraph/Twitter) — English stays canonical there
// since that context has no client-side language toggle. See AGENTS-facing
// task notes; layout.tsx itself is out of scope for this change.
export const SITE_DESCRIPTION: Bilingual = {
  en: "National Association for the Blind, State Chapter, Lucknow is an NGO working in inclusive education, family counselling, and employment support for visually impaired people. For over 30 years we have run residential schooling, vocational training, and job placement built around inclusion rather than separation, and we partner with companies on CSR programmes for disability inclusion across Uttar Pradesh.",
  hi: "National Association for the Blind, State Chapter, Lucknow एक ऐसी NGO है जो दृष्टिबाधित लोगों के लिए समावेशी शिक्षा, पारिवारिक काउंसलिंग और रोज़गार सहायता के क्षेत्र में काम करती है। 30 वर्षों से अधिक समय से हम आवासीय स्कूली शिक्षा, वोकेशनल ट्रेनिंग और नौकरी प्लेसमेंट चला रहे हैं — अलगाव नहीं, बल्कि समावेशन के सिद्धांत पर बने हुए — और उत्तर प्रदेश भर में दिव्यांगजन समावेशन के लिए कंपनियों के साथ CSR प्रोग्रामों में साझेदारी करते हैं।",
};
