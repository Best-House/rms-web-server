import { CreatePurchase } from "@/domain/in/CreatePurchase";
import { DeletePurchase } from "@/domain/in/DeletePurchase";
import { QueryPurchase } from "@/domain/in/QueryPurchase";
import { PurchaseRepository } from "@/domain/out/PurchaseRepository";
import {
  MaterialInPurchaseItems,
  Purchase,
} from "@/domain/model/purchase/Purchase";

export class PurchaseService
  implements QueryPurchase, CreatePurchase, DeletePurchase
{
  constructor(private purchaseRepository: PurchaseRepository) {}

  getPurchaseItem(id: Purchase["id"]): Promise<Purchase> {
    return this.purchaseRepository.findBy(id);
  }
  getPurchaseList(): Promise<Purchase[]> {
    return this.purchaseRepository.findAllPurchases();
  }
  createPurchase(
    materialInPurchaseItems: MaterialInPurchaseItems,
  ): Promise<Purchase> {
    return this.purchaseRepository.savePurchase(materialInPurchaseItems);
  }
  updatePurchase(purchase: Purchase): Promise<Purchase> {
    return this.purchaseRepository.updatePurchase(purchase);
  }
  deletePurchase(purchase: Purchase) {
    return this.purchaseRepository.removePurchase(purchase);
  }
}
