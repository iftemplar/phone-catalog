const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
import phonesFallback from "@/data/Home-local-ready.json";
import phonesDetailFallback from "@/data/PhoneDetails-local-ready.json";

export async function fetchPhones(query = "") {
  try {
    // throw new Error("Simulated Home page API fail"); // Uncomment to use local data
    const res = await fetch(`${BASE_URL}/products?${query}`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    console.warn("🔌 API failed, using local phones", error);
    return phonesFallback;
  }
}

export async function fetchPhoneById(id: string) {
  try {
    // throw new Error("Simulated Detail page API fail"); // Uncomment to use local data
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    console.warn("🔌 API failed, using local phones", error);
    const fallback = phonesDetailFallback.find((p) => p.id === id);
    if (!fallback) throw new Error("Phone not found locally");
    return fallback;
  }
}
