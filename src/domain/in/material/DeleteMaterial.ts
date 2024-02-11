import { Material } from "@/domain/model/material/Material";

export interface DeleteMaterial {
  deleteMaterial: (id: Material["id"]) => Promise<void>;
}
