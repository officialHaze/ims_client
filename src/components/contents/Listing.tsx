import React, { useState } from "react";
import ProductListing from "./listingSubTypes/ProductListing";

interface Props extends React.HTMLProps<HTMLElement> {}

const listingSubTypesMap: any = {
  0: <ProductListing />,
};

export default function Listing({}: Props) {
  const [selectedListSubType, selectListingSubType] = useState(0);

  return (
    <div className="p-6 h-full">
      <header className="nav p-2">
        <ul className="flex items-center gap-6 border-b border-gray-300">
          <li
            className="px-2 py-3 cursor-pointer font-semibold relative"
            onClick={() => selectListingSubType(0)}
          >
            List Products{" "}
            {selectedListSubType === 0 && (
              <span className="w-full p-[0.13rem] bg-red-500 absolute left-0 bottom-0 rounded-lg" />
            )}
          </li>
          <li
            className="px-2 py-3 cursor-pointer font-semibold relative"
            onClick={() => selectListingSubType(1)}
          >
            List Categories{" "}
            {selectedListSubType === 1 && (
              <span className="w-full p-[0.13rem] bg-red-500 absolute left-0 bottom-0 rounded-lg" />
            )}
          </li>
          <li
            className="px-2 py-3 cursor-pointer font-semibold relative"
            onClick={() => selectListingSubType(2)}
          >
            List Business'{" "}
            {selectedListSubType === 2 && (
              <span className="w-full p-[0.13rem] bg-red-500 absolute left-0 bottom-0 rounded-lg" />
            )}
          </li>
        </ul>
      </header>

      <section className="body">{listingSubTypesMap[selectedListSubType]}</section>
    </div>
  );
}
