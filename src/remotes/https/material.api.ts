import { Material } from "@/domain/aggregate/material/Material";
import { apiClient } from "./apiClient";

interface GetMaterialResponse {
  id: string;
  name: string;
  priceInfo?: {
    price: number;
    amount: number;
  };
}

export function getMaterial(params: { id: Material["id"] }) {
  return apiClient.get<GetMaterialResponse>("/materials", {
    searchParams: params,
  });
}

type GetMaterialsResponse = GetMaterialResponse[];

export function getMaterials() {
  return apiClient.get<GetMaterialsResponse>("/materials");
}

type CreateMaterialParams =
  | {
      id: string;
      name: string;
    }
  | {
      id: string;
      name: string;
      price: number;
      amount: number;
    };

export function createMaterial(params: CreateMaterialParams) {
  return apiClient.post("/materials", {
    searchParams: { id: params.id },
    body: params,
  });
}

type UpdateMaterialParams = CreateMaterialParams;

export function updateMaterial(params: UpdateMaterialParams) {
  return apiClient.put("/materials", {
    searchParams: { id: params.id },
    body: params,
  });
}

export function deleteMaterial(params: { id: Material["id"] }) {
  return apiClient.delete("/materials", { searchParams: params });
}
