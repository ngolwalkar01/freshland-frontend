import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";
import Image from 'next/image'
import Link from "next/link";
import Loader from "@/components/atoms/loader/loader";
import debounce, { quantityDebounce } from '@/helper/debounce';
import { getLocalStorage } from '@/services/local-storage';
import { commonTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';


const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const ProductCard = ({ product, debouncedUpdateQuantity, addToBasket, cartProducts }) => {
  const cmt = commonTranslation[lang];
  const productInCart = cartProducts.find(x => x.id === product.id);
  const [quantityValue, setQuantityValue] = useState(1);
  const [itemKey, setItemKey] = useState(null);

  useEffect(() => {
    if (productInCart) {
      const quantity = productInCart.quantity || 1;
      setQuantityValue(quantity);

      const itemKey = productInCart?.key;
      setItemKey(itemKey);
    }
  }, [productInCart])

  return (
    <div key={product.id} className={styles.gridItem}>
      <div className={styles.transparentCard}>
        <Link href={`/product/${product.id}`} className={styles.imgContainer}>
          <Image
            className={styles.cardTopImage}
            src="/Images/productTop.png" alt="" width={40} height={10}
          />
          <Image
            className={styles.cardImage}
            src={product.thumbnail ? product.thumbnail : "/mockImage/orange.png"}
            alt={product?.name}
            width={174} height={152}
          />
        </Link>
        <div className={styles.cardContent}>
          <Link href={`/product/${product.id}`}>
            <h3 className={styles.cardTitle}>{product.name}</h3>
          </Link>
        </div>
        <div className={styles.cardPrice} dangerouslySetInnerHTML={{ __html: product.price }} />
        {/* <p className={styles.cardPrice}>DKK {product.price}</p> */}
        <div className={styles.cardActions}>
          {productInCart ? (
            <>
              <div className={styles.addToBasket}>
                <button
                  className={`${styles.valueButton} ${styles.decreaseButton}`}
                  onClick={() => {
                    debouncedUpdateQuantity(
                      itemKey,
                      -1,
                      quantityValue
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
                    debouncedUpdateQuantity(
                      itemKey,
                      1,
                      quantityValue
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
              addToBasket(product.id);
            }}>
              {cmt.addToBasket}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
const ProductList = ({ cardHeading, productData, addToCart, updateCartQuantity, removeCartItem }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const data = productData;
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);


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
    setLoading(true);
   
    await removeCartItem(itemKey);
    setLoading(false);
    setProgress(100);
  };

  const updateQuantity = async (itemKey, incrementQuantity, currentQuantity) => {
    let newQuantity = incrementQuantity + currentQuantity;
    if (newQuantity < 1) {
      setProgress(60);
      await removeProductCart(itemKey);
      setProgress(100);
    

      return;
    }

    setLoading(true);
    await updateCartQuantity(itemKey, newQuantity);
    setLoading(false);
    setProgress(100);
    
  };

  // const debouncedUpdateQuantity = quantityDebounce(updateQuantity, 500);
  const debouncedUpdateQuantity = updateQuantity;

  const addToBasket = async (productId) => {
    setLoading(true);
    setProgress(60);
    await addToCart(productId.toString());
    setLoading(false);
    setProgress(100);
    }

  return (
    <div>
      {loading ? <Loader progress={progress}/> : null}
      <div className={styles.container}>
        {cardHeading ? <h2 className={styles.heading}>{cardHeading}</h2> : null}
        <div className={styles.gridContainer}>
          {data && data.map((product,i) => (
            <ProductCard key={i} cartProducts={cartProducts} product={product} debouncedUpdateQuantity={debouncedUpdateQuantity} addToBasket={addToBasket} />
          ))}
        </div>
      </div >
    </div >
  );
};

export default ProductList;


