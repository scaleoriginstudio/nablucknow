import type { Metadata } from "next";
import { Montserrat, Libre_Baskerville } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./lib/site";
import { OverlayProvider } from "./components/shared/OverlayContext";
import { Overlays } from "./components/shared/Overlays";
import { FloatingWidgets } from "./components/shared/FloatingWidgets";
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

const KEYWORDS = [
  "National Association for the Blind",
  "NAB Lucknow",
  "NGO for the blind India",
  "CSR partner NGO",
  "corporate social responsibility disability inclusion",
  "blind welfare NGO Uttar Pradesh",
  "visually impaired education India",
  "donate to blind welfare NGO",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | National Association for the Blind",
  },
  description: SITE_DESCRIPTION,
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
    description: SITE_DESCRIPTION,
    images: [{ url: "/img/logo.png", width: 1080, height: 1080, alt: "National Association for the Blind logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <head>
        {/* Material Symbols — Google's icon set, used site-wide instead of
            hand-drawn SVGs wherever an icon is needed. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full bg-white font-body text-black antialiased">
        <OverlayProvider>
          {children}
          <Overlays />
          <FloatingWidgets />
        </OverlayProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
