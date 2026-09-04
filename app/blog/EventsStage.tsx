import Image from "next/image";
import Link from "next/link";
import { POSTS } from "../lib/posts-data";
import { StageIntro } from "../components/shared/StageIntro";

const BLOG_POSTS = [...POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function EventsStage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-start gap-3 sm:gap-5">
      <StageIntro
        title="Blog"
        subtitle={
          <>
            Event recaps, updates, and what we&apos;ve learned along the way. For dates still to come, see{" "}
            <Link href="/events" className="font-semibold text-navy underline underline-offset-2">
              upcoming events
            </Link>
            .
          </>
        }
      />

      {/* One scroll surface: when the cards outrun the pinned viewport this
          region takes the wheel/touch gesture (data-stage-scroll) instead of
          stepping the stage — the same behaviour as the homepage's forms. */}
      <div
        data-stage-scroll=""
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch]"
      >
        {/* pb-16: clears the floating action button so the last row can
            always scroll past it instead of ending up permanently under it. */}
        <div className="grid grid-cols-1 gap-3 pb-16 sm:grid-cols-2 sm:gap-4 sm:pb-4 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  width={480}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <span className="font-heading text-[10px] font-bold uppercase tracking-wide text-orange">
                  {post.section}
                  {post.eventCategory ? ` · ${post.eventCategory}` : ""}
                </span>
                <h3 className="font-heading text-sm font-bold leading-snug text-navy group-hover:text-orange">
                  {post.title}
                </h3>
                <p className="line-clamp-2 font-body text-xs leading-5 text-black/60">{post.excerpt}</p>
                <p className="mt-auto pt-1 font-body text-[11px] text-black/45">{formatDate(post.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
