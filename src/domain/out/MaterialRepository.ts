import { DraftMaterial, Material } from "@/domain/model/material/Material";

export interface MaterialRepository {
  findAllMaterials(): Promise<Material[]>;
  saveMaterial(draftMaterial: DraftMaterial): Promise<Material>;
}
