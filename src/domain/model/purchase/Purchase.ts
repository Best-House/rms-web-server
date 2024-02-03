export class Purchase {
  constructor(
    public readonly id: PurchaseScheme["id"],
    public readonly purchaseItems: PurchaseScheme["purchaseItems"],
  ) {}

  public get json() {
    return { id: this.id, purchaseItems: this.purchaseItems };
  }

  public static from({ id, purchaseItems }: PurchaseScheme) {
    return new Purchase(id, purchaseItems);
  }
}

export type MaterialInPurchaseItems = {
  materialId: string;
  price: number;
  amount: number;
  purchaseDate?: number;
};

export class PurchaseScheme {
  /** 식별자 */
  id: string;
  /** 구매 목록 */
  purchaseItems: Array<MaterialInPurchaseItems>;
}
