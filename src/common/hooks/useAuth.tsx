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
    const authWithLocalUser = async (sessionId) => {
      const { isValid, isStarted } = await apiService.authSession(sessionId);

      if (isValid) {
        return {
          isValid,
          isStarted,
        };
      }

      removeUser();

      return {
        isValid: false,
        isStarted: false,
      };
    };
    const authWithQueryID = async () => {
      const { isValid, sessionId, isStarted, error } =
        await apiService.authSession(id);

      if (error || !isValid) {
        return {
          isValid: false,
          isStarted: false,
          error,
        };
      }

      addUser({
        sessionId,
      });

      return {
        isValid,
        isStarted,
      };
    };

    const localUser = getItem("user");

    if (localUser && localUser.length > 0) {
      const { sessionId } = JSON.parse(localUser);

      if (!id) {
        return authWithLocalUser(sessionId);
      }

      if (sessionId === id) {
        return authWithLocalUser(sessionId);
      }
    }

    return authWithQueryID();
  };

  const unAuthUser = () => {
    removeUser();
  };

  return { user, authUser, unAuthUser };
}
