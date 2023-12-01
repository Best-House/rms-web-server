import { test, expect, describe, vi } from "vitest";
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
      saveMaterial(_): Promise<Material> {
        return Promise.reject(_);
      },
      removeMaterial: vi.fn(),
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
      saveMaterial(params): Promise<Material> {
        return Promise.resolve(
          new Material("testId", params.name, params.defaultUnitPrice),
        );
      },
      removeMaterial: vi.fn(),
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

  test("원자재를 삭제한다", async () => {
    const mockMaterialRepository = {
      findAllMaterials: vi.fn(() =>
        Promise.resolve([
          new Material("1", "테스트원자재", 10000),
          new Material("2", "테스트원자재2", 20000),
        ]),
      ),
      saveMaterial: vi.fn((params) =>
        Promise.resolve(
          new Material("testId", params.name, params.defaultUnitPrice),
        ),
      ),
      removeMaterial: vi.fn((params) => Promise.resolve(params)),
    };
    const materialService = new MaterialService(mockMaterialRepository);
    const mockMaterial = new Material("1", "테스트원자재", 10000);

    await materialService.deleteMaterial(mockMaterial);
    expect(mockMaterialRepository.removeMaterial).toBeCalledWith(mockMaterial);
  });
});
