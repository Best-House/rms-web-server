import { Material } from "@/domain/model/material";

export interface MaterialRepository {
  findMaterialBy(id: Material["id"]): Promise<Material>;
  findAllMaterials(): Promise<Material[]>;
  createMaterial(draft: Omit<Material, "id">): Promise<{ id: Material["id"] }>;
  updateMaterial(draft: Material): Promise<void>;
  removeMaterial(id: Material["id"]): Promise<void>;
}
