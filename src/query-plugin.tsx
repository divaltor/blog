import type { AppShape, PressPlugin } from "fumapress";
import { QueryProvider } from "@/src/query-provider";

export function queryPlugin<C extends AppShape = AppShape>(): PressPlugin<C> {
  return {
    name: "query",
    init() {
      const data = this.data["core:provider"] ??= {};
      (data.providerInterceptors ??= []).push(({ props, next }) =>
        next({
          ...props,
          children: <QueryProvider>{props.children}</QueryProvider>,
        }),
      );
    },
  };
}
