import React from "react";
import Editor from "@monaco-editor/react";
import { useMain } from "@contexts/MainContext";
import { useTheme } from "@contexts/ThemeContext";
import MockData from "@assets/mock-data/index.json";
import Tabs from "@components/editor/CodeEditor/Tabs";
import ReactResizeDetector from "react-resize-detector";
import EditorLoader from "@components/editor/CodeEditor/Loader";

import DarkEditorTheme from "monaco-themes/themes/Night Owl.json";
import LightEditorTheme from "monaco-themes/themes/GitHub Light.json";

function CodeEditor() {
  const { theme } = useTheme();
  const EditorRef = React.useRef<HTMLDivElement>(null);
  const { currentChallenge, setCurrentChallenge } = useMain();
  const [theEditor, setTheEditor] = React.useState<any>(null);
  const [theMonaco, setTheMonaco] = React.useState<any>(null);
  const [editorSize, setEditorSize] = React.useState({
    width: 0,
    height: 0,
  });
  const [tabs, setTabs] = React.useState([
    {
      id: 0,
      name: "STDIN",
      isActive: false,
      content: MockData.consoleIn,
    },
    {
      id: 1,
      name: "STDOUT",
      isActive: false,
      content: MockData.consoleOut,
    },
    {
      id: 2,
      name: "STDERR",
      isActive: false,
      content: MockData.consoleError,
    },
  ]);

  const handleResize = (width, height) => {
    setEditorSize({
      width,
      height: height - 20,
    });
  };

  React.useEffect(() => {
    // @ts-ignore
    if (theEditor?.layout) {
      // @ts-ignore
      theEditor.layout(editorSize);
    }
  }, [theEditor, editorSize]);

  React.useEffect(() => {
    const handleTheme = () => {
      if (!theMonaco) return null;

      if (theme === "light") {
        return theMonaco.editor.setTheme("light");
      }
      return theMonaco.editor.setTheme("dark");
    };

    handleTheme();
  }, [theme]);

  const DefineEditorThemes = async (editor: any, monaco: any) => {
    await monaco.editor.defineTheme("light", LightEditorTheme);
    await monaco.editor.defineTheme("dark", DarkEditorTheme);
    await monaco.editor.setTheme(theme);

    setTheMonaco(monaco);
    setTimeout(() => {
      setTheEditor(editor);
    }, 2500);
  };

  return (
    <ReactResizeDetector
      handleWidth
      handleHeight
      onResize={(width?: number | 0, height?: number | 0) =>
        handleResize(width, height)
      }
      targetRef={EditorRef}
    >
      <div
        ref={EditorRef}
        className="w-full pb-10 z-[1] overflow-hidden flex flex-col justify-start items-start max-h-full relative h-full rounded-md p-5 dark:bg-[#08111F] bg-zinc-200"
      >
        <EditorLoader editor={theEditor} />
        <Editor
          theme={theme}
          className="w-full h-full !relative rounded-lg overflow-hidden"
          language={currentChallenge.stack.toLowerCase()}
          value={currentChallenge.starterCode}
          width={editorSize.width}
          onChange={(value) =>
            setCurrentChallenge({
              ...currentChallenge,
              code: value,
            })
          }
          height={editorSize.height}
          options={{
            minimap: {
              enabled: false,
            },
            padding: {
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            },
            fontSize: 14,
          }}
          onMount={DefineEditorThemes}
        />
        <Tabs tabs={tabs} setTabs={setTabs} />
      </div>
    </ReactResizeDetector>
  );
}

export default CodeEditor;
