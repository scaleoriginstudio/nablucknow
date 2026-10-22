"use client";

import Image from "next/image";
import { LINKEDIN_POSTS } from "../lib/linkedin-data";
import { StageIntro } from "../components/shared/StageIntro";
import { useLanguage } from "../components/shared/LanguageContext";

const COPY = {
  title: { en: "On LinkedIn", hi: "LinkedIn पर" },
  subtitle: { en: "Our latest posts, straight from LinkedIn.", hi: "LinkedIn से सीधे, हमारी नवीनतम पोस्ट।" },
};

export function LinkedInStage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-start gap-3 sm:gap-4">
      <StageIntro title={t(COPY.title)} subtitle={t(COPY.subtitle)} />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {LINKEDIN_POSTS.map((post) => (
          <a
            key={post.href + t(post.title)}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md sm:rounded-xl"
          >
            {/* Square on phones; a single row on larger screens, capped so
                the row and its titles fit the pinned viewport on a short
                laptop. */}
            <div className="aspect-square w-full overflow-hidden sm:aspect-[4/3] sm:max-h-[40vh]">
              <Image src={post.image} alt="" width={300} height={300} className="h-full w-full object-cover" />
            </div>
            <div className="p-2 sm:p-3">
              <h3 className="line-clamp-2 font-heading text-[11px] font-bold leading-tight text-navy group-hover:text-orange sm:text-sm">
                {t(post.title)}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
