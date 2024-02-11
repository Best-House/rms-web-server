import { Material } from "@/domain/model/material/Material";

export interface UpdateMaterial {
  updateMaterial(draft: Material): Promise<void>;
}
