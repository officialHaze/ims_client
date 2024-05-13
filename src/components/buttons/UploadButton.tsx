import React from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

export default function UploadButton({ onClick: handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className={`py-2 px-6 bg-yellow-500 hover:opacity-80 text-white text-lg rounded-lg`}
    >
      Upload
    </button>
  );
}
