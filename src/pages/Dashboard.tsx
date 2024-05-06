import React, { useContext, useState } from "react";
import sidePanelOptions from "../json/sidePanelOptions.json";
import SidePanelOption from "../components/SidePanelOption";
import LogoutButton from "../components/buttons/LogoutButton";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/contents/ProductTable";
import { useQuery } from "@tanstack/react-query";
import getProductList from "../queries/GetProductList";
import { ToastContext } from "../App";

export default function Dashboard() {
  const [selectedOption, selectOption] = useState("1");

  const _selectOption = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget;

    selectOption(id);
  };

  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  // Product list query
  const productQuery = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductList(toastCtxPayload.displayToast),
  });

  return (
    <div className="h-screen relative bg-gradient-to-r from-[#8C52FF] to-[#5CE1E6]">
      <div className="header flex items-center justify-between absolute w-full px-32 py-4">
        <h1 className="font-bold text-4xl font-bauhaus_extrabold text-white">IMS</h1>
        <SearchBar className="w-[24rem]" />
        {/* <button>Add new product</button> */}
      </div>
      <div className="flex gap-8 h-full pt-20 pb-10 px-10">
        <section className="side-panel w-[15%] rounded-lg overflow-hidden bg-gray-100 shadow-xl flex flex-col justify-between py-6 px-4">
          <div className="options flex flex-col gap-4">
            {sidePanelOptions.map(option => (
              <SidePanelOption
                key={option.id}
                onClick={_selectOption}
                optionId={option.id}
                optionLabel={option.label}
                selectedOptionId={selectedOption}
              />
            ))}
          </div>
          <LogoutButton />
        </section>
        <section className="content w-[85%] rounded-lg overflow-hidden bg-gray-100 shadow-xl">
          {selectedOption.includes("1") && (
            <ProductTable productList={productQuery.data?.products || []} />
          )}
        </section>
      </div>
    </div>
  );
}
