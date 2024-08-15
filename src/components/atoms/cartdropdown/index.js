import React, { useState } from "react";
import styles from "./cartdropdown.module.css";
import Image from "next/image";
import { commonTranslation, cartTranslation } from '@/locales';
import Link from "next/link";
import { getCorrectPrice } from "@/helper";

const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;
const CartDropdown = () => {
  const cmt = commonTranslation[lang];
  const cartLocalStorageData = cartDataStorage && localStorage.getItem(cartDataStorage);
  const cartData = cartLocalStorageData && cartLocalStorageData != 'undefined' ? JSON.parse(cartLocalStorageData) : cartDataStorage;

  if (!(cartData && cartData.items && cartData.items.length > 0))
    return <></>

  const ct = cartTranslation[lang];
  const currency_minor_unit = cartData?.totals?.currency_minor_unit || 0;
  const currency = cartData?.totals?.currency_symbol || '';
  const cartSubTotal = getCorrectPrice(parseInt(cartData?.totals?.total_items) + parseInt(cartData?.totals?.total_items_tax), currency_minor_unit);

  return (
    <div className={styles.dropdown}>
      <p className={styles.title}>{ct.cartTitle}</p>
      <ul className={`${styles.cartItems} cartdropdown_cartItems`}>
        {cartData.items.map((x, i) => {
          return (
            <li key={i} className={styles.cartItem}>
              <div className={styles.cartContainer}>
                <Image src={x.images && x.images.length > 0 ? x.images[0].thumbnail : ""} alt="product-image" width={67} height={67} className={styles.itemImage} />
                <span className={styles.itemName}>{x.name}</span>
              </div>

              <span className={styles.itemPrice}>{getCorrectPrice(x.prices?.price, currency_minor_unit)} {currency}</span>
            </li>
          )
        })}
      </ul>
      <hr></hr>
      <div className={styles.total}>
        <span>{ct.total}</span>
        <span className={styles.totalPrice}>{cartSubTotal} {currency}</span>
      </div>
      <Link href="/checkout" className={styles.checkoutButton}>{ct.gotoCheckout}</Link>
    </div>
  );
};

export default CartDropdown;
