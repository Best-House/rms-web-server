import { Material } from "@/domain/aggregate/material/Material";
import {
  createMaterial,
  deleteMaterial,
  getMaterial,
  getMaterials,
  updateMaterial,
} from "@/remotes/https/material.api";
import {
  UseBaseQueryOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export function useQueryMaterial(
  { id }: { id: Material["id"] },
  queryOptions?: Omit<UseQueryOptions<Material>, "queryKey" | "queryFn">
) {
  return useQuery(
    [getMaterial.url, id],
    () => {
      return getMaterial({ id });
    },
    queryOptions
  );
}

useQueryMaterial.key = (id: Material["id"]) => [getMaterial.url, id];

export function useQueryMaterials(
  queryOptions?: Omit<UseQueryOptions<Material[]>, "queryKey" | "queryFn">
) {
  return useQuery(
    [getMaterials.url],
    () => {
      return getMaterials();
    },
    queryOptions
  );
}

useQueryMaterials.key = () => [getMaterials.url];

export function useMutateMaterial() {
  const queryClient = useQueryClient();

  const create = useMutation(createMaterial, {
    onSuccess: ({ id }) => {
      return queryClient.refetchQueries([
        useQueryMaterials.key(),
        useQueryMaterial.key(id),
      ]);
    },
  });

  const update = useMutation(updateMaterial, {
    onSuccess: ({ id }) => {
      return queryClient.refetchQueries([
        useQueryMaterials.key(),
        useQueryMaterial.key(id),
      ]);
    },
  });

  const remove = useMutation(deleteMaterial, {
    onSuccess: ({ id }) => {
      return queryClient.refetchQueries([
        useQueryMaterials.key(),
        useQueryMaterial.key(id),
      ]);
    },
  });

  return { create, update, remove };
}
