import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Seasonal.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { seasonalgood } from "@/mockdata/seasonalgood";
import Link from "next/link";
import { commonTranslation } from '@/locales';
import { homepageTranslation } from '@/locales';
import { getLocalStorage } from '@/services/local-storage';
import Loader from "@/components/atoms/loader/loader";
import debounce, { quantityDebounce } from '@/helper/debounce';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const ProductCard = ({ product, debouncedUpdateQuantity, addToBasket, cartProducts }) => {
  const productInCart = cartProducts.find(x => x.id === product.id);
  const [quantityValue, setQuantityValue] = useState(1);
  const [itemKey, setItemKey] = useState(null);
  const cmt = commonTranslation[lang];

  useEffect(() => {
    if (productInCart) {
      const quantity = productInCart.quantity || 1;
      setQuantityValue(quantity);
      setItemKey(productInCart.key);
    }
  }, [productInCart]);

  return (
    <>
      {productInCart ? (
        <div className={styles.addWrapperquantity}>
          <button
            className={`${styles.valueButton} ${styles.decreaseButton}`}
            onClick={() => {
              debouncedUpdateQuantity(
                itemKey,
                - 1,
                quantityValue
              )
            }}
          >
            <i className="fa-solid fa-minus" aria-label="Decrease quantity"></i>{" "}
          </button>
          <p className={styles.number}>{quantityValue}</p> {/* corrected from quantity to quantityValue */}
          <button
            className={`${styles.valueButton} ${styles.increaseButton}`}
            onClick={() => {
              debouncedUpdateQuantity(
                itemKey,
                1,
                quantityValue
              )
            }}
          >
            <i className="fa-solid fa-plus" aria-label="Increase quantity"></i>
          </button>
        </div>
      ) : (
        <div>
          <button className={styles.addWrapper} onClick={(e) => {
            e.stopPropagation();
            addToBasket(product.id.toString())
          }}>{cmt.add}</button>
        </div>
      )}
    </>
  )
}

const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const Goods = ({ sessionalProductProps }) => {
  const [loading, setLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [progress, setProgress] = useState(0); 

  const hpt = homepageTranslation[lang];
  const cmt = commonTranslation[lang];
  const { productData, enableMockData, addToCart, updateCartQuantity, removeCartItem } = sessionalProductProps;
  const images = productData;
  const router = useRouter();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,

        settings: {
          slidesToShow: 2, // Show 2 slides on mobile screens
          slidesToScroll: 1,
          initialSlide: 0, // Ensure the first slide is fully visible
          variableWidth: true,
        },
      },
    ],
  };

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

  const addToBasket = async (productId) => {
    setLoading(true);
    setProgress(60);
  await addToCart(productId.toString());
    setLoading(false);
    setProgress(100);
  }

  

  const redirectToProductDetail = (id) => {
    router.push(`/product/${id}`);
  };

  const removeProductCart = async (itemKey) => {
    setLoading(true);
    setProgress(60);
    await removeCartItem(itemKey);
    setLoading(false);
    setProgress(100);
  };

  const updateQuantity = async (itemKey, incrementQuantity, currentQuantity) => {
    let newQuantity = incrementQuantity + currentQuantity;
    if (newQuantity < 1) {
      await removeProductCart(itemKey)
      return;
    }

    setLoading(true);
    setProgress(60);
    await updateCartQuantity(itemKey, newQuantity);
    setLoading(false);
    setProgress(100);
  };

  const debouncedUpdateQuantity = quantityDebounce(updateQuantity, 1000);

  return (
    <>
      {loading ? <Loader progress={progress}/> : null}
      <div className={styles.seasonalgoodcontainer}>
        <div className={styles.container}>
          <h3 className={`W-H2 ${styles.title}`}>{hpt.seasonalGoods}</h3>
          <p className={styles.subtitle}>{hpt.getTheTaste}</p>
          <div className={styles.goodscontainer}>
            <Slider {...settings} className={styles.slickslider}>
              {images.map((item, index) => (
                <div key={index}>
                  <div
                    className={styles.slideContainer}
                  >
                    {<>
                      <div className={styles.cstImgCover}>
                        <Image
                          className={styles.slideImage}
                          src={`${item.thumbnail}`}
                          alt={`Slide ${index}`}
                          fill={true}
                          onClick={(e) => {
                            e.preventDefault();
                            redirectToProductDetail(item.id);
                          }}
                        />
                      </div>
                      <div className={styles.slideTextOverlay} onClick={(e) => {
                        e.preventDefault();
                        redirectToProductDetail(item.id);
                      }}>
                        <p className={`W-body-Large ${styles.slideText}`}>
                          {item.name}
                        </p>
                        <p className={styles.slideText} dangerouslySetInnerHTML={{ __html: item.price }} ></p>
                      </div>
                    </>}
                    <ProductCard cartProducts={cartProducts} product={item} debouncedUpdateQuantity={debouncedUpdateQuantity} addToBasket={addToBasket} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <Link href="/shop" className={styles.seeAllButton}>
            {cmt.seeAllProducts}
            <Image
              src="/Images/seeproduct.svg"
              alt="logo"
              width={23}
              height={22}
            ></Image>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Goods;
