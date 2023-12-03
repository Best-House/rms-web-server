import { test, expect, describe, vi } from "vitest";
import { DraftMaterial, Material } from "@/domain/model/material/Material";
import { MaterialService } from "@/domain/model/material/MaterialService";

describe("원재자", () => {
  test("원자재들을 조회한다.", async () => {
    const mockMaterialRepository = new MockMaterialRepositoryBuilder()
      .onFindAllMaterials(
        vi.fn(() =>
          Promise.resolve([
            new Material("1", "테스트원자재", 10000),
            new Material("2", "테스트원자재2", 20000),
          ]),
        ),
      )
      .build();

    const materialService = new MaterialService(mockMaterialRepository);
    const materials = await materialService.getMaterials();
    expect(materials).toStrictEqual([
      new Material("1", "테스트원자재", 10000),
      new Material("2", "테스트원자재2", 20000),
    ]);
  });

  test("원자재를 생성한다", async () => {
    const mockMaterialRepository = new MockMaterialRepositoryBuilder()
      .onSaveMaterial(
        vi.fn((params) =>
          Promise.resolve(
            new Material("testId", params.name, params.defaultUnitPrice),
          ),
        ),
      )
      .build();

    const materialService = new MaterialService(mockMaterialRepository);
    const createdMaterial = await materialService.createMaterial({
      name: "테스트원자재",
      defaultUnitPrice: 10000,
    });
    expect(createdMaterial.id).not.toBeNull();
    expect(createdMaterial.name).toEqual("테스트원자재");
    expect(createdMaterial.defaultUnitPrice).toEqual(10000);
  });

  test("원자재를 삭제한다", async () => {
    const mockMaterialRepository = new MockMaterialRepositoryBuilder()
      .onRemoveMaterial(vi.fn((params) => Promise.resolve(params)))
      .build();

    const materialService = new MaterialService(mockMaterialRepository);
    const mockMaterial = new Material("1", "테스트원자재", 10000);

    await materialService.deleteMaterial(mockMaterial);
    expect(mockMaterialRepository.removeMaterial).toBeCalledWith(mockMaterial);
  });
});

class MockMaterialRepositoryBuilder {
  private findAllMaterials: () => Promise<Material[]>;
  private saveMaterial: (draftMaterial: DraftMaterial) => Promise<Material>;
  private removeMaterial: (material: Material) => Promise<Material>;
  constructor() {
    this.findAllMaterials = vi.fn();
    this.saveMaterial = vi.fn();
    this.removeMaterial = vi.fn();
  }

  onFindAllMaterials(fn: () => Promise<Material[]>) {
    this.findAllMaterials = fn;
    return this;
  }

  onSaveMaterial(fn: (draftMaterial: DraftMaterial) => Promise<Material>) {
    this.saveMaterial = fn;
    return this;
  }

  onRemoveMaterial(fn: (material: Material) => Promise<Material>) {
    this.removeMaterial = fn;
    return this;
  }
  build() {
    return {
      findAllMaterials: this.findAllMaterials,
      saveMaterial: this.saveMaterial,
      removeMaterial: this.removeMaterial,
    };
  }
}
