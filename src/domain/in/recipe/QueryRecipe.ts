import { Recipe } from "../../model/recipe";

export interface QueryRecipe {
  getRecipeList: () => Promise<Recipe[]>;
  getRecipe: (id: Recipe["id"]) => Promise<Recipe>;
}
