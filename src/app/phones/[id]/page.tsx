import { fetchPhoneById, fetchPhones } from "@/lib/api";
import PhoneDetailClient from "../../../components/PhoneDetail/PhoneDetailClient";
import { Phone } from "@/types/phone";

export default async function PhoneDetailPage({ params }: any) {
  const phone = await fetchPhoneById(params.id);
  const allPhones = await fetchPhones();

  const similarPhones = allPhones
    .filter((p: Phone) => {
      // console.log("🔍 phone in filter:", p);
      return p.id !== phone.id;
    })
    .slice(0, 3);

  return <PhoneDetailClient phone={phone} similarPhones={similarPhones} />;
}
