import { PurchaseRepository } from "@/domain/out/PurchaseRepository";
import { HTTPClient } from "@/external-interfaces/api/HTTPClient";
import {
  MaterialInPurchaseItems,
  Purchase,
  PurchaseScheme,
} from "@/domain/model/purchase/Purchase";

type GetPurchasesResponse = { id: string; purchaseItems: APIPurchase[] };

interface APIPurchase {
  materialId: string;
  price: number;
  amount: number;
  purchaseDate?: number;
}

export class PurchaseAPIClient implements PurchaseRepository {
  constructor(private httpClient: HTTPClient) {}

  async findBy(id: Purchase["id"]) {
    const response = await this.httpClient.get<PurchaseScheme>(
      `/purchases/${id}`,
    );
    return Purchase.from(response);
  }

  async findAllPurchases() {
    const response =
      await this.httpClient.get<GetPurchasesResponse>(`/purchases`);

    return response.purchaseItems.map((x) =>
      Purchase.from({ id: response.id, purchaseItems: [x] }),
    );
  }

  async savePurchase(
    materialInPurchaseItems: MaterialInPurchaseItems,
  ): Promise<Purchase> {
    const response = await this.httpClient.post<{ id: string }>("/purchases", {
      body: {
        materialId: materialInPurchaseItems.materialId,
        price: materialInPurchaseItems.price,
        amount: materialInPurchaseItems.amount,
      },
    });

    return Purchase.from({
      id: response.id,
      purchaseItems: [materialInPurchaseItems],
    });
  }

  async updatePurchase(purchase: Purchase) {
    const { id, purchaseItems } = purchase.json;

    await this.httpClient.put(`/purchases/${id}`, {
      body: { purchaseItems },
    });

    return purchase;
  }

  async removePurchase(purchase: Purchase): Promise<Purchase> {
    await this.httpClient.delete(`/purchases/${purchase.id}`);

    return purchase;
  }
}
