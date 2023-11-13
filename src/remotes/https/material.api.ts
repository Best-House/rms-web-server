import { Material } from "@/domain/aggregate/material/Material";
import { apiClient } from "./apiClient";
import { material01, material02, materialList } from "@/utils/fixture";

const localMode = true;

interface GetMaterialResponse {
  id: Material["id"];
  name: Material["name"];
}

export async function getMaterial({ id }: { id: Material["id"] }) {
  if (localMode) {
    return materialList.filter((material) => material.id === id)[0];
  }

  const response = await apiClient.get<GetMaterialResponse>(`/materials/${id}`);

  return new Material(response.id, response.name);
}

getMaterial.url = "/materials/:id";

type GetMaterialsResponse = GetMaterialResponse[];

export async function getMaterials() {
  if (localMode) {
    return materialList;
  }

  const response = await apiClient.get<GetMaterialsResponse>("/materials");

  return response.map((material) => new Material(material.id, material.name));
}

getMaterials.url = "/materials";

type CreateMaterialParams = {
  name: Material["name"];
};

export function createMaterial(params: CreateMaterialParams) {
  if (localMode) {
    return Promise.resolve({ id: material01.id });
  }

  return apiClient.post<{ id: Material["id"] }>("/materials", {
    body: params,
  });
}

type UpdateMaterialParams = {
  id: Material["id"];
  name: Material["name"];
};

export function updateMaterial({ id, ...params }: UpdateMaterialParams) {
  if (localMode) {
    return Promise.resolve({ id: material01.id });
  }

  return apiClient.put<{ id: Material["id"] }>(`/materials/${id}`, {
    body: params,
  });
}

export function deleteMaterial({ id }: { id: Material["id"] }) {
  if (localMode) {
    return Promise.resolve({ id: material01.id });
  }

  return apiClient.delete<{ id: Material["id"] }>(`/materials/${id}`);
}
