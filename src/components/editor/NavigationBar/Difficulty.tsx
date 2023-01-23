import React from "react";
import { useIntl } from "react-intl";
import { Tooltip } from "react-tooltip";

function Difficulty({ difficulty }: { difficulty: string }) {
  const { formatMessage: t } = useIntl();
  return (
    <span
      id="difficulty"
      className="py-2 px-5 flex-1 dark:bg-[#070f1c] bg-[#F3F4F6] rounded-md text-zinc-400 text-center font-normal"
    >
      <Tooltip
        anchorId="difficulty"
        place="bottom"
        content={t({ id: "tooltips.difficulty" })}
      />
      {t({ id: `difficulties.${difficulty}` })}
    </span>
  );
}

export default Difficulty;
