"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "hi";

/** Every piece of copy on the site is stored as one of these instead of a
    plain string. `en` is English with Hindi words/phrases woven in
    naturally; `hi` is a full Hindi (Devanagari) reading of the same copy. */
export type Bilingual = { en: string; hi: string };

const STORAGE_KEY = "nab-lang";

type LanguageContextValue = {
  lang: Lang;
  toggle: () => void;
  setLang: (lang: Lang) => void;
  t: (value: Bilingual) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Wraps the whole app so the English/Hindi choice is shared and persisted
    across every page, regardless of which page's component tree renders
    the toggle. Starts as "en" on the server and on first client render
    (avoids a hydration mismatch), then syncs from localStorage right
    after mount. */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  // Guards the write-back effect below from firing with the default "en"
  // before the read effect has had a chance to restore a stored "hi" —
  // without this, mount would briefly write "en" and stomp the saved choice.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // Reading localStorage can only happen post-mount (it doesn't exist
      // during SSR), so restoring a stored "hi" necessarily means setting
      // state from inside this effect rather than from a render-time
      // initializer — the standard, hydration-safe shape for this exact
      // "starts as the SSR default, then syncs from client-only storage"
      // case, even though the lint rule below is tuned for the more common
      // (and genuinely wrong) case of mirroring already-known render state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "en" || stored === "hi") setLangState(stored);
    } catch {
      // localStorage unavailable (private mode, disabled storage) — fall back to "en".
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore write failures — the toggle still works for the rest of the session.
    }
  }, [lang, hydrated]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      toggle: () => setLangState((current) => (current === "en" ? "hi" : "en")),
      setLang: setLangState,
      t: (bilingual) => bilingual[lang],
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
