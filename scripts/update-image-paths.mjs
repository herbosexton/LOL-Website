import fs from "node:fs";
import path from "node:path";

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const files = [...walk("src"), ...walk("content")].filter((f) =>
  /\.(tsx?|css|mdx)$/.test(f),
);

let count = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const updated = original
    .replace(/\/images\/([^"'`)]+)\.png/g, "/images/$1.jpg")
    .replace(/\/images\/logo\.svg/g, "/images/logo.jpg");
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    count += 1;
    console.log(file);
  }
}
console.log(`Updated ${count} files`);
