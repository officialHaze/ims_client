import React from "react";
import AddProductButton from "../buttons/AddProductButton";

interface Props extends React.HTMLProps<HTMLElement> {}

export default function ProductTable({ className }: Props) {
  return (
    <div className={`${className}`}>
      <section className="header flex items-center gap-6 p-4">
        <div className="filter rounded-full p-1 w-24 border-2 border-blue-500 cursor-pointer">
          Filter
        </div>
        <AddProductButton />
      </section>
      <section className="table p-4">table</section>
    </div>
  );
}
