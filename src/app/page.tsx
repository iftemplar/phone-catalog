import { fetchPhones } from "@/lib/api";
import HomeClient from "@/components/HomeClient/HomeClient";

export default async function HomePage() {
  const phones = await fetchPhones();
  return <HomeClient initialPhones={phones} />;
}
