const https = require("https");
const fs = require("fs");
const path = require("path");

const candidates = [
  { id: "trouser-1", url: "https://images.unsplash.com/photo-1741605037162-b1f475a4a4d3?auto=format&fit=crop&w=1200&q=80" },
  { id: "trouser-2", url: "https://images.unsplash.com/photo-1786273041315-7eb1d5ce9836?auto=format&fit=crop&w=1200&q=80" },
  { id: "tank-1", url: "https://images.unsplash.com/photo-1762395271662-2a5a077f9662?auto=format&fit=crop&w=1200&q=80" },
  { id: "tank-2", url: "https://images.unsplash.com/photo-1601762267916-6668efcbc741?auto=format&fit=crop&w=1200&q=80" },
  { id: "coat-1", url: "https://images.unsplash.com/photo-1668952135120-7d997b1b3778?auto=format&fit=crop&w=1200&q=80" },
  { id: "coat-2", url: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?auto=format&fit=crop&w=1200&q=80" },
];

const outDir = path.join(__dirname, "curated2");
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
