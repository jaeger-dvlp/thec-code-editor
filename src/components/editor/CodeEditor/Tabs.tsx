import React from "react";
import { useIntl } from "react-intl";
import { Tooltip } from "react-tooltip";
import { TabsProps } from "@/common/types/types";
import { BsChevronBarDown } from "react-icons/bs";
import { usePopup } from "@/contexts/PopupContext";

function Tabs({ tabs }: TabsProps) {
  const { formatMessage: t } = useIntl();
  const { ActivateAlertPopup } = usePopup();
  const [lastTabId, setLastTabId] = React.useState<number | null>(0);
  const [activeTab, setActiveTab] = React.useState<number | null>(null);

  const activateTab = (id: number | null) => {
    if (activeTab === id) {
      setLastTabId(id);
      setActiveTab(null);
      return;
    }

    setLastTabId(id);
    setActiveTab(id);
  };

  React.useEffect(() => {
    const handleTabChange = () => {
      const tabToActivate = tabs.find((tab) => tab.isActive);
      if (tabToActivate) {
        return activateTab(tabToActivate.id);
      }

      return setActiveTab(null);
    };

    handleTabChange();
  }, [tabs]);

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

      activateTab(0);
    }, 2000);
  };

  return (
    <div className="w-full text-zinc-800 bg-gray-200 dark:bg-slate-800 dark:text-zinc-300 dark:border-slate-900 border-t border-gray-300 left-0 absolute z-[2] bottom-0 flex flex-wrap justify-start items-center">
      <div className="w-full relative flex border-b dark:border-slate-900 border-gray-300 p-0 m-0 flex-row gap-0">
        {tabs.map(({ id, name }) => (
          <button
            onClick={() => activateTab(id)}
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
            if (activeTab === null) return activateTab(lastTabId);

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
export default Tabs;
