import { Purchase } from "@/domain/model/purchase";

export interface CreatePurchase {
  createPurchase(draft: Omit<Purchase, "id">): Promise<{ id: Purchase["id"] }>;
}
