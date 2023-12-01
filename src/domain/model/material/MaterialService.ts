import { QueryMaterial } from "@/domain/in/QueryMaterial";
import { DraftMaterial, Material } from "@/domain/model/material/Material";
import { MaterialRepository } from "@/domain/out/MaterialRepository";
import { CreateMaterial } from "@/domain/in/CreateMaterial";
import { DeleteMaterial } from "@/domain/in/DeleteMaterial";

export class MaterialService
  implements QueryMaterial, CreateMaterial, DeleteMaterial
{
  constructor(private materialRepository: MaterialRepository) {}

  getMaterials(): Promise<Material[]> {
    return this.materialRepository.findAllMaterials();
  }

  createMaterial(draftMaterial: DraftMaterial): Promise<Material> {
    return this.materialRepository.saveMaterial(draftMaterial);
  }

  deleteMaterial(material: Material): Promise<Material> {
    return this.materialRepository.removeMaterial(material);
  }
}
