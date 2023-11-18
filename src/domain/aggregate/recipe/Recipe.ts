import { Ingredient } from "./Ingredient";

export class Recipe {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly ingredients: Ingredient[],
  ) {}

  public get json() {
    return {
      id: this.id,
      name: this.name,
      ingredients: this.ingredients.map((ingredient) => ingredient.json),
    };
  }
}
