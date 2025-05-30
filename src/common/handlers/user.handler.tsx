import { useIntl } from "react-intl";
import useAuth from "@/common/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import useQuery from "@/common/hooks/useQuery";
import { usePopup } from "@/contexts/PopupContext";
import useLocalStore from "@/common/hooks/useLocalStore";

import MockData from "@/common/utils/mock-data.json";
import previewMode from "@/common/utils/previewMode";

function userHandler() {
  const Navigate = useNavigate();
  const { authUser } = useAuth();
  const { getItem } = useLocalStore();
  const { formatMessage: t } = useIntl();
  const { ActivateAlertPopup } = usePopup();
  const SessionID =
    previewMode === "preview"
      ? MockData.sessionId
      : useQuery().get("session_id");

  const handle = async () => {
    if (!SessionID && !getItem("user")) {
      ActivateAlertPopup({
        content: t({ id: "errors.invalid-session-id" }),
        onClick: () => {
          Navigate("/");
        },
      });

      return {
        isValid: false,
        isStarted: false,
      };
    }

    const { isValid, isStarted } = await authUser(SessionID);

    if (!isValid) {
      ActivateAlertPopup({
        content: t({ id: "errors.invalid-session-id" }),
        onClick: () => {
          Navigate("/");
        },
      });

      return {
        isValid: false,
        isStarted: false,
      };
    }

    return {
      isValid,
      isStarted,
    };
  };

  return {
    handle,
  };
}

export default userHandler;
