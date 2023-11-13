import { Material } from "@/domain/aggregate/material/Material";
import {
  createMaterial,
  deleteMaterial,
  getMaterial,
  getMaterials,
  updateMaterial,
} from "@/remotes/https/material.api";
import { useSuspendedQuery } from "@toss/react-query";
import { UseQueryOptions, useMutation, useQueryClient } from "react-query";

export function useQueryMaterial(
  { id }: { id: Material["id"] },
  queryOptions?: Omit<UseQueryOptions<Material>, "queryKey" | "queryFn">
) {
  return useSuspendedQuery(
    [getMaterial.url, id],
    () => {
      return getMaterial({ id });
    },
    queryOptions
  );
}

export function useQueryMaterials(
  queryOptions?: Omit<UseQueryOptions<Material[]>, "queryKey" | "queryFn">
) {
  return useSuspendedQuery(
    [getMaterials.url],
    () => {
      return getMaterials();
    },
    queryOptions
  );
}

function useRefetchMaterials() {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.refetchQueries([getMaterial.url]);
  };
}

export function useCreateMaterial() {
  const refetchMaterials = useRefetchMaterials();

  return useMutation(createMaterial, {
    onSuccess: refetchMaterials,
  });
}

export function useUpdateMaterial() {
  const refetchMaterials = useRefetchMaterials();

  return useMutation(updateMaterial, {
    onSuccess: refetchMaterials,
  });
}

export function useRemoveMaterial() {
  const refetchMaterials = useRefetchMaterials();

  return useMutation(deleteMaterial, {
    onSuccess: refetchMaterials,
  });
}
