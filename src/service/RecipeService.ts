import { Recipe } from "@/domain/aggregate/recipe/Recipe";
import { HttpApiClient } from "@/remotes/https/HttpApiClient";

export class RecipeService {
  private readonly apiClient = new HttpApiClient();

  public async getRecipe({ id }: { id: Recipe["id"] }) {
    const response = await this.apiClient.get<{
      id: Recipe["id"];
      name: Recipe["name"];
      ingredients: Recipe["ingredients"];
    }>(`/recipes/${id}`);

    return new Recipe(response.id, response.name, response.ingredients);
  }

  public async getRecipes() {
    const response = await this.apiClient.get<
      {
        id: Recipe["id"];
        name: Recipe["name"];
        ingredients: Recipe["ingredients"];
      }[]
    >("/recipes");

    return response.map((x) => new Recipe(x.id, x.name, x.ingredients));
  }

  public createRecipe(params: {
    name: Recipe["name"];
    ingredients: Recipe["ingredients"];
  }) {
    return this.apiClient.post<{ id: Recipe["id"] }>("/recipes", {
      body: params,
    });
  }

  public updateRecipe({
    id,
    ...params
  }: {
    id: Recipe["id"];
    name: Recipe["name"];
    ingredients: Recipe["ingredients"];
  }) {
    return this.apiClient.put<{ id: Recipe["id"] }>(`/recipes/${id}`, {
      body: params,
    });
  }

  public deleteRecipe({ id }: { id: Recipe["id"] }) {
    return this.apiClient.delete(`/recipes/${id}`);
  }
}
