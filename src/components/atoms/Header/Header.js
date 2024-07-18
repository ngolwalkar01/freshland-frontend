import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { homepageTranslation } from '@/locales';
import Productsearch from '@/components/atoms/searchproduct/searchproduct'
import ManageCookies from "../managecookies";
const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const Header = () => {
  const hpt = homepageTranslation[lang];

  const [Mobile, setMobile] = useState(false);
  const router = useRouter();
  const [showmenu, setshowMenu] = useState();
  const [isSticky, setIsSticky] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const openSearch = () => {
    setOverlayVisible(true);
  };

  const closeSearch = () => {
    setOverlayVisible(false);
  };

  const isActive = (href) => {
    return router.pathname === href ? styles.activeLink : '';
  };

  const handleStoreClick = (e) => {
    e.preventDefault();
    setshowMenu(!showmenu);

  }

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
    const data = JSON.parse(localStorage.getItem(cartDataStorage));
    let numberProductsInCart = 0;
    if (data?.items && data.items.length > 0) {
      data.items.forEach(x => {
        numberProductsInCart += numberProductsInCart + x?.quantity ? x?.quantity : 0;
      })
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
                src="/Images/Freshland.svg"
                alt="Freshland logo"
                width={117}
                height={30}
                loading="eager"
              />
            </Link>
            <div className={styles.flexgrow} />
            <div className={Mobile ? `${styles.navlinksmobile}` : `${styles.linkdescription}`}>
              <div className={`${styles.store} ${isActive('/shop')}`} ref={menuRef}>
                <Link href="/shop">Store</Link>

                <span className="chevrondown" onClick={handleStoreClick} >
                  <i className="fa-solid fa-chevron-down" ></i>
                </span>
                {showmenu && (
                  <ul className={`${styles.storemenu}`}>
                    <li className={styles.lifirst}><Link href='/shop'>{hpt.allgood}</Link></li>
                    <li><Link href='/green'>{hpt.green}</Link></li>
                    <li className={styles.linuts}><Link href='/nutssnack'>{hpt.nuts}</Link></li>
                    <li><Link href='/basis'>{hpt.basis}</Link></li>
                    <li className={styles.lifirst}><Link href='/drinking'>{hpt.drink}</Link></li>
                    <li className={styles.lifirst}><Link href='/giftcards'>{hpt.gift}</Link></li>
                  </ul>
                )}


              </div>
              <Link href="/seasonoverview" className={isActive('/seasonoverview')}>{hpt.seasonOverview}</Link>

              <Link href="/farmer" className={isActive('/farmer')}>{hpt.farmers}</Link>

              <Link href="/faq" className={isActive('/faq')}>{hpt.faq}</Link>

              <Link href="/about" className={isActive('/about')}>{hpt.aboutUs}</Link>

              <Link href="/media" className={isActive('/media')}>{hpt.media}</Link>
            </div>


            <div className={styles.icon}>
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
              <div className={styles.headerIconWrapper}>
                <Link href="/account">
                  <Image src="/Images/user.svg" alt="User profile"
                    fill
                  />
                </Link>
              </div>
              <div className={styles.headerIconWrapper} onClick={openSearch}>
                <Image src="/Images/search.svg" alt="Search"
                  fill
                />
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
            <input type="text" placeholder="search items.." name="search" className={styles.overlayInput} />
            <button type="submit" className={styles.overlayButton}><i className="fa fa-search"></i></button>
           
          </form>
         
        </div>
        <Productsearch/>
      
      </div>
       
      </div>
    </div>
    {/* <ManageCookies/> */}
    </>
  );
};

export default Header;
