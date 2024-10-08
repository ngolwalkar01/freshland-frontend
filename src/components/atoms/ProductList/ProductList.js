import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";
import Image from 'next/image'
import Link from "next/link";
import Loader from "@/components/atoms/loader/loader";
import debounce, { quantityDebounce } from '@/helper/debounce';
import { getLocalStorage } from '@/services/local-storage';
import { commonTranslation } from '@/locales';
import { applyLoader } from "@/helper/loader";
import OverLayLoader from '@/components/atoms/overLayLoader';
import productService from '@/services/product';
import ProductListSkeleton from "@/components/skeleton/homepageskelton/productlist";

const lang = process.env.NEXT_PUBLIC_LANG || 'se';


const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const ProductCard = ({ currentIndex, product, debouncedUpdateQuantity, addToBasket, cartProducts, setOlLoader, reload, page = "NoPage", parentClass="" }) => {
  const cmt = commonTranslation[lang];
  const productInCart = cartProducts.find(x => x.id === product.id);
  const [quantityValue, setQuantityValue] = useState(1);
  const [itemKey, setItemKey] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    await applyLoader(
      setOlLoader,
      productService.setProductFavorite,
      [product.id]
    )
    setIsClicked(!isClicked);
    reload();
  };
  useEffect(() => {
    if (productInCart) {
      const quantity = productInCart.quantity || 1;
      setQuantityValue(quantity);

      const itemKey = productInCart?.key;
      setItemKey(itemKey);
    }
  }, [productInCart])

  useEffect(() => {
    if (product?.is_favorite)
      setIsClicked(true);
  }, [product])

  return (
    <div key={product.id} className={`${styles.gridItem} ${parentClass}`}>
      <div className={styles.transparentCard}>
        <div className={styles.cardContent}>
          <div className={`${styles.organicLogo} ${(!product?.is_new && !product?.is_organic) ? styles.noGap : ''}`}>
            <div className={styles.newStatus}>
              {product?.is_new && <p>{cmt.new}</p>}
              {product?.is_organic && <Image
                className={styles.cardTopImage}
                src="/Images/productTop.png"
                alt=""
                width={40}
                height={10}
              />}

            </div>
            <div>
              <Link href={`/product/${product.slug}`}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
              </Link>
            </div>
            <p
              className={styles.cardPrice}
              dangerouslySetInnerHTML={{ __html: product.price }}
            />
          </div>
          <div className={styles.hearticon} >
            <i className={`fa-solid fa-heart custom-fa-heart ${isClicked ? styles.clicked : styles.default}`} onClick={handleClick}></i>
          </div>
        </div>
        <Link href={`/product/${product.slug}`} className={`${styles.imgContainer} ${page}-prod-link ${page}-prod-link-${currentIndex}`}>
          {/* <Image
            className={styles.cardTopImage}
            src="/Images/productTop.png" alt="" width={40} height={10}
          /> */}
          <Image
            className={`${styles.cardImage} ${page}-img ${page}-img-${currentIndex}`}
            src={product.thumbnail ? product.thumbnail : "/mockImage/orange.png"}
            alt={product?.name}
            // width={227} height={159}
            fill
          />
        </Link>
        {/* <div className={styles.cardContent}>
          <Link href={`/product/${product.id}`}>
            <h3 className={styles.cardTitle}>{product.name}</h3>
          </Link>
        </div> */}
        {/* <div className={styles.cardPrice} dangerouslySetInnerHTML={{ __html: product.price }} /> */}
        {/* <p className={styles.cardPrice}>DKK {product.price}</p> */}
        <div className={styles.cardActions}>
          {productInCart ? (
            <>
              <div className={styles.addToBasket}>
                <button
                  className={`${styles.valueButton} ${styles.decreaseButton}`}
                  onClick={() => {
                    applyLoader(
                      setOlLoader,
                      debouncedUpdateQuantity,
                      [itemKey,
                        -1,
                        quantityValue]
                    )
                  }
                  }
                >
                  -
                </button>
                <label htmlFor="quantity"></label>
                <input
                  type="number"
                  value={quantityValue}
                  id="quantity"
                  className={styles.number}
                  disabled
                ></input>
                <button
                  className={`${styles.valueButton} ${styles.increaseButton}`}
                  onClick={() => {
                    applyLoader(
                      setOlLoader,
                      debouncedUpdateQuantity,
                      [itemKey,
                        1,
                        quantityValue]
                    )
                  }
                  }
                >
                  +
                </button>
              </div>
            </>
          ) : (
            <button className={styles.addToBasketButton} onClick={() => {
              applyLoader(
                setOlLoader,
                addToBasket,
                [product.id]
              )
            }}>
              {cmt.addToBasket}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
const ProductList = ({
  cardHeading,
  productData,
  addToCart,
  updateCartQuantity,
  removeCartItem,
  overRideClass = false,
  reload = () => { },
  page = "NoPage",
  pageLoading = false,
  parentClass=""
}) => {
  const [cartProducts, setCartProducts] = useState([]);
  const data = productData;
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [olLoader, setOlLoader] = useState(false);


  const getCartData = () => {
    const data = getLocalStorage(cartDataStorage);
    if (data) {
      const productsInCart = data.items && data.items.length > 0 ? data.items : [];
      setCartProducts(JSON.parse(JSON.stringify(productsInCart)));
    }
  }

  useEffect(() => {
    if (!loading)
      getCartData();
  }, [loading])

  useEffect(() => {
    getCartData();
    const handleStorageChange = (event) => {
      if (event.type === 'local-storage' && event.detail.key === cartDataStorage) {
        getCartData();
      }
    };

    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  const removeProductCart = async (itemKey) => {
    try {
      setProgress(60);
      setLoading(true);
      await removeCartItem(itemKey);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const updateQuantity = async (itemKey, incrementQuantity, currentQuantity) => {
    try {
      setLoading(true);
      setProgress(60);
      let newQuantity = incrementQuantity + currentQuantity;
      if (newQuantity < 1) {
        await removeProductCart(itemKey);
      } else {
        await updateCartQuantity(itemKey, newQuantity);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  // const debouncedUpdateQuantity = quantityDebounce(updateQuantity, 500);
  const debouncedUpdateQuantity = updateQuantity;

  const addToBasket = async (productId) => {
    try {
      setLoading(true);
      setProgress(60);
      await addToCart(productId.toString());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  }

  return (
    <div>
      {loading ? <Loader progress={progress} /> : null}
      {olLoader && <OverLayLoader />}
      <div className={overRideClass ? styles.container : ""}>
        {cardHeading ? <h2 className={styles.heading}>{cardHeading}</h2> : null}
        <div className={styles.gridWrapper}>
          <div className={styles.gridContainer}>
            {
              pageLoading ? <ProductListSkeleton /> : (
                <>
                  {data && data.map((product, i) => (
                    <ProductCard key={i} currentIndex={i} setOlLoader={setOlLoader} cartProducts={cartProducts} product={product}
                      debouncedUpdateQuantity={debouncedUpdateQuantity} addToBasket={addToBasket} reload={reload} page={page} parentClass={parentClass} />
                  ))}
                </>
              )
            }
          </div>
        </div>
      </div >
    </div >
  );
};

export default ProductList;


