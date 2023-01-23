import React from "react";
import { useIntl } from "react-intl";
import { BiMoon, BiSun } from "react-icons/bi";

import Logo from "@images/logo.png";
import { useTheme } from "@/contexts/ThemeContext";
import { ControlButtonProps } from "@/common/types/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Timer from "@components/editor/NavigationBar/Timer";
import Stack from "@components/editor/NavigationBar/Stack";
import { usePopup } from "@/contexts/PopupContext";
import { useMain } from "@/contexts/MainContext";

function Details() {
  const { currentChallenge } = useMain();
  return (
    <div className="w-full gap-5 xl:h-full lg:h-full h-fit xl:max-w-[30%] lg:max-w-[30%] p-5 dark:bg-[#08111F] bg-zinc-200 rounded-lg overflow-hidden flex flex-row items-center">
      <img src={Logo} alt="TheCSociety" className="w-5 object-contain" />
      <Timer />
      <span className="py-2 px-5 flex-1 dark:bg-[#070f1c] bg-[#F3F4F6] rounded-md text-zinc-400 text-center text-sm font-normal">
        {currentChallenge.difficulty}
      </span>
      <Stack stack={currentChallenge.stack} />
    </div>
  );
}

function ControlButton({ children, onClick }: ControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 -mr-3 active:scale-90 rounded-lg hover:bg-gray-300 hover:dark:bg-gray-900 hover:text-[#0D6EFF] text-white transition-all duration-150 hover:scale-105 group"
    >
      <div className="dark:bg-gray-800 transition-all duration-150 bg-gray-400 p-2 text-current rounded-full relative">
        <div className="w-5 h-5 flex justify-center items-center text-center">
          {children}
        </div>
      </div>
    </button>
  );
}

function Actions() {
  const { currentChallenge } = useMain();
  const { formatMessage: t } = useIntl();
  const { theme, changeTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { ActivateAlertPopup, ActivateConfirmPopup, DeactivateConfirmPopup } =
    usePopup();

  const LeaveChallenge = () => {
    ActivateConfirmPopup({
      content: t({ id: "popups.leave" }),
      onConfirm: () => {
        DeactivateConfirmPopup();
        ActivateAlertPopup({
          content: "Leave Event",
        });
      },
    });
  };

  const SubmitChallenge = () => {
    ActivateConfirmPopup({
      content: t({ id: "popups.submit" }),
      onConfirm: () => {
        DeactivateConfirmPopup();

        ActivateAlertPopup({
          content: t({ id: "popups.submitting" }),
          isLoading: true,
        });

        setTimeout(() => {
          ActivateAlertPopup({
            content: "Submit Event",
          });
        }, 2000);
      },
    });
  };

  return (
    <div className="w-full xl:max-w-[70%] lg:max-w-[70%] dark:bg-[#08111F] bg-zinc-200 rounded-lg p-5 flex justify-center items-center gap-5 xl:flex-nowrap lg:flex-nowrap flex-wrap">
      <h1 className="text-sm w-full font-medium text-zinc-600 dark:text-zinc-200 text-ellipsis">
        {currentChallenge.title}
      </h1>
      <div className="flex justify-center items-center gap-5">
        <button
          type="button"
          onClick={LeaveChallenge}
          className="rounded-xl bg-zinc-400 dark:bg-zinc-700 active:ring-zinc-300 ring-transparent !ring-2  transition-all duration-150 dark:hover:bg-zinc-600 hover:bg-zinc-500 font-medium text-md text-zinc-700 dark:text-zinc-300 px-6 py-2 "
        >
          {t({ id: "buttons.leave" })}
        </button>
        <button
          type="button"
          onClick={SubmitChallenge}
          className="rounded-xl bg-[#0D6EFF] active:ring-blue-300 ring-transparent !ring-2  transition-all duration-150 hover:bg-blue-700 font-medium text-md text-white px-6 py-2 "
        >
          {t({ id: "buttons.submit" })}
        </button>

        <ControlButton
          onClick={() => {
            changeTheme(theme === "light" ? "dark" : "light");
          }}
        >
          {theme === "light" ? (
            <BiMoon className="w-5 h-5" />
          ) : (
            <BiSun className="w-5 h-5" />
          )}
        </ControlButton>
        <ControlButton
          onClick={() => {
            setLanguage(language === "tr" ? "en" : "tr");
          }}
        >
          <span>{language === "tr" ? "EN" : "TR"}</span>
        </ControlButton>
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="w-full max-h-fit flex xl:flex-nowrap lg:flex-nowrap flex-wrap justify-center gap-5 items-center">
      <Details />
      <Actions />
    </div>
  );
}

export default NavigationBar;
