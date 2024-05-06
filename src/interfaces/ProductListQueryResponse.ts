import ProductListQueryData from "./ProductListQueryData";

export default interface ProductListQueryResponse {
  message: string;
  products: ProductListQueryData[];
}
