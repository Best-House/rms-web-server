import { RecipeRepository } from "@/domain/out/RecipeRepository";

import { Recipe } from "./Recipe";
import {
  CreateRecipe,
  DeleteRecipe,
  QueryRecipe,
  UpdateRecipe,
} from "@/domain/in/recipe";

export class RecipeService
  implements QueryRecipe, CreateRecipe, UpdateRecipe, DeleteRecipe
{
  constructor(private readonly recipeRepository: RecipeRepository) {}

  public getRecipeList() {
    return this.recipeRepository.findAllRecipe();
  }

  public getRecipe(id: Recipe["id"]) {
    return this.recipeRepository.findRecipeBy(id);
  }

  public createRecipe(draft: Omit<Recipe, "id">) {
    return this.recipeRepository.createRecipe(draft);
  }

  public updateRecipe(draft: Recipe) {
    return this.recipeRepository.updateRecipe(draft);
  }

  public deleteRecipe(id: Recipe["id"]) {
    return this.recipeRepository.deleteRecipe(id);
  }
}
