import { fetchPhones } from "@/lib/api";
import HomeClient from "@/components/HomeClient/HomeClient";
import { Analytics } from "@vercel/analytics/next";

export default async function HomePage() {
  const phones = await fetchPhones();
  return <HomeClient initialPhones={phones} />;
}
