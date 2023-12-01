import { Material } from "@/domain/model/material/Material";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MaterialService } from "@/service/MaterialService";
import { MaterialService as NewMaterialService } from "@/domain/model/material/MaterialService";
import { useApiClient } from "@/remotes/hooks/useApiClient";
import { getMaterialAPIClient } from "@/external-interfaces/api";

export function useQueryMaterial({ id }: { id: Material["id"] }) {
  const apiClient = useApiClient();
  const materialService = new MaterialService(apiClient);

  return useSuspenseQuery({
    queryKey: ["material", id],
    queryFn: () => {
      return materialService.getMaterial({ id });
    },
  });
}

export function useQueryMaterials() {
  const materialService = new NewMaterialService(getMaterialAPIClient());

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

function useRefetchMaterial() {
  const queryClient = useQueryClient();

  return (id: string) => {
    return queryClient.refetchQueries({ queryKey: ["material", id] });
  };
}

export function useCreateMaterial() {
  const materialService = new NewMaterialService(getMaterialAPIClient());
  const refetchMaterials = useRefetchMaterials();
  const refetchMaterial = useRefetchMaterial();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof materialService.createMaterial>
    ) => materialService.createMaterial(...params),
    onSuccess: ({ id }) => {
      return Promise.all([refetchMaterials(), refetchMaterial(id)]);
    },
  });
}

export function useUpdateMaterial() {
  const apiClient = useApiClient();
  const materialService = new MaterialService(apiClient);
  const refetchMaterials = useRefetchMaterials();
  const refetchMaterial = useRefetchMaterial();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof materialService.updateMaterial>
    ) => materialService.updateMaterial(...params),
    onSuccess: ({ id }) => {
      return Promise.all([refetchMaterials(), refetchMaterial(id)]);
    },
  });
}

export function useDeleteMaterial() {
  const apiClient = useApiClient();
  const materialService = new MaterialService(apiClient);
  const refetchMaterials = useRefetchMaterials();
  const refetchMaterial = useRefetchMaterial();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof materialService.deleteMaterial>
    ) => materialService.deleteMaterial(...params),
    onSuccess: ({ id }) => {
      return Promise.all([refetchMaterials(), refetchMaterial(id)]);
    },
  });
}
