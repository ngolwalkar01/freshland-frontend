import React, { Fragment, useEffect, useCallback } from "react";
import styles from "./Checkout.module.css";
import { useState } from "react";
import Header from "@/components/atoms/Header/Header";
import Telephone from "@/components/atoms/Telephone/Telephone";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/atoms/loader/loader";
import { checkoutTranslation, cartTranslation, errorTranslation } from "@/locales";
import { useRouter } from "next/navigation";
import Shipping from "@/components/atoms/shipping";
import CheckoutSkeleton from "@/components/skeleton/checkoutskeleton/checkoutskeleton";
import {
  addShippingCart,
  removeCouponCart,
  createNewOrder,
  setCustomerDetails,
  getCartData,
  updateCartData,
} from "@/components/service/cart";
import {
  getShippingMethodsByAddress,
  setShippingMethod,
} from "@/components/service/shipping";
import { getpaymentMethods } from "@/components/service/payment";
import {
  CardElement,
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { handleKlarnaAuthorization } from "@/components/service/Klarna";
import { recoverUserCart } from "@/components/service/cart";
import cartStyles from "../cart/cart.module.css";
import UserAddress from "@/components/atoms/userAddress";
import { applyLoader } from "@/helper/loader";
import OverLayLoader from "@/components/atoms/overLayLoader";
import ShippingBillingAddress from "@/components/atoms/shippingBillingAddress";
import klaviyoservice from "@/services/klaviyo/apiIndex";

const lang = process.env.NEXT_PUBLIC_LANG || "se";
const cartDataStorage = process.env.NEXT_PUBLIC_CART_STORAGE;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const INTIAL_CART_DATA = {
  items: [],
  currency: "$",
  totals: {},
  shipping: [],
  couponsData: "",
  delivery_dates: null,
  extensions: {
    delivery: [],
    subscriptions: [],
  },
  subscriptionShipping: [],
  paymentMethods: [],
  billing_address: null,
};

function Checkout() {
  const check = checkoutTranslation[lang];
  const ct = cartTranslation[lang];
  const errormsg = errorTranslation[lang];
  const [olLoader, setOlLoader] = useState(false);
  const [isCheckoutReady, setIsCheckoutReady] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isBusinessAddress, setIsBusinessAddress] = useState(false);
  const [sendToAnotherAddress, setSendToAnotherAddress] = useState(false);
  const [checkbox, setChecbox] = useState(true);
  const [checkboxedit, setCheckboxEdit] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [standardOrderNote, setStandardOrderNote] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentOption, setPaymentOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState("");
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartData, setCartData] = useState(INTIAL_CART_DATA);
  const [streetValue, setStreetValue] = useState("");
  const [addnewaddress, setAddNewAddress] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isOrderStart, setIsOrderStart] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);
  const [enableEditableMode, setEditableMode] = useState({
    status: false,
    index: -1,
  });
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [billingAddress, setBillingAddress] = useState(null);
  const [showBillingAddress, setShowBillingAddress] = useState(true);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [token, setToken] = useState("");

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    setToken(token);
    return token;
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
  const currency_minor_unit = parseInt(totals?.currency_minor_unit);
  const getCorrectPrice = (number) => {
    if (currency_minor_unit)
      return parseFloat((number / 100).toFixed(currency_minor_unit));

    return number;
  };

  const cartSubTotal = getCorrectPrice(
    parseInt(totals?.total_items) + parseInt(totals?.total_items_tax)
  );
  const cartTotalDiscount = getCorrectPrice(
    parseInt(totals?.total_discount) + parseInt(totals?.total_discount_tax)
  );

  const cartTotal = getCorrectPrice(totals?.total_price);
  const discountTotal = getCorrectPrice(totals?.total_discount);
  const tax = getCorrectPrice(totals?.total_tax);
  const currency_symbol = currency;

  const router = useRouter();
  // const stripe = useStripe();
  // const elements = useElements();

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
      shipping_address,
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
      shipping_address,
    });
    if (delivery_dates && delivery_dates.length > 0 && delivery_dates[0].dates) {
      const firstDate = Object.keys(delivery_dates[0].dates)[0];
      setDeliveryDate(firstDate);
    }
  };

  // const getShippingData = async (country = "", state = "", postcode = "", city = "") => {
  //   const shippingData = await getShippingMethodsByAddress(country, state, postcode, city);
  //   setShippingInfo(shippingData)
  // }

  useEffect(() => {
    const getpaymentMethodsData = async () => {
      const data = await getpaymentMethods();
      setPaymentMethods([...data]);
      if (data && data.length > 0) {
        setPaymentOption(data[0].id);
      }
    };

    const getCart = async () => {
      const cartData = await getCartData();
      setCartDataByCartData(cartData);
    };

    const checkoutInit = async () => {
      try {
        await getCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsCheckoutReady(true);
        setIsOrderStart(false);
      }
    };
    checkoutInit();
    // getShippingData("IN", "Madhya Pradesh", "474001");
    getpaymentMethodsData();
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    const { shipping_address, billing_address } = cartData;
    if (shipping_address) {
      const { first_name, last_name } = shipping_address;

      if (first_name) setFirstName(first_name);
      if (last_name) setLastName(last_name);
      // setEmail(email);
      // setStreetValue({ tekst: address_1 });
      // setPhone(phone);
    }

    if (billing_address) {
      const { email } = billing_address;
      if (email) setEmail(email);
    }
  }, [cartData]);

  const handleSubmit1 = async (event) => {
    event.preventDefault();

    try {
      if (!stripe || !elements) {
        return; // Stripe.js has not yet loaded.
      }
      const cardElement = elements.getElement(CardElement);
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: cardElement,
      // });
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: 39 },
      });
      const clientSecret = data.clientSecret;
      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch (error) {
      console.log(error);
    }

    // if (error) {
    //   console.error('[error]', error);
    // } else {
    //   console.log('[PaymentMethod]', paymentMethod);
    //   // Optional: send paymentMethod.id to your server here
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        if (!stripe || !elements) {
          return; // Stripe.js has not yet loaded.
        }

        // Retrieve each card element component
        const cardElement = elements.getElement(CardNumberElement);

        // Create a PaymentMethod using the individual card elements
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          console.error("[error]", error);
          return;
        }

        // API call to your server to create a payment intent
        const { data } = await axios.post("/api/create-payment-intent", {
          data: { amount: 9 },
        });

        const clientSecret = data.clientSecret;

        // Confirm the card payment
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (paymentResult.error) {
          console.error("[payment error]", paymentResult.error);
        } else if (
          paymentResult.paymentIntent &&
          paymentResult.paymentIntent.status === "succeeded"
        ) {
          console.log("Payment succeeded:", paymentResult.paymentIntent);
        }
        submitOrder(event);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlebtnClick = () => {
    setAddNewAddress(!addnewaddress);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const addShipping = async (shipmentOption) => {
    try {
      setLoading(true);
      const data = await addShippingCart(shipmentOption);
      setCartDataByCartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = async (coupon) => {
    try {
      setLoading(true);
      const data = await removeCouponCart(coupon);
      setCartDataByCartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetCheckoutPage = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setStreetValue("");
  };

  const checkSelectedMethods = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return false;
    }

    for (let mainShipping of data) {
      if (
        !Array.isArray(mainShipping.shipping) ||
        mainShipping.shipping.length === 0
      ) {
        return false;
      }

      for (let pkg of mainShipping.shipping) {
        if (
          !Array.isArray(pkg.shipping_rates) ||
          pkg.shipping_rates.length === 0
        ) {
          return false;
        }

        const isSelected = pkg.shipping_rates.some((rate) => rate.selected);
        if (!isSelected) {
          return false;
        }
      }
    }

    return true;
  };

  function getShippingRates(shipping) {
    try {
      return shipping[0]?.shipping[0]?.shipping_rates || null;
    } catch (error) {
      console.error("An error occurred while retrieving shipping rates:", error);
      return null;
    }
  }

  const validateUserAddress = () => {
    const { address_1, city, postcode, phone } = billingAddress;
    const isNotValidBillingAddress = !(address_1 && city && postcode && phone && phone.length > 9);
    return isNotValidBillingAddress || (userAddresses && userAddresses.length > 0 && userAddresses.some(item => item.errors && typeof item.errors === 'object' && item.errors !== null && Object.keys(item.errors).length > 0));
  }

  const validate = () => {
    const errors = {};
    let isValid = true;
    setIsSubmit(true);

    if (!firstName.trim()) {
      errors.firstName = errormsg.firstNameRequired;
      isValid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = errormsg.lastNameRequired;
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = errormsg.emailRequired;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = errormsg.emailInvalid;
      isValid = false;
    }
    // if (!phone.trim()) {
    //   errors.phone = "Phone number is required";
    //   isValid = false;
    // }
    if (validateUserAddress()) {
      errors.userAddresses = errormsg.enterCompleteAddress;
      isValid = false;
    }

    if (!acceptTerms) {
      errors.term = errormsg.acceptTermsAndConditions;
      isValid = false;
    }
    // if (!streetValue?.tekst) {
    //   errors.streetval = "Street Name and Number is required";
    //   isValid = false;
    // }

    const shippingRates = getShippingRates(shipping);
    const shpOpt = checkSelectedMethods(shipping);

    if (!(shippingRates && shippingRates.length > 0)) {
      errors.shipmentVal = errormsg.correctShippingAddressRequired;
      isValid = false;
    } else if (!shpOpt) {
      errors.shipmentVal = errormsg.selectShipment;
      isValid = false;
    }

    if (cartTotal > 0) {
      if (!(paymentMethods && paymentMethods.length > 0)) {
        errors.paymentVal = errormsg.paymentMethodNotAvailable;
        isValid = false;
      } else if (!paymentOption) {
        errors.paymentVal = errormsg.selectPaymentMethod;
        isValid = false;
      }
    }

    if (!deliveryDate) {
      errors.deliveryDateVal = errormsg.selectDeliveryDate;
      isValid = false;
    }

    if (isBusinessAddress && !billingAddress?.company) {
      errors.billing_company = errormsg.billingCompanyRequired;
    }
    // Add more validation rules for other fields if needed

    setErrors(errors);
    return isValid;
  };

  const updateLocalStorageCartData = async () => {
    const cartData = await getCartData();
    setCartDataByCartData(cartData);
  };

  const setCustomerDetail = async (
    firstName,
    lastName,
    userAddresses,
    selectedAddressIndex,
    stopRedirectToLogin
  ) => {
    stopRedirectToLogin = stopRedirectToLogin || "";
    if (
      !(userAddresses && userAddresses.length > 0 && selectedAddressIndex > -1)
    )
      return;
    const currentAddress = userAddresses[selectedAddressIndex];
    const { address_1, city, postcode, phone } = currentAddress;

    const country = process.env.NEXT_PUBLIC_COUNTRY || "SE";
    const customerInfo = {
      billing_address: {
        first_name: firstName,
        last_name: lastName,
        company: "",
        address_1: address_1,
        address_2: "",
        city: city,
        state: "",
        postcode: postcode,
        country: country,
        email: email,
        phone: phone,
      },
      shipping_address: {
        first_name: firstName,
        last_name: lastName,
        company: "",
        address_1: address_1,
        address_2: "",
        city: city,
        state: "",
        postcode: postcode,
        country: country,
        phone: phone,
      },
    };
    const data = await setCustomerDetails(customerInfo, stopRedirectToLogin);
    updateCartData(data);
    return data;
  };

  const orderObj = () => {
    const currentAddress = userAddresses[selectedAddressIndex];
    const { address_1, city, postcode, phone } = currentAddress;

    const country = process.env.NEXT_PUBLIC_COUNTRY || "DK";
    const stVal = address_1;
    return {
      billing_address: {
        first_name: firstName,
        last_name: lastName,
        company: billingAddress?.company,
        address_1: stVal,
        address_2: "",
        city: city,
        state: "",
        postcode: postcode,
        country: country,
        email: email,
        phone: phone,
      },
      shipping_address: {
        first_name: firstName,
        last_name: lastName,
        company: "",
        address_1: stVal,
        address_2: "",
        city: city,
        state: "",
        postcode: postcode,
        country: country,
      },
      customer_note: `${standardOrderNote} ${orderNote}`,
      create_account: isCreateAccount,
      payment_method: paymentOption,
      payment_data: [],
      extensions: {
        "some-extension-name": {
          "some-data-key": "",
        },
      },
    };
  };

  const callBackAfterOrder = async (order_id) => {
    try {
      setCartData(INTIAL_CART_DATA);
      if(receiveUpdates) {
        await klaviyoservice.createProfile({ email, firstName });
      }
      resetCheckoutPage();
      setLoading(false);
      setIsCheckoutReady(true);
      router.push(`order/${order_id}`);
    } catch (error) {
      setIsOrderStart(false);
    }
  };

  const failedCallBack = async (data, cart_key) => {
    try {
      let odID = data.order_id;
      await recoverUserCart(odID, cart_key);
      setIsCheckoutReady(true);
      setIsOrderStart(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsCheckoutReady(true);
      setIsOrderStart(false);
    }
  };

  const getCartKey = () => {
    let cartData = localStorage.getItem(cartDataStorage);
    cartData = cartData ? JSON.parse(cartData) : null;

    let cart_key = null;
    if (
      cartData &&
      cartData.extensions &&
      cartData.extensions.delivery &&
      cartData.extensions.delivery.length > 0
    ) {
      cart_key = cartData.extensions.delivery[0].cart_key;
    }
    return { crtKey: cart_key, cartData };
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        setLoading(true);
        setIsCheckoutReady(false);
        setIsOrderStart(true);
        const { crtKey, cartData } = getCartKey();
        await setCustomerDetail(
          firstName,
          lastName,
          userAddresses,
          selectedAddressIndex
        );
        const orderPayload = orderObj();
        const data = await createNewOrder(orderPayload);
        if (cartTotal > 0 && paymentOption === "klarna_payments") {
          handleKlarnaAuthorization(
            data,
            crtKey,
            cartData,
            callBackAfterOrder,
            failedCallBack
          );
        } else {
          callBackAfterOrder(data.order_id);
        }
      }
    } catch (error) {
      setIsCheckoutReady(true);
      setIsOrderStart(false);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async (value) => {
    if (value.length >= 2) {
      let url = process.env.NEXT_PUBLIC_ADDRESS_URL;
      url = url.replace("searchParam", encodeURIComponent(value));
      const data = axios.get(url);
      return data;
    }
  };

  // useEffect(() => {
  //   const postcode = streetValue?.adgangsadresse?.postnr;
  //   if (postcode) {
  //     setCustomerDetail();
  //   }
  // }, [streetValue, setCustomerDetail]);

  const setCartShipment = async (shipmentOpt, packageId) => {
    try {
      setLoading(true);
      const data = await setShippingMethod(shipmentOpt, packageId);
      setCartDataByCartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userAddressProps = {
    styles,
    token,
    getSuggestions,
    userAddresses,
    setUserAddresses,
    enableEditableMode,
    setEditableMode,
    selectedAddressIndex,
    setSelectedAddressIndex,
    billingAddress,
    setBillingAddress,
    showBillingAddress,
    setShowBillingAddress,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    setCustomerDetail,
    updateLocalStorageCartData,
    errors,
    setErrors,
    cartData,
    isSubmit, setIsSubmit,
    validateUserAddress,
    setOlLoader,
    setCartDataByCartData
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : null}
      {olLoader && <OverLayLoader />}
      {!isOrderStart && isCheckoutReady ? (
        <div className={styles.Checkoutcontainer}>
          <Header />
          {cartItems && cartItems.length > 0 ? (
            <div className={styles.mainconatiner}>
              <h1 className={styles.mainHeading}>{check.box}</h1>
              {/* <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
          </form> */}
              <div className={styles.formcheckout}>
                <div className={styles.wrapper}>
                  <main className={styles.leftContainer}>
                    {/* <div className={styles.fieldColumn}>
                    <p className={styles.formTitle}>{check.biling}</p>
                    <span>{check.pleaseEnter}</span>
                  </div> */}
                    {/*  */}
                    <div className={styles.fieldsRow}>
                      <div className={styles.fieldColumn}>
                        <label htmlFor="Email">
                          <strong className="W-Body-Large-Medium">{check.contactInformation}</strong>
                        </label>
                        <label>
                       {check.emailUsage}
                        </label>
                        <input
                          className={styles.inputField}
                          type="email"
                          value={email}
                          placeholder={check.eName}
                          onChange={(e) => setEmail(e.target.value)}
                          name="Email"
                        />
                        {errors.email && (
                          <span className={styles.errorMessage}>
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>
                    {!token &&
                      <div className={`${styles.acceptTerms} ${styles.isAccount}`}>
                        <input
                          type="checkbox"
                          checked={isCreateAccount}
                          onChange={(e) => setIsCreateAccount(!isCreateAccount)}
                          id="createAccount"
                        />
                        <label htmlFor="createAccount">
                        {check.wantAccount}
                        </label>
                      </div>
                    }

                    {/*  */}

                    {/*  */}

                    {/* <div className={styles.shippingAdd}>
                      <label>
                        <strong>SHIPPING ADDRESS</strong>
                      </label>
                      <div className={styles.fieldsRow}>
                        <div className={styles.fieldColumn}>
                          <label htmlFor="First_Name">{check.fName}*</label>
                          <input
                            className={styles.inputField}
                            type="text"
                            value={firstName}
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            name="First_Name"
                          />
                          {errors.firstName && (
                            <span className={styles.errorMessage}>
                              {errors.firstName}
                            </span>
                          )}
                        </div>
                        <div className={styles.fieldColumn}>
                          <label htmlFor="Last_Name">{check.lName}*</label>
                          <input
                            className={styles.inputField}
                            type="text"
                            value={lastName}
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            name="Last_Name"
                          />
                          {errors.lastName && (
                            <span className={styles.errorMessage}>
                              {errors.lastName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={styles.fieldColumn}>
                        <label htmlFor="Street_Name_and_Number">
                          {check.street}*
                        </label>
                        <input
                          className={styles.inputField}
                          type="text"
                          placeholder="Street Name and Number"
                          name="Street_Name_and_Number"
                          value={streetValue?.tekst ? streetValue?.tekst : ""}
                          onChange={handleChange}
                        />
                        {errors.streetval && (
                          <span className={styles.errorMessage}>
                            {errors.streetval}
                          </span>
                        )}
                        {suggestions.length > 0 && (
                          <ul className={styles.addresssdrop}>
                            {suggestions.map((suggestion) => (
                              <li
                                key={suggestion.tekst}
                                onClick={() =>
                                  handleSelectSuggestion(suggestion)
                                }
                              >
                                {suggestion.tekst}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className={styles.fieldsRow}>
                        <div className={styles.fieldColumn}>
                          <label htmlFor="Street_Name_and_Number">
                            Apartment, Suite, Unit, Etc. (optional)
                          </label>
                          <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Apartment,suite"
                            name="address"
                          />
                        </div>
                      </div>

                      <div className={styles.fieldsRow}>
                        <div className={styles.fieldColumn}>
                          <label htmlFor="Zip">Postcode/Zip*</label>
                          <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Zip code"
                            name="Zip code"
                          />
                        </div>
                        <div className={styles.fieldColumn}>
                          <label>{check.cPhone}*</label>
                          <Telephone value={phone} onChange={setPhone} />
                        </div>
                      </div>
                      <div className={styles.fieldsRow}>
                        <div className={styles.fieldColumn}>
                          <label htmlFor="Zip">Town/City*</label>
                          <input
                            className={styles.inputField}
                            type="text"
                            placeholder="City"
                            name="Zip code"
                          />
                        </div>
                      </div>
                    </div> */}

                    {/*  */}

                    {/*  */}
                    {/* <div className={styles.sendaddress}>
                      <input
                        type="checkbox"
                        checked={checkbox}
                        onChange={(e) => setChecbox(e.target.checked)}
                      />
                      <label htmlFor="Send_to_another_address">
                        Use same address for billing
                      </label>
                    </div> */}
                    {/*  */}
                    {/* billing information */}
                    {/* <div
                      className={styles.shippingAdd}
                      style={{ display: checkbox ? "none" : "block" }}
                    >
                      <label>
                        <strong>BILLING ADDRESS</strong>
                      </label>

                      <div className={styles.fieldColumn}>
                        <label htmlFor="Street_Name_and_Number">
                          {check.street}*
                        </label>
                        <input
                          className={styles.inputField}
                          type="text"
                          placeholder="Street Name and Number"
                          name="Street_Name_and_Number"
                          value={streetValue?.tekst ? streetValue?.tekst : ""}
                          onChange={handleChange}
                        />
                        {errors.streetval && (
                          <span className={styles.errorMessage}>
                            {errors.streetval}
                          </span>
                        )}
                        {suggestions.length > 0 && (
                          <ul className={styles.addresssdrop}>
                            {suggestions.map((suggestion) => (
                              <li
                                key={suggestion.tekst}
                                onClick={() =>
                                  handleSelectSuggestion(suggestion)
                                }
                              >
                                {suggestion.tekst}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className={styles.fieldsRow}>
                        <div className={styles.fieldColumn}>
                          <label htmlFor="Street_Name_and_Number">
                            Apartment, Suite, Unit, Etc. (optional)
                          </label>
                          <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Apartment,suite"
                            name="address"
                          />
                        </div>
                      </div>

                      <div className={styles.fieldsRow}>
                        <div className={styles.fieldColumn}>
                          <label htmlFor="Zip">Postcode/Zip*</label>
                          <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Zip code"
                            name="Zip code"
                          />
                        </div>
                        <div className={styles.fieldColumn}>
                          <label>{check.cPhone}*</label>
                          <Telephone value={phone} onChange={setPhone} />
                        </div>
                      </div>
                      <div className={styles.fieldsRow}>
                        <div className={styles.fieldColumn}>
                          <label htmlFor="Zip">Town/City*</label>
                          <input
                            className={styles.inputField}
                            type="text"
                            placeholder="City"
                            name="Zip code"
                          />
                        </div>
                      </div>

                    </div> */}

                    {/*  */}
                    {/* <ShippingBillingAddress /> */}
                    <UserAddress userAddressProps={userAddressProps} />
                    <div className={styles.radioField}>
                      <label htmlFor="isBusinessAddress">
                        {check.isBusiness}
                      </label>
                      <div className={styles.radioContainer}>
                        <div>
                          <input
                            type="radio"
                            id="businessNo"
                            name="isBusinessAddress"
                            checked={!isBusinessAddress}
                            onChange={() => setIsBusinessAddress(false)}
                          />
                          <label htmlFor="businessNo">{check.noTag}</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="businessYes"
                            name="isBusinessAddress"
                            checked={isBusinessAddress}
                            onChange={() => setIsBusinessAddress(true)}
                          />
                          <label htmlFor="businessYes">{check.yesTag}</label>
                        </div>
                      </div>
                    </div>

                    {isBusinessAddress && (
                      <div className={styles.fieldsRow}>
                        <div className={styles.fieldColumn}>
                          <label htmlFor="comp_name">
                            <strong className="W-Body-Large-Medium">{check.billingCompanyName}</strong>
                          </label>
                          <input
                            className={styles.inputField}
                            type="text"
                            value={billingAddress?.company}
                            placeholder={check.billingCompanyName}
                            onChange={(e) => {
                              setBillingAddress({
                                ...billingAddress,
                                company: e.target.value,
                              });
                            }}
                            name="comp_name"
                          />
                          {isBusinessAddress && errors.billing_company && (
                            <span className={styles.errorMessage}>
                              {errors.billing_company}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {/* <div className={styles.sendaddress}>
                    <input
                      type="checkbox"
                      checked={sendToAnotherAddress}
                      onChange={(e) =>
                        setSendToAnotherAddress(e.target.checked)
                      }
                      id="Send_to_another_address"
                    />
                    <label htmlFor="Send_to_another_address">
                      {check.sendTo}
                    </label>
                  </div> */}
                    {/* <div
                      className={styles.fieldColumn}
                    >
                      <div className={styles.addresscontainer}>
                        <div className={styles.address}>
                          <p className="M-Body-Medium">Harsh Rathi</p>
                          <p className="M-Caption">
                            139, Keshav Vihar, Gopalpura by pass, Jaipur
                          </p>
                        </div>
                        <p onClick={() => setEditShow(!editshow)}>
                          Edit
                        </p>
                      </div>

                      <div
                        className={styles.editcontent}
                        style={{ display: editshow ? "block" : "none" }}
                      >
                        <div className={styles.shippingAdd}>
                          <label>
                            <strong>SHIPPING ADDRESS</strong>
                          </label>
                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="First_Name">{check.fName}*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                value={firstName}
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                name="First_Name"
                              />
                              {errors.firstName && (
                                <span className={styles.errorMessage}>
                                  {errors.firstName}
                                </span>
                              )}
                            </div>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Last_Name">{check.lName}*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                value={lastName}
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                name="Last_Name"
                              />
                              {errors.lastName && (
                                <span className={styles.errorMessage}>
                                  {errors.lastName}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={styles.fieldColumn}>
                            <label htmlFor="Street_Name_and_Number">
                              {check.street}*
                            </label>
                            <input
                              className={styles.inputField}
                              type="text"
                              placeholder="Street Name and Number"
                              name="Street_Name_and_Number"
                              value={
                                streetValue?.tekst ? streetValue?.tekst : ""
                              }
                              onChange={handleChange}
                            />
                            {errors.streetval && (
                              <span className={styles.errorMessage}>
                                {errors.streetval}
                              </span>
                            )}
                            {suggestions.length > 0 && (
                              <ul className={styles.addresssdrop}>
                                {suggestions.map((suggestion) => (
                                  <li
                                    key={suggestion.tekst}
                                    onClick={() =>
                                      handleSelectSuggestion(suggestion)
                                    }
                                  >
                                    {suggestion.tekst}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Street_Name_and_Number">
                                Apartment, Suite, Unit, Etc. (optional)
                              </label>
                              <input
                                className={styles.inputField}
                                type="text"
                                placeholder="Apartment,suite"
                                name="address"
                              />
                            </div>
                          </div>

                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Zip">Postcode/Zip*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                placeholder="Zip code"
                                name="Zip code"
                              />
                            </div>
                            <div className={styles.fieldColumn}>
                              <label>{check.cPhone}*</label>
                              <Telephone value={phone} onChange={setPhone} />
                            </div>
                          </div>
                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Zip">Town/City*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                placeholder="City"
                                name="Zip code"
                              />
                            </div>
                          </div>
                        </div>

                        <div className={styles.sendaddress}>
                          <input
                            type="checkbox"
                            checked={checkbox}
                            onChange={(e) => setChecbox(e.target.checked)}
                          />
                          <label htmlFor="Send_to_another_address">
                            Use same address for billing
                          </label>
                        </div>
                        <div
                          className={styles.shippingAdd}
                          style={{ display: checkbox ? "none" : "block" }}
                        >
                          <label>
                            <strong>BILLING ADDRESS</strong>
                          </label>

                          <div className={styles.fieldColumn}>
                            <label htmlFor="Street_Name_and_Number">
                              {check.street}*
                            </label>
                            <input
                              className={styles.inputField}
                              type="text"
                              placeholder="Street Name and Number"
                              name="Street_Name_and_Number"
                              value={
                                streetValue?.tekst ? streetValue?.tekst : ""
                              }
                              onChange={handleChange}
                            />
                            {errors.streetval && (
                              <span className={styles.errorMessage}>
                                {errors.streetval}
                              </span>
                            )}
                            {suggestions.length > 0 && (
                              <ul className={styles.addresssdrop}>
                                {suggestions.map((suggestion) => (
                                  <li
                                    key={suggestion.tekst}
                                    onClick={() =>
                                      handleSelectSuggestion(suggestion)
                                    }
                                  >
                                    {suggestion.tekst}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Street_Name_and_Number">
                                Apartment, Suite, Unit, Etc. (optional)
                              </label>
                              <input
                                className={styles.inputField}
                                type="text"
                                placeholder="Apartment,suite"
                                name="address"
                              />
                            </div>
                          </div>

                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Zip">Postcode/Zip*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                placeholder="Zip code"
                                name="Zip code"
                              />
                            </div>
                            <div className={styles.fieldColumn}>
                              <label>{check.cPhone}*</label>
                              <Telephone value={phone} onChange={setPhone} />
                            </div>
                          </div>
                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Zip">Town/City*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                placeholder="City"
                                name="Zip code"
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className={styles.newAddCover}>
                        <button
                          type="button"
                          className={styles.newAddBtn}
                          onClick={handlebtnClick}
                        >
                          {check.addTo}
                        </button>
                      </div>
                      {addnewaddress && (
                        <div className={styles.shippingAdd}>
                          <label>
                            <strong>SHIPPING ADDRESS</strong>
                          </label>
                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="First_Name">{check.fName}*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                value={firstName}
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                name="First_Name"
                              />
                              {errors.firstName && (
                                <span className={styles.errorMessage}>
                                  {errors.firstName}
                                </span>
                              )}
                            </div>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Last_Name">{check.lName}*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                value={lastName}
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                name="Last_Name"
                              />
                              {errors.lastName && (
                                <span className={styles.errorMessage}>
                                  {errors.lastName}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={styles.fieldColumn}>
                            <label htmlFor="Street_Name_and_Number">
                              {check.street}*
                            </label>
                            <input
                              className={styles.inputField}
                              type="text"
                              placeholder="Street Name and Number"
                              name="Street_Name_and_Number"
                              value={
                                streetValue?.tekst ? streetValue?.tekst : ""
                              }
                              onChange={handleChange}
                            />
                            {errors.streetval && (
                              <span className={styles.errorMessage}>
                                {errors.streetval}
                              </span>
                            )}
                            {suggestions.length > 0 && (
                              <ul className={styles.addresssdrop}>
                                {suggestions.map((suggestion) => (
                                  <li
                                    key={suggestion.tekst}
                                    onClick={() =>
                                      handleSelectSuggestion(suggestion)
                                    }
                                  >
                                    {suggestion.tekst}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Street_Name_and_Number">
                                Apartment, Suite, Unit, Etc. (optional)
                              </label>
                              <input
                                className={styles.inputField}
                                type="text"
                                placeholder="Apartment,suite"
                                name="address"
                              />
                            </div>
                          </div>

                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Zip">Postcode/Zip*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                placeholder="Zip code"
                                name="Zip code"
                              />
                            </div>
                            <div className={styles.fieldColumn}>
                              <label>{check.cPhone}*</label>
                              <Telephone value={phone} onChange={setPhone} />
                            </div>
                          </div>
                          <div className={styles.fieldsRow}>
                            <div className={styles.fieldColumn}>
                              <label htmlFor="Zip">Town/City*</label>
                              <input
                                className={styles.inputField}
                                type="text"
                                placeholder="City"
                                name="Zip code"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div> */}
                    <div className={styles.radioField}>
                      <label>{check.deliveryD}</label>
                      <div className={styles.radioContainer}>
                        {delivery_dates &&
                          delivery_dates.length > 0 &&
                          delivery_dates.map((x, i) => {
                            const currDate = Object.keys(x.dates)[0];
                            const value = x.dates[currDate];
                            return (
                              <>
                                {value ? (
                                  <Fragment key={i}>
                                    <div>
                                      <input
                                        type="radio"
                                        id="deliveryDate1"
                                        name="deliveryDate"
                                        value={currDate}
                                        checked={deliveryDate === currDate}
                                        onChange={() =>
                                          setDeliveryDate(currDate)
                                        }
                                      />
                                      <label htmlFor="deliveryDate1">
                                        {value}
                                      </label>
                                    </div>
                                    {errors.deliveryDateVal && (
                                      <span className={styles.errorMessage}>
                                        {errors.deliveryDateVal}
                                      </span>
                                    )}
                                  </Fragment>
                                ) : (
                                  <span className={styles.errorMessage}>
                                    {check.enterCompleteAddress}
                                  </span>
                                )}
                              </>
                            );
                          })}
                      </div>
                    </div>
                    <div className={styles.fieldColumn}>
                      <label htmlFor="setStandardOrderNote">
                        {check.stand}
                      </label>
                      <select
                        value={standardOrderNote}
                        onChange={(e) => setStandardOrderNote(e.target.value)}
                        id="setStandardOrderNote"
                      >
                        <option value="">{check.selectAnOption}</option>
                        <option value=" Placed at the front door - Placed at the front door">
                         {check.placedAtFrontDoor}
                        </option>
                        <option value="Drop by mailbox - Drop by mailbox">
                         {check.dropByMailbox}
                        </option>
                        <option value="Put in the carport - Put in the carport">
                        {check.putInCarport}
                        </option>
                        <option value="Place at the back door - Place at the back door">
                        {check.placeAtBackDoor}
                        </option>
                        <option value="Place inside the basement shaft">
                        {check.placeInsideBasementShaft}
                        </option>
                        <option value="Place under a half roof - Place under a half roof">
                          {check.placeUnderHalfRoof}
                        </option>
                        <option value="Place inside the shed">
                          {check.placeInsideShed}
                        </option>
                        <option value="Custom notes only">
                         {check.customNotesOnly}
                        </option>
                      </select>
                      <span className={styles.customArrow}></span>
                    </div>
                    <div className={styles.fieldColumn}>
                      <label htmlFor="notes">{check.notes}</label>
                      <textarea
                        className={styles.textarea}
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        placeholder={check.orderNotes}
                        name="notes"
                      ></textarea>
                    </div>
                    <div className={styles.sendaddress}>
                      <input
                        type="checkbox"
                        checked={receiveUpdates}
                        onChange={(e) => setReceiveUpdates(e.target.checked)}
                        id="Sign_me_up"
                      />
                      <label htmlFor="Sign_me_up">{check.signme}</label>
                    </div>
                  </main>
                  <aside className={styles.rightContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr className={styles.topRow}>
                          <th className={styles.firstHeading}>
                            {check.product}
                          </th>
                          <th>{check.subt}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems &&
                          Array.isArray(cartItems) &&
                          cartItems.map((cartItem, i) => {
                            const {
                              quantity,
                              key: item_key,
                              images,
                              id: productId,
                              totals: prices,
                            } = cartItem;
                            const currentImage =
                              images && images.length > 0 ? images[0].src : "";
                            const quantityValue = quantity;
                            const subtotal = getCorrectPrice(
                              parseInt(prices?.line_subtotal) +
                              parseInt(prices?.line_subtotal_tax)
                            );
                            const subscription_schemes =
                              cartItem?.extensions?.subscription_schemes;
                            const current_options =
                              subscription_schemes &&
                                subscription_schemes.subscription_schemes &&
                                subscription_schemes.subscription_schemes.length >
                                0
                                ? subscription_schemes.subscription_schemes
                                : [];
                            const selectedValue = current_options.find(
                              (x) => x.selected_subscription
                            );

                            return (
                              <tr
                                className={`${styles.productRow} ${styles.productrowsec}`}
                                key={i}
                              >
                                <td>
                                  {cartItem.name}{" "}
                                  <span className={styles.multiple}>
                                    x {quantityValue}
                                  </span>
                                </td>
                                <td>
                                  {subtotal} {currency_symbol}
                                </td>
                              </tr>
                            );
                          })}

                        <tr >
                          <td>{check.subt}</td>
                          <td>
                            {cartSubTotal} {currency_symbol}
                          </td>
                        </tr>
                        <Shipping
                          shipping={shipping}
                          subscriptionShipping={subscriptionShipping}
                          setCartShipment={(shipmentOpt, packageId) => {
                            if (shipmentOpt && (packageId || packageId === 0))
                              applyLoader(setOlLoader, setCartShipment, [
                                shipmentOpt,
                                packageId,
                              ]);
                          }}
                          styles={styles}
                          getCorrectPrice={getCorrectPrice}
                        />
                        <tr>
                          {errors.shipmentVal && (
                            <p className={styles.errorMessage}>
                              {errors.shipmentVal}
                            </p>
                          )}
                        </tr>
                        {coupons && (
                          <tr>
                            <td>
                              {check.disc}{" "}
                              <span className={styles.multiple}>
                                {coupons?.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              {cartTotalDiscount} {currency}
                              <span
                                className={styles.cross}
                                onClick={() => {
                                  applyLoader(setOlLoader, removeCoupon, [
                                    coupons.toUpperCase(),
                                  ]);
                                }}
                              >
                                {check.xicon}
                              </span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {
                      cartTotal > 0 && (
                        <div className={styles.paymentSection}>
                          {paymentMethods &&
                            paymentMethods.length > 0 &&
                            paymentMethods.map((x, i) => {
                              return (
                                <Fragment key={i}>
                                  <div className={styles.paymentcard}>
                                    <input
                                      type="radio"
                                      id={x.id}
                                      name="paymentOption"
                                      value={x.id}
                                      checked={paymentOption === x.id}
                                      onChange={() => setPaymentOption(x.id)}
                                    />
                                    <label htmlFor={x.id}>{x.title}</label>
                                  </div>
                                  {x.id == "bacs" && (
                                    <div className={styles.cards}>
                                      <Image
                                        src="/Images/Dkfooter.png"
                                        alt="Dk"
                                        height={20}
                                        width={32}
                                      />
                                      <Image
                                        src="/Images/mobilepay.png"
                                        alt="mobilepay"
                                        height={20}
                                        width={32}
                                      />
                                      <Image
                                        src="/Images/visa.png"
                                        alt="visa"
                                        height={20}
                                        width={32}
                                      />
                                      <Image
                                        src="/Images/mastercard.png"
                                        alt="mastercard"
                                        height={20}
                                        width={32}
                                      />
                                    </div>
                                  )}
                                  {x.id === "stripe" &&
                                    paymentOption === "stripe" && (
                                      <div>
                                        <form
                                          onSubmit={handleSubmit}
                                          autoComplete="off"
                                        >
                                          <div autoComplete="off">
                                            <label>
                                              {check.cardNo}
                                              <CardNumberElement
                                                options={CARD_ELEMENT_OPTIONS}
                                              />
                                            </label>
                                          </div>

                                          <label>
                                            {check.expDate}
                                            <CardExpiryElement
                                              options={CARD_ELEMENT_OPTIONS}
                                            />
                                          </label>
                                          <label>
                                            {check.cvc}
                                            <CardCvcElement
                                              options={CARD_ELEMENT_OPTIONS}
                                            />
                                          </label>
                                          <button type="submit" disabled={!stripe}>
                                            {check.pay}
                                          </button>
                                        </form>
                                      </div>
                                    )}
                                </Fragment>
                              );
                            })}
                          {errors.paymentVal && (
                            <p className={styles.errorMessage}>
                              {errors.paymentVal}
                            </p>
                          )}
                          <div
                            id="klarna-payments-container"
                            style={{ minHeight: "200px", display: "none" }}
                          ></div>
                        </div>
                      )
                    }

                    {/* <div className={styles.paymentSection}>
                    <div className={styles.paymentcard}>
                      <input
                        type="radio"
                        id="mobilePay"
                        name="paymentOption"
                        value="MobilePay, Dankort, Visa & Mastercard"
                        checked={
                          paymentOption ===
                          "MobilePay, Dankort, Visa & Mastercard"
                        }
                        onChange={() =>
                          setPaymentOption(
                            "MobilePay, Dankort, Visa & Mastercard"
                          )
                        }
                      />
                      <label htmlFor="mobilePay">{check.cardDetail}</label>
                    </div>
                    <div className={styles.cards}>
                      <Image
                        src="/Images/Dkfooter.png"
                        alt="Dk"
                        height={20}
                        width={32}
                      />
                      <Image
                        src="/Images/mobilepay.png"
                        alt="mobilepay"
                        height={20}
                        width={32}
                      />
                      <Image
                        src="/Images/visa.png"
                        alt="visa"
                        height={20}
                        width={32}
                      />
                      <Image
                        src="/Images/mastercard.png"
                        alt="mastercard"
                        height={20}
                        width={32}
                      />
                    </div>
                    <div className={styles.paymentcard}>
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentOption"
                        value="Pay by Credit Card"
                        checked={paymentOption === "Pay by Credit Card"}
                        onChange={() => setPaymentOption("Pay by Credit Card")}
                      />
                      <label htmlFor="creditCard">{check.payby}</label>
                    </div>
                    {paymentOption === "Pay by Credit Card" && (
                      <div>
                        <form onSubmit={handleSubmit} autoComplete="off">
                          <div autoComplete="off">
                            <label>
                              {check.cardNo}
                              <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                            </label>
                          </div>

                          <label>
                            {check.expDate}
                            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                          </label>
                          <label>
                            {check.cvc}
                            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                          </label>
                          <button type="submit" disabled={!stripe}>
                            {check.pay}
                          </button>
                        </form>
                      </div>
                    )}
                  </div> */}
                    <div className={styles.terms}>
                      <p>
                        {check.ypurp}{" "}
                        <span>
                          <Link href="#" alt="see more">
                            {check.perPolicy}
                          </Link>
                        </span>
                      </p>
                      <p>
                        {check.byComplete}{" "}
                        <span>
                          <Link href="#" alt="see more">
                            {check.ourTerm}
                          </Link>
                        </span>{" "}
                        {check.forUsing}
                      </p>
                      <div className={styles.acceptTerms}>
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          id="acceptTerms"
                        />
                        <label htmlFor="acceptTerms">
                          {check.iRead}{" "}
                          <span>
                            <Link href="#" alt="see more">
                              {check.termsC}
                            </Link>
                          </span>{" "}
                          {check.starIcon}
                        </label>
                      </div>
                      {errors.term && (
                        <span className={styles.errorMessage}>
                          {errors.term}
                        </span>
                      )}
                    </div>
                    <button type="submit" onClick={submitOrder}>
                      {check.approveO}
                    </button>
                  </aside>
                </div>
              </div>
            </div>
          ) : (
            <div className={cartStyles.cartempty}>
              <div>
                <Image
                  src="/Images/shoppingcart.png"
                  width={130}
                  height={128}
                  alt="product Top img"
                />
              </div>
              <p className={cartStyles.emptybasket}>{ct.yourBasket}</p>
              <p>
                <Link href="/shop">{ct.backTop}</Link>
              </p>
            </div>
          )}
        </div>
      ) : (
        <CheckoutSkeleton />
      )}


    </>
  );
}

export default Checkout;
