import React from "react";
import styles from "./basis.module.css";
import Image from "next/image";
import Link from "next/link";
import { productData } from "@/mockdata/productData";
import Header from "@/components/atoms/Header/Header";
import { basisTranslation } from "@/locales/basis";
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Basis = () => {
  const basis = basisTranslation[lang];
  const images = productData;

  return (
    <>
      <ActiveUserKlaviyo />
      {" "}
      <Header />
      <div className={styles.category}>
        <div className={styles.imageContainer}>
          <Image
            src={`/mockImage/Fruit.png`}
            alt="Fruit"
            className={styles.coverImage}
            width={1400}
            height={213}
            sizes="(max-width: 600px) 100vw, (max-width: 1400px) 80vw"
            loading="lazy"
          />
          <h2 className={styles.imageHeading}>{basis.categoryName}</h2>
        </div>
        <div className={styles.goodsCard}>
          <div className={styles.gridContainer}>
            {images.map((product, i) => (
              <div key={i} className={styles.transparentCard}>
                <Link href="#" className={styles.imgContainer}>
                  <Image
                    className={styles.cardTopImage}
                    src="/Images/productTop.png"
                    alt=""
                    width={40}
                    height={10}
                  />
                  <Image
                    className={styles.cardImage}
                    src={`/${product.thumbnail}`}
                    alt="orange"
                    width={174}
                    height={152}
                  />
                </Link>
                <div className={styles.cardContent}>
                  <Link href="#">
                    <h3 className={styles.cardTitle}>{product.name}</h3>
                  </Link>
                </div>
                <p className={styles.cardPrice}>{product.price}</p>
                <button className={styles.addToBasketButton}>
                  {" "}
                  {basis.Addbtn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Basis;
