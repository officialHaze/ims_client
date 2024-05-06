export default interface ProductListQueryData {
  id: string;
  product_name: string | null;
  buy_price: string | null;
  sell_price: string | null;
  stock: number | null;
  category_id: string | null;
  user_id: string;
  business_id: string | null;
}
