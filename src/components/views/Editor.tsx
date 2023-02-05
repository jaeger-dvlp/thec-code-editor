import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import EditorView from "@components/editor";
import useAuth from "@/common/hooks/useAuth";
import { usePopup } from "@/contexts/PopupContext";

function Editor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { formatMessage: t } = useIntl();
  const { ActivateAlertPopup } = usePopup();

  React.useEffect(() => {
    const Window = typeof window !== "undefined" ? (window as any) : null;

    function HandleUser() {
      if (!user) {
        return navigate("/");
      }

      if (Window && Window.innerWidth <= Window.innerHeight) {
        setTimeout(() => {
          ActivateAlertPopup({
            content: t({ id: "errors.rotate-device" }),
          });
        }, 2000);
      }
      return null;
    }

    HandleUser();
  }, [user]);

  return (
    <div className="w-full font-pop min-h-screen relative dark:bg-[#101926] bg-white p-0 m-0 flex flex-wrap">
      <EditorView />
    </div>
  );
}

export default Editor;
