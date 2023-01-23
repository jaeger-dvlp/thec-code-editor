import React from "react";
import { useIntl } from "react-intl";
import { Tooltip } from "react-tooltip";
import Editor from "@monaco-editor/react";
import { useMain } from "@contexts/MainContext";
import { AiOutlineLoading } from "react-icons/ai";
import { BsChevronBarDown } from "react-icons/bs";
import { usePopup } from "@contexts/PopupContext";
import { useTheme } from "@contexts/ThemeContext";
import MockData from "@assets/mock-data/index.json";
import ReactResizeDetector from "react-resize-detector";
import { EditorLoaderProps, TabsProps } from "@/common/types/types";

import DarkEditorTheme from "monaco-themes/themes/Night Owl.json";
import LightEditorTheme from "monaco-themes/themes/GitHub Light.json";

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

function Tabs({ tabs, setTabs }: TabsProps) {
  const { formatMessage: t } = useIntl();
  const { ActivateAlertPopup } = usePopup();
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

  const handleRun = () => {
    ActivateAlertPopup({
      content: t({ id: "popups.running-code" }),
      isLoading: true,
    });

    setTimeout(() => {
      ActivateAlertPopup({
        content: "Code run event",
        isLoading: false,
      });

      setActiveTab(0);
    }, 2000);
  };

  return (
    <div className="w-full text-zinc-800 bg-gray-200 dark:bg-slate-800 dark:text-zinc-300 dark:border-slate-900 border-t border-gray-300 left-0 absolute z-[2] bottom-0 flex flex-wrap justify-start items-center">
      <div className="w-full relative flex border-b dark:border-slate-900 border-gray-300 p-0 m-0 flex-row gap-0">
        {tabs.map(({ id, name }) => (
          <button
            onClick={() => activeTheTab(id)}
            type="button"
            className={`${
              id === activeTab && "dark:!bg-slate-700 !bg-gray-300"
            } py-2 px-4 border-r dark:border-slate-900 border-gray-300 hover:bg-gray-300 dark:hover:bg-slate-700 transition-all duration-200`}
            key={`tab-btn-${id}`}
          >
            {name}
          </button>
        ))}
        <button
          className="bg-transparent w-14 flex justify-center items-center text-zinc-800 dark:text-zinc-200 transition-all duration-200 absolute top-0 left-1/2 -translate-x-1/2 z-10 p-1 rounded-b-xl"
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
          id="run-code"
          type="button"
          onClick={handleRun}
          className="absolute font-mono text-white hover:bg-blue-700 active:bg-blue-900 bg-blue-600 ring-transparent  transition-all duration-200 top-0 right-0 py-2 px-4 h-full"
        >
          <Tooltip
            anchorId="run-code"
            content={t({ id: "tooltips.run-code" })}
            place="top"
          />
          {t({ id: "tabs.run" })}
        </button>
      </div>

      <div
        className={`${
          activeTab !== null ? "max-h-[300px] p-4" : "max-h-[0px] p-0"
        } transition-all  duration-300 font-mono overflow-auto h-[300px] whitespace-pre-wrap`}
      >
        {tabs.find(({ id }) => id === activeTab)?.content}
      </div>
    </div>
  );
}

function CodeEditor() {
  const { theme } = useTheme();
  const { currentChallenge, setCurrentChallenge } = useMain();
  const EditorRef = React.useRef<HTMLDivElement>(null);
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

  const defEditorThemes = async (editor: any, monaco: any) => {
    await monaco.editor.defineTheme("light", LightEditorTheme);
    await monaco.editor.defineTheme("dark", DarkEditorTheme);
    await monaco.editor.setTheme(theme);

    setTheMonaco(monaco);
    setTimeout(() => {
      setTheEditor(editor);
    }, 1000);
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
          }}
          onMount={async (editor, monaco) => {
            await defEditorThemes(editor, monaco);
          }}
        />
        <Tabs tabs={tabs} setTabs={setTabs} />
      </div>
    </ReactResizeDetector>
  );
}

export default CodeEditor;
