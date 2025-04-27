import fs from "fs";
import path from "path";
import https from "https";
import fetch from "node-fetch";

const inputPath = "src/data/Home-local.json";
const outputPath = "src/data/Home-local-ready.json";
const imagesDir = "public/images";

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const phones = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

const downloadImage = async (url, filename) => {
  const filePath = path.join(imagesDir, filename);
  const fileStream = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
          return;
        }

        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close(resolve);
        });
      })
      .on("error", reject);
  });
};

const run = async () => {
  const updatedPhones = [];

  for (const phone of phones) {
    try {
      const url = phone.imageUrl.replace("http://", "https://");

      const filename = path.basename(url);
      const localUrl = `/images/${filename}`;

      await downloadImage(url, filename);
      console.log(`✅ Downloaded: ${filename}`);

      updatedPhones.push({ ...phone, imageUrl: localUrl });
    } catch (err) {
      console.error(`❌ Error downloading ${phone.imageUrl}`, err.message);
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(updatedPhones, null, 2));
  console.log(`📦 Saved local phones data to: ${outputPath}`);
};

run();
