import React, { useState, useRef, useEffect } from "react";
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
  const [isSticky, setIsSticky] = useState(false);
  const categoryRefs = useRef({});
 const filterRef = useRef(null);

 useEffect(() => {
    const sticky = filterRef.current ? filterRef.current.offsetTop : 0;

    const handleScroll = () => {
      if (window.scrollY > sticky) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFilterClick = (categoryId) => {
    setSelectedFilter(categoryId);
    setShowMenu(false);

    if (categoryRefs.current[categoryId]) {
      const element = categoryRefs.current[categoryId];

      const topPos = element.getBoundingClientRect().top + window.scrollY - 255;

      window.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    }else{
	  window.scrollTo({
		top: 0,
		behavior: 'smooth'
      });
	}

    // if (categoryRefs.current[categoryId]) {
    //   categoryRefs.current[categoryId].scrollIntoView({ behavior: 'smooth' });
    // }
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
          <div className={`${styles.filterButton} ${isSticky ? 'sticky-filter' : ''}`} id="filterDiv"
          ref={filterRef}>
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