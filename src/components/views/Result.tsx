import React from "react";
import { useIntl } from "react-intl";
import Confetti from "react-confetti";
import { useLocation } from "react-router-dom";

import Logo from "@images/logo.png";

function Result() {
  const { state } = useLocation();
  const { formatMessage: t } = useIntl();
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const isSubmitted = state?.isSubmitted;

    if (!isSubmitted) {
      window.location.href = "/";
    }
  }, [state]);

  React.useEffect(() => {
    const handleSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleSize();

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <div className="w-screen overflow-hidden font-pop dark:bg-[#101926] bg-white flex justify-center items-center p-0 min-h-screen">
      <div className="w-full max-w-5xl grid grid-cols-1 p-5 gap-5 place-content-start place-items-center">
        <Confetti
          className="fixed left-0 top-0 w-full h-full"
          width={width}
          height={height}
          tweenDuration={20000}
          recycle={false}
        />
        <img
          src={Logo}
          alt="TheCSociety"
          className="w-10 object-center object-contain"
        />
        <h1 className="text-3xl dark:text-white font-bold">
          {t({ id: "result.heading" })}
        </h1>
        <p className="text-sm text-center w-full max-w-xs text-zinc-500 dark:text-zinc-400">
          {t({ id: "result.message" })}
        </p>
        <a
          className="rounded-xl bg-[#0D6EFF] active:ring-blue-300 ring-transparent !ring-2  transition-all duration-150 hover:bg-blue-700 font-medium text-md text-white px-6 py-2 "
          href="https://thecsociety.co/challenges"
        >
          {t({ id: "result.link" })}
        </a>
      </div>
    </div>
  );
}

export default Result;
