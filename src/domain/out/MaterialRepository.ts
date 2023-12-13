import { DraftMaterial, Material } from "@/domain/model/material/Material";

export interface MaterialRepository {
  findBy(id: Material["id"]): Promise<Material>;
  findAllMaterials(): Promise<Material[]>;
  saveMaterial(draftMaterial: DraftMaterial): Promise<Material>;
  updateMaterial(material: Material): Promise<Material>;
  removeMaterial(material: Material): Promise<Material>;
}
