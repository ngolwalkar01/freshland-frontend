import React, { Fragment, useEffect, useState, useCallback } from "react";
import Header from "@/components/atoms/Header/Header";
import styles from "./cart.module.css";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import debounce, { quantityDebounce } from "@/helper/debounce";
import Cartskeleton from "@/components/skeleton/cartskeleton/cartskeleton";
import {
  updateCartQuantity,
  removeCartItem,
  addCouponCart,
  removeCouponCart,
  getCartData,
  updateCartSubscriptionFrequency,
} from "@/components/service/cart";
import Loader from "@/components/atoms/loader/loader";
import { cartTranslation, serviceTranslation } from "@/locales";
import { setShippingMethod } from "@/components/service/shipping";
import CartShipping from "@/components/atoms/cartshiiping";
import { applyLoader } from "@/helper/loader";
import OverLayLoader from '@/components/atoms/overLayLoader';
import { trackAddToCartPage } from "@/components/service/klaviyoTrack";

const lang = process.env.NEXT_PUBLIC_LANG || "se";
const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

const INTIAL_CART_DATA = {
  items: [],
  currency: "$",
  totals: {},
  shipping: [],
  subscriptionShipping: [],
  couponsData: "",
  delivery_dates: null,
  customer: null,
};

function Cart() {
  const [isCartReady, setIsCartReady] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [shipmentOption, setShipmentOption] = useState("Home Delivery :DKK 60");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const ct = cartTranslation[lang];
  const service = serviceTranslation[lang];
  const [olLoader, setOlLoader] = useState(false);

  const [cartData, setCartData] = useState(INTIAL_CART_DATA);

  const {
    items: cartItems,
    currency,
    totals,
    couponsData,
    shipping,
    delivery_dates,
    subscriptionShipping,
  } = cartData;
  const coupons = couponsData;
  const currency_minor_unit = parseInt(totals?.currency_minor_unit)
  const getCorrectPrice = (number) => {
    if (currency_minor_unit)
      return parseFloat((number / 100).toFixed(currency_minor_unit));

    return number;
  }

  const cartSubTotal = getCorrectPrice(parseInt(totals?.total_items) + parseInt(totals?.total_items_tax));
  const cartTotalDiscount = getCorrectPrice(parseInt(totals?.total_discount) + parseInt(totals?.total_discount_tax));
  const cartTotal = totals?.total_price;
  const tax = totals?.total_tax;
  
  const currency_symbol = currency;

  const setCartDataByCartData = (cartData) => {
    if (!cartData) return;
    const {
      items,
      totals,
      coupons,
      shipping_rates = [],
      extensions,
      customer,
      payment_methods: paymentMethods,
      billing_address,
    } = cartData;
    const delivery_dates = extensions?.delivery;
    const currency = totals?.currency_symbol;
    const currentCoupon = coupons && coupons.length > 0 ? coupons[0]?.code : "";
    const shipping = [
      {
        isMainShipping: true,
        shipping: shipping_rates,
        totals,
        billing_period: "",
        billing_interval: "",
      },
    ];
    const subscriptionShipping = [];
    if (extensions.subscriptions && extensions.subscriptions.length > 0) {
      extensions.subscriptions.forEach((x) => {
        if (x.shipping_rates && x.shipping_rates.length > 0) {
          x.shipping_rates.forEach((sh) => {
            subscriptionShipping.push({
              isMainShipping: false,
              shipping: [sh],
              totals: x.totals,
              billing_period: x.billing_period,
              billing_interval: x.billing_interval,
            });
          });
        }
      });
    }
    setCartData({
      items,
      currency,
      totals,
      shipping,
      couponsData: currentCoupon,
      delivery_dates,
      customer,
      paymentMethods,
      billing_address,
      subscriptionShipping,
    });
    setCoupon(currentCoupon);
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        const cartData = await getCartData();
        setCartDataByCartData(cartData);
        // trackAddToCartPage(cartData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsCartReady(true);
      }
    };

    getCart();
  }, []);

  const updateQuantity = async (itemKey, incrementQuantity, currentQuantity) => {
    try {
      let newQuantity = incrementQuantity + currentQuantity;
      if (currentQuantity == 1 && newQuantity < 1) {
        toast.error(service.productQuantityRequired, {
          autoClose: toastTimer,
        });
        return;
      }
      if (newQuantity < 1)
        newQuantity = 1;
      // const updatedItems = cartData.items.map((item) => {
      //   if (item.item_key === itemKey) {
      //     return { ...item, quantity: { ...item.quantity, value: newQuantity } };
      //   }
      //   return item;
      // });
      // setCartData({ ...cartData, items: updatedItems });
      setLoading(true);
      setProgress(60);
      const data = await updateCartQuantity(itemKey, newQuantity);
      setCartDataByCartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const removeProductCart = async (e, itemKey) => {
    try {
      e.preventDefault();
      setLoading(true);
      setProgress(60);
      const data = await removeCartItem(itemKey);
      setCartDataByCartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const removeCoupon = async (coupon) => {
    try {
      setProgress(60);
      setLoading(true);
      const data = await removeCouponCart(coupon);
      setCartDataByCartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const applyCoupon = async () => {
    try {
      if (coupon) {
        setLoading(true);
        const data = await addCouponCart(coupon);
        setCartDataByCartData(data);
        if(!(data?.coupons && data?.coupons.length > 0)) {
          toast.error(service.couponNotApplied, { autoClose: toastTimer });
        }
      } else {
        toast.error(service.couponRequired, { autoClose: toastTimer });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProductFrequency = async (e, item_key) => {
    try {
      const current_Val = e.target.value;
      setProgress(60);

      setLoading(true);
      const data = await updateCartSubscriptionFrequency(item_key, current_Val);
      setCartDataByCartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

  const setCartShipment = async (shipmentOpt, packageId) => {
    try {
      setLoading(true);
      setProgress(60);

      const data = await setShippingMethod(shipmentOpt, packageId);
      setCartDataByCartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  // const debouncedUpdateQuantity = quantityDebounce(updateQuantity, 1000);
  const debouncedUpdateQuantity = updateQuantity

  const checkShippingRates = useCallback(() => {
    return shipping && shipping.length > 0 && shipping[0]?.shipping?.[0]?.shipping_rates?.length > 0;
  }, [shipping])

  return (
    <>
      {loading ?
        <>
          <Loader progress={progress} />
        </>
        : null}
      {olLoader && <OverLayLoader />}
      {isCartReady ? (
        <div className={styles.shopingcart}>
          <Header />
          {cartItems && cartItems.length > 0 ? (
            <div className={styles.mainContainer}>
              <h2 className={styles.mainHeading}>{ct.shCart}</h2>

              <div className={styles.shoppingcartdiv}>
                <div className={styles.wrapper}>
                  <section className={styles.leftContainer}>
                    {cartItems &&
                      Array.isArray(cartItems) &&
                      cartItems.map((cartItem, i) => {
                        const {
                          quantity,
                          key: item_key,
                          images,
                          id: productId,
                          prices
                        } = cartItem;
                        const itemTotals = cartItem.totals;
                        const currentImage =
                          images && images.length > 0 ? images[0].src : "";
                        const quantityValue = quantity;
                        const subtotal = getCorrectPrice(prices?.price);
                        const itemsSubTotal = getCorrectPrice(parseInt(itemTotals?.line_subtotal) + parseInt(itemTotals?.line_subtotal_tax))
                        const subscription_schemes =
                          cartItem?.extensions?.subscription_schemes;
                        const current_options =
                          subscription_schemes &&
                            subscription_schemes.subscription_schemes &&
                            subscription_schemes.subscription_schemes.length > 0
                            ? subscription_schemes.subscription_schemes
                            : [];
                        const selectedValue = current_options.find(
                          (x) => x.selected_subscription
                        );
                        // const total = totals?.total;

                        return (
                          <Fragment key={i}>
                            <div className={styles.productSection}>
                              <div className={styles.cartpageSection}>
                              <span
                                className={styles.closebtn}
                                onClick={(e) => {
                                  applyLoader(
                                    setOlLoader,
                                    removeProductCart,
                                    [e, item_key]
                                  )
                                }}
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </span>
                              <div className={styles.leftSide}>
                                <div className={styles.smallImage}>
                                  <Image
                                    src={"/Images/productTop.png"}
                                    width={30}
                                    height={20}
                                    alt="product Top img"
                                  />
                                </div>
                                <div className={styles.mainImage}>
                                  <Link href={`/product/${productId}`}>
                                    <Image
                                      src={currentImage}
                                      width={100}
                                      height={100}
                                      alt="Main Image"
                                      priority
                                    />
                                  </Link>
                                </div>
                              </div>
                             
                              <div>
                                <Link href={`/product/${productId}`}>
                                  <p className={`${styles.productTitle} W-Body-Medium `}>
                                    {cartItem.name}{" "}
                                    <span>
                                      {subtotal} {currency_symbol}
                                    </span>
                                  </p>
                                </Link>
                                <div className={styles.addToBasket}>
                                  <button
                                    className={`${styles.valueButton} ${styles.decreaseButton} W-Body-Large-Regular`}
                                    onClick={() =>
                                      applyLoader(
                                        setOlLoader,
                                        debouncedUpdateQuantity,
                                        [
                                          cartItem.key,
                                          -1,
                                          cartItem.quantity
                                        ]
                                      )
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
                                    aria-label="Quantity"
                                    disabled
                                  ></input>
                                  {/* <p className={styles.number}>{count}</p> */}
                                  <button
                                    className={`${styles.valueButton} ${styles.increaseButton} W-Body-Large-Regular`}
                                    onClick={() =>
                                      applyLoader(
                                        setOlLoader,
                                        debouncedUpdateQuantity,
                                        [
                                          cartItem.key,
                                          1,
                                          cartItem.quantity
                                        ]
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                             </div>
                                <div className={styles.cartpageSutotal}>
                              <p className="W-Body-Large-Bold">{ct.subTotal}</p>
                              <p className="W-Body-Large-Medium">
                                {itemsSubTotal} {currency_symbol}
                              </p>
                            </div>
                            </div>
                            {subscription_schemes?.is_subscription && (
                              <div
                                className={`${styles.fieldColumn} ${styles.fieldColumnDelivery}`}
                              >
                                <label htmlFor="selectDelivery">Delivery</label>
                                <select
                                  id="selectDelivery"
                                  value={selectedValue?.id}
                                  onChange={(e) =>
                                    applyLoader(
                                      setOlLoader,
                                      updateProductFrequency,
                                      [
                                        e, cartItem.key
                                      ]
                                    )
                                  }
                                  className={styles.selectbox}
                                >
                                  {current_options.map((x, i) => {
                                    return (
                                      <option key={i} value={x.id}>
                                        {x.title}
                                      </option>
                                    );
                                  })}
                                </select>
                                <span className={styles.customArrow}></span>
                              </div>
                            )}
{/* 
                            <div className={styles.subtotalLeft}>
                              <p>{ct.subTotal}</p>
                              <p>
                                {itemsSubTotal} {currency_symbol}
                              </p>
                            </div> */}
                          </Fragment>
                        );
                      })}

                           <div className={styles.subtotalLeft}>
                              <p className={styles.bottomSubtotal}>{ct.subTotal}</p>
                              <p className="W-Body-Large-Bold">
                              {cartSubTotal}   {currency_symbol}
                              </p>
                            </div> 
                            <div className={`W-Body-Large-Bold ${styles.redeemDiscount}`}>
                              <p>{ct.redeemCode}</p> 
                    <div
                      className={`${styles.discountcol}`}
                    >
                      <div className={styles.discount}>
                        <input
                          type="text"
                          name="name"
                          placeholder={ct.redeemCode}
                          value={coupon || ""}
                          onChange={(e) => {
                            setCoupon(e.target.value);
                          }}
                        ></input>{" "}
                      </div>
                      <button
                        type="submit"
                        className={styles.applydiscount}
                        onClick={() => {
                          applyLoader(
                            setOlLoader,
                            applyCoupon,
                            []
                          )
                        }}
                      >
                        {ct.redeem}
                      </button>
                    </div>
                    </div>
                  </section>
                  <aside className={styles.rightContainer}>
                    <h3 className={styles.firstHeading}>{ct.totalAmount}</h3>
                    <div className={styles.table}>
                      <div className={styles.subtotal}>
                        <p>{ct.subTotal}</p>
                        <p>
                          {cartSubTotal} {currency_symbol} 
                        </p>
                      </div>
                      {coupons && (
                        <div className={styles.discountcoupon}>
                          <div className={styles.discountHeader}>
                            <label>{ct.dis}</label>
                            <span>{coupons?.toUpperCase()}</span>
                          </div>
                          <div className={styles.discountAmount}>
                            <label>
                              {cartTotalDiscount} {currency_symbol} 
                            </label>
                            <span
                              onClick={() => {
                                applyLoader(
                                  setOlLoader,
                                  removeCoupon,
                                  [coupons?.toUpperCase()]
                                )
                              }}
                            >
                              X
                            </span>
                          </div>
                        </div>
                      )}
                      {/* <div className={styles.shipment}>
                        <label>{ct.shipMent}</label>
                        <div className={styles.pickup}>
                          <div className={styles.homedelivery}>
                            <input
                              type="radio"
                              id="HomeDelivery"
                              name="shipmentOption"
                              value="Home Delivery"
                              checked={shipmentOption === "Home Delivery"}
                              onChange={() => setShipmentOption("Home Delivery")}
                            />
                            <label htmlFor="HomeDelivery">
                              {ct.homeDelivery}
                            </label>
                          </div>
                          <div className={styles.localpickup}>
                            <input
                              type="radio"
                              id="localPickup"
                              name="shipmentOption"
                              value="Local Pickup"
                              checked={shipmentOption === "Local Pickup"}
                              onChange={() => setShipmentOption("Local Pickup")}
                            />
                            <label htmlFor="localPickup">{ct.localPickup}</label>
                          </div>
                        </div>
                      </div>
                      <p>
                        {ct.shipPing}
                      </p> */}
                      {checkShippingRates() ? (
                        <CartShipping
                          shipping={shipping}
                          subscriptionShipping={subscriptionShipping}
                          setCartShipment={
                            (shipmentOpt, packageId) => {
                              if (shipmentOpt && (packageId || packageId === 0))
                                applyLoader(
                                  setOlLoader,
                                  setCartShipment,
                                  [shipmentOpt, packageId]
                                )
                            }
                          }
                          styles={styles}
                          getCorrectPrice={getCorrectPrice}
                        />
                      ) : (
                        <>
                          <div className={styles.subtotal} style={{ gap: 'inherit' }}>
                            <p>{ct.subTotal}</p>
                            <p style={{ fontWeight: 100 }}>{ct.shipPing}</p>
                          </div>
                          <div className={styles.totalprice}>
                            <div className={styles.include}>
                              <p>{ct.total}</p>
                              <h4>
                                {getCorrectPrice(totals?.total_price)} {currency_symbol} 
                              </h4>
                            </div>
                            <p className={styles.tax}>
                              ({ct.include} {getCorrectPrice(totals?.total_tax)} {ct.tax}) {currency_symbol}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <Link href="/checkout" className={styles.goToCartBtn}>
                      {ct.gotoCheckout}
                    </Link>
                  </aside>
                </div>
              </div>

              <div className={styles.continueBtnWrapper}>
                <Link href="/shop" className={styles.continueBtn} type="submit">
                  {ct.continueShop}
                </Link>
              </div>
            </div>
          ) : (

            <div className={styles.cartempty}>
              <div>
                <Image
                  src="/Images/shoppingcart.png"
                  width={130}
                  height={128}
                  alt="product Top img"
                />
              </div>
              <p className={styles.emptybasket}>{ct.yourBasket}</p>
              <p>
                <Link href="/shop">{ct.backTop}</Link>
              </p>
            </div>
          )}
        </div >
      ) : (
        <Cartskeleton />
      )
      }


    </>
  );
}

export default Cart;
