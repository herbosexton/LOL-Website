import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

function png(w, h, rgb) {
  const [r, g, b] = rgb;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    const row = y * (w * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < w; x++) {
      const i = row + 1 + x * 4;
      const t = (x + y) / (w + h);
      raw[i] = Math.min(255, r + Math.floor(18 * t));
      raw[i + 1] = Math.min(255, g + Math.floor(10 * t));
      raw[i + 2] = Math.min(255, b + Math.floor(6 * t));
      raw[i + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const images = {
  "public/images/hero-poster.png": [45, 71, 57],
  "public/images/hero-mobile.png": [45, 71, 57],
  "public/images/og-default.png": [45, 71, 57],
  "public/images/products/edibles.png": [249, 247, 242],
  "public/images/products/accessories.png": [243, 239, 230],
  "public/images/products/tinctures.png": [198, 166, 100],
  "public/images/products/vaporizers.png": [43, 43, 43],
  "public/images/kulture/hero.png": [8, 8, 8],
  "public/images/kulture/roots.png": [30, 30, 30],
  "public/images/kulture/rhythm.png": [20, 20, 20],
  "public/images/kulture/voices.png": [25, 25, 25],
  "public/images/kulture/community.png": [35, 35, 35],
  "public/images/kulture/gallery-1.png": [40, 40, 40],
  "public/images/kulture/gallery-2.png": [50, 45, 40],
  "public/images/kulture/gallery-3.png": [35, 40, 38],
  "public/images/kulture/history.png": [28, 28, 28],
  "public/images/about/story.png": [45, 71, 57],
  "public/images/about/community.png": [185, 147, 98],
  "public/images/delivery/hero.png": [45, 71, 57],
  "public/images/blog/cannabis-fundamentals.png": [45, 71, 57],
  "public/images/blog/terpenes-guide.png": [198, 166, 100],
  "public/images/blog/responsible-consumption.png": [43, 43, 43],
};

for (const [file, rgb] of Object.entries(images)) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const isOg = file.includes("og-default");
  fs.writeFileSync(file, png(isOg ? 1200 : 1600, isOg ? 630 : 1200, rgb));
}

fs.mkdirSync("public/video", { recursive: true });
fs.writeFileSync("public/video/.gitkeep", "");
fs.writeFileSync(
  "public/images/logo.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="64" viewBox="0 0 220 64" fill="none">
  <text x="110" y="28" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#F9F7F2">LEGACY</text>
  <text x="110" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" letter-spacing="4" fill="#C6A664">ON LARK</text>
</svg>`,
);

console.log("Placeholder assets generated.");
