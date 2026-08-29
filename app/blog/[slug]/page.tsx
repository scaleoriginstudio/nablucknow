import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { POSTS, getPostBySlug } from "../../lib/posts-data";
import { NAV_LINKS } from "../../components/shared/constants";
import { ScrollUnlock } from "../../components/shared/ScrollUnlock";
import { SiteFooterContent } from "../../components/shared/SiteFooterContent";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
      <ScrollUnlock />
      <header className="flex h-24 items-center justify-between gap-8 px-8">
        <Link href="/" className="flex h-16 w-16 items-center justify-center rounded-xl bg-white">
          <Image
            src="/img/logo.png"
            alt="National Association for the Blind"
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.href === "/blog" ? "page" : undefined}
              className={
                "font-body text-sm font-semibold text-black transition-colors hover:text-navy" +
                (link.href === "/blog" ? " underline decoration-orange decoration-2 underline-offset-4" : "")
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <article className="mx-auto max-w-3xl px-8 pb-24 pt-8">
        <Link href="/blog" className="font-heading text-xs font-semibold text-navy hover:underline">
          ← Back to Blog
        </Link>
        <p className="mt-6 font-body text-xs font-semibold uppercase tracking-wide text-orange">
          {post.section}
          {post.eventCategory ? ` · ${post.eventCategory}` : ""}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl">{post.title}</h1>
        <p className="mt-3 font-body text-sm text-black/50">{formatDate(post.date)}</p>

        <div className="mt-8 h-[40vh] max-h-[420px] w-full overflow-hidden rounded-2xl">
          <Image src={post.image} alt="" width={1200} height={700} className="h-full w-full object-cover" />
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {post.body.map((paragraph) => (
            <p key={paragraph} className="font-body text-base leading-7 text-black/80">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <footer className="bg-navy px-8 py-10">
        <SiteFooterContent />
      </footer>
    </main>
  );
}
