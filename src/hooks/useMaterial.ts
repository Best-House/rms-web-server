import { Material } from "@/domain/aggregate/material/Material";
import { useSuspendedQuery } from "@toss/react-query";
import { UseQueryOptions, useMutation, useQueryClient } from "react-query";
import { MaterialService } from "../domain/service/MaterialService";

export function useQueryMaterial(
  { id }: { id: Material["id"] },
  queryOptions?: Omit<UseQueryOptions<Material>, "queryKey" | "queryFn">
) {
  const materialService = new MaterialService();

  return useSuspendedQuery(
    ["materials", id],
    () => {
      return materialService.getMaterial({ id });
    },
    queryOptions
  );
}

export function useQueryMaterials(
  queryOptions?: Omit<UseQueryOptions<Material[]>, "queryKey" | "queryFn">
) {
  const materialService = new MaterialService();

  return useSuspendedQuery(
    ["materials"],
    () => {
      return materialService.getMaterials();
    },
    queryOptions
  );
}

function useRefetchMaterials() {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.refetchQueries(["materials"]);
  };
}

export function useCreateMaterial() {
  const materialService = new MaterialService();
  const refetchMaterials = useRefetchMaterials();

  return useMutation(
    (...params: Parameters<typeof materialService.createMaterial>) =>
      materialService.createMaterial(...params),
    {
      onSuccess: refetchMaterials,
    }
  );
}

export function useUpdateMaterial() {
  const materialService = new MaterialService();
  const refetchMaterials = useRefetchMaterials();

  return useMutation(
    (...params: Parameters<typeof materialService.updateMaterial>) =>
      materialService.updateMaterial(...params),
    {
      onSuccess: refetchMaterials,
    }
  );
}

export function useRemoveMaterial() {
  const materialService = new MaterialService();
  const refetchMaterials = useRefetchMaterials();

  return useMutation(
    (...params: Parameters<typeof materialService.deleteMaterial>) =>
      materialService.deleteMaterial(...params),
    {
      onSuccess: refetchMaterials,
    }
  );
}
