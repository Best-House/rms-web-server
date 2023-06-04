import { Material } from "../material/Material";

export class Ingredient {
  public materialId;
  public amount;

  constructor(materialId: Material["id"], amount: number) {
    this.materialId = materialId;
    this.amount = amount;
  }
}
