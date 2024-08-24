import React, { useState, useRef } from "react";
import styles from "./AllGoods.module.css";
import ProductList from "@/components/atoms/ProductList/ProductList";
import { goodsProduct } from "@/mockdata/goodsProduct";
import Header from "@/components/atoms/Header/Header";
import Image from "next/image";
import { addToCart, updateCartQuantity, removeCartItem } from "@/components/service/cart";
import Head from "next/head";
import Link from "next/link";
import { shopTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const AllItems = ({ categoryWithProducts }) => {
  const st = shopTranslation[lang];
  const enableMockData = process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === "true";
  const categoriesWithProducts = enableMockData
    ? goodsProduct
    : categoryWithProducts;

  const [showMenu, setShowMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Create a ref for each category
  const categoryRefs = useRef({});

  const handleFilterClick = (categoryId) => {
    setSelectedFilter(categoryId);
    setShowMenu(false);

    // Scroll to the selected category section
    if (categoryRefs.current[categoryId]) {
      categoryRefs.current[categoryId].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className={styles.BgWrapper}>
        <Header />
        {/* Main content */}
        <main className={styles.customContainer}>
          {/* Heading */}
          <div className={styles.headingWrapper}>
            <div className={styles.blankflexItem}></div>
            <h1>{st.allGoods}</h1>
            <div className={styles.filterCover}>
              <div className={styles.filterIcon}>
                <Image
                  src={`/Images/bi_filter.svg`}
                  alt="Filter Icon"
                  width={24}
                  height={24}
                  onClick={() => setShowMenu(!showMenu)}
                />
              </div>
              <div
                className={styles.filterListCover}
                style={{ display: showMenu ? "flex" : "none" }}
              >
                <ul className={styles.filterList}>
                  <li
                    className={styles.filterListLi}
                    onClick={() => handleFilterClick(null)}
                  >
                    <input
                      className={styles.filterInput}
                      type="radio"
                      name="cat-filters"
                      checked={selectedFilter === null}
                    />
                    <label className={styles.FilterRadioLabel}>
                      {st.allProducts}
                    </label>
                  </li>
                  {categoriesWithProducts && categoriesWithProducts.map((x, i) => {
                    return (
                      <li
                        key={i}
                        className={styles.filterListLi}
                        onClick={() => handleFilterClick(x.category.id)}
                      >
                        <input
                          className={styles.filterInput}
                          type="radio"
                          name="cat-filters"
                          value={x.category.id}
                          id={x.category.id}
                        />
                        <label className={styles.FilterRadioLabel}>
                          {x.category.name}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* desktop filter */}
          <div className={styles.filterButton}>
            <ul className={styles.newfilterlist}>
              <li
                className={`${styles.newfilterListLi} ${selectedFilter === null ? styles.activeFilter : ''}`}
                onClick={() => handleFilterClick(null)}
              >
                <label className={styles.FilterRadioLabel}>
                  {st.allProducts}
                </label>
              </li>
              {categoriesWithProducts && categoriesWithProducts.map((x, i) => {
                return (
                  <li
                    key={i}
                    className={`${styles.newfilterListLi} ${selectedFilter === x.category.id ? styles.activeFilter : ''}`}
                    onClick={() => handleFilterClick(x.category.id)}
                  >
                    <label className={styles.FilterRadioLabel} htmlFor={x.category.id}>
                      {x.category.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.categoriesCover}>
            {/* Product list */}
            {categoriesWithProducts && categoriesWithProducts.map((item, index) => (
              <div
                key={index}
                ref={(el) => (categoryRefs.current[item.category.id] = el)}
                className={`${styles.wrapper} shopWrapper ${item.category.name}`}
              >
                <div className={styles.goodsItem}>
                  <div className={styles.imageContainer}>
                    <h2 className={styles.imageHeading}>
                      {item.category.name}
                    </h2>
                  </div>
                  <div className={styles.goodsCard}>
                    {enableMockData || (item.products && item.products.length > 0) ? (
                      <ProductList
                        cardHeading=""
                        addToCart={addToCart}
                        updateCartQuantity={updateCartQuantity}
                        removeCartItem={removeCartItem}
                        productData={enableMockData ? [] : item.products}
                        enableMockData={enableMockData}
                        page="shop"
                      />
                    ) : (
                      <p className={styles.comingSoon}>
                        {st.ourProductComingSoon} <br />{st.stayTuned}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default AllItems;