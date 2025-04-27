"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import styles from "./PhoneDetail.module.css";
import PhoneCard from "@/components/PhoneCard/PhoneCard";
import { Phone, PhoneDetail, ColorOption, StorageOption } from "@/types/phone";

type Props = {
  phone: PhoneDetail;
  similarPhones: Phone[];
};

export default function PhoneDetailClient({ phone, similarPhones }: Props) {
  console.log("phone", phone);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null
  );

  const selectedImageUrl =
    selectedColor?.imageUrl || phone.colorOptions?.[0]?.imageUrl || "";
  const imageFilename = selectedImageUrl.split("/").pop();

  const localImage = imageFilename
    ? `/images-trimmed/${imageFilename}`
    : "/no-image.jpg";

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;

    addToCart({
      id: `${phone.id}-${selectedStorage.capacity}-${selectedColor.name}`,
      name: `${phone.name} (${selectedStorage.capacity}, ${selectedColor.name})`,
      imageUrl: selectedColor.imageUrl,
      price: selectedStorage.price,
      quantity: 1,
    });
  };

  return (
    <>
      <div className={styles.backLinkContainer}>
        <Link href="/" className={styles.backLink}>
          {`<   Back`}
        </Link>
      </div>
      <main className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.imageWrapper}>
            <Image
              src={localImage}
              alt={`${phone.brand} ${phone.name}`}
              width={750}
              height={550}
              className={styles.image}
              unoptimized
            />
          </div>

          <div className={styles.details}>
            <h1 className={styles.model}>{phone.name}</h1>
            <p className={styles.price}>
              From {selectedStorage?.price ?? phone.basePrice} EUR
            </p>

            <p className={styles.label}>Storage ¿How much space do you need?</p>
            <div className={styles.storageSelector}>
              {phone.storageOptions?.map((option: StorageOption) => (
                <button
                  key={option.capacity}
                  className={`${styles.storageOption} ${
                    selectedStorage?.capacity === option.capacity
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => setSelectedStorage(option)}
                >
                  {option.capacity}
                </button>
              ))}
            </div>

            <p className={styles.label}>color. pick your favourite.</p>
            <div className={styles.colorSelector}>
              {phone.colorOptions?.map((color: ColorOption) => (
                <div key={color.name}>
                  <button
                    className={`${styles.colorOption} ${selectedColor?.name === color.name ? styles.selected : ""}`}
                    style={{ backgroundColor: color.hexCode }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color.name}
                  />
                </div>
              ))}
            </div>
            <button
              className={`${styles.addToCart} ${
                selectedColor && selectedStorage ? styles.readyToAdd : ""
              }`}
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedStorage}
            >
              Añadir
            </button>
          </div>
        </div>

        <section className={styles.specsSection}>
          <h2 className={styles.specsTitle}>Specifications</h2>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <span className={styles.specsLabel}>Brand</span>
              <span>{phone.brand}</span>
            </div>
            <div className={styles.specsRow}>
              <span className={styles.specsLabel}>Name</span>
              <span>{phone.name}</span>
            </div>
            <div className={styles.specsRow}>
              <span className={styles.specsLabel}>Description</span>
              <span className={styles.specsDesc}>{phone.description}</span>
            </div>
            {phone.specs &&
              Object.entries(phone.specs).map(([key, value]) => (
                <div key={key} className={styles.specsRow}>
                  <span className={styles.specsLabel}>
                    {key.replaceAll("_", " ")}
                  </span>
                  <span>{value}</span>
                </div>
              ))}
          </div>
        </section>

        <section className={styles.similarSection}>
          <h2 className={styles.similarTitle}>SIMILAR ITEMS</h2>
          <div className={styles.similarGrid}>
            {similarPhones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
