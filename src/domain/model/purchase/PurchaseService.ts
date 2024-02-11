import { CreatePurchase } from "@/domain/in/purchase/CreatePurchase";
import { DeletePurchase } from "@/domain/in/purchase/DeletePurchase";
import { QueryPurchase } from "@/domain/in/purchase/QueryPurchase";
import { PurchaseRepository } from "@/domain/out/PurchaseRepository";
import { Purchase } from "@/domain/model/purchase";
import { UpdatePurchase } from "@/domain/in/purchase";

export class PurchaseService
  implements QueryPurchase, CreatePurchase, DeletePurchase, UpdatePurchase
{
  constructor(private purchaseRepository: PurchaseRepository) {}

  getPurchase(id: Purchase["id"]) {
    return this.purchaseRepository.findPurchaseBy(id);
  }

  getPurchaseList() {
    return this.purchaseRepository.findAllPurchases();
  }

  createPurchase(draft: Omit<Purchase, "id">) {
    return this.purchaseRepository.createPurchase(draft);
  }

  updatePurchase(draft: Purchase) {
    return this.purchaseRepository.updatePurchase(draft);
  }

  deletePurchase(id: Purchase["id"]) {
    return this.purchaseRepository.removePurchase(id);
  }
}
