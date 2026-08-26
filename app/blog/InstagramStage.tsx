import { FOOTER_SOCIALS } from "../components/shared/constants";

const instagram = FOOTER_SOCIALS.find((social) => social.name === "Instagram");

export function InstagramStage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-4 text-center">
      <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">Follow us on Instagram</h2>
      <p className="font-body text-sm leading-6 text-black/60">
        Day-to-day moments from our classrooms, events, and students, before they ever make it into a blog post.
      </p>
      <a
        href={instagram?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 rounded-full bg-orange px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy"
      >
        @nab_lucknow on Instagram
      </a>
    </div>
  );
}
