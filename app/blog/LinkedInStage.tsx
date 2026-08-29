import Image from "next/image";
import { LINKEDIN_POSTS } from "../lib/linkedin-data";

export function LinkedInStage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-3 sm:gap-5">
      <div>
        <h1 className="font-heading text-xl font-bold text-navy sm:text-3xl">On LinkedIn</h1>
        <p className="mt-1 font-body text-sm text-black/60">Our latest posts, straight from LinkedIn.</p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
        {LINKEDIN_POSTS.map((post) => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md sm:rounded-xl"
          >
            <div className="aspect-square w-full overflow-hidden">
              <Image src={post.image} alt="" width={300} height={300} className="h-full w-full object-cover" />
            </div>
            <div className="hidden flex-col gap-0.5 p-2 sm:flex">
              <h3 className="font-heading text-[11px] font-bold leading-tight text-navy group-hover:text-orange">
                {post.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
