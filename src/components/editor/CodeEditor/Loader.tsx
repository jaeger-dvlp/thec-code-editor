import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { EditorLoaderProps } from "@/common/types/types";

function EditorLoader({ editor }: EditorLoaderProps) {
  const [isEditorLoaded, setIsEditorLoaded] = React.useState(false);
  React.useEffect(() => {
    if (editor) {
      setIsEditorLoaded(true);
    }
  }, [editor]);
  return (
    <div
      className={`${
        isEditorLoaded
          ? "opacity-0 invisible pointer-events-none"
          : "opacity-100 visible pointer-events-auto"
      } duration-500 transition-[opacity,visibility] w-full h-full absolute dark:bg-[#08111F] bg-zinc-200 z-[5] top-0 left-0 flex justify-center items-center`}
    >
      <AiOutlineLoading className="w-12 animate-spin h-12 p-2 bg-sky-600/10 rounded-full text-sky-600" />
    </div>
  );
}

export default EditorLoader;
