import React from "react";
import useUser from "@/common/hooks/useUser";
import useLocalStore from "@/common/hooks/useLocalStore";
import apiService from "../services/api.service";

export default function useAuth() {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStore();

  React.useEffect(() => {
    const userFromLocalStorage = getItem("user");

    if (userFromLocalStorage) {
      addUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const authUser = async (id: string | null) => {
    const localUser = getItem("user");

    if (localUser) {
      const { sessionId } = JSON.parse(localUser);
      const { isValid } = await apiService.authSession(sessionId);

      if (isValid) {
        return true;
      }

      removeUser();
    }

    const { isValid, sessionId, userId, challengeId } =
      await apiService.authSession(id);

    if (!isValid) {
      return false;
    }

    addUser({
      userId,
      sessionId,
      challengeId,
    });

    return true;
  };

  const unAuthUser = () => {
    removeUser();
  };

  return { user, authUser, unAuthUser };
}
