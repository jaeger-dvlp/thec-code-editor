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
      maxWidth={isCollapsed ? "50px" : "50%"}
      maxHeight="70%"
      defaultSize={{ width: "30%", height: "100%" }}
      style={{
        overflow: "hidden",
      }}
      className="relative h-full transition-all overflow-hidden duration-200"
    >
      <button
        className="bg-zinc-800 h-14 text-zinc-200 hover:bg-zinc-600 transition-all duration-200 absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 rounded-l-xl"
        onClick={() => setIsCollapsed(!isCollapsed)}
        type="button"
      >
        <BsChevronBarLeft
          className={`${
            isCollapsed ? "rotate-180" : " rotate-0"
          } transition-all duration-200`}
        />
      </button>
      <div
        id="question-area"
        className="h-full transition-all min-w-full duration-200 overflow-auto prose prose-invert flex flex-wrap justify-start items-start rounded-md !text-zinc-500 bg-zinc-900 p-5"
      >
        <div
          className={`${
            isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
          } w-full transition-all duration-200`}
        >
          {TheQuestion}
        </div>
      </div>
    </Resizable>
  );
}

export default Question;
