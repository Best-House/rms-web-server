import { QueryMaterial } from "@/domain/in/QueryMaterial";
import { Material } from "@/domain/model/material/Material";
import { MaterialRepository } from "@/domain/out/MaterialRepository";

export class MaterialService implements QueryMaterial {
  constructor(private materialRepository: MaterialRepository) {}

  getMaterials(): Promise<Material[]> {
    return this.materialRepository.findAllMaterials();
  }
}
