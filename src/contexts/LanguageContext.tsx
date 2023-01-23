import React from "react";
import flatten from "flat";
import { IntlProvider } from "react-intl";

import en from "@assets/translations/en.json";
import tr from "@assets/translations/tr.json";
import { TranslationFile, UseLanguageState } from "@/common/types/types";

const LanguageContext = React.createContext({ language: "en" });

const Messages = {
  en: en as TranslationFile,
  tr: tr as TranslationFile,
};

export default function LanguageWrapper({ children }: any) {
  const [language, setLanguage] = React.useState<string>("en");

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("the-c-language", lang);
  };

  React.useEffect(() => {
    const lang = localStorage.getItem("the-c-language") || "en";
    changeLanguage(lang);
  }, [language]);

  const value = React.useMemo(() => ({ language, changeLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      <IntlProvider
        messages={flatten(Messages[language as keyof object])}
        locale={language}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext) as UseLanguageState;

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageWrapper");
  }
  return context;
}
