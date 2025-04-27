import { fetchPhoneById, fetchPhones } from "@/lib/api";
import PhoneDetailClient from "../../../components/PhoneDetail/PhoneDetailClient";

export default async function PhoneDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const phone = await fetchPhoneById(params.id);
  const similarPhones = (await fetchPhones())
    .filter((p) => p.id !== phone.id)
    .slice(0, 3);

  return <PhoneDetailClient phone={phone} similarPhones={similarPhones} />;
}
