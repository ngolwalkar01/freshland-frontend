import React, { Fragment } from "react";
import { cartTranslation } from "@/locales";

const lang = process.env.NEXT_PUBLIC_LANG || "se";
const ct = cartTranslation[lang];

const BillingPeriod = ({ shData, styles }) => {
  const { billing_period = "", billing_interval = "" } = shData;
  return (
    <>
      {billing_interval && billing_period && (
        <>
          <span className={styles.black}>
            / {billing_interval} {billing_period}
          </span>
        </>
      )}
    </>
  );
};
const ShippingOptions = ({
  shippingData,
  setCartShipment,
  styles,
  subscriptionShipping,
  getCorrectPrice
}) => {
  return (
    <>
      {shippingData?.map((shData, index) => {
        const { shipping, totals, isMainShipping } = shData;
        let { currency_symbol: currency_code = "", total_items = "", total_price = "", total_tax } = totals || {};
        total_items = getCorrectPrice(total_items);
        total_price = getCorrectPrice(total_price);
        total_tax = getCorrectPrice(total_tax);
        return (
          <Fragment key={index}>
            {shipping &&
              shipping.length > 0 &&
              shipping.map((sh, i) => {
                const { items } = sh;
                return (
                  <Fragment key={i}>
                    {!isMainShipping && (
                      <div className={styles.subtotal}>
                        <p>{ct.subtotal}</p>
                        <p>
                          {total_items} {currency_code} 
                          <BillingPeriod shData={shData} styles={styles} />
                        </p>
                      </div>
                    )}
                    <div className={styles.shipment} key={i}>
                      <label>{sh.name}</label>
                      <div className={styles.pickup}>
                        {sh.shipping_rates &&
                          sh.shipping_rates.length > 0 &&
                          sh.shipping_rates.map((shipping_rate, index) => {
                            if (shipping_rate && shipping_rate.name) {
                              return (
                                <div
                                  className={styles.homedelivery}
                                  key={index}
                                >
                                  <div className={styles.newdelivery}>
                                    <input
                                      type="radio"
                                      id={shipping_rate.method_id}
                                      name={`shipmentOption_${shipping_rate.method_id}_${sh.package_id}`}
                                      value={shipping_rate.method_id}
                                      checked={shipping_rate.selected}
                                      onChange={() =>
                                        setCartShipment(
                                          shipping_rate.rate_id,
                                          sh.package_id
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={shipping_rate.method_id}
                                      onClick={(e) => e.stopPropagation()}
                                      className={styles.newlabelstyle}
                                    >
                                      <p className={styles.shippingrate}>
                                        {shipping_rate.name}
                                      </p>
                                      <span
                                        className={`${styles.black} ${styles.newstyle}`}
                                      >
                                        {getCorrectPrice(parseInt(shipping_rate?.price) + parseInt(shipping_rate.taxes))}
                                        {" "}{shipping_rate.currency_symbol}
                                      </span>
                                      <BillingPeriod
                                        shData={shData}
                                        styles={styles}
                                      />
                                    </label>
                                  </div>
                                  {!isMainShipping &&
                                    items &&
                                    items.length > 0 &&
                                    items.map((product, pI) => {
                                      const { name, quantity } = product;
                                      return (
                                        <span
                                          key={pI}
                                          className={`${styles.black}  ${styles.newstyle}`}
                                        >
                                          {name} ×{quantity}
                                        </span>
                                      );
                                    })}
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                    </div>
                    <div className={styles.totalprice}>
                      <div className={styles.include}>
                        <p>{isMainShipping ? ct.total : "Recurring Total"}</p>
                        <h4>
                          {total_price} {currency_code} 
                        </h4>
                      </div>
                      <p className={styles.tax}>
                        ({ct.include} {total_tax} {currency_code} {ct.tax})
                      </p>
                    </div>
                  </Fragment>
                );
              })}
          </Fragment>
        );
      })}
    </>
  );
};

const CartShipping = ({
  shipping,
  subscriptionShipping,
  setCartShipment,
  styles,
  totals,
  getCorrectPrice
}) => {
  return (
    <>
      <ShippingOptions
        shippingData={shipping}
        setCartShipment={setCartShipment}
        styles={styles}
        getCorrectPrice={getCorrectPrice}
      />
      <ShippingOptions
        shippingData={subscriptionShipping}
        setCartShipment={setCartShipment}
        styles={styles}
        getCorrectPrice={getCorrectPrice}
      ></ShippingOptions>
    </>
  );
};

export default CartShipping;
