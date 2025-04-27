import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const API_BASE =
  "https://prueba-tecnica-api-tienda-moviles.onrender.com/products";
const API_KEY = "87909682e6cd74208f41a6ef39fe4191";

const phonesPath = "src/data/phones-local.json";
const detailsPath = "src/data/phoneDetails-local.json";

const phones = JSON.parse(fs.readFileSync(phonesPath, "utf-8"));

const headers = {
  "x-api-key": API_KEY,
};

const fetchPhoneDetails = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { headers });
  if (!res.ok) throw new Error(`Failed to fetch ${id}`);
  return res.json();
};

const run = async () => {
  const details = [];

  for (const phone of phones) {
    try {
      const data = await fetchPhoneDetails(phone.id);
      details.push(data);
      console.log(`✅ ${phone.id} - OK`);
    } catch (err) {
      console.warn(`❌ ${phone.id} - ${err.message}`);
    }
  }

  fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2));
  console.log(`📦 Saved to ${detailsPath}`);
};

run();
