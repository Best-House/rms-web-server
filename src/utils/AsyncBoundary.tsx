import { useIsMounted } from "@toss/react";
import { ComponentProps, Suspense } from "react";
import { ErrorBoundary } from "@toss/error-boundary";

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

interface Props extends Omit<ErrorBoundaryProps, "renderFallback"> {
  pendingFallback: ComponentProps<typeof SSRSuspense>["fallback"];
  rejectedFallback: ErrorBoundaryProps["renderFallback"];
}

export function AsyncBoundary({
  pendingFallback,
  rejectedFallback,
  children,
  ...errorBoundaryProps
}: Props) {
  return (
    <ErrorBoundary renderFallback={rejectedFallback} {...errorBoundaryProps}>
      <SSRSuspense fallback={pendingFallback}>{children}</SSRSuspense>
    </ErrorBoundary>
  );
}

function SSRSuspense({ fallback, children }: ComponentProps<typeof Suspense>) {
  const isMounted = useIsMounted();

  if (isMounted) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }

  return <>{fallback}</>;
}