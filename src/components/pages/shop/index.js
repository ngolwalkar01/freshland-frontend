import React, { useState } from "react";
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
                  {categoryWithProducts && categoriesWithProducts.map((x, i) => {
                    return (
                      <li
                        key={i}
                        className={styles.filterListLi}
                        onClick={() => {
                          setSelectedFilter(x.category.id);
                          setShowMenu(false);
                        }}
                      >
                        <input
                          className={styles.filterInput}
                          type="radio"
                          name="cat-filters"
                          value={x.category.id}
                          id={x.category.id}
                        />
                        <label
                          className={styles.FilterRadioLabel}
                          htmlFor={x.category.id}
                        >
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

              <div
              >

                
                <ul className={styles.newfilterlist}>

                <li
                className={`${styles.newfilterListLi} ${selectedFilter === null ? styles.activeFilter : ''}`}
                onClick={() => {
                      setSelectedFilter(null);
                      setShowMenu(false);
                    }}
                  >
                    <label className={styles.FilterRadioLabel}>
                     All Product
                    </label>
                  </li>
                  {categoryWithProducts && categoriesWithProducts.map((x, i) => {
                    return (
                      <li
                        key={i}
                        className={styles.newfilterListLi}
                        onClick={() => {
                          setSelectedFilter(x.category.id);
                          setShowMenu(false);
                        }}
                      >
                        {/* <input
                          className={styles.filterInput}
                          type="radio"
                          name="cat-filters"
                          value={x.category.id}
                          id={x.category.id}
                        /> */}
                        <label
                          className={styles.FilterRadioLabel}
                          htmlFor={x.category.id}
                        >
                          {x.category.name}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/*  */}
          <div className={styles.categoriesCover}>
            {/* Product list */}
            {categoriesWithProducts && categoriesWithProducts
              .filter((x) => {
                return !selectedFilter || x.category.id === selectedFilter;
              })
              .map((item, index) => (
                <div key={index} className={styles.wrapper}>
                  <div className={styles.goodsItem} key={index}>
                    {/* Image */}
                    <div className={styles.imageContainer}>
                      {/* <Image
                        src={`/mockImage/Fruit.png`}
                        alt={item.category.name}
                        className={styles.coverImage}
                        width={1400}
                        height={213}
                        sizes="(max-width: 600px) 100vw, (max-width: 1400px) 80vw"
                        loading="lazy"
                      /> */}
                      <h2 className={styles.imageHeading}>
                        {item.category.name}
                      </h2>
                    </div>
                    <div className={styles.goodsCard}>
                      {enableMockData ||
                        (item.products && item.products.length > 0) ? (
                        <ProductList
                          cardHeading=""
                          addToCart={addToCart}
                          updateCartQuantity={updateCartQuantity}
                          removeCartItem={removeCartItem}
                          productData={enableMockData ? [] : item.products}
                          enableMockData={enableMockData}
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



