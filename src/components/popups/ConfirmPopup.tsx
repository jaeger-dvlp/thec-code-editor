import React from "react";
import { useIntl } from "react-intl";
import { usePopup } from "@contexts/PopupContext";
import { BsExclamationCircle } from "react-icons/bs";

function ConfirmPopup() {
  const {
    confirmPopup: { inHTML, isActive, content, onConfirm, onCancel },
  } = usePopup();

  const { formatMessage: t } = useIntl();

  return (
    (inHTML && (
      <div
        className={`${
          isActive ? "visible opacity-100" : "invisible opacity-0"
        } fixed z-[98] font-pop w-full h-full transition-all bg-black/70 duration-200 left-0 top-0 flex justify-center items-center p-5`}
      >
        <div
          className={`${
            isActive ? "translate-y-0" : "translate-y-20"
          } dark:bg-[#08111F] shadow-xl bg-zinc-200 transition-all duration-200 rounded-lg p-5 w-full max-w-md 
          grid grid-cols-1 place-content-center place-items-center text-center gap-10`}
        >
          <div className="flex justify-center items-center">
            <BsExclamationCircle className="w-12 h-12 p-2 bg-sky-600/10 rounded-full text-sky-600" />
          </div>
          <p className="text-zinc-800 whitespace-pre-wrap dark:text-zinc-200">
            {content}
          </p>
          <div className="w-full flex flex-wrap justify-center items-center gap-4">
            <button
              className="rounded-xl disabled:bg-zinc-600 bg-[#0D6EFF] active:ring-blue-300 ring-transparent !ring-2  transition-all duration-150 hover:bg-blue-700 font-medium text-md text-white px-6 py-2"
              type="button"
              onClick={onConfirm}
            >
              {t({ id: "buttons.yes" })}
            </button>
            <button
              className="rounded-xl dark:bg-zinc-700 bg-zinc-400 dark:hover:bg-zinc-600 hover:bg-zinc-500 active:ring-blue-300 ring-transparent !ring-2  transition-all duration-150 font-medium text-md text-white px-6 py-2"
              type="button"
              onClick={onCancel}
            >
              {t({ id: "buttons.cancel" })}
            </button>
          </div>
        </div>
      </div>
    )) ||
    null
  );
}

export default ConfirmPopup;
