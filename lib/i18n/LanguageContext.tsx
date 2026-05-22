"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { t, Lang } from "./translations";

type Tr = typeof t.en;

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  tr: Tr;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  tr: t.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "es" : "en"));
  const tr = t[lang] as Tr;
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
