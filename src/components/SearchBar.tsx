import React from "react";
import { BsSearch } from "react-icons/bs";

interface Props extends React.HTMLProps<HTMLElement> {}

export default function SearchBar({ className }: Props) {
  return (
    <form className="flex rounded-md overflow-hidden">
      <input
        type="text"
        placeholder="Search products"
        className={`px-2 py-1 outline-none ${className}`}
      />
      <button className="bg-black text-white py-3 px-4">
        <BsSearch />
      </button>
    </form>
  );
}
