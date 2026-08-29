import Image from "next/image";
import { LINKEDIN_POSTS } from "../lib/linkedin-data";

export function LinkedInStage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center gap-3 sm:gap-5">
      <div>
        <h1 className="font-heading text-xl font-bold text-navy sm:text-3xl">On LinkedIn</h1>
        <p className="mt-1 font-body text-sm text-black/60">Our latest posts, straight from LinkedIn.</p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {LINKEDIN_POSTS.map((post) => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md sm:rounded-xl"
          >
            {/* Square on phones (small thumbnails); a fixed, shorter height
                on larger screens so all three rows fit the pinned viewport
                without being clipped. */}
            <div className="aspect-square w-full overflow-hidden sm:aspect-auto sm:h-24 md:h-28 lg:h-32">
              <Image src={post.image} alt="" width={300} height={300} className="h-full w-full object-cover" />
            </div>
            <div className="hidden flex-col gap-0.5 p-2 sm:flex">
              <h3 className="line-clamp-2 font-heading text-[11px] font-bold leading-tight text-navy group-hover:text-orange">
                {post.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
