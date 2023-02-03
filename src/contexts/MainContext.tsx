import React from "react";
import PopupWrapper from "@contexts/PopupContext";
import ThemeWrapper from "@contexts/ThemeContext";
import { UseMainState } from "@/common/types/types";
import LanguageWrapper from "@contexts/LanguageContext";
import challengeHandler from "@/common/handlers/challenge.handler";

const MainContext = React.createContext({});

export default function MainWrapper({ children }: any) {
  const { handle: handleChallenge } = challengeHandler();
  const [currentChallenge, setCurrentChallenge] = React.useState(
    null as UseMainState["currentChallenge"]
  );

  const updateChallenge = (challenge: any) => {
    const { data } = handleChallenge(currentChallenge, challenge);

    setCurrentChallenge(data);
  };

  const Values = React.useMemo(
    () => ({
      currentChallenge,
      updateChallenge,
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
