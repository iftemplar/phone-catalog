"use client";

import { useState } from "react";
import PhoneCard from "@/components/PhoneCard/PhoneCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./HomeClient.module.css";
import { Phone } from "@/types/phone";

type Props = {
  initialPhones: Phone[];
};

export default function HomeClient({ initialPhones }: Props) {
  const [query, setQuery] = useState("");

  const filteredPhones = initialPhones
    .filter((phone) =>
      `${phone.brand} ${phone.name}`.toLowerCase().includes(query.toLowerCase())
    )
    .filter(
      (phone, index, self) => index === self.findIndex((p) => p.id === phone.id)
    );

  return (
    <main className={styles.container}>
      <div className={styles.topBar}>
        <SearchBar value={query} onChange={setQuery} />
        <span className={styles.resultsCount}>
          {filteredPhones.length} RESULTS
        </span>
      </div>

      <div className={styles.grid}>
        {filteredPhones.map((phone) => (
          <PhoneCard key={`${phone.id}`} phone={phone} />
        ))}
      </div>
    </main>
  );
}
