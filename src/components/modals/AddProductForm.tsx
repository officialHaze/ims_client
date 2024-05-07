import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { ModalContext, ToastContext } from "../../App";
import { ADD_PRODUCT_MODAL } from "../../utils/Constants";
import { UseQueryResult } from "@tanstack/react-query";
import ProductListQueryResponse from "../../interfaces/ProductListQueryResponse";
import AddProductHelper from "../../helpers/AddProductHelper";

interface Props {
  productQuery: UseQueryResult<ProductListQueryResponse, Error>;
}

export default function AddProductForm({ productQuery }: Props) {
  const [addProductDetails, setAddProductDetails] = useState({
    product_name: "",
    buy_price: 0,
    sell_price: 0,
    stock: 0,
  });

  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  const modalCtxPayload = useContext(ModalContext);
  if (!modalCtxPayload) return <pre>Modal context payload is null</pre>;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case "product-name-input":
        setAddProductDetails({
          ...addProductDetails,
          product_name: value,
        });
        break;

      case "buy-price-input":
        setAddProductDetails({
          ...addProductDetails,
          buy_price: parseFloat(value),
        });
        break;

      case "sell-price-input":
        setAddProductDetails({
          ...addProductDetails,
          sell_price: parseFloat(value),
        });
        break;

      case "stock-input":
        setAddProductDetails({
          ...addProductDetails,
          stock: parseInt(value),
        });
        break;

      default:
        break;
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const helper = new AddProductHelper({
      productData: addProductDetails,
      toastDisplayer: toastCtxPayload.displayToast,
      productQuery,
    });

    helper.addProduct();

    modalCtxPayload.controlModalDisplay({ toDisplay: false, modalType: ADD_PRODUCT_MODAL }); // Close the modal
  };

  return (
    <form className="rounded-xl overflow-hidden w-1/2 shadow-xl" onSubmit={handleFormSubmit}>
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
      <section className="body bg-white flex items-center justify-center flex-wrap gap-6 px-10 py-10">
        <div className="w-[48%]">
          <label htmlFor="product-name-input">
            <p className="text-left py-1 font-bold">
              Product name<span className="text-red-500">*</span>
            </p>
          </label>
          <input
            id="product-name-input"
            type="text"
            className="input-box"
            value={addProductDetails.product_name}
            onChange={handleChange}
          />
        </div>
        <div className="w-[48%]">
          <label htmlFor="buy-price-input">
            <p className="text-left py-1 font-bold">Buy price</p>
          </label>
          <input
            id="buy-price-input"
            type="number"
            className="input-box text-right"
            value={addProductDetails.buy_price || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-[48%]">
          <label htmlFor="sell-price-input">
            <p className="text-left py-1 font-bold">Sell price</p>
          </label>
          <input
            id="sell-price-input"
            type="text"
            className="input-box"
            value={addProductDetails.sell_price || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-[48%]">
          <label htmlFor="stock-input">
            <p className="text-left py-1 font-bold">Stock</p>
          </label>
          <input
            id="stock-input"
            type="text"
            className="input-box"
            value={addProductDetails.stock || ""}
            onChange={handleChange}
          />
        </div>
      </section>
      <section className="footer bg-white py-4 px-6 text-right">
        <button className="py-2 px-8 bg-yellow-500 hover:opacity-70 rounded-lg text-white">
          Add
        </button>
      </section>
    </form>
  );
}
