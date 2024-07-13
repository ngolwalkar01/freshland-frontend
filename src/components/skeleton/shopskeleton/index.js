import React from "react";
import styles from "@/components/pages/shop/AllGoods.module.css";
import Header from "@/components/atoms/Header/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductList from '@/components/skeleton/homepageskelton/productlist';

const Shop = () => {
  return (
    <>
      <div className={styles.BgWrapper}>
        <Header />
        <main className={styles.customContainer}>
          <div className={styles.categoriesCover}>
            <div className={styles.wrapper}>
              <div className={styles.goodsItem}>
                <div className={styles.skeletonImageContainer}>
                  <Skeleton width={1100} height={213} />
                </div>
              </div>
              <ProductList />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Shop;
