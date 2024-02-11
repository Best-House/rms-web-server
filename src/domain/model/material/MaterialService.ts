import { Material } from "@/domain/model/material";
import { MaterialRepository } from "@/domain/out/MaterialRepository";
import {
  CreateMaterial,
  DeleteMaterial,
  UpdateMaterial,
  QueryMaterial,
} from "@/domain/in/material";

export class MaterialService
  implements QueryMaterial, CreateMaterial, DeleteMaterial, UpdateMaterial
{
  constructor(private materialRepository: MaterialRepository) {}

  getMaterial(id: Material["id"]) {
    return this.materialRepository.findMaterialBy(id);
  }

  getMaterialList() {
    return this.materialRepository.findAllMaterials();
  }

  createMaterial(draft: Omit<Material, "id">) {
    return this.materialRepository.createMaterial(draft);
  }

  updateMaterial(draft: Material) {
    return this.materialRepository.updateMaterial(draft);
  }

  deleteMaterial(id: Material["id"]) {
    return this.materialRepository.removeMaterial(id);
  }
}
