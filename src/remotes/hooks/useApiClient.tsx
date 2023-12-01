import { ReactNode, createContext, useContext } from "react";
import { ApiClient } from "../ApiClient";
import { assert } from "@toss/assert";

const ApiClientContext = createContext<ApiClient | null>(null);

export function ApiClientProvider({
  value,
  children,
}: {
  value: ApiClient;
  children: ReactNode;
}) {
  return (
    <ApiClientContext.Provider value={value}>
      {children}
    </ApiClientContext.Provider>
  );
}

export function useApiClient() {
  const context = useContext(ApiClientContext);

  assert(context != null, "ApiClientContext 초기화가 필요합니다.");

  return context;
}
