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

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';


const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const ProductCard = ({ product, debouncedUpdateQuantity, addToBasket, cartProducts, setOlLoader, reload }) => {
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
    <div key={product.id} className={styles.gridItem}>
      <div className={styles.transparentCard}>
        <div className={styles.cardContent}>
          <div>
            <div className={styles.newStatus}>
              {product?.is_new && <p>New</p>}
              {product?.is_organic && <Image
                className={styles.cardTopImage}
                src="/Images/productTop.png"
                alt=""
                width={40}
                height={10}
              />}

            </div>
            <div>
              <Link href={`/product/${product.id}`}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
              </Link>
            </div>
            <p
              className={styles.cardPrice}
              dangerouslySetInnerHTML={{ __html: product.price }}
            />
          </div>
          <div className={styles.hearticon} >
            <i className={`fa-solid fa-heart ${isClicked ? styles.clicked : styles.default}`} onClick={handleClick}></i>
          </div>
        </div>
        <Link href={`/product/${product.id}`} className={styles.imgContainer}>
          {/* <Image
            className={styles.cardTopImage}
            src="/Images/productTop.png" alt="" width={40} height={10}
          /> */}
          <Image
            className={styles.cardImage}
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
const ProductList = ({ cardHeading, productData, addToCart, updateCartQuantity, removeCartItem, overRideClass = false, reload = () => { } }) => {
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
            {data && data.map((product, i) => (
              <ProductCard key={i} setOlLoader={setOlLoader} cartProducts={cartProducts} product={product}
                debouncedUpdateQuantity={debouncedUpdateQuantity} addToBasket={addToBasket} reload={reload} />
            ))}
          </div>
        </div>
      </div >
    </div >
  );
};

export default ProductList;


