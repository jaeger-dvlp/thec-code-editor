import React from "react";
import Editor from "@monaco-editor/react";
import { BsChevronBarDown } from "react-icons/bs";
import ReactResizeDetector from "react-resize-detector";
import { EditorLoaderProps, TabsProps } from "@/common/types";

const demoConsolContent = `
21:32:47 [vite] Internal server error: [postcss] Unexpected character '@' (1:1)
Plugin: vite:css
File: C:/Users/omerk/Desktop/Beyond/Development/The C Society/thecsociety-editor/src/global.css:undefined:undefined`;

function EditorLoader({ editor }: EditorLoaderProps) {
  const [isEditorLoaded, setIsEditorLoaded] = React.useState(false);
  React.useEffect(() => {
    if (editor) {
      setIsEditorLoaded(true);
    }
  }, [editor]);
  return (
    <div
      style={{
        transition: "background-color opacity visibility 0.5s ease-in-out",
      }}
      className={`${
        isEditorLoaded
          ? "opacity-0 invisible pointer-events-none"
          : "opacity-100 visible pointer-events-auto"
      } duration-500 w-full h-full absolute bg-zinc-900 z-[5] top-0 left-0 flex justify-center items-center`}
    >
      <div className="w-10 h-10 border-2 border-t-2 border-zinc-400 rounded-full animate-spin" />
    </div>
  );
}

function Tabs({ tabs, setTabs }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleTabChange = () => {
      const tabToActivate = tabs.find((tab) => tab.isActive);
      if (tabToActivate) {
        return setActiveTab(tabToActivate.id);
      }

      return setActiveTab(null);
    };

    handleTabChange();
  }, [tabs]);

  const activeTheTab = (id: number | null) => {
    setTabs(
      tabs.map((tab) => {
        if (tab.id === id) {
          if (tab.isActive) return { ...tab, isActive: false };

          return { ...tab, isActive: true };
        }
        return {
          ...tab,
          isActive: false,
        };
      })
    );
  };

  return (
    <div className="w-full text-zinc-400 bg-zinc-800 left-0 absolute z-[2] bottom-0 flex flex-wrap justify-start items-center">
      <div className="w-full relative flex border-b border-zinc-900 p-0 m-0 flex-row gap-0">
        {tabs.map(({ id, name }) => (
          <button
            onClick={() => activeTheTab(id)}
            type="button"
            className={`${
              id === activeTab && "!bg-zinc-700"
            } py-2 px-4 border-r border-r-zinc-900 hover:bg-zinc-700 transition-all duration-200`}
            key={`tab-btn-${id}`}
          >
            {name}
          </button>
        ))}
        <button
          className="bg-zinc-800 w-14 flex justify-center items-center text-zinc-200 hover:bg-zinc-600 transition-all duration-200 absolute top-0 left-1/2 -translate-x-1/2 z-10 p-1 rounded-b-xl"
          onClick={() => {
            if (activeTab === null) return activeTheTab(1);

            return setActiveTab(null);
          }}
          type="button"
        >
          <BsChevronBarDown
            className={`${
              activeTab === null ? "rotate-180" : " rotate-0"
            } transition-all duration-200`}
          />
        </button>

        <button
          type="button"
          className="absolute font-mono text-white hover:bg-sky-800 bg-sky-900 transition-all duration-200 top-0 right-0 py-2 px-4 h-full"
        >
          RUN
        </button>
      </div>

      <div
        className={`${
          activeTab !== null ? "max-h-[300px] p-4" : "max-h-[0px] p-0"
        } transition-all duration-300 font-mono overflow-auto h-[300px] whitespace-pre-wrap`}
      >
        {tabs.find(({ id }) => id === activeTab)?.content}
      </div>
    </div>
  );
}

function CodeEditor() {
  const EditorRef = React.useRef<HTMLDivElement>(null);
  const [theEditor, setTheEditor] = React.useState(null);
  const [editorSize, setEditorSize] = React.useState({
    width: 0,
    height: 0,
  });
  const [tabs, setTabs] = React.useState([
    {
      id: 0,
      name: "STDIN",
      isActive: false,
      content: demoConsolContent,
    },
    {
      id: 1,
      name: "STDOUT",
      isActive: false,
      content: demoConsolContent,
    },
    {
      id: 2,
      name: "STDERR",
      isActive: false,
      content: demoConsolContent,
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
        className="w-full pb-10 z-[1] overflow-hidden flex flex-col justify-start items-start max-h-full relative h-full rounded-md p-5 bg-zinc-900"
      >
        <EditorLoader editor={theEditor} />
        <Editor
          theme="vs-dark"
          className="w-full h-full !relative"
          defaultLanguage="javascript"
          value="// console.log('Hello World!');"
          width={editorSize.width}
          height={editorSize.height}
          onMount={(editor) => {
            setTimeout(() => {
              setTheEditor(editor);
            }, 1000);
          }}
        />
        <Tabs tabs={tabs} setTabs={setTabs} />
      </div>
    </ReactResizeDetector>
  );
}

export default CodeEditor;
