import { Material } from "@/domain/model/material/Material";

export interface CreateMaterial {
  createMaterial(draft: Omit<Material, "id">): Promise<{ id: Material["id"] }>;
}
