import { Recipe } from "../../model/recipe";

export interface CreateRecipe {
  createRecipe: (draft: Omit<Recipe, "id">) => Promise<{ id: Recipe["id"] }>;
}
