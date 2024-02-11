import { Recipe } from "../../model/recipe";

export interface UpdateRecipe {
  updateRecipe: (recipe: Recipe) => Promise<void>;
}
