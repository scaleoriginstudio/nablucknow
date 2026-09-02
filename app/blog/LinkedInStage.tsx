import Image from "next/image";
import { LINKEDIN_POSTS } from "../lib/linkedin-data";
import { StageIntro } from "../components/shared/StageIntro";

export function LinkedInStage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-start gap-3 sm:gap-4">
      <StageIntro title="On LinkedIn" subtitle="Our latest posts, straight from LinkedIn." />

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {LINKEDIN_POSTS.map((post) => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md sm:rounded-xl"
          >
            {/* Square on phones (small thumbnails); a short fixed height on
                larger screens so all three rows plus their titles fit the
                pinned viewport without being clipped, even on a short laptop. */}
            <div className="aspect-square w-full overflow-hidden sm:aspect-auto sm:h-[12vh] sm:max-h-28">
              <Image src={post.image} alt="" width={300} height={300} className="h-full w-full object-cover" />
            </div>
            <div className="hidden p-1.5 sm:block">
              <h3 className="line-clamp-1 font-heading text-[11px] font-bold leading-tight text-navy group-hover:text-orange">
                {post.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
