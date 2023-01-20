import React from "react";
import { Resizable } from "re-resizable";
import ReactHTMLParser from "react-html-parser";

interface Props {
  question: string;
}

function Question({ question }: Props) {
  const TheQuestion = ReactHTMLParser(question);

  return (
    <Resizable
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
      }}
      minHeight="100%"
      maxWidth="50vw"
      maxHeight="70vh"
      defaultSize={{ width: "30%", height: "100%" }}
      className="relative h-full"
    >
      <div className="h-full overflow-auto prose prose-invert w-full rounded-xl !text-zinc-500 bg-zinc-900 p-5">
        {TheQuestion}
      </div>
    </Resizable>
  );
}

export default Question;
