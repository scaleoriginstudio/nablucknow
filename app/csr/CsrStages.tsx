"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { StageIntro } from "../components/shared/StageIntro";
import { Icon } from "../components/shared/Icon";
import { LeadForm } from "../components/shared/LeadForm";
import { FOOTER_CONTACT } from "../components/shared/constants";
import { useLanguage } from "../components/shared/LanguageContext";
import {
  ALSO_SUPPORTED,
  CSR_CREDENTIALS,
  CSR_INTEREST_OPTIONS,
  CSR_STEPS,
  FOCUS_AREAS,
  PARTNER_WAYS,
} from "./csr-data";

const COPY = {
  whyTitle: { en: "CSR that builds independent lives", hi: "ऐसा CSR जो आत्मनिर्भर ज़िंदगियाँ बनाए" },
  whySubtitle: {
    en: "Partner with National Association for the Blind, State Chapter, Lucknow.",
    hi: "National Association for the Blind, State Chapter, Lucknow के साथ साझेदारी करें।",
  },
  whyLead: {
    en: "Losing your sight should not mean losing your schooling, your work or your place alongside everyone else. For more than 35 years we have built the bridge from a braille classroom to a first pay cheque, with corporate partners beside us along the way. Your CSR spend goes into programmes with a long track record, a clear budget and reporting your board can rely on.",
    hi: "दृष्टि खोने का मतलब पढ़ाई, काम या बाकी सबके साथ अपनी जगह खोना नहीं होना चाहिए। 35 से अधिक वर्षों से हम ब्रेल कक्षा से पहली तनख्वाह तक का पुल बना रहे हैं, और इस सफ़र में कॉर्पोरेट साझेदार हमारे साथ रहे हैं। आपका CSR खर्च ऐसे प्रोग्रामों में जाता है जिनका लंबा अनुभव, स्पष्ट बजट और भरोसेमंद रिपोर्टिंग है।",
  },
  whyPhotoAlt: {
    en: "Visually impaired students with braille slates around a classroom table",
    hi: "कक्षा की मेज़ के चारों ओर ब्रेल स्लेट के साथ दृष्टिबाधित विद्यार्थी",
  },
  whereTitle: { en: "Where your CSR goes", hi: "आपका CSR कहाँ जाता है" },
  whereSubtitle: {
    en: "Two primary focus areas, from a child's first braille lesson to a first job.",
    hi: "दो मुख्य क्षेत्र — बच्चे के पहले ब्रेल पाठ से पहली नौकरी तक।",
  },
  primary: { en: "Primary focus", hi: "मुख्य क्षेत्र" },
  covers: { en: "Your funding covers", hi: "आपकी फंडिंग से" },
  record: { en: "Track record", hi: "अनुभव" },
  alsoSupported: { en: "Also supported", hi: "इनका भी सहयोग" },
  howTitle: { en: "How a partnership works", hi: "साझेदारी कैसे काम करती है" },
  howSubtitle: {
    en: "Structured, transparent and built around your CSR reporting.",
    hi: "व्यवस्थित, पारदर्शी और आपकी CSR रिपोर्टिंग के अनुरूप।",
  },
  waysTitle: { en: "Ways to partner", hi: "साझेदारी के तरीके" },
  seeProgrammes: { en: "See programmes", hi: "प्रोग्राम देखें" },
  startTitle: { en: "Start a CSR partnership", hi: "CSR साझेदारी शुरू करें" },
  startSubtitle: {
    en: "Tell us a little about your organisation. Our partnerships team will get back to you within a few working days.",
    hi: "अपनी संस्था के बारे में थोड़ा बताएं। हमारी पार्टनरशिप टीम कुछ कार्यदिवसों में आपसे संपर्क करेगी।",
  },
  dueDiligence: {
    en: "Registration certificates and audited accounts are shared on request during due diligence.",
    hi: "ड्यू डिलिजेंस के दौरान अनुरोध पर पंजीकरण प्रमाणपत्र और ऑडिट किए गए खाते साझा किए जाते हैं।",
  },
  orReach: { en: "Or reach us directly", hi: "या सीधे संपर्क करें" },
  interest: { en: "Area of interest", hi: "रुचि का क्षेत्र" },
  chooseInterest: { en: "Choose an area", hi: "एक क्षेत्र चुनें" },
  submit: { en: "Request a conversation", hi: "बातचीत का अनुरोध करें" },
  success: {
    en: "Thank you. Our partnerships team will be in touch to discuss how we can work together.",
    hi: "धन्यवाद। हमारी पार्टनरशिप टीम आगे साथ काम करने की चर्चा के लिए जल्द संपर्क करेगी।",
  },
  formPhotoAlt: {
    en: "A guest hands a white cane to a visually impaired student at a NAB Lucknow event",
    hi: "NAB Lucknow के एक कार्यक्रम में एक अतिथि दृष्टिबाधित विद्यार्थी को व्हाइट केन देते हुए",
  },
};

