import React from "react";
import { useIntl } from "react-intl";
import { Tooltip } from "react-tooltip";
import { BsChevronBarDown } from "react-icons/bs";
import { usePopup } from "@/contexts/PopupContext";
import apiService from "@/common/services/api.service";
import { useMain } from "@/contexts/MainContext";
import useLocalStore from "@/common/hooks/useLocalStore";
import useWait from "@/common/hooks/useWait";

const getTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

function Tabs() {
  const { wait } = useWait();
  const { formatMessage: t } = useIntl();
  const { currentChallenge } = useMain();
  const { ActivateAlertPopup, DeactivateAlertPopup } = usePopup();
  const { getCurrentSession } = useLocalStore();
  const [outputTab, setOutputTab] = React.useState({
    id: 0,
    name: "tabs.output",
    isActive: false,
    content: `> [${getTime()}]: Have a good luck! -TheC\n\n`,
  });

  const handleRun = async () => {
    ActivateAlertPopup({
      content: t({ id: "popups.running-code" }),
      isLoading: true,
    });

    await wait(500);

    const { data } = await apiService.runCode({
      sessionId: getCurrentSession() || "",
      code: currentChallenge?.code || "",
    });

    DeactivateAlertPopup();
    setOutputTab({
      id: 0,
      name: "tabs.output",
      isActive: true,
      content: `${outputTab.content}> [${getTime()}]: ${data || ""}`,
    });
  };

  React.useEffect(() => {
    const outputTabElement = document.querySelector("#output-tab");

    if (outputTabElement)
      outputTabElement.scrollTop = outputTabElement.scrollHeight;
  }, [outputTab]);

  return (
    <div className="w-full font-mono text-zinc-800 bg-gray-200 dark:bg-slate-800 dark:text-zinc-300 dark:border-slate-900 border-t border-gray-300 left-0 absolute z-[2] bottom-0 flex flex-wrap justify-start items-center">
      <div className="w-full relative flex border-b dark:border-slate-900 border-gray-300 p-0 m-0 flex-row gap-0">
        <button
          onClick={() =>
            setOutputTab({ ...outputTab, isActive: !outputTab.isActive })
          }
          type="button"
          className={`${
            outputTab.isActive && "dark:!bg-slate-700 !bg-gray-300"
          } py-3 text-sm px-6 border-r dark:border-slate-900 border-gray-300 hover:bg-gray-300 dark:hover:bg-slate-700 transition-all duration-200`}
        >
          {t({ id: outputTab.name })}
        </button>

        <button
          className="bg-transparent w-14 flex justify-center items-center text-zinc-800 dark:text-zinc-200 transition-all duration-200 absolute top-0 left-1/2 -translate-x-1/2 z-10 p-1 rounded-b-xl"
          onClick={() => {
            setOutputTab({ ...outputTab, isActive: !outputTab.isActive });
          }}
          type="button"
        >
          <BsChevronBarDown
            className={`${
              !outputTab.isActive ? "rotate-180" : " rotate-0"
            } transition-all duration-200`}
          />
        </button>

        <button
          id="run-code"
          type="button"
          onClick={handleRun}
          className="absolute text-white hover:bg-blue-700 active:bg-blue-900 bg-blue-600 ring-transparent  transition-all duration-200 top-0 right-0 py-3 text-sm px-6 h-full"
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
        id="output-tab"
        className={`${
          outputTab.isActive ? "max-h-[300px] p-4" : "max-h-[0px] p-0"
        } transition-all  dark:text-zinc-400 text-zinc-700 duration-300 font-mono overflow-auto h-[300px] w-full whitespace-pre-wrap`}
      >
        {outputTab.content}
      </div>
    </div>
  );
}
export default Tabs;
