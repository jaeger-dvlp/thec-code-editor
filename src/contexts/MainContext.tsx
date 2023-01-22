import React from "react";
import LanguageWrapper from "./LanguageContext";
import PopupWrapper from "./PopupContext";
import ThemeWrapper from "./ThemeContext";

const MainContext = React.createContext({});

export default function MainWrapper({ children }: any) {
  const Values = React.useMemo(() => ({}), []);

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
  const context = React.useContext(MainContext);

  if (!context) {
    throw new Error("useMainContext must be used within a MainWrapper");
  }

  return context;
}

export { useMain };
