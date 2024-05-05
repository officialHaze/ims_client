import React, { ReactNode } from "react";
import AddProductButton from "../buttons/AddProductButton";
import Table from "../Table";
import dummyData from "../../dummyProductData.json";

interface Props extends React.HTMLProps<HTMLElement> {}

const isOdd = (num: number) => {
  return Math.floor(num % 2) !== 0;
};

const serializeRows = (
  data: { id: string; productName: string; price: number; stock: number }[]
) => {
  const serializedRows: ReactNode[] = [];
  data.forEach((item, idx) => {
    serializedRows.push(
      <tr key={idx} className={`${isOdd(idx) && "bg-gray-200"}`}>
        <td className="p-2">{idx + 1}</td>
        <td>{item.productName}</td>
        <td>{item.price}</td>
        <td>{item.stock}</td>
      </tr>
    );
  });

  return serializedRows;
};

export default function ProductTable({ className }: Props) {
  return (
    <div className={`${className}`}>
      <section className="header flex items-center gap-6 p-4">
        <div className="filter rounded-full p-1 w-24 border-2 border-blue-500 cursor-pointer">
          Filter
        </div>
        <AddProductButton />
      </section>
      <section className="table p-4 w-full">
        {dummyData.length > 0 ? (
          <Table
            columnLabels={["S.No", "Product", "Price", "Stock (Qty)"]}
            rowData={serializeRows(dummyData)}
          />
        ) : (
          <div className="h-[25rem] flex items-center justify-center text-2xl font-bold text-gray-400">
            No product(s) listed yet
          </div>
        )}
      </section>
    </div>
  );
}
