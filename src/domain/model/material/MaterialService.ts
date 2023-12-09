import { QueryMaterial } from "@/domain/in/QueryMaterial";
import {
  IdentifyMaterial,
  DraftMaterial,
  Material,
} from "@/domain/model/material/Material";
import { MaterialRepository } from "@/domain/out/MaterialRepository";
import { CreateMaterial } from "@/domain/in/CreateMaterial";
import { DeleteMaterial } from "@/domain/in/DeleteMaterial";

export class MaterialService
  implements QueryMaterial, CreateMaterial, DeleteMaterial
{
  constructor(private materialRepository: MaterialRepository) {}

  getMaterial({ id }: IdentifyMaterial) {
    return this.materialRepository.getMaterial({ id });
  }

  getMaterials(): Promise<Material[]> {
    return this.materialRepository.findAllMaterials();
  }

  createMaterial(draftMaterial: DraftMaterial): Promise<Material> {
    return this.materialRepository.saveMaterial(draftMaterial);
  }

  updateMaterial(material: Material): Promise<Material> {
    return this.materialRepository.updateMaterial(material);
  }

  deleteMaterial(material: Material): Promise<Material> {
    return this.materialRepository.removeMaterial(material);
  }
}
