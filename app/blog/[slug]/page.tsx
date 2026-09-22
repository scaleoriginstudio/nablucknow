import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { POSTS, getPostBySlug } from "../../lib/posts-data";
import { MobileNav } from "../../components/shared/MobileNav";
import { ScrollUnlock } from "../../components/shared/ScrollUnlock";
import { SiteFooterContent } from "../../components/shared/SiteFooterContent";
import { BackToBlogLink, PostDate, PostTitle, PostBody, PrimaryNav } from "./PostChrome";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

// Metadata (page <title>, meta description) is generated server-side with
// no active-language context, so it always uses the English copy — SEO
// chrome, not the reader-facing text the language toggle controls.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title.en, description: post.excerpt.en };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
      <ScrollUnlock />
      <header className="flex h-20 items-center justify-between gap-4 px-5 sm:h-24 sm:gap-8 sm:px-8">
        <Link href="/" className="flex h-14 w-14 items-center justify-center rounded-xl bg-white sm:h-16 sm:w-16">
          <Image
            src="/img/logo.png"
            alt="National Association for the Blind"
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </Link>
        <PrimaryNav />
        <MobileNav />
      </header>

      <article className="mx-auto max-w-3xl px-5 pb-24 pt-8 sm:px-8">
        <BackToBlogLink />
        <p className="mt-6 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
          {post.section}
          {post.eventCategory ? ` · ${post.eventCategory}` : ""}
        </p>
        <PostTitle title={post.title} />
        <PostDate iso={post.date} />

        <div className="mt-8 h-[40vh] max-h-[420px] w-full overflow-hidden rounded-2xl">
          <Image src={post.image} alt="" width={1200} height={700} className="h-full w-full object-cover" />
        </div>

        <PostBody body={post.body} />
      </article>

      <footer className="bg-navy px-5 py-10 sm:px-8">
        <SiteFooterContent />
      </footer>
    </main>
  );
}
