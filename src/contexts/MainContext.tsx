import React from "react";
import PopupWrapper from "@/contexts/PopupContext";
import ThemeWrapper from "@/contexts/ThemeContext";
import MockData from "@assets/mock-data/index.json";
import LanguageWrapper, { useLanguage } from "@/contexts/LanguageContext";
import { UseMainState } from "@/common/types";

const MainContext = React.createContext({});

const diffuculties = {
  easy: {
    tr: "Kolay",
    en: "Easy",
  },
  medium: {
    tr: "Orta",
    en: "Medium",
  },
  hard: {
    tr: "Zor",
    en: "Hard",
  },
};

export default function MainWrapper({ children }: any) {
  const { language } = useLanguage();

  const [currentChallenge] = React.useState({
    id: "236571",
    title: "Greed is Good",
    difficulty: diffuculties.easy[language],
    stack: "JavaScript",
    points: 50,
    question: MockData.question,
    starterCode: MockData.code,
  });

  const Values = React.useMemo(
    () => ({
      currentChallenge,
    }),
    [currentChallenge, language]
  );

  return (
    <MainContext.Provider value={Values}>
      <LanguageWrapper>
        <ThemeWrapper>
          <PopupWrapper>{children}</PopupWrapper>
        </ThemeWrapper>
      </LanguageWrapper>
    </MainContext.Provider>
  );
}

function useMain() {
  const context = React.useContext(MainContext) as UseMainState;

  if (!context) {
    throw new Error("useMainContext must be used within a MainWrapper");
  }

  return context;
}

export { useMain };
