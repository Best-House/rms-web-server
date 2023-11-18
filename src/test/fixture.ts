import { Material } from "@/domain/aggregate/material/Material";
import { Ingredient } from "@/domain/aggregate/recipe/Ingredient";
import { Recipe } from "@/domain/aggregate/recipe/Recipe";

export const material01 = new Material("Material_1", "커피");

export const material02 = new Material("Material_2", "물");

export const materialList = [material01, material02];

export const ingredient01 = new Ingredient(material01.id, 100);

export const ingredient02 = new Ingredient(material02.id, 200);

export const recipe = new Recipe("Recipe_1", "아메리카노", [
  ingredient01,
  ingredient02,
]);
