import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import useAuth from "@/common/hooks/useAuth";
import { usePopup } from "@contexts/PopupContext";
import useBrowser from "@/common/hooks/useBrowser";

function Main() {
  const Navigate = useNavigate();
  const { authUser } = useAuth();
  const { isMobile } = useBrowser();
  const { formatMessage: t } = useIntl();
  const { ActivateAlertPopup, DeactivateAlertPopup } = usePopup();

  React.useEffect(() => {
    const handleRun = () => {
      ActivateAlertPopup({
        content: t({ id: "popups.authenticating" }),
        isLoading: true,
      });

      if (isMobile === null) return null;

      if (isMobile) {
        return ActivateAlertPopup({
          content: t({ id: "errors.mobile-device" }),
          onClick: () => {
            window.location.href = "/";
          },
        });
      }

      authUser({
        user_id: "1",
        full_name: "Test TEST",
        username: "testTest",
        authToken: Math.floor(Math.random() * 99999).toString(),
      });

      return setTimeout(() => {
        DeactivateAlertPopup();
        return Navigate("/editor");
      }, 1500);
    };

    handleRun();
  }, [isMobile]);

  return (
    <div className="w-full font-pop min-h-screen relative dark:bg-[#101926] bg-white p-0 m-0 flex flex-wrap" />
  );
}

export default Main;
