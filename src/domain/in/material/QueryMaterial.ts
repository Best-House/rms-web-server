import { Material } from "@/domain/model/material/Material";

export interface QueryMaterial {
  getMaterialList(): Promise<Material[]>;
  getMaterial(id: Material["id"]): Promise<Material>;
}
