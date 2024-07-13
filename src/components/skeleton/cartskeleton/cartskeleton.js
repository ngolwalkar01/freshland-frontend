import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/components/pages/cart/cart.module.css";
import Header from "../../atoms/Header/Header";
const cartskeleton = () => {
  return (
    <>
      <div className={styles.shopingcart}>
        <Header />

        <div className={styles.mainContainer}>
          <h2 className={styles.mainHeading}>Shopping Cart</h2>

          <div className={styles.shoppingcartdiv}>
            <div className={styles.wrapper}>
              <main className={styles.leftContainer}>
           
                <div className={styles.productSection}>
                  <div className={styles.mainImage}>
                    <Skeleton height={160} width={200} />
                  </div>
                  <div>
                    <Skeleton height={50} width={250} count={3} />
                  </div>
                </div>
             
                <div>
                    <Skeleton height={60} width={480} />
                  </div>
                  <div>
                    <Skeleton height={60} width={480} />
                  </div>
              </main>
              <aside className={styles.rightContainer}>
                <Skeleton height={30} width={400} />
                <Skeleton height={50} width={400} />
                <Skeleton height={50} width={400} />
                <Skeleton height={50} width={400} />
                <Skeleton height={50} width={400} />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default cartskeleton;
