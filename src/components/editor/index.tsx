import React from "react";
import CodeEditor from "./CodeEditor";
import NavigationBar from "./NavigationBar";
import Question from "./Question";

const defaultQuestionHTML =
  "<h2>Question</h2><p>Getir responsive product slider clone using React v18 & TailwindCSS.</p><ul><li>Element</li><li>Element</li><li>Element</li><li>Element</li><li>Element</li><li>Element</li></ul>";

function Editor() {
  return (
    <div className="w-full gap-5 p-5 flex flex-col relative">
      <NavigationBar />
      <div className="w-full flex flex-row gap-5 py-0 m-0 h-full overflow-hidden max-h-full">
        <Question question={defaultQuestionHTML} />
        <CodeEditor />
      </div>
    </div>
  );
}

export default Editor;
