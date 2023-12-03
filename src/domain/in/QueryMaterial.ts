import { Material } from "@/domain/model/material/Material";

export interface QueryMaterial {
  getMaterials(): Promise<Material[]>;
}
