import { ErrorResult } from "@/utils/ErrorResult";
import { ErrorBoundary } from "@toss/error-boundary";
import { message } from "antd";
import { ReactNode, useEffect } from "react";

export function GlobalErrorBoundary({ children }: { children: ReactNode }) {
  useUnhandledRejectionError(({ reason }) => {
    message.error(reason?.message ?? "알 수 없는 에러가 발생했습니다.");
  });

  return <ErrorBoundary renderFallback={ErrorResult}>{children}</ErrorBoundary>;
}

type Handler = (event: PromiseRejectionEvent) => void;

function useUnhandledRejectionError(handler: Handler) {
  useEffect(() => {
    window.addEventListener("unhandledrejection", handler);

    return () => {
      window.removeEventListener("unhandledrejection", handler);
    };
  }, [handler]);
}
