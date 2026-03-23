import { createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import PageWrapper from "../components/common/PageWrapper";
import type { QueryClient } from "@tanstack/react-query";
import ErrorComponent from "../components/common/ErrorComponent";

export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <>
      <PageWrapper />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
