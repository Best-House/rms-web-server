import { Purchase } from "@/domain/model/purchase/Purchase";

export interface DeletePurchase {
  deletePurchase: (purchase: Purchase) => Promise<Purchase>;
}
