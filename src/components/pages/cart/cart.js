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
import { cartTranslation } from "@/locales";
import { setShippingMethod } from "@/components/service/shipping";
import CartShipping from "@/components/atoms/cartshiiping";
import { applyLoader } from "@/helper/loader";
import OverLayLoader from '@/components/atoms/overLayLoader';

const lang = process.env.NEXT_PUBLIC_LANG || "dk";
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
    const currency = totals?.currency_code;
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
        toast.error("Product must have atleast 1 quantity.", {
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
      } else {
        toast.error("Discount coupon is required", { autoClose: toastTimer });
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
                                      width={141}
                                      height={141}
                                      alt="Main Image"
                                      priority
                                    />
                                  </Link>
                                </div>
                              </div>
                              <div>
                                <Link href={`/product/${productId}`}>
                                  <p className={`${styles.productTitle}`}>
                                    {cartItem.name} <br />{" "}
                                    <span>
                                      {currency_symbol} {subtotal}
                                    </span>
                                  </p>
                                </Link>
                                <div className={styles.addToBasket}>
                                  <button
                                    className={`${styles.valueButton} ${styles.decreaseButton}`}
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
                                    className={`${styles.valueButton} ${styles.increaseButton}`}
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

                            <div className={styles.subtotalLeft}>
                              <p>{ct.subTotal}</p>
                              <p>
                                {currency_symbol} {itemsSubTotal}
                              </p>
                            </div>
                          </Fragment>
                        );
                      })}

                    <div
                      className={`${styles.discountcol} ${styles.fieldColumn}`}
                    >
                      <div className={styles.discount}>
                        {" "}
                        <Image
                          src="/Images/discount-box-outline.svg"
                          alt="discount"
                          width={26}
                          height={25}
                        />{" "}
                        <input
                          type="text"
                          name="name"
                          placeholder="Discount"
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
                        {ct.applyDisscount}
                      </button>
                    </div>
                  </section>
                  <aside className={styles.rightContainer}>
                    <h3 className={styles.firstHeading}>{ct.totalAmount}</h3>
                    <div className={styles.table}>
                      <div className={styles.subtotal}>
                        <p>{ct.subTotal}</p>
                        <p>
                          {currency_symbol} {cartSubTotal}
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
                              {currency} {cartTotalDiscount}
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
                            <p>Subtotal</p>
                            <p style={{ fontWeight: 100 }}>{ct.shipPing}</p>
                          </div>
                          <div className={styles.totalprice}>
                            <div className={styles.include}>
                              <p>{ct.total}</p>
                              <h4>
                                {currency} {getCorrectPrice(totals?.total_price)}
                              </h4>
                            </div>
                            <p className={styles.tax}>
                              ({ct.include} {currency} {getCorrectPrice(totals?.total_tax)} {ct.tax})
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
