import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const serverDirectory = resolve("dist/server");
mkdirSync(serverDirectory, { recursive: true });

const worker = `const fallbackPath = "/index.html";

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (request.method === "GET" && acceptsHtml) {
      const fallbackUrl = new URL(request.url);
      fallbackUrl.pathname = fallbackPath;
      return env.ASSETS.fetch(new Request(fallbackUrl, request));
    }

    return response;
  },
};
`;

writeFileSync(resolve(serverDirectory, "index.js"), worker, "utf8");
