import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/components/pages/cart/cart.module.css";
import Header from "../../atoms/Header/Header";
import { cartTranslation } from "@/locales";

const lang = process.env.NEXT_PUBLIC_LANG || "se";

const cartskeleton = () => {
  const ct = cartTranslation[lang];
  return (
    <>
      <div className={styles.shopingcart}>
        <Header />

        <div className={styles.mainContainer}>
          <h2 className={styles.mainHeading}>{ct.shCart}</h2>

          <div className={styles.shoppingcartdiv}>
            <div className={styles.wrapper}>
              <div className={`${styles.leftContainer} ${styles.sklcontainer}`}>
           
                <div className={styles.productSection}>
                  <div className={styles.mainImage}>
                    <Skeleton height={160} width={200} className={styles.sklimgContainer}/>
                  </div>
                  <div>
                    <Skeleton height={50} width={220} count={3} className={styles.groupskl}/>
                  </div>
                </div>
             
                <div>
                    <Skeleton height={60} />
                  </div>
                  <div>
                    <Skeleton height={60}/>
                  </div>
              </div>
              <aside className={styles.rightContainer}>
                <Skeleton height={30} width={300} />
                <Skeleton height={50} width={300} />
                <Skeleton height={50} width={300} />
                <Skeleton height={50} width={300} />
                <Skeleton height={50} width={300} />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default cartskeleton;
