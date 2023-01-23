import React from "react";
import { useIntl } from "react-intl";
import { Tooltip } from "react-tooltip";
import { StackProps } from "@/common/types/types";

export default function Stack(props: StackProps) {
  const { formatMessage: t } = useIntl();
  const { stack } = props;
  return (
    <span
      id="cha-stack"
      className="py-2 px-5 flex-1 dark:bg-[#070f1c] bg-[#F3F4F6] rounded-md text-zinc-400 text-center text-sm font-normal"
    >
      <Tooltip
        anchorId="cha-stack"
        place="bottom"
        content={t({ id: "tooltips.stack" })}
      />
      {stack}
    </span>
  );
}
