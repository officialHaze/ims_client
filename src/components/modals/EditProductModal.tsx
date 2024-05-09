import { UseQueryResult } from "@tanstack/react-query";
import React, { useContext } from "react";
import ProductListQueryResponse from "../../interfaces/ProductListQueryResponse";
import { IoMdCloseCircle } from "react-icons/io";
import ProductDetailsForm from "../forms/ProductDetailsForm";
import { EDIT_PRODUCT_MODAL } from "../../utils/Constants";
import { ModalContext, ToastContext } from "../../App";
import EditProductDetailsHelper from "../../helpers/EditProductDetailsHelper";

interface Props extends React.HTMLProps<HTMLElement> {
  payload: {
    productQuery: UseQueryResult<ProductListQueryResponse, Error>;
    productName: string;
    buyPrice: number;
    sellPrice: number;
    stock: number;
    productId: string;
  };
}

export default function EditProductModal({ payload }: Props) {
  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  const modalCtxPayload = useContext(ModalContext);
  if (!modalCtxPayload) return <pre>Modal context payload is null</pre>;

  const handleProductEditFormSubmit = (productDetails: {
    product_name: string;
    buy_price: number;
    sell_price: number;
    stock: number;
    productId?: string;
  }) => {
    // Call the helper method to handle and help with calling the API to edit product details
    const productEditHelper = new EditProductDetailsHelper({
      productData: productDetails,
      productId: productDetails.productId || "",
      toastDisplayer: toastCtxPayload.displayToast,
      productQuery: payload.productQuery,
    });

    productEditHelper.edit();

    // Close the modal
    modalCtxPayload.controlModalDisplay({
      toDisplay: false,
      modalType: EDIT_PRODUCT_MODAL,
    });
  };

  return (
    <div className="rounded-xl overflow-hidden w-1/2 shadow-xl">
      <section className="header bg-red-500 text-left py-3 px-4 text-xl font-bold text-white flex items-center justify-between">
        Edit product
        <span>
          <IoMdCloseCircle
            id="close-modal"
            className="text-2xl cursor-pointer"
            onClick={
              () =>
                modalCtxPayload.controlModalDisplay({
                  toDisplay: false,
                  modalType: EDIT_PRODUCT_MODAL,
                }) // Close the modal
            }
          />
        </span>
      </section>
      <ProductDetailsForm
        handleFormSubmit={handleProductEditFormSubmit}
        submitButtonLabel="Edit"
        productName={payload.productName}
        buyPrice={payload.buyPrice}
        sellPrice={payload.sellPrice}
        stock={payload.stock}
        productId={payload.productId}
      />
    </div>
  );
}
