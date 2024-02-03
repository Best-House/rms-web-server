import { Purchase } from "@/domain/model/purchase/Purchase";

export interface QueryPurchase {
  getPurchaseList(): Promise<Purchase[]>;
}
