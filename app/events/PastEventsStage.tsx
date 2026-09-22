"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { POSTS } from "../lib/posts-data";
import { StageIntro } from "../components/shared/StageIntro";
import { Icon } from "../components/shared/Icon";
import { useLanguage, type Bilingual, type Lang } from "../components/shared/LanguageContext";

const PAST_EVENTS = POSTS.filter((post) => post.section === "Events").sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const CATEGORY_FILTERS = ["All", "Programs", "Fundraiser & Awareness"] as const;
const MODE_FILTERS = ["All", "Online", "Offline"] as const;

const CATEGORY_LABELS: Record<(typeof CATEGORY_FILTERS)[number], Bilingual> = {
  All: { en: "All", hi: "सभी" },
  Programs: { en: "Programs", hi: "प्रोग्राम" },
  "Fundraiser & Awareness": { en: "Fundraiser & Awareness", hi: "फंडरेज़र और जागरूकता" },
};

const MODE_LABELS: Record<(typeof MODE_FILTERS)[number], Bilingual> = {
  All: { en: "All", hi: "सभी" },
  Online: { en: "Online", hi: "ऑनलाइन" },
  Offline: { en: "Offline", hi: "ऑफलाइन" },
};

const COPY = {
  title: { en: "Past Events", hi: "बीते कार्यक्रम" },
  noMatch: { en: "No past events match these filters.", hi: "इन फ़िल्टर से कोई बीता कार्यक्रम नहीं मिला।" },
};

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { month: "long" });
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-4 py-1.5 font-heading text-xs font-semibold transition-colors " +
        (active ? "border-navy bg-navy text-white" : "border-black/15 text-black/60 hover:border-navy hover:text-navy")
      }
    >
      {children}
    </button>
  );
}

export function PastEventsStage() {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState<(typeof CATEGORY_FILTERS)[number]>("All");
  const [mode, setMode] = useState<(typeof MODE_FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      PAST_EVENTS.filter(
        (post) =>
          (category === "All" || post.eventCategory === category) && (mode === "All" || post.mode === mode),
      ),
    [category, mode],
  );

  const years = useMemo(() => Array.from(new Set(filtered.map((post) => post.date.slice(0, 4)))), [filtered]);
  const [year, setYear] = useState(years[0]);
  const activeYear = years.includes(year) ? year : years[0];

  const monthsInYear = useMemo(
    () =>
      Array.from(
        new Set(
          filtered.filter((post) => post.date.slice(0, 4) === activeYear).map((post) => post.date.slice(0, 7)),
        ),
      ),
    [filtered, activeYear],
  );
  const [month, setMonth] = useState(monthsInYear[0]);
  const activeMonth = monthsInYear.includes(month) ? month : monthsInYear[0];

  const eventsInMonth = filtered.filter((post) => post.date.slice(0, 7) === activeMonth);

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-start gap-4">
      <StageIntro
        headingLevel="h2"
        title={t(COPY.title)}
        trailing={
          <>
            {CATEGORY_FILTERS.map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                {t(CATEGORY_LABELS[c])}
              </Chip>
            ))}
            <span className="mx-1 hidden text-black/20 sm:inline">|</span>
            {MODE_FILTERS.map((m) => (
              <Chip key={m} active={mode === m} onClick={() => setMode(m)}>
                {t(MODE_LABELS[m])}
              </Chip>
            ))}
          </>
        }
      />

      {years.length === 0 ? (
        <p className="text-center font-body text-sm text-black/50">{t(COPY.noMatch)}</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-2">
            {years.map((y) => (
              <Chip key={y} active={activeYear === y} onClick={() => setYear(y)}>
                {y}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {monthsInYear.map((m) => (
              <Chip key={m} active={activeMonth === m} onClick={() => setMonth(m)}>
                {formatDate(`${m}-01`, lang)}
              </Chip>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {eventsInMonth.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="h-28 w-full overflow-hidden">
                  <Image src={post.image} alt="" width={400} height={200} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col gap-1 p-3">
                  <h3 className="font-heading text-sm font-bold leading-tight text-navy group-hover:text-orange">
                    {t(post.title)}
                  </h3>
                  <p className="font-body text-xs leading-5 text-black/60">{t(post.excerpt)}</p>
                  {post.location && (
                    <p className="mt-0.5 flex items-center gap-1 font-body text-[11px] text-black/50">
                      <Icon name="location_on" size={12} className="shrink-0 text-black/40" />
                      {post.location}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
