import {
  Purchase,
  MaterialInPurchaseItems,
} from "@/domain/model/purchase/Purchase";

export interface CreatePurchase {
  createPurchase(
    materialInPurchaseItems: MaterialInPurchaseItems,
  ): Promise<Purchase>;
}
