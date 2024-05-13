import React, { ChangeEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface Props extends React.HTMLProps<HTMLElement> {
  searchFor: string;
  handleChangeInSearchParam: (searchParam: string) => void;
}

export default function SearchBar({
  disabled,
  className,
  searchFor,
  handleChangeInSearchParam,
}: Props) {
  const [searchParam, setSearchParam] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchParam(value);
    handleChangeInSearchParam(value); // To be handled in parent component
  };

  return (
    <div className="flex rounded-md overflow-hidden">
      <input
        disabled={disabled}
        type="text"
        placeholder={disabled ? "Type to search" : `Type to search for ${searchFor}`}
        className={`px-2 py-1 outline-none ${disabled && "bg-gray-300"} ${className}`}
        value={searchParam}
        onChange={handleChange}
      />
      <button className="bg-black text-white py-3 px-4">
        <BsSearch />
      </button>
    </div>
  );
}
