import { Ingredient, IngredientScheme } from "./Ingredient";

export class Recipe {
  constructor(
    public readonly id: RecipeScheme["id"],
    public readonly name: RecipeScheme["name"],
    public readonly ingredients: Ingredient[],
  ) {}

  public get json() {
    return {
      id: this.id,
      name: this.name,
      ingredients: this.ingredients.map((ingredient) => ingredient.json),
    };
  }

  public static from({ id, name, ingredients }: RecipeScheme) {
    return new Recipe(
      id,
      name,
      ingredients.map(
        (ingredient) =>
          new Ingredient(ingredient.materialId, ingredient.amount),
      ),
    );
  }
}

/** 레시피 */
export interface RecipeScheme {
  /** 레시피 식별자 */
  id: string;
  /** 레시피 이름 */
  name: string;
  /** 레시피에 들어가는 재료 리스트 */
  ingredients: IngredientScheme[];
}
