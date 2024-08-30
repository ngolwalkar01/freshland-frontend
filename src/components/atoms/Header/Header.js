// src/components/header/Header.js
'use client';

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { homepageTranslation, commonTranslation } from '@/locales';
import Productsearch from '@/components/atoms/search';
import productService from '@/services/product';
import CartDropdown from "../cartdropdown";
import { useData } from '@/contexts/DataContext';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const Header = () => {
  const router = useRouter();
  const hpt = homepageTranslation[lang];
  const cmt = commonTranslation[lang];

  const { categories } = useData() || {};

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
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const cartDropdownRef = useRef(null);
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

  const handleClickOutsideCart = (event) => {
    if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutsideCart);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    };
  }, [isDropdownVisible]);
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

  const keyDown = (e) => {
    if (e.key === 'Enter' && searchTxt)
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
		<div
          className={`${styles.announcmentDiv}`}
        >Vi har lanserat vår nya webbplats! 🎉 Om du upplever några problem, hittar buggar, eller har feedback, kontakta oss gärna på hej@fresh.land.</div>
          <header className={`${styles.header} header`}>
            <div className={styles.headercontent}>
              <Link href="/">
                <Image
                  className={styles.freshland}
                  src="/Images/Freshlandlogonew.png"
                  alt="Freshland logo"
                  width={117}
                  height={35}
                  loading="eager"
                />
              </Link>
              <div className={Mobile ? `${styles.navlinksmobile}` : `${styles.linkdescription}`}>
              <div className={`${styles.headerIconWrapper} ${styles.mobileSearch}`} onClick={openSearch}>
                 <span>Search</span> <Image src="/Images/search.svg" alt="Search" fill />
                </div>
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
                          return <li key={i} ><Link href={`/category/${x}`}  className={pathname === `/category/${x}` ? styles.activeLink : ''}>{x}</Link></li>
                        })
                      }
                    </ul>
                  )}
                </div>
                {/* <Link href="/seasonoverview" className={isActive('/seasonoverview')}>{hpt.seasonOverview}</Link> */}
      
                <Link href="/farmer" className={isActive('/farmer')}>{hpt.farmers}</Link>
                <Link href="/se/faq" className={isActive('/se/faq')}>{hpt.faq}</Link>
                <Link href="/about" className={isActive('/about')}>{hpt.aboutUs}</Link>
                <Link href="/vip" className={isActive('/viplist')}>VIP</Link>
                {/* <Link href="/favourites" className={`${isActive('/favourites')} ${styles.favouritesicon}`}>
                  {cmt.favoritesProducts}
                </Link> */}
              
              </div>
              <div className={styles.flexgrow} />
              <div className={styles.icon}>
                <div className={`${styles.headerIconWrapper} ${styles.storemenuicon}`}>
                  <Link href="/shop">
                    <Image src="/Images/storemenu.svg" alt="Wish List" fill />
                  </Link>
                </div>
                <div className={styles.headerIconWrapper}>
                  <Link href="/account">
                    <Image src="/Images/user.svg" alt="User profile" fill />
                  </Link>
                </div>
                <div className={`${styles.headerIconWrapper}`}>
                  <Link href="/favourites">
                    <Image src="/Images/heart.svg" alt="Wish List" fill />
                  </Link>
                </div>
                <div className={`${styles.headerIconWrapper}  ${styles.favicon}`} onClick={openSearch}>
                  <Image src="/Images/search.svg" alt="Search" fill />
                </div>
                <div className={styles.headerIconWrapper}
                  onMouseEnter={() => setDropdownVisible(true)}
                >
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
              <div>
                <input type="text" placeholder={hpt.searchItem} value={searchTxt}
                  onChange={(e) => setSearchTxt(e.target.value)} name="search"
                  onKeyDown={keyDown} className={styles.overlayInput} />
                <button type="button" onClick={onSearch} className={styles.overlayButton}><i className="fa fa-search"></i></button>
              </div>
            </div>
            <div className={styles.ovFlow_scroll}>
              <div className={styles.searchBox}>
              {searchTxt && productData && productData.length > 0 && (
                <Productsearch cardHeading=""
                  productData={productData} />
                )}
              </div>
            </div>
          </div>
        </div>

        {isDropdownVisible && (
          <div className={styles.cartDropdownContainer} ref={cartDropdownRef}>
            <CartDropdown />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
