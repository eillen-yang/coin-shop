import type { Product } from "../data/products";

export function getCategoryStats(purchaseHistory: Product[]) {
  return purchaseHistory.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.price;

    console.log("acc", acc[product.category]);
    return acc;
  }, {});
}
