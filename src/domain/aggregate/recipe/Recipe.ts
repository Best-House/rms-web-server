import { Ingredient } from "./Ingredient";

export class Recipe {
  id: RecipeType["id"];
  name: RecipeType["name"];
  ingredients: RecipeType["ingredients"];

  constructor(id: string, name: string, ingredients: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
  }
}

export interface RecipeType {
  id: string;
  name: string;
  ingredients: Ingredient[];
}
