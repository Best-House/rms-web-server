import { Material } from "../aggregate/material/Material";
import { HttpApiClient } from "@/remotes/https/HttpApiClient";

export class MaterialService {
  private readonly apiClient = new HttpApiClient();

  public async getMaterial({ id }: { id: Material["id"] }) {
    const response = await this.apiClient.get<{
      id: Material["id"];
      name: Material["name"];
    }>(`/materials/${id}`);

    return new Material(response.id, response.name);
  }

  public async getMaterials() {
    const response = await this.apiClient.get<
      {
        id: Material["id"];
        name: Material["name"];
      }[]
    >("/materials");

    return response.map((material) => new Material(material.id, material.name));
  }

  public createMaterial(params: { name: Material["name"] }) {
    return this.apiClient.post<{ id: Material["id"] }>("/materials", {
      body: params,
    });
  }

  public updateMaterial({
    id,
    ...params
  }: {
    id: Material["id"];
    name: Material["name"];
  }) {
    return this.apiClient.put<{ id: Material["id"] }>(`/materials/${id}`, {
      body: params,
    });
  }

  public deleteMaterial({ id }: { id: Material["id"] }) {
    return this.apiClient.delete(`/materials/${id}`);
  }
}
