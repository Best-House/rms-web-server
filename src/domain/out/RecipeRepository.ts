import { Recipe } from "../model/recipe";

export interface RecipeRepository {
  findRecipeBy(id: Recipe["id"]): Promise<Recipe>;
  findAllRecipe(): Promise<Recipe[]>;
  createRecipe(draft: Omit<Recipe, "id">): Promise<{ id: Recipe["id"] }>;
  updateRecipe(draft: Recipe): Promise<void>;
  deleteRecipe(id: Recipe["id"]): Promise<void>;
}
