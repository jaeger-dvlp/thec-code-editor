import React from "react";
import flatten from "flat";
import { IntlProvider } from "react-intl";

// Translation files
import en from "@/assets/translations/en.json";
import tr from "@/assets/translations/tr.json";

const LanguageContext = React.createContext({ language: "en" });

interface TranslationFile {
  [key: string]: string | TranslationFile;
}

const messages = {
  en: en as TranslationFile,
  tr: tr as TranslationFile,
};

export default function LanguageWrapper({ children }: any) {
  const [language, setLanguage] = React.useState("en");
  const value = React.useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      <IntlProvider
        messages={flatten(messages[language as keyof object])}
        locale={language}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageWrapper");
  }
  return context;
}
