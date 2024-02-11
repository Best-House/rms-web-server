import { Purchase } from "@/domain/model/purchase";

export interface DeletePurchase {
  deletePurchase: (id: Purchase["id"]) => Promise<void>;
}
