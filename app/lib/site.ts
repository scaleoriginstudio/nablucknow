// Current live origin. Override with NEXT_PUBLIC_SITE_URL once a custom
// domain (e.g. nablucknow.org) is pointed at the deployment — canonical
// URLs, OpenGraph tags, the sitemap and robots.txt all derive from this.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nablucknow.vercel.app";

export const SITE_NAME = "National Association for the Blind, State Chapter, Lucknow";

export const SITE_DESCRIPTION =
  "National Association for the Blind, State Chapter, Lucknow is an NGO working in education, family counselling, and employment support for visually impaired people. For over 30 years we have run residential schooling, vocational training, and job placement, and we partner with companies on CSR programmes for disability inclusion across Uttar Pradesh.";
