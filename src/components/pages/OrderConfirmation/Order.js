import React, { useEffect, useState } from "react";
import Header from "@/components/atoms/Header/Header";
import styles from "./Order.module.css";
import { orderconfirmationTranslation } from '@/locales';
import Link from "next/link";
import { getCheckoutOrderById } from "@/components/service/account"
import { AddressInfo } from "@/components/atoms/address/address";

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const Order = ({ orderId }) => {
  const oct = orderconfirmationTranslation[lang];
  const [cartData, setCartData] = useState({
    cartSubTotal: 0,
    cartTotalDiscount: 0,
    shippingTotal: 0,
    currency: ""
  })

  const [orderData, setOrderData] = useState(null);

  const getOrderDetail = async () => {
    const data = await getCheckoutOrderById(orderId);
    setOrderData(data);
  }

  useEffect(() => {
    if (orderData) {
      const currency_minor_unit = orderData?.totals?.currency_minor_unit;
      const total_items = orderData?.totals?.total_items;
      const total_tax = orderData?.totals?.total_tax;
      const cartSubTotal = getCorrectPrice(
        parseInt(total_items) + parseInt(total_tax),
        currency_minor_unit
      );
      const cartTotalDiscount = getCorrectPrice(
        parseInt(orderData?.totals?.total_discount) + parseInt(orderData?.totals?.total_discount_tax),
        currency_minor_unit
      );
      const shippingTotal = getCorrectPrice(
        parseInt(orderData?.totals?.total_shipping) + parseInt(orderData?.totals?.total_shipping_tax),
        currency_minor_unit
      );
      setCartData({
        cartSubTotal,
        cartTotalDiscount,
        shippingTotal,
        currency: orderData?.totals?.currency_code
      })
    }
  }, [orderData])

  useEffect(() => {
    getOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  const getCorrectPrice = (number, currency_minor_unit) => {
    if (currency_minor_unit)
      return parseFloat((number / 100).toFixed(currency_minor_unit));

    return number;
  }

  const {
    cartSubTotal,
    cartTotalDiscount,
    shippingTotal,
    currency
  } = cartData;

  return (
    <>
      {orderData && (
        <div className={styles.orderpage}>
          <Header />
          <section className={styles.ordersection}>
            <h2 className={styles.orderhedaing}>
              {oct.pageHeadingOrder}
            </h2>
            <div className={styles.ordercontainer}>
              <div className={styles.orderCard}>
                <div className={styles.orderDetail}>
                  <p className={styles.label}>{oct.orderNo}</p>
                  <p className={styles.value}>{orderData.order_data.number}</p>
                </div>
                <div className={styles.orderDetail}>
                  <p className={styles.label}>{oct.given}</p>
                  <p className={styles.value}>{new Date(orderData.order_data.date_created.date).toLocaleDateString()}</p>
                </div>
                <div className={styles.orderDetail}>
                  <p className={styles.label}>{oct.email}</p>
                  <p className={styles.value}>{orderData.order_data.billing.email}</p>
                </div>
                <div className={styles.orderDetail}>
                  <p className={styles.label}>{oct.total}</p>
                  <p className={styles.value} dangerouslySetInnerHTML={{ __html: orderData.order_data.total }} />
                </div>
              </div>
              <aside className={styles.rightContainer}>
                <h4>{oct.orderInfromation}</h4>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.firstHeading}>Item</th>
                      <th>{oct.total}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name} <span>x {item.quantity}</span></td>
                        <td>{currency} {getCorrectPrice(
                          parseInt(item?.totals?.line_total) + parseInt(item?.totals?.line_total_tax),
                          item?.totals?.currency_minor_unit
                        )}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>{oct.subtotal}</td>
                      <td>{currency} {cartSubTotal}</td>
                    </tr>
                    <tr>
                      <td>{oct.shipment}</td>
                      <td>{currency} {shippingTotal}</td>
                    </tr>
                    <tr>
                      <td>{oct.expectedDelivery}</td>
                      <td>{orderData.order_data.meta_data.find(meta => meta.key === 'delivery_date').value}</td>
                    </tr>
                    <tr>
                      <td>{oct.rabat}</td>
                      <td>{currency} {cartTotalDiscount}</td>
                    </tr>
                  </tbody>
                </table>
              </aside>
            </div>
            <div className={styles.addresscontainer}>
              <div>
                <h4>{oct.billingAddress}</h4>
                <div>
                  {orderData.order_data.billing && <AddressInfo address={orderData.order_data.billing} />}
                </div>
              </div>
              <div>
                <h4>{oct.deliveryAddress}</h4>
                <div>
                  {orderData.order_data.shipping && <AddressInfo address={orderData.order_data.shipping} />}
                </div>
              </div>
            </div>
            <div className={styles.continueBtnWrapper}>
              <Link href="/shop" className={styles.continueBtn} type="submit">
                {oct.continueShopping}
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Order;
