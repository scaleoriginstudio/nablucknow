"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { submitLead, type LeadPayload } from "../../lib/forms";
import { FIELD_CLASS } from "./constants";
import { Icon } from "./Icon";
import { Select } from "./Select";
import { useLanguage } from "./LanguageContext";

const DEFAULT_SUBMIT_LABEL = { en: "Submit", hi: "सबमिट करें" };
const SENDING_LABEL = { en: "Sending...", hi: "भेजा जा रहा है..." };
const DEFAULT_SUCCESS_TITLE = { en: "Thank you", hi: "धन्यवाद" };
const DEFAULT_SUCCESS_BODY = {
  en: "We have your details and will be in touch shortly.",
  hi: "हमें आपकी जानकारी मिल गई है, हम जल्द ही आपसे संपर्क करेंगे।",
};
const SELECT_REQUIRED_ERROR = { en: "Please make a selection.", hi: "कृपया एक विकल्प चुनें।" };
const NAME_LABEL = { en: "Name", hi: "नाम" };
const NAME_PLACEHOLDER = { en: "Full name", hi: "पूरा नाम" };
const NUMBER_LABEL = { en: "Number", hi: "नंबर" };
const EMAIL_LABEL = { en: "Email", hi: "ईमेल" };
const EMAIL_PLACEHOLDER = { en: "you@email.com", hi: "you@email.com" };
const ORGANISATION_LABEL = { en: "Organisation", hi: "संस्था" };
const ORGANISATION_PLACEHOLDER = {
  en: 'Company, school, or "Individual"',
  hi: 'कंपनी, स्कूल, या "व्यक्तिगत"',
};

export type LeadSelect = {
  /** Key the value is stored under in the sheet. */
  name: string;
  label: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const fieldClass = FIELD_CLASS;

const labelClass = "font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-black/55";

/** The one form used everywhere the site collects a lead: name, number,
    email and organisation, plus an optional context selector (which
    programme / which event / which area) and an optional `extra` slot for
    anything form-specific (the donation amount picker). No payment is
    taken here; where a fee applies it is shown as `feeNote` text only. */
export function LeadForm({
  formType,
  select,
  extra,
  extraPayload,
  feeNote,
  submitLabel,
  disabled = false,
  successTitle,
  successBody,
  onSubmitted,
}: {
  formType: string;
  select?: LeadSelect;
  extra?: ReactNode;
  extraPayload?: LeadPayload;
  feeNote?: string;
  submitLabel?: string;
  disabled?: boolean;
  successTitle?: string;
  successBody?: string;
  onSubmitted?: (payload: LeadPayload) => void;
}) {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectError, setSelectError] = useState<string | undefined>(undefined);
  const { t } = useLanguage();
  const resolvedSubmitLabel = submitLabel ?? t(DEFAULT_SUBMIT_LABEL);
  const resolvedSuccessTitle = successTitle ?? t(DEFAULT_SUCCESS_TITLE);
  const resolvedSuccessBody = successBody ?? t(DEFAULT_SUCCESS_BODY);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled || busy) return;
    // The dropdown is a custom listbox, not a real <select>, so it can't
    // lean on the browser's own required-field validation — check it here
    // instead, the same way a failed field reads anywhere else on the site.
    if (select && !select.value) {
      setSelectError(t(SELECT_REQUIRED_ERROR));
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload: LeadPayload = {
      name: String(data.get("name") ?? ""),
      number: String(data.get("number") ?? ""),
      email: String(data.get("email") ?? ""),
      organisation: String(data.get("organisation") ?? ""),
      ...(select ? { [select.name]: select.value } : {}),
      ...extraPayload,
    };

    setBusy(true);
    await submitLead(formType, payload);
    setBusy(false);
    onSubmitted?.(payload);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-navy/15 bg-navy/5 p-4">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-white">
          <Icon name="check" size={16} weight={500} />
        </span>
        <div>
          <p className="font-heading text-sm font-bold text-navy">{resolvedSuccessTitle}</p>
          <p className="mt-1 font-body text-sm leading-6 text-black/70">{resolvedSuccessBody}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {select && (
        <Select
          label={select.label}
          placeholder={select.placeholder}
          options={select.options}
          value={select.value}
          name={select.name}
          error={selectError}
          onChange={(v) => {
            setSelectError(undefined);
            select.onChange(v);
          }}
        />
      )}

      {extra}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={labelClass}>{t(NAME_LABEL)}</span>
          <input required name="name" type="text" autoComplete="name" placeholder={t(NAME_PLACEHOLDER)} className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={labelClass}>{t(NUMBER_LABEL)}</span>
          <input
            required
            name="number"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className={labelClass}>{t(EMAIL_LABEL)}</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t(EMAIL_PLACEHOLDER)}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className={labelClass}>{t(ORGANISATION_LABEL)}</span>
          <input
            required
            name="organisation"
            type="text"
            autoComplete="organization"
            placeholder={t(ORGANISATION_PLACEHOLDER)}
            className={fieldClass}
          />
        </label>
      </div>

      {feeNote && (
        <p className="border-t border-black/10 pt-3 font-body text-xs leading-5 text-black/55">{feeNote}</p>
      )}

      <button
        type="submit"
        disabled={disabled || busy}
        className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-orange px-7 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? t(SENDING_LABEL) : resolvedSubmitLabel}
      </button>
    </form>
  );
}
