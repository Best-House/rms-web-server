import { MaterialRepository } from "@/domain/out/MaterialRepository";
import { HTTPClient } from "@/external-interfaces/api/HTTPClient";
import {
  IdentifyMaterial,
  DraftMaterial,
  Material,
  MaterialScheme,
} from "@/domain/model/material/Material";

type GetMaterialsResponse = APIMaterial[];

interface APIMaterial {
  id: string;
  name: string;
  defaultUnitPrice?: number;
}

export class MaterialAPIClient implements MaterialRepository {
  constructor(private httpClient: HTTPClient) {}

  async getMaterial({ id }: IdentifyMaterial) {
    const response = await this.httpClient.get<MaterialScheme>(
      `/materials/${id}`,
    );
    return Material.from(response);
  }

  async findAllMaterials() {
    const response =
      await this.httpClient.get<GetMaterialsResponse>(`/materials`);

    return response.map((x) => Material.from(x));
  }

  async saveMaterial(draftMaterial: DraftMaterial): Promise<Material> {
    const response = await this.httpClient.post<{ id: string }>("/materials", {
      body: {
        name: draftMaterial.name,
        defaultUnitPrice: draftMaterial.defaultUnitPrice,
      },
    });

    return Material.from({
      id: response.id,
      name: draftMaterial.name,
      defaultUnitPrice: draftMaterial.defaultUnitPrice,
    });
  }

  async removeMaterial(material: Material): Promise<Material> {
    await this.httpClient.delete(`/materials/${material.id}`);

    return material;
  }
}
