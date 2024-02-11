import { Purchase } from "@/domain/model/purchase";

export interface PurchaseRepository {
  findPurchaseBy(id: Purchase["id"]): Promise<Purchase>;
  findAllPurchases(): Promise<Purchase[]>;
  createPurchase(draft: Omit<Purchase, "id">): Promise<{ id: Purchase["id"] }>;
  updatePurchase(draft: Purchase): Promise<void>;
  removePurchase(id: Purchase["id"]): Promise<void>;
}
