"use client";

import Link from "next/link";
import { NAV_LINKS } from "../../components/shared/constants";
import { useLanguage, type Lang, type Bilingual } from "../../components/shared/LanguageContext";

const COPY = {
  back: { en: "← Back to Blog", hi: "← ब्लॉग पर वापस जाएं" },
};

/** The primary nav on this page's own bespoke header (every other page
    gets this from StagePager instead, which already handles it). Current
    page is always this post's page, under /blog, same as before. */
export function PrimaryNav() {
  const { t } = useLanguage();
  return (
    <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={link.href === "/blog" ? "page" : undefined}
          className={
            "font-body text-sm font-semibold text-black transition-colors hover:text-navy" +
            (link.href === "/blog" ? " underline decoration-orange decoration-2 underline-offset-4" : "")
          }
        >
          {t(link.label)}
        </Link>
      ))}
    </nav>
  );
}

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** The two bits of UI chrome on the post page that need the active
    language: the rest of the page is a server component (it exports
    generateMetadata/generateStaticParams, which can't live in a "use
    client" file), so these are split out here instead. */
export function BackToBlogLink() {
  const { t } = useLanguage();
  return (
    <Link href="/blog" className="font-heading text-xs font-semibold text-navy hover:underline">
      {t(COPY.back)}
    </Link>
  );
}

export function PostDate({ iso }: { iso: string }) {
  const { lang } = useLanguage();
  return <p className="mt-3 font-body text-sm text-black/50">{formatDate(iso, lang)}</p>;
}

export function PostTitle({ title }: { title: Bilingual }) {
  const { t } = useLanguage();
  return (
    <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl">{t(title)}</h1>
  );
}

export function PostBody({ body }: { body: Bilingual[] }) {
  const { t } = useLanguage();
  return (
    <div className="mt-8 flex flex-col gap-5">
      {body.map((paragraph, i) => (
        <p key={i} className="font-body text-base leading-7 text-black/80">
          {t(paragraph)}
        </p>
      ))}
    </div>
  );
}
