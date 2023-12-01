import { DraftMaterial, Material } from "@/domain/model/material/Material";

export interface CreateMaterial {
  createMaterial(draftMaterial: DraftMaterial): Promise<Material>;
}
