import React from "react";
import { User } from "@/common/types/types";
import useUser from "@/common/hooks/useUser";
import useLocalStore from "@/common/hooks/useLocalStore";

export default function useAuth() {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStore();

  React.useEffect(() => {
    const userFromLocalStorage = getItem("user");

    if (userFromLocalStorage) {
      addUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const authUser = (userToAuth: User) => {
    addUser(userToAuth);
  };

  const unAuthUser = () => {
    removeUser();
  };

  return { user, authUser, unAuthUser };
}
