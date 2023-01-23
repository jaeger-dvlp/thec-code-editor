import React from "react";
import PopupWrapper from "@contexts/PopupContext";
import ThemeWrapper from "@contexts/ThemeContext";
import MockData from "@assets/mock-data/index.json";
import { UseMainState } from "@/common/types/types";
import LanguageWrapper from "@contexts/LanguageContext";
import { UseTimer } from "@/components/editor/NavigationBar/Timer";

const MainContext = React.createContext({});

export default function MainWrapper({ children }: any) {
  const { timestamp } = UseTimer();

  const [currentChallenge, setCurrentChallenge] = React.useState({
    id: "236571",
    title: "Greed is Good",
    difficulty: "medium",
    stack: "JavaScript",
    points: 50,
    question: MockData.question,
    starterCode: MockData.code,
    timeSpent: timestamp,
    code: null,
  });

  const Values = React.useMemo(
    () => ({
      currentChallenge,
      setCurrentChallenge,
    }),
    [currentChallenge]
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
