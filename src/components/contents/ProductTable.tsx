import React, { ReactNode } from "react";
import AddProductButton from "../buttons/AddProductButton";
import Table from "../Table";
import dummyData from "../../dummyProductData.json";
import ProductListQueryData from "../../interfaces/ProductListQueryData";

interface Props extends React.HTMLProps<HTMLElement> {
  productList: ProductListQueryData[];
}

const isOdd = (num: number) => {
  return Math.floor(num % 2) !== 0;
};

const serializeRows = (data: ProductListQueryData[]) => {
  const serializedRows: ReactNode[] = [];
  data.forEach((item, idx) => {
    serializedRows.push(
      <tr key={idx} className={`${isOdd(idx) && "bg-gray-200"}`}>
        <td className="p-2">{idx + 1}</td>
        <td>{item.product_name}</td>
        <td>{item.buy_price}</td>
        <td>{item.sell_price}</td>
        <td>{item.stock}</td>
      </tr>
    );
  });

  return serializedRows;
};

export default function ProductTable({ className, productList }: Props) {
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
            columnLabels={["S.No", "Product", "Buy price", "Sell price", "Stock (Qty)"]}
            rowData={serializeRows(productList)}
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
