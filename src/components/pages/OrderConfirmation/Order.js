import React, { useEffect, useState } from "react";
import Header from "@/components/atoms/Header/Header";
import styles from "./Order.module.css";
import { orderconfirmationTranslation } from '@/locales';
import Link from "next/link";
import { getOrderDetailById, getOrderDates } from "@/components/service/account"
import { AddressInfo } from "@/components/atoms/address/address";
import Orderskeleton from "@/components/skeleton/orderskeleton";

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Order = ({ orderId }) => {
  const oct = orderconfirmationTranslation[lang];
  const [cartData, setCartData] = useState({
    cartSubTotal: 0,
    cartTotalDiscount: 0,
    shippingTotal: 0,
    currency: ""
  });
  const [loading, setLoading] = useState(false);

  const [orderData, setOrderData] = useState(null);
  const [orderDatesData, setOrderDatesData] = useState(null);

  const getOrderDetail = async () => {
    try {
      setLoading(true);
      const orderDates = await getOrderDates(orderId)
      const data = await getOrderDetailById(orderId);
      setOrderDatesData(orderDates);
      setOrderData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderData) {
      const currency_minor_unit = orderData?.totals?.currency_minor_unit;
      const total_items = orderData?.totals?.total_items;
      const total_tax = orderData?.totals?.total_tax;
      const total_discount_tax = orderData?.totals?.total_discount_tax;
      const cartSubTotal = getCorrectPrice(
        parseInt(total_items) + parseInt(total_tax) + parseInt(total_discount_tax),
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
        currency: orderData?.totals?.currency_suffix
      });
    }
  }, [orderData]);

  useEffect(() => {
    getOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const getCorrectPrice = (number, currency_minor_unit) => {
    if (currency_minor_unit) {
      const value = parseFloat((number / 100).toFixed(currency_minor_unit));
      return Math.round(value);
    }
    return number;
  };

  const {
    cartSubTotal,
    cartTotalDiscount,
    shippingTotal,
    currency
  } = cartData;

  const { delivery_dates: deliveryDates, order_date: orderDate } = orderDatesData || {};

  return (
    <>
      {loading ? <Orderskeleton /> : (
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
                      <p className={styles.value}>{orderData.id}</p>
                    </div>
                    <div className={styles.orderDetail}>
                      <p className={styles.label}>{oct.given}</p>
                      <p className={styles.value}>{orderData.status}</p>
                    </div>
                    <div className={styles.orderDetail}>
                      <p className={styles.label}>{oct.email}</p>
                      <p className={styles.value}>{orderData.billing_address.email}</p>
                    </div>
                    <div className={styles.orderDetail}>
                      <p className={styles.label}>{oct.total}</p>
                      <p className={styles.value}>
                        {currency} {getCorrectPrice(
                          parseInt(orderData?.totals?.total_price),
                          orderData?.totals?.currency_minor_unit
                        )}
                      </p>
                    </div>
                  </div>
                  <aside className={styles.rightContainer}>
                    <h4>{oct.orderInfromation}</h4>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th className={styles.firstHeading}>{oct.item}</th>
                          <th>{oct.total}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name} <span>x {item.quantity}</span></td>
                            <td>{currency} {getCorrectPrice(
                              parseInt(item?.totals?.line_subtotal) + parseInt(item?.totals?.line_subtotal_tax),
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
                          <td>{deliveryDates && Object.keys(deliveryDates)[0]}</td>
                        </tr>
                        <tr>
                          <td>{oct.orderDate}</td>
                          <td>{orderDate}</td>
                        </tr>
                        {cartTotalDiscount && cartTotalDiscount > 0 ? (
                          <tr>
                            <td>{oct.rabat}</td>
                            <td>{currency} {cartTotalDiscount}</td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </aside>
                </div>
                <div className={styles.addresscontainer}>
                  <div>
                    <h4>{oct.billingAddress}</h4>
                    <div>
                      {orderData.billing_address && <AddressInfo address={orderData.billing_address} email={orderData.billing_address?.email} />}
                    </div>
                  </div>
                  <div>
                    <h4>{oct.deliveryAddress}</h4>
                    <div>
                      {orderData.shipping_address && <AddressInfo address={orderData.shipping_address} email={orderData.billing_address?.email} />}
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
      )}
    </>
  );
};

export default Order;
