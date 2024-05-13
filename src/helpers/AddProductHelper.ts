import { UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "../axiosConfig";
import ErrorHandler from "../handlers/ErrorHandler";
import AddProductData from "../interfaces/AddProductData";
import ProductListQueryResponse from "../interfaces/ProductListQueryResponse";
import { ERROR_TOAST } from "../utils/Constants";

export default class AddProductHelper {
  private retryCount = 0;

  private productData: AddProductData;
  private toastDisplayer: (message: string, status: string) => void;
  private productQuery: UseQueryResult<ProductListQueryResponse, Error>;

  private errorHandler: ErrorHandler;

  constructor({
    productData,
    toastDisplayer,
    productQuery,
  }: {
    productData: AddProductData;
    toastDisplayer: (message: string, status: string) => void;
    productQuery: UseQueryResult<ProductListQueryResponse, Error>;
  }) {
    this.productData = productData;
    this.toastDisplayer = toastDisplayer;
    this.productQuery = productQuery;

    this.errorHandler = new ErrorHandler(() => this.addProduct(), this.toastDisplayer);
  }

  public async addProduct() {
    this.retryCount++;
    try {
      if (!this.productData.product_name)
        return this.toastDisplayer("Please provide a product name", ERROR_TOAST);

      const { data } = await axiosInstance.post("/auth/add-single-product", this.productData);
      console.log({ response_after_adding_product: data });
      this.productQuery.refetch();
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }
}
