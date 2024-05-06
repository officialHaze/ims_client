import axiosInstance from "../axiosConfig";
import Handler from "../handlers/Handler";

export default async function getProductList(
  displayToast: (message: string, status: string) => void
) {
  try {
    const { data } = await axiosInstance.get("/auth/get-products");
    console.log({ product_list_response: data });

    return data;
  } catch (err: any) {
    Handler.handleError(err, displayToast);
    throw err;
  }
}
