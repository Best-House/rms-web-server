import { Ingredient } from "./Ingredient";

/** 레시피 */
export class Recipe {
  constructor(
    /** 레시피 식별자 */
    public readonly id: string,
    /** 레시피 이름 */
    public readonly name: string,
    /** 레시피에 들어가는 재료 리스트 */
    public readonly ingredients: Ingredient[],
  ) {}

  public get json() {
    return {
      id: this.id,
      name: this.name,
      ingredients: this.ingredients.map((ingredient) => ingredient.json),
    };
  }
}
