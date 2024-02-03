import { Purchase } from "@/domain/model/purchase/Purchase";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { PurchaseService } from "@/domain/model/purchase/PurchaseService";
import { getPurchaseAPIClient } from "@/external-interfaces/api";

export function useQueryPurchase({ id }: { id: Purchase["id"] }) {
  const purchaseService = new PurchaseService(getPurchaseAPIClient());

  return useSuspenseQuery({
    queryKey: ["purchase", id],
    queryFn: () => {
      return purchaseService.getPurchaseItem(id);
    },
  });
}

export function useQueryPurchases() {
  const purchaseService = new PurchaseService(getPurchaseAPIClient());

  return useSuspenseQuery({
    queryKey: ["purchases"],
    queryFn: () => {
      return purchaseService.getPurchaseList();
    },
  });
}

function useRefetchPurchases() {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.refetchQueries({ queryKey: ["purchases"] });
  };
}

function useRefetchPurchase() {
  const queryClient = useQueryClient();

  return (id: string) => {
    return queryClient.refetchQueries({ queryKey: ["purchase", id] });
  };
}

export function useCreatePurchase() {
  const purchaseService = new PurchaseService(getPurchaseAPIClient());
  const refetchPurchases = useRefetchPurchases();
  const refetchPurchase = useRefetchPurchase();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof purchaseService.createPurchase>
    ) => purchaseService.createPurchase(...params),
    onSuccess: ({ id }) => {
      return Promise.all([refetchPurchases(), refetchPurchase(id)]);
    },
  });
}

export function useUpdateMaterial() {
  const purchaseService = new PurchaseService(getPurchaseAPIClient());
  const refetchPurchases = useRefetchPurchases();
  const refetchPurchase = useRefetchPurchase();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof purchaseService.updatePurchase>
    ) => purchaseService.updatePurchase(...params),
    onSuccess: ({ id }) => {
      return Promise.all([refetchPurchases(), refetchPurchase(id)]);
    },
  });
}

export function useDeleteMaterial() {
  const purchaseService = new PurchaseService(getPurchaseAPIClient());
  const refetchPurchases = useRefetchPurchases();

  return useMutation({
    mutationFn: (
      ...params: Parameters<typeof purchaseService.deletePurchase>
    ) => purchaseService.deletePurchase(...params),
    onSuccess: () => {
      return Promise.all([refetchPurchases()]);
    },
  });
}
