import { Material } from "@/domain/aggregate/material/Material";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MaterialService } from "@/service/MaterialService";
import { httpApiClient } from "@/remotes/https/HttpApiClient";

export function useQueryMaterial({ id }: { id: Material["id"] }) {
  const materialService = new MaterialService(httpApiClient);

  return useSuspenseQuery({
    queryKey: ["material", id],
    queryFn: () => {
      return materialService.getMaterial({ id });
    },
  });
}

export function useQueryMaterials() {
  const materialService = new MaterialService(httpApiClient);

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
  const materialService = new MaterialService(httpApiClient);
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
  const materialService = new MaterialService(httpApiClient);
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
  const materialService = new MaterialService(httpApiClient);
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
