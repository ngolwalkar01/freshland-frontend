import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./skeleton.module.css"; // Adjust the import according to your project structure
import Header from "../../atoms/Header/Header";
const CheckoutSkeleton = () => {
  return (
    <>
      <div className={styles.Checkoutcontainer}>
        <Header />
        <div className={styles.mainconatiner}>
          <h1 className={styles.mainHeading}>Box</h1>
          <div className={styles.formcheckout}>
            <div className={styles.wrapper}>
              <main className={styles.leftContainer}>
              <Skeleton height={30} width={200} />
                <Skeleton height={40} width={662} />
               
                <div className={styles.Skeletoncotainer}>
                  <Skeleton height={48} width={319} />
                  <Skeleton height={48} width={319} />
                </div>

                <Skeleton height={50} width={662} />
                <Skeleton height={50} width={662} />
                <div className={styles.Skeletoncotainer}>
                  <Skeleton height={48} width={319} />
                  <Skeleton height={48} width={319} />
                </div>
                <Skeleton height={48} width={400} />
                <Skeleton height={50} width={662} />
              </main>
              <aside className={styles.rightContainer}>
                <Skeleton height={30} width={350} />
                <Skeleton height={50} width={350} />
                <Skeleton height={50} width={350} />
                <Skeleton height={50} width={350} />
                <Skeleton height={50} width={350} />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSkeleton;
