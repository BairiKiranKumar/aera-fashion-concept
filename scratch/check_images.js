const https = require("https");
const fs = require("fs");
const path = require("path");

const candidates = [
  // Hero candidates
  { id: "hero-1", url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-2", url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-3", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-4", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-5", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-6", url: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-7", url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-8", url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-9", url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-10", url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=80" },
  { id: "hero-11", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" },
];

const outDir = path.join(__dirname, "previews");
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
