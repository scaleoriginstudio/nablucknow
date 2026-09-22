import type { Metadata } from "next";
import { Montserrat, Libre_Baskerville, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./lib/site";
import { OverlayProvider } from "./components/shared/OverlayContext";
import { LanguageProvider } from "./components/shared/LanguageContext";
import { Overlays } from "./components/shared/Overlays";
import { FloatingActions } from "./components/shared/FloatingActions";
import "./globals.css";

const heading = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Libre_Baskerville({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Montserrat/Libre Baskerville have no Devanagari glyphs. These two sit
// second in the --font-heading/--font-body stacks in globals.css, so the
// browser falls back to them per-glyph — Hindi words woven into English
// copy (and full Hindi mode) render correctly with no per-string markup.
const headingHi = Noto_Sans_Devanagari({
  variable: "--font-heading-hi",
  subsets: ["devanagari"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const bodyHi = Noto_Serif_Devanagari({
  variable: "--font-body-hi",
  subsets: ["devanagari"],
  weight: ["400", "700"],
  display: "swap",
});

const KEYWORDS = [
  "National Association for the Blind",
  "NAB Lucknow",
  "NGO for the blind India",
  "CSR partner NGO",
  "corporate social responsibility disability inclusion",
  "blind welfare NGO Uttar Pradesh",
  "inclusive education for visually impaired children",
  "visually impaired education India",
  "donate to blind welfare NGO",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | National Association for the Blind",
  },
  // Metadata/OpenGraph/JSON-LD are server-rendered once with no client
  // language context available, so English stays canonical here regardless
  // of the page's toggle state — an intentional scope boundary, not a gap.
  description: SITE_DESCRIPTION.en,
  keywords: KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION.en,
    images: [{ url: "/img/logo.png", width: 1080, height: 1080, alt: "National Association for the Blind logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION.en,
    images: ["/img/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  areaServed: {
    "@type": "State",
    name: "Uttar Pradesh, India",
  },
  knowsAbout: [
    "Vision impairment",
    "Blindness",
    "Education for the visually impaired",
    "Corporate Social Responsibility partnerships",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${headingHi.variable} ${bodyHi.variable}`}>
      <head>
        {/* Material Symbols, Google's icon set, used site-wide instead of
            hand-drawn SVGs wherever an icon is needed. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full bg-white font-body text-black antialiased">
        <LanguageProvider>
          <OverlayProvider>
            {children}
            <Overlays />
            <FloatingActions />
          </OverlayProvider>
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
