import { Recipe } from "@/domain/model/recipe/Recipe";
import { RecipeRepository } from "@/domain/out/RecipeRepository";
import { HTTPClient } from "./HTTPClient";

interface RecipeResponse {
  id: string;
  name: string;
  ingredients: Array<{
    materialId: string;
    amount: number;
  }>;
}

export class RecipeAPIClient implements RecipeRepository {
  constructor(private httpClient: HTTPClient) {}

  async findRecipeBy(id: string) {
    const response = await this.httpClient.get<RecipeResponse>(
      `/recipes/${id}`,
    );

    return Recipe.from(response);
  }

  async findAllRecipe() {
    const response = await this.httpClient.get<RecipeResponse[]>(`/recipes`);

    return response.map((x) => Recipe.from(x));
  }

  async createRecipe(draft: Omit<Recipe, "id">) {
    const response = await this.httpClient.post<{ id: string }>(`/recipes`, {
      body: draft.json,
    });

    return response;
  }

  updateRecipe(draft: Recipe) {
    const { id, ...rest } = draft.json;

    return this.httpClient.put<void>(`/recipes/${id}`, {
      body: rest,
    });
  }

  deleteRecipe(id: Recipe["id"]) {
    return this.httpClient.delete<void>(`/recipes/${id}`);
  }

  getCost(id: Recipe["id"]) {
    return this.httpClient.get<{
      cost: number;
      unknownPriceMaterialIds: Array<string>;
    }>(`/recipes/${id}/cost`);
  }
}
