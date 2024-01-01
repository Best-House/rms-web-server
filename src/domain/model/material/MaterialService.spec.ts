import { test, expect, describe, vi } from "vitest";
import { DraftMaterial, Material } from "@/domain/model/material/Material";
import { MaterialService } from "@/domain/model/material/MaterialService";
import { MaterialRepository } from "@/domain/out/MaterialRepository";

describe("원자재", () => {
  test("원자재를 조회한다.", async () => {
    const mockMaterialRepository = new MockMaterialRepository();
    mockMaterialRepository.findBy = vi.fn((id: string) =>
      Promise.resolve(new Material(id, "테스트원자재", 10000)),
    );

    const materialService = new MaterialService(mockMaterialRepository);
    const material = await materialService.getMaterial("1");
    expect(material).toStrictEqual(new Material("1", "테스트원자재", 10000));
  });

  test("원자재들을 조회한다.", async () => {
    const mockMaterialRepository = new MockMaterialRepository();
    mockMaterialRepository.findAllMaterials = vi.fn(() =>
      Promise.resolve([
        new Material("1", "테스트원자재", 10000),
        new Material("2", "테스트원자재2", 20000),
      ]),
    );

    const materialService = new MaterialService(mockMaterialRepository);
    const materials = await materialService.getMaterials();
    expect(materials).toStrictEqual([
      new Material("1", "테스트원자재", 10000),
      new Material("2", "테스트원자재2", 20000),
    ]);
  });

  test("원자재를 생성한다", async () => {
    const mockMaterialRepository = new MockMaterialRepository();
    mockMaterialRepository.saveMaterial = vi.fn((params) =>
      Promise.resolve(
        new Material("testId", params.name, params.defaultUnitPrice),
      ),
    );

    const materialService = new MaterialService(mockMaterialRepository);
    const createdMaterial = await materialService.createMaterial({
      name: "테스트원자재",
      defaultUnitPrice: 10000,
    });
    expect(createdMaterial.id).not.toBeNull();
    expect(createdMaterial.name).toEqual("테스트원자재");
    expect(createdMaterial.defaultUnitPrice).toEqual(10000);
  });

  test("원자재를 수정한다.", async () => {
    const mockMaterialRepository = new MockMaterialRepository();
    mockMaterialRepository.updateMaterial = vi.fn((params) =>
      Promise.resolve(params),
    );

    const materialService = new MaterialService(mockMaterialRepository);
    const mockMaterial = new Material("1", "테스트원자재", 10000);
    await materialService.updateMaterial(mockMaterial);
    expect(mockMaterialRepository.updateMaterial).toBeCalledWith(mockMaterial);
  });

  test("원자재를 삭제한다", async () => {
    const mockMaterialRepository = new MockMaterialRepository();
    mockMaterialRepository.removeMaterial = vi.fn((params) =>
      Promise.resolve(params),
    );

    const materialService = new MaterialService(mockMaterialRepository);
    const mockMaterial = new Material("1", "테스트원자재", 10000);

    await materialService.deleteMaterial(mockMaterial);
    expect(mockMaterialRepository.removeMaterial).toBeCalledWith(mockMaterial);
  });
});

class MockMaterialRepository implements MaterialRepository {
  findBy(_id: string): Promise<Material> {
    throw new Error("Method not implemented.");
  }

  findAllMaterials(): Promise<Material[]> {
    throw new Error("Method not implemented.");
  }

  saveMaterial(_draftMaterial: DraftMaterial): Promise<Material> {
    throw new Error("Method not implemented.");
  }

  updateMaterial(_material: Material): Promise<Material> {
    throw new Error("Method not implemented.");
  }

  removeMaterial(_material: Material): Promise<Material> {
    throw new Error("Method not implemented.");
  }
}
