"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { POSTS } from "../lib/posts-data";

const TABS = [
  { key: "Awareness", label: "Awareness" },
  { key: "Events", label: "Events" },
] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function BlogGridStage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("Awareness");
  const posts = POSTS.filter((post) => post.section === tab).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-3 sm:gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-xl font-bold text-navy sm:text-3xl">From the Blog</h1>
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={
                "rounded-full border px-4 py-1.5 font-heading text-xs font-semibold transition-colors sm:px-5 sm:py-2 sm:text-sm " +
                (tab === t.key
                  ? "border-navy bg-navy text-white"
                  : "border-black/15 text-black/60 hover:border-navy hover:text-navy")
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3 sm:gap-6">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-row items-stretch gap-3 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-sm transition-shadow hover:shadow-md sm:flex-col sm:gap-0 sm:p-0"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:h-36 sm:w-full sm:rounded-none">
              <Image src={post.image} alt="" width={500} height={280} className="h-full w-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 sm:flex-none sm:justify-start sm:gap-2 sm:p-4">
              <p className="hidden font-body text-xs text-black/50 sm:block">{formatDate(post.date)}</p>
              <h3 className="font-heading text-sm font-bold leading-tight text-navy group-hover:text-orange sm:text-base">
                {post.title}
              </h3>
              <p className="hidden font-body text-xs leading-5 text-black/70 sm:block">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
