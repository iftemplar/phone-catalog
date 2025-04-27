"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import styles from "./CartClient.module.css";
import Link from "next/link";

export default function CartClient() {
  const {
    items = [],
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cart ({items.length})</h1>

      {items.length === 0 ? (
        <p className={styles.empty}></p>
      ) : (
        <>
          <div className={styles.list}>
            {items.map((item, index) => {
              const imageFilename = item.imageUrl.split("/").pop();
              const localImage = imageFilename
                ? `/images-trimmed/${imageFilename}`
                : "/no-image.jpg";

              return (
                <div key={index} className={styles.item}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={localImage}
                      alt={item.name}
                      width={260}
                      height={320}
                      className={styles.itemImage}
                      unoptimized
                    />
                  </div>
                  <div className={styles.details}>
                    <div className={styles.detailsWrapper}>
                      <p className={styles.name}>{item.name}</p>

                      <p className={styles.price}>
                        {item.price} EUR x {item.quantity}
                      </p>
                      <div className={styles.quantityControls}>
                        <button onClick={() => decrementQuantity(item.id)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => incrementQuantity(item.id)}>
                          +
                        </button>
                      </div>
                      <button
                        className={styles.remove}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.totalAlt}>
            <span className={styles.totalDesc}>Total</span>
            <span>{total} EUR</span>
          </div>

          <div className={styles.actions}>
            <Link href="/" className={styles.back}>
              Continue shopping
            </Link>

            <div className={styles.checkout}>
              <div className={styles.total}>
                <span className={styles.totalDesc}>Total</span>
                <span>{total} EUR</span>
              </div>
              <button className={styles.pay}>Pay</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
