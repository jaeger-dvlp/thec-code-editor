import { useIntl } from "react-intl";

import MockData from "@/common/utils/mock-data.json";
import previewMode from "@/common/utils/previewMode";

import apiService from "../services/api.service";
import handleError from "../utils/handleError";

export default function useSession() {
  const { formatMessage: t } = useIntl();

  const getRemoteChallenge = async () => {
    try {
      if (previewMode === "preview") {
        return { challenge: MockData.challenge };
      }
      const { sessionId } = JSON.parse(localStorage.getItem("user") as string);

      if (!sessionId) {
        throw new Error("Session id not found!");
      }

      const {
        isValid,
        challenge: { challenges: challenge },
      } = await apiService.getChallenge(sessionId);

      if (!isValid) {
        throw new Error("Session id not valid!");
      }

      return { challenge };
    } catch (error) {
      return { error: handleError(error, t) };
    }
  };

  const getLocalChallenge = async () => {
    try {
      const localItem = JSON.parse(localStorage.getItem("user") as string);

      if (!localItem) {
        throw new Error("User not found!");
      }

      const { challenge } = localItem;

      if (!challenge) {
        throw new Error("Challenge not found!");
      }

      return { challenge };
    } catch (error) {
      return { error: handleError(error, t) };
    }
  };

  const setChallenge = async (challenge: any) => {
    try {
      const localItem = JSON.parse(localStorage.getItem("user") as string);

      if (!localItem) {
        throw new Error("User not found!");
      }

      const newItem = {
        ...localItem,
        challenge,
      };

      localItem.setItem("user", JSON.stringify(newItem));

      return { challenge };
    } catch (error) {
      return { error: handleError(error, t) };
    }
  };

  const getAndSetChallenge = async () => {
    try {
      const { challenge, error } = await getRemoteChallenge();

      if (error) {
        throw new Error(error);
      }

      if (!challenge) {
        throw new Error("Challenge not found!");
      }

      setChallenge(challenge);

      return { challenge };
    } catch (error) {
      return { error: handleError(error, t) };
    }
  };

  return {
    getRemoteChallenge,
    getLocalChallenge,
    setChallenge,
    getAndSetChallenge,
  };
}
