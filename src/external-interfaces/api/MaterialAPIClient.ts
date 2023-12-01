import { MaterialRepository } from "@/domain/out/MaterialRepository";
import { HTTPClient } from "@/external-interfaces/api/HTTPClient";
import { DraftMaterial, Material } from "@/domain/model/material/Material";

type GetMaterialsResponse = APIMaterial[];

interface APIMaterial {
  id: string;
  name: string;
  defaultUnitPrice?: number;
}

export class MaterialAPIClient implements MaterialRepository {
  constructor(private httpClient: HTTPClient) {}

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
}
