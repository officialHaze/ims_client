import React from "react";
import { TfiReload } from "react-icons/tfi";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

export default function RefreshButton({ onClick: handleRefresh }: Props) {
  return (
    <button
      onClick={handleRefresh}
      className="py-2 px-4 rounded-md text-white bg-[#3C486B] hover:opacity-80 flex items-center justify-center gap-2"
    >
      <TfiReload /> Refresh
    </button>
  );
}
