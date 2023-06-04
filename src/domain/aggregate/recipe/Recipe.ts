import { Ingredient } from "./Ingredient";

export class Recipe {
  public id;
  public name;
  public ingredients;

  constructor(id: string, name: string, ingredients: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
  }
}
