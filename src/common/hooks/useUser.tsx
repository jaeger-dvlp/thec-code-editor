import React from "react";
import { User } from "@/common/types/types";
import { AuthContext } from "@/contexts/AuthContext";
import useLocalStore from "@/common/hooks/useLocalStore";

export default function useUser() {
  const { setItem } = useLocalStore();
  const { user, setUser } = React.useContext(AuthContext);

  const addUser = (userToAdd: User) => {
    setUser(userToAdd);
    setItem("user", JSON.stringify(userToAdd));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
}
