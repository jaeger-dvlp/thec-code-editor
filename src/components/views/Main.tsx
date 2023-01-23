import React from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "@contexts/PopupContext";

function Main() {
  const { ActivateAlertPopup } = usePopup();
  const Navigate = useNavigate();

  React.useEffect(() => {
    ActivateAlertPopup({
      content: "Authenticating...",
      isLoading: true,
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
