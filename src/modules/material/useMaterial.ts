import { Material } from "@/domain/aggregate/material/Material";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MaterialService } from "@/service/MaterialService";

export function useQueryMaterial({ id }: { id: Material["id"] }) {
  const materialService = new MaterialService();

  return useSuspenseQuery({
    queryKey: ["materials", id],
    queryFn: () => {
      return materialService.getMaterial({ id });
    },
  });
}

export function useQueryMaterials() {
  const materialService = new MaterialService();

  return useSuspenseQuery({
    queryKey: ["materials"],
    queryFn: () => {
      return materialService.getMaterials();
    },
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
  const refetch = useRefetchMaterials();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof materialService.createMaterial>
    ) => materialService.createMaterial(...params),
    onSuccess: refetch,
  });
}

export function useUpdateMaterial() {
  const materialService = new MaterialService();
  const refetch = useRefetchMaterials();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof materialService.updateMaterial>
    ) => materialService.updateMaterial(...params),
    onSuccess: refetch,
  });
}

export function useDeleteMaterial() {
  const materialService = new MaterialService();
  const refetch = useRefetchMaterials();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof materialService.deleteMaterial>
    ) => materialService.deleteMaterial(...params),
    onSuccess: refetch,
  });
}
