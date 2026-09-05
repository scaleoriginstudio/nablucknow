"use client";

import { useEffect, useRef, useState } from "react";
import { FIELD_CLASS } from "./constants";
import { Icon } from "./Icon";

/** A dropdown styled to match the site rather than a native `<select>` —
    on Android, a native select's option list is rendered entirely by the
    OS and cannot be styled at all, which read as a jarring, generic system
    sheet dropped onto an otherwise on-brand form. This renders its own
    listbox instead, so the whole picking experience stays on-brand.

    Validation can't lean on the browser's built-in "required" handling
    (that needs a real, focusable form control, and a hidden mirror input
    both fails to focus on validation and fails to submit silently in some
    browsers) — so an empty value is instead surfaced as a normal inline
    error, exactly like a failed field would read anywhere else on the site. */
export function Select({
  label,
  placeholder = "Please choose",
  options,
  value,
  onChange,
  name,
  error,
}: {
  label: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  /** Shown below the field, in the same red the rest of the site would use
      for a failed required field. Cleared by the parent once the user picks
      something. */
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative flex flex-col gap-1">
      <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-black/55">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={
          FIELD_CLASS +
          " flex items-center justify-between gap-2 text-left " +
          (error ? "border-red-500" : "")
        }
      >
        <span className={value ? "truncate text-black" : "truncate text-black/40"}>{value || placeholder}</span>
        <Icon
          name={open ? "expand_less" : "expand_more"}
          size={18}
          className="shrink-0 text-black/45"
        />
      </button>
      {/* Kept in the DOM so the value still posts with the form's own
          FormData collection, same as every other field here. */}
      <input type="hidden" name={name} value={value} />
      {error && <span className="font-body text-xs text-red-600">{error}</span>}

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          data-stage-scroll=""
          className="absolute left-0 top-full z-30 mt-1 max-h-60 w-full overflow-y-auto overscroll-contain rounded-xl border border-black/10 bg-white py-1 shadow-lg"
        >
          {options.map((option) => (
            <li key={option} role="option" aria-selected={option === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={
                  "block w-full px-4 py-2.5 text-left font-body text-sm transition-colors hover:bg-navy/5 " +
                  (option === value ? "font-semibold text-navy" : "text-black/80")
                }
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
