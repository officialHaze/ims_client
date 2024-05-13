import React, { ReactNode, useContext } from "react";
import AddProductButton from "../buttons/AddProductButton";
import Table from "../Table";
import ProductListQueryData from "../../interfaces/ProductListQueryData";
import RefreshButton from "../buttons/RefreshButton";
import { UseQueryResult } from "@tanstack/react-query";
import ProductListQueryResponse from "../../interfaces/ProductListQueryResponse";
import { TbFaceIdError } from "react-icons/tb";
import { ModalContext, ToastContext } from "../../App";
import { ADD_PRODUCT_MODAL, CONFIRMATION_MODAL, EDIT_PRODUCT_MODAL } from "../../utils/Constants";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import RemoveProductHelper from "../../helpers/RemoveProductHelper";

interface Props extends React.HTMLProps<HTMLElement> {
  productList: ProductListQueryData[];
  productQuery: UseQueryResult<ProductListQueryResponse, Error>;
}

const isOdd = (num: number) => {
  return Math.floor(num % 2) !== 0;
};

interface RowSerializerOptions {
  handleProductEdit: (
    productName: string,
    buyPrice: number,
    sellPrice: number,
    stock: number,
    productId: string
  ) => void;

  handleProductDelete: (productId: string) => void;
}

const serializeRows = (data: ProductListQueryData[], { ...options }: RowSerializerOptions) => {
  const serializedRows: ReactNode[] = [];
  data.forEach((item, idx) => {
    serializedRows.push(
      <tr id={item.id} key={item.id} className={`${isOdd(idx) && "bg-gray-200"}`}>
        <td className="p-2">{idx + 1}</td>
        <td>{item.product_name}</td>
        <td>
          <div className="flex items-center justify-center relative">
            <span className="absolute left-8">
              <FaIndianRupeeSign />
            </span>{" "}
            {item.buy_price}
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center relative">
            <span className="absolute left-8">
              <FaIndianRupeeSign />
            </span>
            {item.sell_price}
          </div>
        </td>
        <td>{item.stock}</td>
        <td>{item.storage_location}</td>
        <td>
          <div className="flex items-center justify-center gap-6 text-xl">
            <MdEdit
              className="cursor-pointer"
              onClick={() =>
                options.handleProductEdit(
                  item.product_name,
                  parseFloat(item.buy_price || "0"),
                  parseFloat(item.sell_price || "0"),
                  item.stock || 0,
                  item.id
                )
              }
            />
            <MdDelete
              className="cursor-pointer text-red-500"
              onClick={() => options.handleProductDelete(item.id)}
            />
          </div>
        </td>
      </tr>
    );
  });

  return serializedRows;
};

export default function ProductTable({ className, productList, productQuery }: Props) {
  const modalCtxPayload = useContext(ModalContext);
  if (!modalCtxPayload) throw new Error("Modal context payload is null!");

  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  const handleRefresh = () => {
    // Refetch the data
    productQuery.refetch();
  };

  const displayAddProductModalForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Display the modal containing add product form
    modalCtxPayload.controlModalDisplay({
      toDisplay: true,
      modalType: ADD_PRODUCT_MODAL,
      extraPayload: productQuery,
    });
  };

  // When fetching data
  if (productQuery.isLoading) {
    return (
      <div className={`h-full flex flex-col items-center justify-center ${className}`}>
        <img src="/assets/loading-icon.gif" alt="loading..." className="w-[10%]" />
        <em className="p-8 text-xl font-bold text-gray-500">
          Please wait while we fetch your data...
        </em>
      </div>
    );
  }

  // When there is an error while fetching data
  if (productQuery.isError) {
    return (
      <div className={`h-full flex flex-col items-center justify-center ${className}`}>
        <TbFaceIdError className="text-8xl text-gray-500" />
        <em className="p-4 text-xl font-bold text-gray-500">
          Aw snap! Something went wrong! Please try back after sometime.
        </em>
      </div>
    );
  }

  // Function to handle product edit
  const handleProductEdit = (
    productName: string,
    buyPrice: number,
    sellPrice: number,
    stock: number,
    productId: string
  ) => {
    // Open the Product edit modal
    modalCtxPayload.controlModalDisplay({
      toDisplay: true,
      modalType: EDIT_PRODUCT_MODAL,
      extraPayload: {
        productQuery,
        productName,
        buyPrice,
        sellPrice,
        stock,
        productId,
      },
    });
  };

  // Function to remove / delete product
  const removeProduct = (productId: string) => {
    const productRemovalHelper = new RemoveProductHelper(
      [productId],
      toastCtxPayload.displayToast,
      productQuery
    );
    productRemovalHelper.remove();
  };

  // Function to handle removal of product
  const handleProductDelete = (productId: string) => {
    // Display a confirmation modal
    // Pass the message that is to be displayed on the modal body and queryFn (removeProduct) as the modal payload
    modalCtxPayload.controlModalDisplay({
      toDisplay: true,
      modalType: CONFIRMATION_MODAL,
      extraPayload: {
        message: (
          <h1 className="p-4 text-xl font-semibold">
            Are you sure you want to remove this product?
          </h1>
        ),
        queryFn: () => removeProduct(productId),
      },
    });
  };

  // When data is fetched
  return (
    <div className={`${className}`}>
      <section className="header flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
          <div className="filter rounded-full p-1 w-24 border-2 border-blue-500 cursor-pointer">
            Filter
          </div>
          <AddProductButton onClick={displayAddProductModalForm} />
        </div>
        <RefreshButton onClick={handleRefresh} />
      </section>
      <section className="table p-4 w-full">
        {productList.length > 0 ? (
          <Table
            columnLabels={[
              "S.No",
              "Product",
              "Buy price",
              "Sell price",
              "Stock (Qty)",
              "Storage Location",
              "Actions",
            ]}
            rowData={serializeRows(productList, { handleProductEdit, handleProductDelete })}
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
