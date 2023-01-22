import React from "react";
import {
  getUserPreferedTheme,
  getUserStorageTheme,
} from "@/common/utils/theme";
import { UseThemeState } from "@/common/types";
import LanguageWrapper from "./LanguageContext";

const ThemeContext = React.createContext({});

function ThemeWrapper({ children }: any) {
  const StorageTheme = getUserStorageTheme();
  const UserPreferedTheme = getUserPreferedTheme();
  const [theme, setTheme] = React.useState<string>(
    StorageTheme || UserPreferedTheme
  );

  const changeTheme = (reqTheme: string) => {
    const Document = document.documentElement;

    Document.classList.remove("dark", "light");
    Document.classList.add(reqTheme);

    setTheme(reqTheme);
    localStorage.setItem("thec-editor-theme", reqTheme);

    return true;
  };

  React.useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const Values = React.useMemo(() => ({ theme, changeTheme }), [theme]);

  return (
    <ThemeContext.Provider value={Values}>
      <LanguageWrapper>{children}</LanguageWrapper>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext) as UseThemeState;

  if (!context) {
    throw new Error("useTheme must be used within a MainProvider");
  }

  return context;
}

export default ThemeWrapper;

export { useTheme };
