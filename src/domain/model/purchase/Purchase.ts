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

/** 원자재 구매 이력 */
export class PurchaseScheme {
  /** 원자재 구매 이력 식별자 */
  id: string;
  /** 원자재 구매 목록 */
  purchaseItems: Array<{
    /** 원자재 식별자 */
    materialId: string;
    /** 원자재 구매 금액 */
    price: number;
    /** 원자재 구매 양 */
    amount: number;
    /** 원자재 구매 날짜 */
    purchaseDate?: number;
  }>;
}
