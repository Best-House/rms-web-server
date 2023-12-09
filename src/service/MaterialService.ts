import { Material } from "@/domain/model/material/Material";
import { ApiClient } from "@/remotes/ApiClient";

export class MaterialService {
  constructor(private readonly apiClient: ApiClient) {}

  public updateMaterial(params: Material) {
    const { id, name, defaultUnitPrice } = params.json;

    return this.apiClient.put(`/materials/${id}`, {
      body: { name, defaultUnitPrice },
    });
  }
}
