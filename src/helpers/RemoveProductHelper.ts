import { UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "../axiosConfig";
import ErrorHandler from "../handlers/ErrorHandler";
import ProductListQueryResponse from "../interfaces/ProductListQueryResponse";

export default class RemoveProductHelper {
  private productIds: string[];
  private errorHandler: ErrorHandler;
  private productQuery: UseQueryResult<ProductListQueryResponse, Error>;

  constructor(
    productIds: string[],
    toastDisplayer: (message: string, status: string) => void,
    productQuery: UseQueryResult<ProductListQueryResponse, Error>
  ) {
    this.productIds = productIds;
    this.productQuery = productQuery;

    this.errorHandler = new ErrorHandler(() => this.remove(), toastDisplayer);
  }

  public async remove() {
    try {
      const { data } = await axiosInstance.delete("/auth/delete-products", {
        data: {
          product_ids: this.productIds,
        },
      });
      console.log({ response_after_removing_products: data });
      this.productQuery.refetch();
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }
}
