import React from "react";
import mockData from "@assets/mock-data/index.json";
import Question from "@/components/editor/Question";
import CodeEditor from "@/components/editor/CodeEditor";
import NavigationBar from "@/components/editor/NavigationBar";

function Editor() {
  return (
    <div className="w-full gap-5 p-5 flex flex-col relative">
      <NavigationBar />
      <div className="w-full flex flex-row gap-5 py-0 m-0 h-full overflow-hidden max-h-full">
        <Question question={mockData.question} />
        <CodeEditor />
      </div>
    </div>
  );
}

export default Editor;
