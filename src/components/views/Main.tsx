import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import useWait from "@/common/hooks/useWait";
import useQuery from "@/common/hooks/useQuery";
import { useMain } from "@/contexts/MainContext";
import { usePopup } from "@contexts/PopupContext";
import useBrowser from "@/common/hooks/useBrowser";
import useSession from "@/common/hooks/useSession";
import userHandler from "@/common/handlers/user.handler";

function Main() {
  const { wait } = useWait();
  const Navigate = useNavigate();
  const { isMobile } = useBrowser();
  const { updateChallenge } = useMain();
  const { formatMessage: t } = useIntl();
  const { getAndSetChallenge } = useSession();
  const { handle: handleUser } = userHandler();
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

  const RedirectionFlow = async (isStarted: boolean) => {
    await wait(750);

    if (isStarted) {
      const { error, challenge } = await getAndSetChallenge();
      await wait(1000);

      if (error) {
        return ActivateAlertPopup({
          content: t({ id: "errors.fetching-challenge" }),
          onClick: () => {
            window.location.href = "https://thecsociety.co/challenges";
          },
        });
      }

      updateChallenge(challenge);
      ActivateAlertPopup({
        content: t({ id: "popups.redirecting" }),
        isLoading: true,
      });

      await wait(1000);

      DeactivateAlertPopup();
      return Navigate("/editor");
    }

    DeactivateAlertPopup();

    return ActivateConfirmPopup({
      content: t({ id: "popups.authenticated" }),
      onConfirm: async () => {
        DeactivateConfirmPopup();
        ActivateAlertPopup({
          content: t({ id: "popups.fetching-challenge" }),
          isLoading: true,
        });

        const { error, challenge } = await getAndSetChallenge();
        await wait(1000);

        if (error) {
          return ActivateAlertPopup({
            content: t({ id: "errors.fetching-challenge" }),
            onClick: () => {
              window.location.href = "https://thecsociety.co/challenges";
            },
          });
        }
        updateChallenge(challenge);
        ActivateAlertPopup({
          content: t({ id: "popups.redirecting" }),
          isLoading: true,
        });

        await wait(1000);

        DeactivateAlertPopup();
        return Navigate("/editor");
      },
      onCancel: () => {
        window.location.href = "https://thecsociety.co/challenges";
      },
    });
  };

  React.useEffect(() => {
    const initializeApp = async () => {
      ActivateAlertPopup({
        content: t({ id: "popups.authenticating" }),
        isLoading: true,
      });

      const { isValid, isStarted } = await handleUser();
      const isMobileValid = MobileHandler();

      if (!isValid) return null;
      if (!isMobileValid) return null;

      return RedirectionFlow(isStarted);
    };

    initializeApp();
  }, [isMobile, SessionID]);

  return (
    <div className="w-full font-pop min-h-screen relative dark:bg-[#101926] bg-white p-0 m-0 flex flex-wrap" />
  );
}

export default Main;
