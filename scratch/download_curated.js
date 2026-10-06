const https = require("https");
const fs = require("fs");
const path = require("path");

const candidates = [
  { id: "hero-stairs", url: "https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=1200&q=85" },
  { id: "trench-chair", url: "https://images.unsplash.com/photo-1771243791734-dfeebf162af0?auto=format&fit=crop&w=1200&q=85" },
  { id: "white-coat", url: "https://images.unsplash.com/photo-1601673125183-a1221a59ff4f?auto=format&fit=crop&w=1200&q=85" },
  { id: "black-coat", url: "https://images.unsplash.com/photo-1613728455120-d00493b5e77e?auto=format&fit=crop&w=1200&q=85" },
  { id: "black-blazer", url: "https://images.unsplash.com/photo-1765114459508-2666016760af?auto=format&fit=crop&w=1200&q=85" },
  { id: "white-suit", url: "https://images.unsplash.com/photo-1776273920158-510b171e936f?auto=format&fit=crop&w=1200&q=85" },
  { id: "coat-pants-gray", url: "https://images.unsplash.com/photo-1776273920142-f30bceff0cf3?auto=format&fit=crop&w=1200&q=85" },
  { id: "coat-water", url: "https://images.unsplash.com/photo-1770644935636-7105430e2e52?auto=format&fit=crop&w=1200&q=85" },
  { id: "beige-sweater-pants", url: "https://images.unsplash.com/photo-1759229874914-c1ffdb3ebd0c?auto=format&fit=crop&w=1200&q=85" },
];

const outDir = path.join(__dirname, "curated");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function download(item) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(path.join(outDir, `${item.id}.jpg`));
    https.get(item.url, (res) => {
      if (res.statusCode !== 200) {
        console.log(`Failed ${item.id}: status ${res.statusCode}`);
        resolve();
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Saved ${item.id}.jpg (${res.headers["content-length"]} bytes)`);
        resolve();
      });
    }).on("error", (err) => {
      console.log(`Error ${item.id}:`, err.message);
      resolve();
    });
  });
}

async function main() {
  for (const c of candidates) {
    await download(c);
  }
}
main();
