import { DraftMaterial, Material } from "@/domain/model/material/Material";

export interface MaterialRepository {
  findAllMaterials(): Promise<Material[]>;
  createMaterial(draftMaterial: DraftMaterial): Promise<Material>;
}