"use client";

import { useState } from "react";
import Image from "next/image";
import { FIELD_CLASS, TAX_EXEMPTION_NOTE, UPI } from "./constants";
import { Icon } from "./Icon";
import { LeadForm, type LeadSelect } from "./LeadForm";
import { useLanguage } from "./LanguageContext";

const COPY = {
  scanTitle: { en: "Scan & pay with any UPI app", hi: "किसी भी UPI ऐप से स्कैन करके भुगतान करें" },
  scanBody: {
    en: "Payments go directly to our SBI account. Enter any amount in your app.",
    hi: "भुगतान सीधे हमारे SBI खाते में जाता है। अपने ऐप में कोई भी राशि डालें।",
  },
  qrAlt: {
    en: "UPI QR code for National Association for the Blind, UPI ID 9839682888@sbi",
    hi: "National Association for the Blind का UPI QR कोड, UPI ID 9839682888@sbi",
  },
  upiId: { en: "UPI ID", hi: "UPI ID" },
  copy: { en: "Copy", hi: "कॉपी करें" },
  copied: { en: "Copied", hi: "कॉपी हो गया" },
  saveQr: { en: "Save QR", hi: "QR सेव करें" },
  step1: { en: "Step 1 · Pay", hi: "चरण 1 · भुगतान" },
  step2: { en: "Step 2 · Get your 80G receipt", hi: "चरण 2 · अपनी 80G रसीद पाएं" },
  step2Body: {
    en: "Once you have paid, share your details so we can match your gift and email your receipt.",
    hi: "भुगतान के बाद अपनी जानकारी साझा करें, ताकि हम आपका दान मिलान कर सकें और आपको रसीद ईमेल कर सकें।",
  },
  amountLabel: { en: "Amount donated (₹)", hi: "दान की गई राशि (₹)" },
  amountPlaceholder: { en: "e.g. 2500", hi: "जैसे 2500" },
  utrLabel: { en: "UPI ref. no. (optional)", hi: "UPI रेफ़रेंस (वैकल्पिक)" },
  utrPlaceholder: { en: "12-digit UTR from your app", hi: "आपके ऐप में दिखा 12 अंकों का UTR" },
  submit: { en: "Request my receipt", hi: "मेरी रसीद भेजें" },
  successTitle: { en: "Thank you for your gift", hi: "आपके दान के लिए धन्यवाद" },
  successBody: {
    en: "We will match your payment and email your 80G receipt within a few working days.",
    hi: "हम आपका भुगतान मिलान करके कुछ कार्यदिवसों में आपकी 80G रसीद ईमेल कर देंगे।",
  },
};

const QUICK_AMOUNTS = [500, 1000, 2500, 5000];
const labelClass = "font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-black/55";

function CopyUpiId({ onDark = false }: { onDark?: boolean }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(UPI.id);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard blocked (insecure context, old browser): the ID is
          // printed right beside the button, so it can still be read off.
        }
      }}
      className={
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-heading text-[11px] font-semibold transition-colors " +
        (onDark
          ? "border-white/40 text-white hover:bg-white hover:text-navy"
          : "border-navy/30 text-navy hover:bg-navy hover:text-white")
      }
    >
      <Icon name={copied ? "check" : "content_copy"} size={14} weight={500} />
      <span aria-live="polite">{copied ? t(COPY.copied) : t(COPY.copy)}</span>
    </button>
  );
}

/** The bank-issued UPI QR plus the UPI ID (copyable) and a "save QR" link,
    for visitors paying from the same phone they are browsing on, who
    cannot scan their own screen. `compact` lays it out side by side for the
    tight homepage CTA panel. */
export function UpiPayCard({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  return (
    <div
      className={
        "flex gap-4 rounded-2xl border border-black/10 bg-white p-3 sm:p-4 " +
        (compact ? "flex-row items-center" : "flex-col items-center sm:flex-row sm:items-center")
      }
    >
      <div
        className={
          "relative shrink-0 overflow-hidden rounded-xl ring-1 ring-black/10 " +
          (compact ? "h-28 w-28 sm:h-32 sm:w-32" : "h-44 w-44 sm:h-40 sm:w-40")
        }
      >
        <Image src={UPI.qr} alt={t(COPY.qrAlt)} fill sizes="176px" className="object-contain" />
      </div>
      <div className={"flex min-w-0 flex-col gap-1.5 " + (compact ? "" : "items-center text-center sm:items-start sm:text-left")}>
        <p className="font-heading text-sm font-bold leading-tight text-navy sm:text-base">{t(COPY.scanTitle)}</p>
        {!compact && <p className="font-body text-xs leading-5 text-black/60">{t(COPY.scanBody)}</p>}
        <p className="font-body text-xs text-black/55">
          {t(COPY.upiId)}: <span className="select-all font-semibold text-black">{UPI.id}</span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <CopyUpiId />
          <a
            href={UPI.qr}
            download="NAB-Lucknow-UPI-QR.png"
            className="inline-flex items-center gap-1 rounded-full border border-navy/30 px-2.5 py-1 font-heading text-[11px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            <Icon name="download" size={14} weight={500} />
            {t(COPY.saveQr)}
          </a>
        </div>
        <p className="font-body text-[10px] leading-4 text-black/45">{UPI.apps}</p>
      </div>
    </div>
  );
}

/** Step 1 (scan the QR) and step 2 (send details for the 80G receipt), the
    whole donation flow for the /donate page and the donate overlay. */
export function UpiDonationFlow({ causeSelect, causeSlug }: { causeSelect?: LeadSelect; causeSlug?: string }) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className={labelClass + " text-orange"}>{t(COPY.step1)}</span>
        <UpiPayCard />
      </div>

      <div className="flex flex-col gap-3 border-t border-black/10 pt-4">
        <div className="flex flex-col gap-1">
          <span className={labelClass + " text-orange"}>{t(COPY.step2)}</span>
          <p className="font-body text-xs leading-5 text-black/60">{t(COPY.step2Body)}</p>
        </div>
        <LeadForm
          formType="Donate"
          select={causeSelect}
          extra={
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="donation-amount" className={labelClass}>
                  {t(COPY.amountLabel)}
                </label>
                <input
                  id="donation-amount"
                  required
                  name="amount"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t(COPY.amountPlaceholder)}
                  className={FIELD_CLASS}
                />
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_AMOUNTS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(String(value))}
                      aria-pressed={amount === String(value)}
                      className={
                        "rounded-full border px-2.5 py-0.5 font-heading text-[11px] font-semibold transition-colors " +
                        (amount === String(value)
                          ? "border-navy bg-navy text-white"
                          : "border-black/15 text-black/60 hover:border-navy hover:text-navy")
                      }
                    >
                      ₹{value.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className={labelClass}>{t(COPY.utrLabel)}</span>
                <input
                  name="utr"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder={t(COPY.utrPlaceholder)}
                  className={FIELD_CLASS}
                />
              </label>
            </div>
          }
          extraPayload={causeSlug ? { cause: causeSlug } : undefined}
          feeNote={t(TAX_EXEMPTION_NOTE)}
          submitLabel={t(COPY.submit)}
          successTitle={t(COPY.successTitle)}
          successBody={t(COPY.successBody)}
        />
      </div>
    </div>
  );
}
