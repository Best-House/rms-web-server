import { MaterialRepository } from "@/domain/out/MaterialRepository";
import { HTTPClient } from "@/external-interfaces/api/HTTPClient";
import { Material } from "@/domain/model/material";

interface MaterialResponse {
  id: string;
  name: string;
  defaultUnitPrice?: number;
}

export class MaterialAPIClient implements MaterialRepository {
  constructor(private httpClient: HTTPClient) {}

  async findMaterialBy(id: Material["id"]) {
    const response = await this.httpClient.get<MaterialResponse>(
      `/materials/${id}`,
    );
    return Material.from(response);
  }

  async findAllMaterials() {
    const response =
      await this.httpClient.get<MaterialResponse[]>(`/materials`);

    return response.map((x) => Material.from(x));
  }

  async createMaterial(draft: Omit<Material, "id">) {
    const response = await this.httpClient.post<{ id: Material["id"] }>(
      "/materials",
      {
        body: draft.json,
      },
    );

    return response;
  }

  updateMaterial(draft: Material) {
    const { id, ...rest } = draft.json;

    return this.httpClient.put<void>(`/materials/${id}`, {
      body: rest,
    });
  }

  removeMaterial(id: Material["id"]) {
    return this.httpClient.delete<void>(`/materials/${id}`);
  }
}
