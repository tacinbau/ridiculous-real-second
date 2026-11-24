import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "We stage tiny funerals for dead houseplants: grieving owners pay $29 for the ceremony, eulogy and a replacement plant, because killing a fern still hurts and the ritual sells the next one.";

// The gate only accepts 1-200 characters of non-blank text: fail loudly
// here instead of shipping an entry the scorer would refuse.
if (entry.length < 1 || entry.length > 200 || !entry.trim()) {
  throw new Error(`entry is ${entry.length} characters, must be 1-200`);
}
if (entry.trim().split(/[.!?]+/).filter(Boolean).length !== 1) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
} catch {
  mkdirSync("output", { recursive: true });
  writeFileSync(join("output", "entry.txt"), entry, "utf8");
}
console.log(entry);
