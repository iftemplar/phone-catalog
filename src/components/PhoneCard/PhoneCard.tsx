import styles from "./PhoneCard.module.css";
import Link from "next/link";
import Image from "next/image";

type Props = {
  phone: {
    id: string;
    brand: string;
    name: string;
    basePrice: number;
    imageUrl: string;
  };
};

export default function PhoneCard({ phone }: Props) {
  const imageFilename = phone.imageUrl.split("/").pop();
  const localImage = `/images-trimmed/${imageFilename}`;
  const imageUrl = localImage || "/no-image.jpg";

  return (
    <Link href={`/phones/${phone.id}`} className={styles.card}>
      <Image
        src={imageUrl}
        alt={`${phone.brand} ${phone.name}`}
        className={styles.image}
        width={300}
        height={150}
        unoptimized
      />
      <div className={styles.info}>
        <div className={styles.textBlock}>
          <span className={styles.brand}>{phone.brand}</span>
          <h3 className={styles.model}>{phone.name}</h3>
        </div>
        <span className={styles.price}>{phone.basePrice} EUR</span>
      </div>
    </Link>
  );
}
