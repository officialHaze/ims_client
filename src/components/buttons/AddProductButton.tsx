import React from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

export default function AddProductButton({ className }: Props) {
  return (
    <button
      className={`bg-yellow-500 text-white py-2 px-4 rounded-lg hover:opacity-60 ${className}`}
    >
      Add product
    </button>
  );
}
