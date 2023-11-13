import { Material } from "../material/Material";

export class Ingredient {
  constructor(
    public readonly materialId: Material["id"],
    public readonly amount: number
  ) {}

  public get json() {
    return {
      materialId: this.materialId,
      amount: this.amount,
    };
  }
}
