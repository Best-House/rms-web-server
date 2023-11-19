import { Material, MaterialScheme } from "@/domain/aggregate/material/Material";
import { HttpApiClient } from "@/remotes/https/HttpApiClient";

export class MaterialService {
  private readonly apiClient = new HttpApiClient();

  public async getMaterial({ id }: { id: MaterialScheme["id"] }) {
    const response = await this.apiClient.get<MaterialScheme>(
      `/materials/${id}`,
    );

    return Material.from(response);
  }

  public async getMaterials() {
    const response = await this.apiClient.get<MaterialScheme[]>("/materials");

    return response.map((x) => Material.from(x));
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
