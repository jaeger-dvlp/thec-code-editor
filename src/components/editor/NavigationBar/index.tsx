import React from "react";
import { useIntl } from "react-intl";

import Logo from "@images/logo.png";
import Timer from "./Timer";
import Stack from "./Stack";

function Details() {
  return (
    <div className="w-full gap-5 xl:max-w-[30%] lg:max-w-[30%] p-5 bg-zinc-900 rounded-md overflow-hidden flex flex-row items-center">
      <img src={Logo} alt="TheCSociety" className="w-5 object-contain" />
      <Timer />
      <span className="py-2 px-5 flex-1 bg-zinc-800 rounded-md text-zinc-400 text-center text-sm font-normal">
        Zor
      </span>
      <Stack />
    </div>
  );
}

function Actions() {
  const { formatMessage: t } = useIntl();
  return (
    <div className="w-full xl:max-w-[70%] lg:max-w-[70%] bg-zinc-900 rounded-md p-5 flex justify-center items-center gap-5 xl:flex-nowrap lg:flex-nowrap flex-wrap">
      <h1 className="text-sm w-full font-medium text-zinc-400">
        Getir responsive product slider clone using React v18 & TailwindCSS.
      </h1>
      <div className="flex justify-center items-center gap-5">
        <button
          type="button"
          className="py-2 transition-colors active:ring-2 !ring-red-400 duration-150 text-sm font-normal px-5 rounded-md bg-red-400/20 text-red-400 text-center hover:bg-red-400/40"
        >
          {t({ id: "buttons.leave" })}
        </button>
        <button
          type="button"
          className="py-2 active:ring-2 !ring-green-400 transition-colors duration-150 text-sm font-normal px-5 rounded-md bg-green-400/20 text-green-400 text-center hover:bg-green-400/40"
        >
          {t({ id: "buttons.submit" })}
        </button>
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
