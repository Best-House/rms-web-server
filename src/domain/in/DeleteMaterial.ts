import { Material } from "@/domain/model/material/Material";

export interface DeleteMaterial {
  deleteMaterial: (material: Material) => Promise<Material>;
}
