import { MaterialType } from "../material/Material";

export class Ingredient {
  materialId: MaterialType["id"];
  amount: number;

  constructor(materialId: MaterialType["id"], amount: number) {
    this.materialId = materialId;
    this.amount = amount;
  }
}
