import { Material } from "@/domain/aggregate/material/Material";
import {
  UseSuspenseQueryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MaterialService } from "@/service/MaterialService";

export function useQueryMaterial(
  { id }: { id: Material["id"] },
  queryOptions?: Omit<
    UseSuspenseQueryOptions<Material>,
    "queryKey" | "queryFn"
  >,
) {
  const materialService = new MaterialService();

  return useSuspenseQuery({
    queryKey: ["materials", id],
    queryFn: () => {
      return materialService.getMaterial({ id });
    },
    ...queryOptions,
  });
}

export function useQueryMaterials(
  queryOptions?: Omit<
    UseSuspenseQueryOptions<Material[]>,
    "queryKey" | "queryFn"
  >,
) {
  const materialService = new MaterialService();

  return useSuspenseQuery({
    queryKey: ["materials"],
    queryFn: () => {
      return materialService.getMaterials();
    },
    ...queryOptions,
  });
}

function useRefetchMaterials() {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.refetchQueries({ queryKey: ["materials"] });
  };
}

export function useCreateMaterial() {
  const materialService = new MaterialService();
  const refetchMaterials = useRefetchMaterials();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof materialService.createMaterial>
    ) => materialService.createMaterial(...params),
    onSuccess: refetchMaterials,
  });
}

export function useUpdateMaterial() {
  const materialService = new MaterialService();
  const refetchMaterials = useRefetchMaterials();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof materialService.updateMaterial>
    ) => materialService.updateMaterial(...params),
    onSuccess: refetchMaterials,
  });
}

export function useRemoveMaterial() {
  const materialService = new MaterialService();
  const refetchMaterials = useRefetchMaterials();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof materialService.deleteMaterial>
    ) => materialService.deleteMaterial(...params),
    onSuccess: refetchMaterials,
  });
}
