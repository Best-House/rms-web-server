import { test, expect, describe, vi } from "vitest";
import { Material } from "@/domain/model/material/Material";
import { MaterialService } from "@/domain/model/material/MaterialService";
import { MaterialRepository } from "@/domain/out/MaterialRepository";

describe("원자재", () => {
  test("원자재를 조회한다.", async () => {
    const mockMaterialRepository = new MockMaterialRepository();
    mockMaterialRepository.findMaterialBy = vi.fn((id: string) =>
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
    const materials = await materialService.getMaterialList();
    expect(materials).toStrictEqual([
      new Material("1", "테스트원자재", 10000),
      new Material("2", "테스트원자재2", 20000),
    ]);
  });

  test("원자재를 생성한다", async () => {
    const mockMaterialRepository = new MockMaterialRepository();
    mockMaterialRepository.createMaterial = vi.fn((params) =>
      Promise.resolve(
        new Material("testId", params.name, params.defaultUnitPrice),
      ),
    );

    const materialService = new MaterialService(mockMaterialRepository);
    const createdMaterial = await materialService.createMaterial(
      Material.from({
        id: "id",
        name: "테스트원자재",
        defaultUnitPrice: 10000,
      }),
    );
    expect(createdMaterial.id).not.toBeNull();
  });

  test("원자재를 수정한다.", async () => {
    const mockMaterialRepository = new MockMaterialRepository();
    mockMaterialRepository.updateMaterial = vi.fn(() => Promise.resolve());

    const materialService = new MaterialService(mockMaterialRepository);
    const mockMaterial = new Material("1", "테스트원자재", 10000);
    await materialService.updateMaterial(mockMaterial);
    expect(mockMaterialRepository.updateMaterial).toBeCalledTimes(1);
  });

  test("원자재를 삭제한다", async () => {
    const mockMaterialRepository = new MockMaterialRepository();
    mockMaterialRepository.removeMaterial = vi.fn(() => Promise.resolve());

    const materialService = new MaterialService(mockMaterialRepository);
    const mockMaterial = new Material("1", "테스트원자재", 10000);

    await materialService.deleteMaterial(mockMaterial.id);
    expect(mockMaterialRepository.removeMaterial).toBeCalledTimes(1);
  });
});

class MockMaterialRepository implements MaterialRepository {
  findMaterialBy(_id: string): Promise<Material> {
    throw new Error("Method not implemented.");
  }

  findAllMaterials(): Promise<Material[]> {
    throw new Error("Method not implemented.");
  }

  createMaterial(_daft: Omit<Material, "id">): Promise<{ id: Material["id"] }> {
    throw new Error("Method not implemented.");
  }

  updateMaterial(_draft: Material): Promise<void> {
    throw new Error("Method not implemented.");
  }

  removeMaterial(_id: Material["id"]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
