import ErrorHandler from "../handlers/ErrorHandler";
import axiosInstance from "../axiosConfig";

export default class ProductListingHelper {
  private template: File;
  private toastDisplayer: (message: string, status: string) => void;
  //   private productQuery: UseQueryResult<ProductListQueryResponse, Error>;

  private errorHandler: ErrorHandler;

  constructor({
    template,
    toastDisplayer,
  }: {
    template: File;
    toastDisplayer: (message: string, status: string) => void;
  }) {
    this.template = template;
    this.toastDisplayer = toastDisplayer;

    this.errorHandler = new ErrorHandler(() => this.listProduct(), this.toastDisplayer);
  }

  public async listProduct() {
    try {
      const formData = new FormData();
      formData.append("xl_file", this.template);
      const { data } = await axiosInstance.post("/auth/upload-listing-template/product", formData);
      console.log({ response_after_listing_products: data });
    } catch (err: any) {
      this.errorHandler.handleError(err);
      throw new Error(err.response.data.error ?? null);
    }
  }
}
