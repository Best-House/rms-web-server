import { PurchaseRepository } from "@/domain/out/PurchaseRepository";
import { HTTPClient } from "@/external-interfaces/api/HTTPClient";
import { Purchase } from "@/domain/model/purchase";

interface PurchaseResponse {
  id: string;
  purchaseItems: Array<{
    materialId: string;
    price: number;
    amount: number;
    purchaseDate?: number;
  }>;
}

export class PurchaseAPIClient implements PurchaseRepository {
  constructor(private httpClient: HTTPClient) {}

  async findPurchaseBy(id: Purchase["id"]) {
    const response = await this.httpClient.get<PurchaseResponse>(
      `/purchases/${id}`,
    );
    return Purchase.from(response);
  }

  async findAllPurchases() {
    const response =
      await this.httpClient.get<PurchaseResponse[]>(`/purchases`);

    return response.map((x) => Purchase.from(x));
  }

  async createPurchase(draft: Omit<Purchase, "id">) {
    const response = await this.httpClient.post<{ id: Purchase["id"] }>(
      "/purchases",
      {
        body: draft.json,
      },
    );

    return response;
  }

  updatePurchase(draft: Purchase) {
    const { id, ...rest } = draft.json;

    return this.httpClient.put<void>(`/purchases/${id}`, {
      body: rest,
    });
  }

  removePurchase(id: Purchase["id"]) {
    return this.httpClient.delete<void>(`/purchases/${id}`);
  }
}
