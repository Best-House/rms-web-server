import {
  MaterialInPurchaseItems,
  Purchase,
} from "@/domain/model/purchase/Purchase";

export interface PurchaseRepository {
  findBy(id: Purchase["id"]): Promise<Purchase>;
  findAllPurchases(): Promise<Purchase[]>;
  savePurchase(
    materialInPurchaseItems: MaterialInPurchaseItems,
  ): Promise<Purchase>;
  updatePurchase(material: Purchase): Promise<Purchase>;
  removePurchase(Purchase: Purchase): Promise<Purchase>;
}
