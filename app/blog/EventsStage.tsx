import Image from "next/image";
import Link from "next/link";
import { POSTS } from "../lib/posts-data";
import { StageIntro } from "../components/shared/StageIntro";

const EVENT_POSTS = POSTS.filter((post) => post.section === "Events").sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

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
            Recaps and stories from every programme, fundraiser, and drive. For dates still to come, see{" "}
            <Link href="/events" className="font-semibold text-navy underline underline-offset-2">
              upcoming events
            </Link>
            .
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5 md:grid-cols-5">
        {EVENT_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="h-14 w-full overflow-hidden sm:h-20">
              <Image src={post.image} alt="" width={300} height={160} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-0.5 p-2">
              <h3 className="font-heading text-[11px] font-bold leading-tight text-navy group-hover:text-orange sm:text-xs">
                {post.title}
              </h3>
              <p className="font-body text-[10px] text-black/50 sm:text-xs">{formatDate(post.date)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
