"use client";

import { useState } from "react";
import Image from "next/image";
import { FOOTER_CONTACT, TAX_EXEMPTION_NOTE, UPI } from "./constants";
import { Icon } from "./Icon";
import { useLanguage } from "./LanguageContext";

// NAB's WhatsApp is the mobile line, the same one the floating WhatsApp
// button opens.
const WHATSAPP_NUMBER = FOOTER_CONTACT.phones[1];

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
  receipt: {
    en: `Need an 80G receipt for tax exemption? Send a screenshot of your payment to our WhatsApp, ${WHATSAPP_NUMBER}.`,
    hi: `कर छूट के लिए 80G रसीद चाहिए? अपने भुगतान का स्क्रीनशॉट हमारे WhatsApp ${WHATSAPP_NUMBER} पर भेजें।`,
  },
};

function CopyUpiId() {
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
      className="inline-flex items-center gap-1 rounded-full border border-navy/30 px-2.5 py-1 font-heading text-[11px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
    >
      <Icon name={copied ? "check" : "content_copy"} size={14} weight={500} />
      <span aria-live="polite">{copied ? t(COPY.copied) : t(COPY.copy)}</span>
    </button>
  );
}

/** The bank-issued UPI QR plus the UPI ID (copyable), a "save QR" link for
    visitors paying from the phone they are browsing on, and how to get an
    80G receipt. `compact` lays it out tighter for the homepage CTA panel. */
export function UpiPayCard({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-3 sm:p-4">
      <div
        className={
          "flex gap-4 " + (compact ? "flex-row items-center" : "flex-col items-center sm:flex-row sm:items-center")
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
        <div
          className={
            "flex min-w-0 flex-col gap-1.5 " + (compact ? "" : "items-center text-center sm:items-start sm:text-left")
          }
        >
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
      <p className="border-t border-black/10 pt-3 font-body text-xs leading-5 text-black/70">{t(COPY.receipt)}</p>
    </div>
  );
}

/** The whole donation flow for the /donate page and the donate overlay:
    the QR card, then the 12A/80G registration note. */
export function UpiDonationFlow() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-3">
      <UpiPayCard />
      <p className="font-body text-xs leading-5 text-black/55">{t(TAX_EXEMPTION_NOTE)}</p>
    </div>
  );
}
