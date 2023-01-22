import React from "react";
import { Resizable } from "re-resizable";
import ReactHTMLParser from "react-html-parser";
import { BsChevronBarLeft } from "react-icons/bs";

import { QuestionProps } from "@/common/types";

function Question({ question }: QuestionProps) {
  const TheQuestion = ReactHTMLParser(question);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <Resizable
      enable={{
        top: false,
        right: !isCollapsed,
        bottom: false,
        left: false,
      }}
      bounds="parent"
      minHeight="100%"
      maxWidth={isCollapsed ? "30px" : "50%"}
      minWidth="30px"
      maxHeight="70%"
      defaultSize={{ width: "30%", height: "100%" }}
      style={{
        overflow: "hidden",
      }}
      className="relative h-full transition-[max-width] overflow-hidden duration-200"
    >
      <button
        className="bg-transparent h-14 text-zinc-800 dark:text-zinc-200  transition-all duration-200 absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 rounded-l-xl"
        onClick={() => setIsCollapsed(!isCollapsed)}
        type="button"
      >
        <BsChevronBarLeft
          className={`${
            isCollapsed ? "rotate-180" : "rotate-0"
          } transition-all duration-200`}
        />
      </button>
      <div
        id="question-area"
        className="h-full relative min-w-full overflow-hidden prose prose-zinc dark:prose-invert flex flex-wrap justify-start items-start rounded-md !text-zinc-500 dark:bg-[#08111F] bg-zinc-200 p-10"
      >
        <div
          className={`${
            isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
          } w-full transition-all max-h-[75vh] overflow-auto duration-200`}
        >
          {TheQuestion}
        </div>
      </div>
    </Resizable>
  );
}

export default Question;
