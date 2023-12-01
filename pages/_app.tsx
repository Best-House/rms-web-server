import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalErrorBoundary } from "@/utils/GlobalErrorBoundary";
import { ApiClientProvider } from "@/remotes/hooks/useApiClient";
import { httpApiClient } from "@/remotes/https/HttpApiClient";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalErrorBoundary>
        <ApiClientProvider value={httpApiClient}>
          <Component {...pageProps} />
        </ApiClientProvider>
      </GlobalErrorBoundary>
    </QueryClientProvider>
  );
}
