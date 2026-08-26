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
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-navy sm:text-3xl">From the Blog</h1>
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={
                "rounded-full border px-5 py-2 font-heading text-sm font-semibold transition-colors " +
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

      <div className="grid gap-6 sm:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="h-36 w-full overflow-hidden">
              <Image src={post.image} alt="" width={500} height={280} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <p className="font-body text-xs text-black/50">{formatDate(post.date)}</p>
              <h3 className="font-heading text-base font-bold leading-tight text-navy group-hover:text-orange">
                {post.title}
              </h3>
              <p className="font-body text-xs leading-5 text-black/70">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
