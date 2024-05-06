import React from "react";

interface Props extends React.HTMLProps<HTMLElement> {
  optionId: string;
  optionLabel: string;
  selectedOptionId: string;
}

export default function SidePanelOption({
  optionId,
  optionLabel,
  selectedOptionId,
  className,
  onClick: handleClick,
}: Props) {
  return (
    <div
      onClick={handleClick}
      id={optionId}
      className={`py-2 px-4 rounded-lg cursor-pointer text-left ${
        selectedOptionId.includes(optionId) && "bg-red-500 text-white"
      } ${className}`}
    >
      {optionLabel}
    </div>
  );
}
