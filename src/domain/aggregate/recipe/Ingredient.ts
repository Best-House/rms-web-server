import { MaterialScheme } from "../material/Material";

export class Ingredient {
  constructor(
    public readonly materialId: IngredientScheme["materialId"],
    public readonly amount: IngredientScheme["amount"],
  ) {}

  public get json() {
    return {
      materialId: this.materialId,
      amount: this.amount,
    };
  }

  public static from({ materialId, amount }: IngredientScheme) {
    return new Ingredient(materialId, amount);
  }
}

/** 재료 */
export interface IngredientScheme {
  /** 원자재 식별자 */
  materialId: MaterialScheme["id"];
  /** 원자재 양 */
  amount: number;
}
