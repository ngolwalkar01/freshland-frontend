import React, { Fragment } from 'react';
import { cartTranslation } from "@/locales";

const lang = process.env.NEXT_PUBLIC_LANG || "se";
const ct = cartTranslation[lang];
const BillingPeriod = ({ shData, styles }) => {
    const { billing_period = "", billing_interval = "" } = shData;
    return (
        <>
            {billing_interval && billing_period && (
                <>
                    <span className={styles.black}>/ {billing_interval} {billing_period}</span>
                </>
            )}
        </>
    )
}

const TotalPrice = ({ shData, styles, total_tax, currency_code, total_price, isMainShipping }) => {
    return (
        <tr>
            <td>{isMainShipping ? ct.total : "Recurring Total"}</td>
            <td>
                {total_price} {currency_code}  <br />
                <p style={{ fontWeight: 100 }}>(incl. {total_tax} {currency_code} VAT)</p>

                {shData && <BillingPeriod shData={shData} styles={styles} />}
            </td>
        </tr>
    )
}

const ShippingOptions = ({ shippingData, setNamePrefix, setCartShipment, styles, getCorrectPrice }) => {
    return (
        <>
            {shippingData.map((shData, index) => {
                const { shipping, totals, isMainShipping } = shData;
                let { currency_symbol: currency_code = "", total_items = "", total_price = "", total_tax } = totals || {};
                total_items = getCorrectPrice(total_items);
                total_price = getCorrectPrice(total_price);
                total_tax = getCorrectPrice(total_tax);
                return <Fragment key={`setNamePrefix-${index}`}>
                    {
                        shipping && shipping.length > 0 && shipping.map((sh, i) => {
                            const { items } = sh;
                            return (
                                <>
                                    {sh.shipping_rates.length > 0 ? (
                                        <Fragment key={i}>
                                            {
                                                !isMainShipping &&
                                                <tr>
                                                    <td>{ct.subTotal}</td>
                                                    <td>{getCorrectPrice(total_items)} {currency_code}
                                                        <BillingPeriod shData={shData} styles={styles} />
                                                    </td>
                                                </tr>
                                            }
                                            <tr key={i}>
                                                <td>
                                                    <label>{sh.name}</label>
                                                </td>
                                                <div className={styles.newshiping}>
                                                    <td className={styles.freedelivery}>
                                                        {sh.shipping_rates.map((shipping_rate, ind) => (
                                                            <span key={ind}>
                                                                {
                                                                    sh.shipping_rates.length > 1 ? (
                                                                        <input
                                                                            type="radio"
                                                                            id={shipping_rate.method_id}
                                                                            name={`${setNamePrefix}_${shipping_rate.method_id}_${sh.package_id}`}
                                                                            value={shipping_rate.method_id}
                                                                            checked={shipping_rate.selected}
                                                                            onChange={() => setCartShipment(shipping_rate.rate_id, sh.package_id)}
                                                                        />
                                                                    ) : null
                                                                }
                                                                <label htmlFor={shipping_rate.method_id} onClick={(e) => e.stopPropagation()}>
                                                                    {shipping_rate.name}
                                                                    {/* <span className={styles.black}>(SUBSCRIPTION):{shipping_rate.currency_code} */}
                                                                    <span className={styles.black}> {`${currency_code} `}
                                                                        {getCorrectPrice(parseInt(shipping_rate?.price) + parseInt(shipping_rate.taxes))}</span>
                                                                    <BillingPeriod shData={shData} styles={styles} />
                                                                </label>
                                                            </span>
                                                        ))}
                                                    </td>
                                                    {!isMainShipping && items && items.length > 0 && items.map((product, pI) => {
                                                        const { name, quantity } = product;
                                                        return (<span key={pI} className={`${styles.black} ${styles.newquantity}`}>{name} ×{quantity}</span>)
                                                    })}
                                                </div>
                                            </tr>
                                            <TotalPrice
                                                shData={shData}
                                                styles={styles}
                                                total_tax={total_tax}
                                                currency_code={currency_code}
                                                total_price={total_price}
                                                isMainShipping={isMainShipping}
                                            />
                                        </Fragment>
                                    ) : <>
                                        <tr>
                                            <td>
                                                <p style={{ fontWeight: 100 }}>Please provide a valid shipping address or note that shipping is unavailable to the given address.</p>
                                            </td>
                                        </tr>
                                        <TotalPrice
                                            shData={shData}
                                            styles={styles}
                                            total_tax={total_tax}
                                            currency_code={currency_code}
                                            total_price={total_price}
                                            isMainShipping={isMainShipping}
                                        />
                                    </>}
                                </>
                            )
                        })
                    }
                </Fragment>
            })}
        </>
    )
};

const Shipping = ({ shipping, subscriptionShipping, setCartShipment, styles, totals, getCorrectPrice }) => {
    return (
        <>
            <ShippingOptions
                shippingData={shipping}
                setNamePrefix="shipmentOption"
                setCartShipment={setCartShipment}
                styles={styles}
                getCorrectPrice={getCorrectPrice}
            />
            <ShippingOptions
                shippingData={subscriptionShipping}
                setNamePrefix="subshipmentOption"
                setCartShipment={setCartShipment}
                styles={styles}
                getCorrectPrice={getCorrectPrice}
            />
        </>
    );
};

export default Shipping;