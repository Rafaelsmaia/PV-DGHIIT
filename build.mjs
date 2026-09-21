import { cp, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

const allowExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".json",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".txt",
]);

const allowFiles = new Set(["vercel.json"]);

async function main() {
  await mkdir(dist, { recursive: true });

  const entries = await readdir(root);
  const copied = [];

  for (const name of entries) {
    if (name === "dist" || name === "node_modules" || name === ".git" || name === ".vercel") continue;
    if (name.startsWith(".")) continue; // evita .env.local etc

    const full = path.join(root, name);
    const s = await stat(full);
    if (!s.isFile()) continue;

    const ext = path.extname(name).toLowerCase();
    if (!allowExtensions.has(ext) && !allowFiles.has(name)) continue;

    await cp(full, path.join(dist, name), { force: true });
    copied.push(name);
  }

  if (!copied.includes("index.html")) {
    throw new Error("build: `index.html` não foi copiado para `dist/` (verifique o nome do arquivo).");
  }

  console.log(`build: copiados ${copied.length} arquivo(s) para dist/`);
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});

