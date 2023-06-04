import { Material } from "@/domain/aggregate/material/Material";
import { apiClient } from "./apiClient";

interface GetMaterialResponse {
  id: Material["id"];
  name: Material["name"];
  priceInfo?: {
    price: number;
    amount: number;
  };
}

export async function getMaterial(params: { id: Material["id"] }) {
  const response = await apiClient.get<GetMaterialResponse>("/materials", {
    searchParams: params,
  });

  return new Material(response);
}

getMaterial.url = "/materials/:id";

type GetMaterialsResponse = GetMaterialResponse[];

export async function getMaterials() {
  const response = await apiClient.get<GetMaterialsResponse>("/materials");

  return response.map((material) => new Material(material));
}

getMaterials.url = "/materials";

type CreateMaterialParams =
  | {
      name: Material["name"];
    }
  | {
      name: Material["name"];
      price: number;
      amount: number;
    };

export function createMaterial(params: CreateMaterialParams) {
  return apiClient.post<{ id: Material["id"] }>("/materials", {
    body: params,
  });
}

type UpdateMaterialParams =
  | {
      id: Material["id"];
      name: Material["name"];
    }
  | {
      id: Material["id"];
      name: Material["name"];
      price: number;
      amount: number;
    };

export function updateMaterial(params: UpdateMaterialParams) {
  return apiClient.put<{ id: Material["id"] }>("/materials", {
    searchParams: { id: params.id },
    body: params,
  });
}

export function deleteMaterial(params: { id: Material["id"] }) {
  return apiClient.delete<{ id: Material["id"] }>("/materials", {
    searchParams: params,
  });
}
