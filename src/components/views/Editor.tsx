import React from "react";
import { useNavigate } from "react-router-dom";

import EditorView from "@components/editor";
import useAuth from "@/common/hooks/useAuth";

function Editor() {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    function HandleUser() {
      if (!user) {
        return navigate("/");
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
