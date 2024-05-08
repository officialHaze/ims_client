import React, { useState } from "react";
import { FaIndianRupeeSign, FaPlus, FaMinus } from "react-icons/fa6";

interface Props extends React.HTMLProps<HTMLFormElement> {
  handleFormSubmit: (productDetails: {
    product_name: string;
    buy_price: number;
    sell_price: number;
    stock: number;
  }) => void;

  submitButtonLabel: string;
}

export default function ProductDetailsForm({ handleFormSubmit, submitButtonLabel }: Props) {
  const [productDetails, setProductDetails] = useState({
    product_name: "",
    buy_price: 0,
    sell_price: 0,
    stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case "product-name-input":
        setProductDetails({
          ...productDetails,
          product_name: value,
        });
        break;

      case "buy-price-input":
        setProductDetails({
          ...productDetails,
          buy_price: parseFloat(value),
        });
        break;

      case "sell-price-input":
        setProductDetails({
          ...productDetails,
          sell_price: parseFloat(value),
        });
        break;

      case "stock-input":
        setProductDetails({
          ...productDetails,
          stock: parseInt(value),
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading

    handleFormSubmit(productDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            value={productDetails.product_name}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="w-[48%]">
          <label htmlFor="buy-price-input">
            <p className="text-left py-1 font-bold">Buy price</p>
          </label>
          <div className="relative flex items-center">
            <FaIndianRupeeSign className="absolute left-2 text-gray-500" />
            <input
              id="buy-price-input"
              placeholder="0.00"
              type="number"
              className="input-box text-right"
              value={productDetails.buy_price || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="w-[48%]">
          <label htmlFor="sell-price-input">
            <p className="text-left py-1 font-bold">Sell price</p>
          </label>
          <div className="relative flex items-center">
            <FaIndianRupeeSign className="absolute left-2 text-gray-500" />
            <input
              placeholder="0.00"
              id="sell-price-input"
              type="text"
              className="input-box text-right"
              value={productDetails.sell_price || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="w-[48%]">
          <label htmlFor="stock-input">
            <p className="text-left py-1 font-bold">Stock</p>
          </label>
          <div className="flex items-center">
            <i
              className="p-4 cursor-pointer"
              onClick={() =>
                productDetails.stock > 0 &&
                setProductDetails({ ...productDetails, stock: productDetails.stock - 1 })
              }
            >
              <FaMinus />
            </i>
            <input
              id="stock-input"
              type="text"
              className="input-box"
              value={productDetails.stock || ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <i
              className="p-4 cursor-pointer"
              onClick={() =>
                setProductDetails({ ...productDetails, stock: productDetails.stock + 1 })
              }
            >
              <FaPlus />
            </i>
          </div>
        </div>
      </section>
      <section className="footer bg-white py-4 px-6 text-right">
        <button className="py-2 px-8 bg-yellow-500 hover:opacity-70 rounded-lg text-white">
          {submitButtonLabel}
        </button>
      </section>
    </form>
  );
}
