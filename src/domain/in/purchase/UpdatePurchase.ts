import { Purchase } from "@/domain/model/purchase";

export interface UpdatePurchase {
  updatePurchase(draft: Purchase): Promise<void>;
}
