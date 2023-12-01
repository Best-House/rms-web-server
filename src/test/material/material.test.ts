import { describe, expect, test } from "vitest";
import { Material } from "@/domain/aggregate/material/Material";
// import { Ingredient } from "@/domain/aggregate/recipe/Ingredient";
// import { Recipe } from "@/domain/aggregate/recipe/Recipe";
import { material01 } from "../fixture";

describe("원자재 단위 테스트", () => {
  const material01ToJson = {
    id: "Material_1",
    name: "커피",
    defaultUnitPrice: undefined,
  };

  test("Material.json 테스트", () => {
    expect(material01.json).toStrictEqual(material01ToJson);
  });

  test("Material.from() 테스트", () => {
    expect(Material.from(material01ToJson)).toEqual(material01ToJson);
  });
});

/*
export const material02 = new Material("Material_2", "물");

export const materialList = [material01, material02];

export const ingredient01 = new Ingredient(material01.id, 100);

export const ingredient02 = new Ingredient(material02.id, 200);

export const recipe = new Recipe("Recipe_1", "아메리카노", [
  ingredient01,
  ingredient02,
]);
*/
