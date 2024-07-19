import React from "react";
import styles from "./categories.module.css";
import Image from "next/image";
const Categories = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <h1>Categories</h1>
        <div className={styles.categoriesName}>
          <div className={styles.fruitCategories}>
            <p>Citrus Fruits</p>
            <Image
              src="/mockImage/citrusfruit.png"
              alt="citrusfruit"
              width={306}
              height={196}
            />
          </div>
          <div className={styles.fruitCategories}>
            <p>Summer Favorites</p>
            <Image
              src="/mockImage/summer.png"
              alt="summerfruit"
              width={306}
              height={196}
            />
          </div>
          <div className={styles.fruitCategories}>
            <p>Healthy Snacks</p>
            <Image
              src="/mockImage/healthy.png"
              alt="healthyfruit"
              width={306}
              height={196}
            />
          </div>
          <div className={styles.fruitCategories}>
            <p>Grill</p>
            <Image
              src="/mockImage/grill.png"
              alt="grillfruit"
              width={306}
              height={196}
            />
          </div>
        </div>
        <div>
            <button className={styles.seeAllButton}>See All Products</button>
        </div>
      </div>
    </>
  );
};

export default Categories;
