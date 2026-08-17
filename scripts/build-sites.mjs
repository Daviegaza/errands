import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const serverDirectory = resolve("dist/server");
mkdirSync(serverDirectory, { recursive: true });

const worker = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const isHtmlNavigation = request.method === "GET" && acceptsHtml;
    const needsAppShell = response.status === 404 || (response.status >= 300 && response.status < 400);

    if (!isHtmlNavigation || !needsAppShell) return response;

    const fallbackUrl = new URL(request.url);
    fallbackUrl.pathname = "/";
    fallbackUrl.search = "";
    const appShell = await env.ASSETS.fetch(new Request(fallbackUrl, request));

    return new Response(appShell.body, {
      status: appShell.status,
      headers: appShell.headers,
    });
  },
};
`;

writeFileSync(resolve(serverDirectory, "index.js"), worker, "utf8");
