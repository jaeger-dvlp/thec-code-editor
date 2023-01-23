import React from "react";
import { useIntl } from "react-intl";
import { Tooltip } from "react-tooltip";

export function UseTimer() {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timestamp = new Date(time * 1000).toISOString().substr(11, 8);

  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  return {
    seconds,
    minutes,
    hours,
    timestamp,
  };
}

function Timer() {
  const { formatMessage: t } = useIntl();
  const { seconds, minutes, hours } = UseTimer();

  return (
    <span
      id="challenge-time"
      className="py-2 px-5 flex-1 dark:bg-[#070f1c] bg-[#F3F4F6] rounded-md text-zinc-400 text-center text-sm font-normal"
    >
      <Tooltip
        anchorId="challenge-time"
        place="bottom"
        content={t({ id: "tooltips.time-spent" })}
      />
      {`${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
    </span>
  );
}

export default Timer;
