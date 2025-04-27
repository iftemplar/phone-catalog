import fs from "fs";
import fetch from "node-fetch";

const API_BASE =
  "https://prueba-tecnica-api-tienda-moviles.onrender.com/products";
const API_KEY = "87909682e6cd74208f41a6ef39fe4191";

const homepagePath = "src/data/Home-local.json";

const headers = {
  "x-api-key": API_KEY,
};

const fetchPhones = async () => {
  const res = await fetch(API_BASE, { headers });
  if (!res.ok) throw new Error("Failed to fetch phones list");
  return res.json();
};

const run = async () => {
  try {
    const phones = await fetchPhones();
    fs.writeFileSync(homepagePath, JSON.stringify(phones, null, 2));
    console.log(`📦 Saved ${phones.length} phones to ${homepagePath}`);
  } catch (err) {
    console.error(`❌ Error fetching phones: ${err.message}`);
  }
};

run();
