import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import worker from "../dist/server/index.js";

const assetRoot = resolve("dist/client");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
};

const env = {
  ASSETS: {
    async fetch(request) {
      const pathname = decodeURIComponent(new URL(request.url).pathname);
      if (pathname === "/") return new Response("Not found", { status: 404 });
      const filePath = resolve(assetRoot, `.${pathname}`);
      if (!filePath.startsWith(assetRoot)) return new Response("Not found", { status: 404 });

      try {
        const body = await readFile(filePath);
        return new Response(body, { headers: { "content-type": contentTypes[extname(filePath)] || "application/octet-stream" } });
      } catch {
        return new Response("Not found", { status: 404 });
      }
    },
  },
};

async function fetchPage(pathname) {
  return worker.fetch(new Request(`https://tuma.test${pathname}`, { headers: { accept: "text/html" } }), env);
}

const home = await fetchPage("/");
assert.equal(home.status, 200, "the root route must resolve to index.html");
const html = await home.text();
assert.match(html, /<div id="root"><\/div>/, "the app shell must be present");

const directRoute = await fetchPage("/activity");
assert.equal(directRoute.status, 200, "client-side routes must fall back to index.html");

const entryPath = html.match(/<script type="module" crossorigin src="([^"]+)"/)?.[1];
assert.ok(entryPath, "the browser entry bundle must be referenced");
const entry = await worker.fetch(new Request(`https://tuma.test${entryPath}`), env);
assert.equal(entry.status, 200, "the browser entry bundle must be served");
assert.match(entry.headers.get("content-type") || "", /javascript/, "the browser entry must use a JavaScript content type");

console.log("Hosting artifact serves the root, direct routes, and browser bundle.");
