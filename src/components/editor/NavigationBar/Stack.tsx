import React from "react";

interface StackProps {
  stack: string;
}

export default function Stack(props: StackProps) {
  const { stack } = props;
  return (
    <span className="py-2 px-5 flex-1 dark:bg-[#070f1c] bg-[#F3F4F6] rounded-md text-zinc-400 text-center text-sm font-normal">
      {stack}
    </span>
  );
}
