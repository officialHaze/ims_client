import axiosInstance from "../axiosConfig";
import ErrorHandler from "../handlers/ErrorHandler";

export default async function getProductList(
  displayToast: (message: string, status: string) => void
) {
  try {
    const { data } = await axiosInstance.get("/auth/get-products");
    console.log({ product_list_response: data });

    return data;
  } catch (err: any) {
    const errorHandler = new ErrorHandler(null, displayToast);
    errorHandler.handleError(err);
    throw err;
  }
}
