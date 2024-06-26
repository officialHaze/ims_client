import ProductListQueryData from "../interfaces/ProductListQueryData";

export default class Filter {
  public static filterProductListByName(productList: ProductListQueryData[], delimeter: string) {
    return productList.filter(
      productObj =>
        productObj.product_name.toLowerCase().substring(0, delimeter.length) ===
        delimeter.toLowerCase()
    );
  }
}
