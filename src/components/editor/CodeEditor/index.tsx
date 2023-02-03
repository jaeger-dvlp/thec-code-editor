import React from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useMain } from "@contexts/MainContext";
import { useTheme } from "@contexts/ThemeContext";
import Tabs from "@components/editor/CodeEditor/Tabs";
import ReactResizeDetector from "react-resize-detector";
import EditorLoader from "@components/editor/CodeEditor/Loader";
import DarkEditorTheme from "monaco-themes/themes/Night Owl.json";
import LightEditorTheme from "monaco-themes/themes/GitHub Light.json";

function CodeEditor() {
  const { theme } = useTheme();
  const EditorRef = React.useRef<HTMLDivElement>(null);
  const { currentChallenge, setCurrentChallenge } = useMain();

  if (!currentChallenge || currentChallenge?.id === "id")
    return <EditorLoader editor={null} />;

  const [theEditor, setTheEditor] = React.useState<any | null>(null);
  const [theMonaco, setTheMonaco] = React.useState<Monaco | null>(null);
  const [editorSize, setEditorSize] = React.useState({
    width: 0,
    height: 0,
  });

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
          language={currentChallenge?.stack}
          value={currentChallenge?.code || ""}
          width={editorSize.width}
          onChange={(value) =>
            setCurrentChallenge({
              ...currentChallenge,
              code: value || "",
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
        <Tabs />
      </div>
    </ReactResizeDetector>
  );
}

export default CodeEditor;
