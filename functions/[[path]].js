import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";

// @ts-ignore
import * as build from "../build";

const handleRequest = createPagesFunctionHandler({
  build,
  getLoadContext(context) {
    console.log(context.env)
    return { env: context.env };
  },
});

export function onRequest(context) {
  return handleRequest(context);
}