const eyebrow = "font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-orange";

/** The stage body under its heading: fills the remaining height and
    scrolls on its own when the content outgrows a short screen, without
    hijacking the page's stage-to-stage scroll (data-stage-scroll). pb-16
    on phones clears the floating action button. */
function StageBody({ children }: { children: ReactNode }) {
  return (
    <div
      data-stage-scroll=""
      className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain pb-16 pr-1 [-webkit-overflow-scrolling:touch] sm:pb-4"
    >
      {children}
    </div>
  );
}

export function CsrWhyStage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-3 sm:gap-6">
      <StageIntro title={t(COPY.whyTitle)} subtitle={t(COPY.whySubtitle)} />
      <StageBody>
        <div className="grid gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] md:items-center md:gap-10">
          <div className="flex flex-col gap-5">
            <p className="font-body text-sm leading-6 text-black/75 sm:text-base sm:leading-7">{t(COPY.whyLead)}</p>
            <ul className="grid grid-cols-2 gap-2 sm:gap-3">
              {CSR_CREDENTIALS.map((item) => (
                <li key={item.value.en} className="flex flex-col gap-1 rounded-2xl border border-black/10 p-3 sm:p-4">
                  <span className="flex items-center gap-2 text-navy">
                    <Icon name={item.icon} size={20} weight={400} />
                    <span className="font-heading text-sm font-bold sm:text-lg">{t(item.value)}</span>
                  </span>
                  <span className="font-body text-[11px] leading-4 text-black/60 sm:text-xs sm:leading-5">{t(item.label)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10 md:block">
            <Image
              src="/img/nab/braille-classroom.jpg"
              alt={t(COPY.whyPhotoAlt)}
              fill
              sizes="40vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </StageBody>
    </div>
  );
}

export function CsrWhereStage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-3 sm:gap-6">
      <StageIntro headingLevel="h2" title={t(COPY.whereTitle)} subtitle={t(COPY.whereSubtitle)} />
      <StageBody>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {FOCUS_AREAS.map((area) => (
            <article key={area.slug} className="flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white">
              <div className="relative h-28 shrink-0 sm:h-36">
                <Image src={area.image} alt={t(area.imageAlt)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-orange px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                  {t(COPY.primary)}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-4 sm:p-5">
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-navy sm:text-xl">
                  <Icon name={area.icon} size={22} weight={400} />
                  {t(area.title)}
                </h3>
                <p className="font-body text-sm leading-6 text-black/70">{t(area.body)}</p>
                <div>
                  <p className={eyebrow}>{t(COPY.covers)}</p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {area.covers.map((item) => (
                      <li key={item.en} className="flex items-start gap-2 font-body text-sm text-black/75">
                        <span className="mt-0.5 shrink-0 text-orange">
                          <Icon name="check" size={16} weight={600} />
                        </span>
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="rounded-xl bg-navy/5 p-3 font-body text-xs leading-5 text-navy">
                  <span className="font-bold">{t(COPY.record)}: </span>
                  {t(area.record)}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className={eyebrow}>{t(COPY.alsoSupported)}</span>
          {ALSO_SUPPORTED.map((item) => (
            <span
              key={item.en}
              className="rounded-full border border-navy/20 px-3 py-1 font-heading text-[11px] font-semibold text-navy sm:text-xs"
            >
              {t(item)}
            </span>
          ))}
        </div>
      </StageBody>
    </div>
  );
}

export function CsrHowStage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-3 sm:gap-6">
      <StageIntro headingLevel="h2" title={t(COPY.howTitle)} subtitle={t(COPY.howSubtitle)} />
      <StageBody>
        <ol className="grid gap-2 sm:grid-cols-5 sm:gap-3">
          {CSR_STEPS.map((step, i) => (
            <li key={step.title.en} className="flex gap-3 rounded-2xl border border-black/10 p-3 sm:flex-col sm:gap-2 sm:p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-white">
                {i + 1}
              </span>
              <span>
                <span className="block font-heading text-sm font-bold text-navy">{t(step.title)}</span>
                <span className="mt-0.5 block font-body text-xs leading-5 text-black/65">{t(step.body)}</span>
              </span>
            </li>
          ))}
        </ol>

        <h3 className="mt-5 text-center font-heading text-base font-bold text-navy sm:mt-8 sm:text-xl">{t(COPY.waysTitle)}</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {PARTNER_WAYS.map((way) => (
            <li key={way.title.en} className="flex flex-col gap-1.5 rounded-2xl bg-navy/5 p-3 sm:p-4">
              <span className="flex items-center gap-2 font-heading text-sm font-bold text-navy">
                <Icon name={way.icon} size={20} weight={400} />
                {t(way.title)}
              </span>
              <span className="font-body text-xs leading-5 text-black/65">{t(way.body)}</span>
              {way.href && (
                <Link
                  href={way.href}
                  className="mt-auto self-start font-heading text-xs font-semibold text-orange underline-offset-2 hover:underline"
                >
                  {t(COPY.seeProgrammes)} →
                </Link>
              )}
            </li>
          ))}
        </ul>
      </StageBody>
    </div>
  );
}

export function CsrStartStage() {
  const { t } = useLanguage();
  const [interest, setInterest] = useState("");
  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col gap-3 sm:gap-6">
      <StageIntro headingLevel="h2" title={t(COPY.startTitle)} subtitle={t(COPY.startSubtitle)} />
      <StageBody>
        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
          <div className="flex flex-col gap-4">
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-black/10 md:block">
              <Image src="/img/nab/white-cane-handover.jpg" alt={t(COPY.formPhotoAlt)} fill sizes="35vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-black/10 p-4 font-body text-sm text-black/70">
              <p className={eyebrow}>{t(COPY.orReach)}</p>
              <a href={`mailto:${FOOTER_CONTACT.email}`} className="flex items-center gap-2 hover:underline">
                <Icon name="mail" size={18} className="shrink-0 text-navy" />
                {FOOTER_CONTACT.email}
              </a>
              {FOOTER_CONTACT.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2 hover:underline">
                  <Icon name="call" size={18} className="shrink-0 text-navy" />
                  {phone}
                </a>
              ))}
              <p className="mt-1 text-xs leading-5 text-black/55">{t(COPY.dueDiligence)}</p>
            </div>
          </div>
          <LeadForm
            formType="CSR"
            select={{
              name: "interest",
              label: t(COPY.interest),
              placeholder: t(COPY.chooseInterest),
              options: CSR_INTEREST_OPTIONS.map((o) => t(o)),
              value: interest ? t(CSR_INTEREST_OPTIONS.find((o) => o.en === interest) ?? { en: interest, hi: interest }) : "",
              onChange: (label) => {
                const match = CSR_INTEREST_OPTIONS.find((o) => t(o) === label);
                setInterest(match ? match.en : label);
              },
            }}
            // Stable English key for the sheet, whichever language picked it.
            extraPayload={{ interest }}
            submitLabel={t(COPY.submit)}
            successBody={t(COPY.success)}
          />
        </div>
      </StageBody>
    </div>
  );
}
