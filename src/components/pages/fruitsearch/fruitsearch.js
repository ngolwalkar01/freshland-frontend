import React from "react";
import styles from "./fruitsearch.module.css";
import Image from "next/image";
import Link from "next/link";
import { productData } from "@/mockdata/productData";
import Header from "@/components/atoms/Header/Header";
import {greenTranslation} from "@/locales/greenfruit";
const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Fruitsearch = () => {
  const green =  greenTranslation[lang];
  const images = productData;
  return (
    <>
      {" "}
      <Header />
      <div className={styles.newheading}>
      <div >
          <h2>Product</h2>
        </div>
        <div className={styles.goodsCard}>
        <div className={styles.gridContainer}>
          {images.map((product,i) => (
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
                {green.Addbtn}
              </button>
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default Fruitsearch;
