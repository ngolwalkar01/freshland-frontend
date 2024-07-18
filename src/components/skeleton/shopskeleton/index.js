import React from "react";
import styles from "@/components/pages/shop/AllGoods.module.css";
import Header from "@/components/atoms/Header/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductList from "../homepageskelton/productlist";

const Shop = () => {
  return (
    <>
      <div className={styles.BgWrapper}>
        <Header />
        <main className={styles.customContainer}>
          <div className={styles.categoriesCover}>
            <div className={styles.wrapper}>
            <div className={styles.headingWrapper}>
            <div className={styles.blankflexItem}></div>
            <Skeleton width={350} height={60}  className={styles.headingSkeleton} />
            <div className={styles.filterCover}>
              <div className={styles.filterIcon}>
              <Skeleton width={50} height={40} />
              </div>
             
            </div>
          </div>
           
              <div className={styles.goodsItem}>
             

                <div className={styles.skeletonImageContainer}>
                <div className={styles.skeletonBox}>
                <Skeleton width={1100} height={213} className={styles.skeletonWidth}/>
               
                </div>
                 
                </div>
              </div>
           
            </div>
          </div>
          <ProductList/>
        </main>
      </div>
    </>
  );
};

export default Shop;
