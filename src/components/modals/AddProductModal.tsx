import React, { useContext } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { ModalContext, ToastContext } from "../../App";
import { ADD_PRODUCT_MODAL } from "../../utils/Constants";
import { UseQueryResult } from "@tanstack/react-query";
import ProductListQueryResponse from "../../interfaces/ProductListQueryResponse";
import AddProductHelper from "../../helpers/AddProductHelper";
import ProductDetailsForm from "../forms/ProductDetailsForm";

interface Props {
  productQuery: UseQueryResult<ProductListQueryResponse, Error>;
}

export default function AddProductModal({ productQuery }: Props) {
  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  const modalCtxPayload = useContext(ModalContext);
  if (!modalCtxPayload) return <pre>Modal context payload is null</pre>;

  const handleProductFormSubmit = (productDetails: {
    product_name: string;
    buy_price: number;
    sell_price: number;
    stock: number;
  }) => {
    const helper = new AddProductHelper({
      productData: productDetails,
      toastDisplayer: toastCtxPayload.displayToast,
      productQuery,
    });

    helper.addProduct();

    modalCtxPayload.controlModalDisplay({ toDisplay: false, modalType: ADD_PRODUCT_MODAL }); // Close the modal
  };

  return (
    <div id="add-product-modal" className="rounded-xl overflow-hidden w-1/2 shadow-xl">
      <section className="header bg-red-500 text-left py-3 px-4 text-xl font-bold text-white flex items-center justify-between">
        Add product
        <span>
          <IoMdCloseCircle
            id="close-modal"
            className="text-2xl cursor-pointer"
            onClick={
              () =>
                modalCtxPayload.controlModalDisplay({
                  toDisplay: false,
                  modalType: ADD_PRODUCT_MODAL,
                }) // Close the modal
            }
          />
        </span>
      </section>
      <ProductDetailsForm handleFormSubmit={handleProductFormSubmit} submitButtonLabel="Add" />
    </div>
  );
}
