import sharp from "sharp";
import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public/images");
const outputDir = path.join(process.cwd(), "public/images-trimmed");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const processImage = async (filename) => {
  const inputPath = path.join(imagesDir, filename);
  const outputPath = path.join(outputDir, filename);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    if (metadata.hasAlpha) {
      await image.trim().toFile(outputPath);
      console.log(`✂️ Trimmed ${filename}`);
    } else {
      fs.copyFileSync(inputPath, outputPath);
      console.log(`➡️ Copied ${filename} (no alpha)`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${filename}:`, err);
  }
};

const run = async () => {
  const files = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file));

  for (const file of files) {
    await processImage(file);
  }

  console.log("🎉 All images trimmed.");
};

run();
