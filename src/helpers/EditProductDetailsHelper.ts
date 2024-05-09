import { UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "../axiosConfig";
import ErrorHandler from "../handlers/ErrorHandler";
import AddProductData from "../interfaces/AddProductData";
import ProductListQueryResponse from "../interfaces/ProductListQueryResponse";
import { ERROR_TOAST } from "../utils/Constants";

export default class EditProductDetailsHelper {
  private productData: AddProductData;
  private productId: string;
  private toastDisplayer: (message: string, status: string) => void;
  private productQuery: UseQueryResult<ProductListQueryResponse, Error>;

  private errorHandler: ErrorHandler;

  constructor({
    productData,
    productId,
    toastDisplayer,
    productQuery,
  }: {
    productData: AddProductData;
    productId: string;
    toastDisplayer: (message: string, status: string) => void;
    productQuery: UseQueryResult<ProductListQueryResponse, Error>;
  }) {
    this.productData = productData;
    this.productId = productId;
    this.toastDisplayer = toastDisplayer;
    this.productQuery = productQuery;

    this.errorHandler = new ErrorHandler(() => this.edit(), this.toastDisplayer);
  }

  public async edit() {
    try {
      if (!this.productData.product_name)
        return this.toastDisplayer("Please provide a product name", ERROR_TOAST);

      const { data } = await axiosInstance.put("/auth/edit-product-details", {
        ...this.productData,
        product_id: this.productId,
      });
      console.log({ response_after_editing_product_details: data });
      this.productQuery.refetch();
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }
}
