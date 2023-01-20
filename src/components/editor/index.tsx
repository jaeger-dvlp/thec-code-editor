import React from "react";
import NavigationBar from "./NavigationBar";
import Question from "./Question";

const defaultQuestionHTML =
  "<h2>Question</h2><p>Getir responsive product slider clone using React v18 & TailwindCSS.</p><ul><li>Element</li><li>Element</li><li>Element</li><li>Element</li><li>Element</li><li>Element</li></ul>";

function Editor() {
  return (
    <div className="w-full gap-5 p-5 flex flex-col max-h-screen overflow-hidden relative">
      <NavigationBar />
      <div className="w-full flex flex-row gap-5 py-0 m-0 h-full max-h-full">
        <Question question={defaultQuestionHTML} />
      </div>
    </div>
  );
}

export default Editor;
