// src/components/header/Header.js
'use client';

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { homepageTranslation } from '@/locales';
import Productsearch from '@/components/atoms/search';
import productService from '@/services/product';
import productCategoryService from "@/services/productCategories";

const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const Header = () => {
  const router = useRouter();
  const hpt = homepageTranslation[lang];
  const [Mobile, setMobile] = useState(false);
  const pathname = usePathname()
  const [showmenu, setshowMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [productData, setProductData] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [categories, setCategories] = useState([])

  const openSearch = () => {
    setSearchTxt("");
    setOverlayVisible(true);
  };

  const closeSearch = () => {
    setOverlayVisible(false);
  };

  const isActive = (href) => {
    return pathname === href ? styles.activeLink : '';
  };

  const handleStoreClick = (e) => {
    e.preventDefault();
    setshowMenu(!showmenu);
  };

  useEffect(() => {
    const sticky = headerRef.current ? headerRef.current.offsetTop : 0;

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await productCategoryService.getCategories();
      setCategories(data);
    }

    fetchData();
  }, [])

  const updateCartCount = () => {
    const cartLocalStorageData = cartDataStorage && localStorage.getItem(cartDataStorage);
    const data = cartLocalStorageData && cartLocalStorageData != 'undefined' ? JSON.parse(cartLocalStorageData) : cartDataStorage;
    let numberProductsInCart = 0;
    if (data?.items && data.items.length > 0) {
      data.items.forEach(x => {
        numberProductsInCart += x?.quantity ? x.quantity : 0;
      });
    }
    setCartItemCount(numberProductsInCart);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.chevrondown')) {
      setshowMenu(false);
    }
  };

  useEffect(() => {
    if (showmenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showmenu]);

  useEffect(() => {
    updateCartCount();
    const handleStorageChange = (event) => {
      if (event.type === 'local-storage' && event.detail.key === cartDataStorage) {
        updateCartCount();
      }
    };

    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const getSearchedProducts = async () => {
      if (searchTxt) {
        const data = await productService.getSearchedProducts(searchTxt);
        setProductData(data?.suggestions && data?.suggestions.length > 0 ? data.suggestions : []);
      } else {
        setProductData([]);
      }
    }

    const timeoutId = setTimeout(() => {
      getSearchedProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTxt])

  const onSearch = (e) => {
    e.preventDefault();
    if (searchTxt)
      router.push(`/search/${searchTxt}`);
  }

  return (
    <>
      <div className={styles.bgWrapper}>
        <div
          className={`${styles.headerdiv} ${isSticky ? 'sticky-header' : ''}`}
          id="headerdiv"
          ref={headerRef}
        >
          <header className={`${styles.header} header`}>
            <div className={styles.headercontent}>
              <Link href="/">
                <Image
                  className={styles.freshland}
                  src="/Images/freshlandnewlog.png"
                  alt="Freshland logo"
                  width={117}
                  height={35}
                  loading="eager"
                />
              </Link>
              <div className={Mobile ? `${styles.navlinksmobile}` : `${styles.linkdescription}`}>
                <div className={`${styles.store} ${isActive('/shop')}`} ref={menuRef}>
                  <Link href="/shop">{hpt.storeDropdown}</Link>
                  <span className="chevrondown" onClick={handleStoreClick}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                  {showmenu && (
                    <ul className={`${styles.storemenu}`}>
                      <li className={styles.lifirst}><Link href='/shop'>{hpt.allgood}</Link></li>
                      {
                        categories && categories.length > 0 && categories.map((x, i) => {
                          return <li key={i}><Link href={`/category/${x}`}>{x}</Link></li>
                        })
                      }
                    </ul>
                  )}
                </div>
                <Link href="/seasonoverview" className={isActive('/seasonoverview')}>{hpt.seasonOverview}</Link>
                <Link href="/farmer" className={isActive('/farmer')}>{hpt.farmers}</Link>
                <Link href="/se/faq" className={isActive('/se/faq')}>{hpt.faq}</Link>
                <Link href="/about" className={isActive('/about')}>{hpt.aboutUs}</Link>
                <Link href="/viplist" className={isActive('/viplist')}>VIP</Link>
             
              </div>
              <div className={styles.flexgrow} />
              <div className={styles.icon}>
                <div className={styles.headerIconWrapper} onClick={openSearch}>
                  <Image src="/Images/search.svg" alt="Search" fill />
                </div>
                <div className={styles.headerIconWrapper}>
                  <Link href="/account">
                    <Image src="/Images/user.svg" alt="User profile" fill />
                  </Link>
                </div>
                <div className={styles.headerIconWrapper}>
                  <Link href="/favourites">
                    <Image src="/Images/heart.svg" alt="Wish List" fill />
                  </Link>
                </div>
                <div className={styles.headerIconWrapper}>
                  <Link href="/cart" className={styles.cartIcon}>
                    <Image
                      src="/Images/garden-cart.svg"
                      alt="Shopping cart"
                      fill
                    />
                    <span>{cartItemCount}</span>
                  </Link>
                </div>
                <div className={`${styles.menubar} ${styles.headerIconWrapper}`} onClick={() => setMobile(!Mobile)}>
                  <Image
                    src="/Images/menubar.svg"
                    alt="Menu bar"
                    fill
                  />
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className={`${styles.overlay} ${overlayVisible ? styles.show : ''}`}>
          <div className={styles.searchbg}>
            <span className={styles.closebtn} onClick={closeSearch} title="Close Overlay">×</span>
            <div className={styles.overlayContent}>
              <p className={styles.looking}>{hpt.whatAre}</p>
              <form>
                <input type="text" placeholder={hpt.searchItem} value={searchTxt}
                  onChange={(e) => setSearchTxt(e.target.value)} name="search" className={styles.overlayInput} />
                <button type="button" onClick={onSearch} className={styles.overlayButton}><i className="fa fa-search"></i></button>
              </form>
            </div>
            <div className={styles.ovFlow_scroll}>
              <div className={styles.searchBox}>
              <Productsearch cardHeading=""
                productData={productData} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
