import { Material, MaterialScheme } from "@/domain/model/material/Material";
import { ApiClient } from "@/remotes/ApiClient";

export class MaterialService {
  constructor(private readonly apiClient: ApiClient) {}

  public async getMaterial({ id }: { id: MaterialScheme["id"] }) {
    const response = await this.apiClient.get<MaterialScheme>(
      `/materials/${id}`,
    );

    return Material.from(response);
  }

  public createMaterial(params: Material) {
    const { name, defaultUnitPrice } = params.json;

    return this.apiClient.post<{ id: MaterialScheme["id"] }>("/materials", {
      body: { name, defaultUnitPrice },
    });
  }

  public updateMaterial(params: Material) {
    const { id, name, defaultUnitPrice } = params.json;

    return this.apiClient.put(`/materials/${id}`, {
      body: { name, defaultUnitPrice },
    });
  }

  public deleteMaterial({ id }: { id: Material["id"] }) {
    return this.apiClient.delete(`/materials/${id}`);
  }
}
