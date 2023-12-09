import {
  IdentifyMaterial,
  DraftMaterial,
  Material,
} from "@/domain/model/material/Material";

export interface MaterialRepository {
  getMaterial({ id }: IdentifyMaterial): Promise<Material>;
  findAllMaterials(): Promise<Material[]>;
  saveMaterial(draftMaterial: DraftMaterial): Promise<Material>;
  removeMaterial(material: Material): Promise<Material>;
}
