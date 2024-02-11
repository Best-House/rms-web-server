import { Material, MaterialService } from "@/domain/model/material";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getMaterialAPIClient } from "@/external-interfaces/api";

export function useQueryMaterial({ id }: { id: Material["id"] }) {
  const materialService = new MaterialService(getMaterialAPIClient());

  return useSuspenseQuery({
    queryKey: ["material", id],
    queryFn: () => {
      return materialService.getMaterial(id);
    },
  });
}

export function useQueryMaterials() {
  const materialService = new MaterialService(getMaterialAPIClient());

  return useSuspenseQuery({
    queryKey: ["materials"],
    queryFn: () => {
      return materialService.getMaterialList();
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
  const materialService = new MaterialService(getMaterialAPIClient());
  const refetchMaterials = useRefetchMaterials();

  return useMutation({
    mutationFn: (draft: Omit<Material, "id">) =>
      materialService.createMaterial(draft),
    onSuccess: () => {
      return refetchMaterials();
    },
  });
}

export function useUpdateMaterial() {
  const materialService = new MaterialService(getMaterialAPIClient());
  const refetchMaterials = useRefetchMaterials();
  const refetchMaterial = useRefetchMaterial();

  return useMutation({
    mutationFn: (draft: Material) => materialService.updateMaterial(draft),
    onSuccess: (_, { id }) => {
      return Promise.all([refetchMaterials(), refetchMaterial(id)]);
    },
  });
}

export function useDeleteMaterial() {
  const materialService = new MaterialService(getMaterialAPIClient());
  const refetchMaterials = useRefetchMaterials();

  return useMutation({
    mutationFn: (id: Material["id"]) => materialService.deleteMaterial(id),
    onSuccess: () => {
      return refetchMaterials();
    },
  });
}
