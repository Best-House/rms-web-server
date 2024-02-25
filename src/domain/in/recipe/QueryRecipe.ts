import { Material } from "@/domain/model/material";
import { Recipe } from "../../model/recipe";

export interface QueryRecipe {
  getRecipeList: () => Promise<Recipe[]>;
  getRecipe: (id: Recipe["id"]) => Promise<Recipe>;
  getCost: (id: Recipe["id"]) => Promise<{
    cost: number;
    unknownPriceMaterialIds: Array<Material["id"]>;
  }>;
}
