import React from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "@/common/hooks/useAuth";
import { usePopup } from "@contexts/PopupContext";
import useBrowser from "@/common/hooks/useBrowser";
import useLocalStore from "@/common/hooks/useLocalStore";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Main() {
  const Navigate = useNavigate();
  const { authUser } = useAuth();
  const { isMobile } = useBrowser();
  const { getItem } = useLocalStore();
  const { formatMessage: t } = useIntl();
  const SessionID = useQuery().get("session_id");
  const {
    ActivateAlertPopup,
    DeactivateAlertPopup,
    ActivateConfirmPopup,
    DeactivateConfirmPopup,
  } = usePopup();

  function MobileHandler() {
    if (isMobile === null) return null;

    if (isMobile) {
      ActivateAlertPopup({
        content: t({ id: "errors.mobile-device" }),
        onClick: () => {
          window.location.href = "/";
        },
      });

      return null;
    }

    return true;
  }

  const userHandler = async () => {
    if (!SessionID && !getItem("user")) {
      return ActivateAlertPopup({
        content: t({ id: "errors.invalid-session-id" }),
        onClick: () => {
          Navigate("/");
        },
      });
    }

    const isSessionValid = await authUser(SessionID);

    if (!isSessionValid) {
      return ActivateAlertPopup({
        content: t({ id: "errors.invalid-session-id" }),
        onClick: () => {
          Navigate("/");
        },
      });
    }

    return true;
  };

  const redirectUser = () => {
    setTimeout(() => {
      DeactivateAlertPopup();
      ActivateConfirmPopup({
        content: t({ id: "popups.authenticated" }),
        onConfirm: () => {
          DeactivateConfirmPopup();
          ActivateAlertPopup({
            content: t({ id: "popups.redirecting" }),
            isLoading: true,
          });

          setTimeout(() => {
            DeactivateAlertPopup();
            Navigate("/editor");
          }, 1500);
        },
        onCancel: () => {
          window.location.href = "https://thecsociety.co/challenges";
        },
      });
    }, 1000);
  };

  React.useEffect(() => {
    const handleRun = async () => {
      ActivateAlertPopup({
        content: t({ id: "popups.authenticating" }),
        isLoading: true,
      });

      const isUserValid = await userHandler();
      const isMobileValid = MobileHandler();

      if (!isUserValid) return null;
      if (!isMobileValid) return null;

      return redirectUser();
    };

    handleRun();
  }, [isMobile, SessionID]);

  return (
    <div className="w-full font-pop min-h-screen relative dark:bg-[#101926] bg-white p-0 m-0 flex flex-wrap" />
  );
}

export default Main;
