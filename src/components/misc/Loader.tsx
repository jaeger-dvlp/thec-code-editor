import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useLocation } from "react-router-dom";

export default function Loader() {
  const location = useLocation();
  const [loader, setLoader] = React.useState({
    inHTML: true,
    isActive: true,
  });

  const HideLoader = () => {
    setTimeout(() => setLoader({ isActive: false, inHTML: true }), 1000);
    setTimeout(() => setLoader({ isActive: false, inHTML: false }), 1500);
  };

  const StartLoader = () => {
    setLoader({
      isActive: true,
      inHTML: true,
    });
    HideLoader();
  };

  React.useEffect(() => StartLoader(), [location.pathname]);

  return (
    (loader.inHTML && (
      <div
        className={`${
          loader.isActive
            ? "transition-none duration-[0ms] !opacity-100 !visible"
            : "transition-all duration-500 !opacity-0 !invisible"
        } duration-500 transition-[opacity,visibility] w-full h-full absolute dark:bg-[#08111F] bg-zinc-200 z-[5] top-0 left-0 flex justify-center items-center`}
      >
        <AiOutlineLoading className="w-12 animate-spin h-12 p-2 bg-sky-600/10 rounded-full text-sky-600" />
      </div>
    )) ||
    null
  );
}
