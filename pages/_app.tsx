import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalErrorBoundary } from "@/utils/GlobalErrorBoundary";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalErrorBoundary>
        <Component {...pageProps} />
      </GlobalErrorBoundary>
    </QueryClientProvider>
  );
}
