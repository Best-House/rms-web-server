import { test, expect, describe } from "vitest";
import { Material } from "@/domain/model/material/Material";
import { MaterialService } from "@/domain/model/material/MaterialService";

describe("원재자", () => {
  test("원자재들을 조회한다.", async () => {
    const mockMaterialRepository = {
      findAllMaterials(): Promise<Material[]> {
        return Promise.resolve([
          new Material("1", "테스트원자재", 10000),
          new Material("2", "테스트원자재2", 20000),
        ]);
      },
      createMaterial(_): Promise<Material> {
        return Promise.reject();
      },
    };
    const materialService = new MaterialService(mockMaterialRepository);
    const materials = await materialService.getMaterials();
    expect(materials).toStrictEqual([
      new Material("1", "테스트원자재", 10000),
      new Material("2", "테스트원자재2", 20000),
    ]);
  });

  test("원자재를 생성한다", async () => {
    const materialRepository = {
      findAllMaterials(): Promise<Material[]> {
        return Promise.reject();
      },
      createMaterial(params): Promise<Material> {
        return Promise.resolve(
          new Material("testId", params.name, params.defaultUnitPrice),
        );
      },
    };
    const materialService = new MaterialService(materialRepository);
    const createdMaterial = await materialService.createMaterial({
      name: "테스트원자재",
      defaultUnitPrice: 10000,
    });
    expect(createdMaterial.id).not.toBeNull();
    expect(createdMaterial.name).toEqual("테스트원자재");
    expect(createdMaterial.defaultUnitPrice).toEqual(10000);
  });
});
