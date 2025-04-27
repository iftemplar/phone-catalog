import fs from "fs";
import path from "path";
import https from "https";
import fetch from "node-fetch";

const inputPath = "src/data/PhoneDetails-local.json";
const outputPath = "src/data/PhoneDetails-local-ready.json";
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
      const updatedColorOptions = await Promise.all(
        phone.colorOptions.map(async (option) => {
          const url = option.imageUrl.replace("http://", "https://");
          const filename = path.basename(url);
          const localUrl = `/images/${filename}`;

          await downloadImage(url, filename);
          console.log(`🎨 Downloaded: ${filename}`);
          return { ...option, imageUrl: localUrl };
        })
      );

      const updatedSimilarProducts = await Promise.all(
        phone.similarProducts.map(async (product) => {
          const url = product.imageUrl.replace("http://", "https://");
          const filename = path.basename(url);
          const localUrl = `/images/${filename}`;

          await downloadImage(url, filename);
          console.log(`🧩 Downloaded: ${filename}`);
          return { ...product, imageUrl: localUrl };
        })
      );

      updatedPhones.push({
        ...phone,
        colorOptions: updatedColorOptions,
        similarProducts: updatedSimilarProducts,
      });
    } catch (err) {
      console.error(`❌ Error processing ${phone.id}:`, err.message);
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(updatedPhones, null, 2));
  console.log(`📦 Saved local phone details to: ${outputPath}`);
};

run();
