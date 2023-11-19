import { IngredientScheme } from "@/domain/aggregate/recipe/Ingredient";
import { Recipe, RecipeScheme } from "@/domain/aggregate/recipe/Recipe";
import { ApiClient } from "@/remotes/ApiClient";

export class RecipeService {
  constructor(private readonly apiClient: ApiClient) {}

  public async getRecipe({ id }: { id: Recipe["id"] }) {
    const response = await this.apiClient.get<
      RecipeScheme & { ingredients: IngredientScheme[] }
    >(`/recipes/${id}`);

    return Recipe.from(response);
  }

  public async getRecipes() {
    const response =
      await this.apiClient.get<
        Array<RecipeScheme & { ingredients: IngredientScheme[] }>
      >("/recipes");

    return response.map((x) => Recipe.from(x));
  }

  public createRecipe(params: Recipe) {
    const { name, ingredients } = params.json;

    return this.apiClient.post<{ id: RecipeScheme["id"] }>("/recipes", {
      body: { name, ingredients },
    });
  }

  public updateRecipe(params: Recipe) {
    const { id, name, ingredients } = params.json;

    return this.apiClient.put(`/recipes/${id}`, {
      body: { name, ingredients },
    });
  }

  public deleteRecipe({ id }: { id: Recipe["id"] }) {
    return this.apiClient.delete(`/recipes/${id}`);
  }
}
