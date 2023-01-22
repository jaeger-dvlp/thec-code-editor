import React from "react";
import {
  getUserPreferedTheme,
  getUserStorageTheme,
} from "@/common/utils/theme";
import { UseMainState } from "@/common/types";

const MainContext = React.createContext({});

function MainProvider({ children }: any) {
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

  return <MainContext.Provider value={Values}>{children}</MainContext.Provider>;
}

function useMain() {
  const context = React.useContext(MainContext) as UseMainState;

  if (!context) {
    throw new Error("useMain must be used within a MainProvider");
  }

  return context;
}

export default MainProvider;

export { useMain };
