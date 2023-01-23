import React from "react";
import { AuthContextState, User } from "@/common/types/types";

export const AuthContext = React.createContext({} as AuthContextState);

export default function AuthWrapper({ children }: any) {
  const [user, setUser] = React.useState<User | null>(null);

  const Values = React.useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={Values}>{children}</AuthContext.Provider>;
}
