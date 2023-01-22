import React from "react";
import EditorView from "@components/editor";

function Editor() {
  return (
    <div className="w-full font-pop min-h-screen relative dark:bg-[#101926] bg-white p-0 m-0 flex flex-wrap">
      <EditorView />
    </div>
  );
}

export default Editor;
