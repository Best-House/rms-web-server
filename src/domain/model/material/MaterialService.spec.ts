import { test, expect } from "vitest";
import { Material } from "@/domain/model/material/Material";
import { MaterialService } from "@/domain/model/material/MaterialService";

test("원자재들을 조회한다.", async () => {
  const mockMaterialRepository = {
    findAllMaterials(): Promise<Material[]> {
      return Promise.resolve([
        new Material("1", "테스트원자재", 10000),
        new Material("2", "테스트원자재2", 20000),
      ]);
    },
  };
  const materialService = new MaterialService(mockMaterialRepository);
  const materials = await materialService.getMaterials();
  expect(materials).toStrictEqual([
    new Material("1", "테스트원자재", 10000),
    new Material("2", "테스트원자재2", 20000),
  ]);
});
