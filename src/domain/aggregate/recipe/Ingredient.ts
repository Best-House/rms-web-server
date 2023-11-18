import { Material } from "../material/Material";

/** 재료 */
export class Ingredient {
  constructor(
    /** 원자재 식별자 */
    public readonly materialId: Material["id"],
    /** 원자재 양*/
    public readonly amount: number,
  ) {}

  public get json() {
    return {
      materialId: this.materialId,
      amount: this.amount,
    };
  }

  public static from(params: { materialId: Material["id"]; amount: number }) {
    return new Ingredient(params.materialId, params.amount);
  }
}
