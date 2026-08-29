"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Icon } from "./Icon";

/** A full-bleed navy backdrop with an optional blurred photo behind it,
    used as the professional background the glass panels sit and blur over.
    On the StagePager pages it is passed as the `background` prop; the
    homepage renders it inline behind the CTA stage. */
export function GlassBackdrop({ image, priority = false }: { image?: string; priority?: boolean }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-navy">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="scale-110 object-cover opacity-25 blur-xl"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/85 to-[#141f45]" />
    </div>
  );
}

type CommonProps = {
  /** Photo shown in the left panel (right of the form on wide screens). */
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  /** A short line under the title, always visible in the form column
      (dark text). Use for a date, a fee, a location. */
  meta?: ReactNode;
  /** Overlaid on the photo, wide screens only, so it can safely be light
      on dark. Use for a pull quote, stats, or a progress bar. */
  aside?: ReactNode;
  children: ReactNode;
};

type ModalProps = CommonProps & {
  variant: "modal";
  titleId: string;
  onClose: () => void;
};

type PageProps = CommonProps & {
  variant: "page";
  /** Which side the photo sits on at wide widths. Defaults to "left". */
  imageSide?: "left" | "right";
};

export function GlassFormShell(props: ModalProps | PageProps) {
  if (props.variant === "modal") return <ModalShell {...props} />;
  return <PageShell {...props} />;
}

function Split({
  image,
  imageAlt = "",
  eyebrow,
  title,
  intro,
  meta,
  aside,
  children,
  headingId,
}: CommonProps & { headingId?: string }) {
  return (
    <>
      <div className="relative h-40 w-full shrink-0 overflow-hidden md:h-auto md:w-2/5">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        {/* Only the bottom is darkened, and only enough to seat the aside
            text; the rest of the photo stays readable. */}
        <div
          className={
            "absolute inset-0 " +
            (aside
              ? "bg-gradient-to-t from-navy/85 via-navy/10 to-transparent"
              : "bg-gradient-to-t from-navy/25 to-transparent")
          }
        />
        {aside && (
          <div className="absolute inset-x-0 bottom-0 hidden flex-col gap-3 p-6 text-white md:flex">{aside}</div>
        )}
      </div>

      {/* min-h-0 lets overflow-y-auto actually scroll inside the flex column
          instead of the form spilling out and being clipped. data-stage-scroll
          tells the page's wheel/touch stepper to leave this region alone so a
          scroll gesture here doesn't jump to the next stage. */}
      <div
        data-stage-scroll=""
        className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-6 md:p-9"
      >
        <div className="flex flex-col gap-1.5">
          {eyebrow && (
            <span className="font-heading text-[11px] font-bold uppercase tracking-wide text-orange">{eyebrow}</span>
          )}
          <h2 id={headingId} className="font-heading text-2xl font-bold leading-tight text-navy sm:text-3xl">
            {title}
          </h2>
          {intro && <p className="font-body text-sm leading-6 text-black/65">{intro}</p>}
          {meta && <p className="font-body text-sm text-black/55">{meta}</p>}
        </div>

        {children}
      </div>
    </>
  );
}

function ModalShell({ titleId, onClose, ...rest }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  // Portalled to <body> so it escapes the fixed, z-indexed stage wrapper it
  // is rendered inside: that wrapper is its own stacking context, which
  // would otherwise trap this z-[100] layer below the header, the stepper
  // numbers and the floating action button.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/45 p-4 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/85 shadow-2xl backdrop-blur-2xl md:flex-row">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white transition-colors hover:bg-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Icon name="close" size={20} weight={500} />
        </button>
        <Split {...rest} headingId={titleId} />
      </div>
    </div>,
    document.body,
  );
}

function PageShell({ imageSide = "left", ...rest }: PageProps) {
  return (
    <div className="relative flex h-full w-full items-stretch justify-center py-2 md:items-center">
      {/* h-full (not max-h-full) so the card has a definite height the inner
          form column can scroll against. max-h caps it on tall screens; on
          short laptops it just fills the space and never overflows the
          stepper above it. */}
      <div
        className={
          "flex h-full min-h-0 w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/85 shadow-2xl backdrop-blur-2xl md:max-h-[560px] " +
          (imageSide === "right" ? "md:flex-row-reverse" : "md:flex-row")
        }
      >
        <Split {...rest} />
      </div>
    </div>
  );
}
