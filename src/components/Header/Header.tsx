"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.svg"
          alt="MBST Logo"
          width={72}
          height={24}
          priority
        />
      </Link>

      <Link href="/cart" className={styles.cart}>
        <Image src="/icons/cart-icon.svg" alt="Cart" width={20} height={20} />
        <span className={styles.count}>{totalItems}</span>
      </Link>
    </header>
  );
}
