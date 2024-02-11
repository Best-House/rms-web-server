import { Purchase } from "@/domain/model/purchase";

export interface QueryPurchase {
  getPurchaseList(): Promise<Purchase[]>;
  getPurchase(id: Purchase["id"]): Promise<Purchase>;
}
