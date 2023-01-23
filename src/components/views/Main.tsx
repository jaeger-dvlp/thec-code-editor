import React from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "@contexts/PopupContext";

import useAuth from "@/common/hooks/useAuth";

function Main() {
  const { authUser } = useAuth();
  const Navigate = useNavigate();
  const { ActivateAlertPopup } = usePopup();

  React.useEffect(() => {
    ActivateAlertPopup({
      content: "Authenticating...",
      isLoading: true,
    });

    authUser({
      user_id: "1",
      full_name: "Test TEST",
      username: "testTest",
      authToken: Math.floor(Math.random() * 99999).toString(),
    });

    setTimeout(() => {
      ActivateAlertPopup({
        content: "Authenticated!",
      });

      Navigate("/editor");
    }, 1500);
  }, []);

  return (
    <div className="w-full font-pop min-h-screen relative dark:bg-[#101926] bg-white p-0 m-0 flex flex-wrap" />
  );
}

export default Main;
