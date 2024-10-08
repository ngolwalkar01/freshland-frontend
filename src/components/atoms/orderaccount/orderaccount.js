import React, { useState } from "react";
import styles from "./orderaccount.module.css";
import Link from "next/link";
import { myaccountTranslation, serviceTranslation, orderconfirmationTranslation, cartTranslation } from '@/locales';
import OrderProcess from "../orderprocess";
import accountApi from "@/services/account";
import { toast } from 'react-toastify';
import { AddressInfo } from "@/components/atoms/address/address";

const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

function Orderaccount({ showOrderView, setShowOrderView, orders, orderobj, orderDates, isUserLoggedIn,
  setOlloading, applyLoader
}) {
  const mat = myaccountTranslation[lang];
  const orderTrs = orderconfirmationTranslation[lang];
  const service = serviceTranslation[lang];
  const ct = cartTranslation[lang];
  const [showRequest, setShowRequest] = useState();

  const handleRequest = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setShowRequest(!showRequest);
  }
  const handleViewClick = async (id) => {
    await applyLoader(
      setOlloading,
      setShowOrderView,
      [id, true]
    )
  };
  const handleGoBack = () => {
    setShowRequest(false);
  };

  const downloadInvoicePdf = async (orderId) => {
    try {
      const data = await accountApi.downloadInvoiceByOrderId(orderId, isUserLoggedIn());
      if (data.download_link) {
        const newWindow = window.open(data.download_link, '_blank');

        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          toast.error(service.popupBlocked, {
            autoClose: toastTimer,
          });
        }
      } else {
        toast.error(service.failedDownloadLink, {
          autoClose: toastTimer,
        });
      }
    } catch (error) {
      toast.error(service.errorFetchingInvoice, {
        autoClose: toastTimer,
      });
      // if (data.download_link) {
      //   const link = document.createElement('a');
      //   link.href = data.download_link;
      //   link.download = 'Invoice_' + orderId + '.pdf'; // Optional: Setting download attribute with filename
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // }
    }
  }

  const getCorrectPrice = (number, currency_minor_unit) => {
    if (currency_minor_unit) {
      const value = parseFloat((number / 100).toFixed(currency_minor_unit));
      return Math.round(value);
    }

    return number;
  }

  const { delivery_dates: deliveryDates, order_date: orderDate } = orderDates || {};

  const totalRabat = getCorrectPrice(parseInt(orderobj?.totals?.total_discount) + parseInt(orderobj?.totals?.total_discount_tax)
    , orderobj?.totals?.currency_minor_unit);
  return (
    <>
      {!showOrderView && (
        <section>
          <div className={styles.myaccountconatiner}>
            <table className={styles.ordertable}>
              <thead>
                <tr>
                  <th>{mat.orderNo}</th>
                  <th>{mat.date}</th>
                  <th>{mat.delivery}</th>
                  <th>{mat.status}</th>
                  <th>{mat.total}</th>
                  <th>{mat.actions}</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders && orders.length > 0 ?
                    (
                      <>
                        {
                          orders.map((od, i) => (
                            <tr key={i}>
                              <td onClick={() => handleViewClick(od.order_number)} style={{ cursor: 'pointer' }}>#{od.order_number}</td>
                              <td>{od.order_date}</td>
                              <td>{od.delivery_date}</td>
                              <td>{od.order_status}</td>
                              <td>{od.order_total}</td>
                              <td className={styles.btnlink}>
                                <Link
                                  href="#"
                                  className={styles.view}
                                  onClick={() => handleViewClick(od.order_number)}
                                >
                                  {mat.view}
                                </Link>
                                <Link href="#" className={styles.pdf} onClick={async () => {
                                  await applyLoader(
                                    setOlloading,
                                    downloadInvoicePdf,
                                    [od.order_number]
                                  )
                                }}>
                                  {mat.pDFInvoice}
                                </Link>
                                <Link href="#" className={styles.request}>
                                  {mat.requestaComplaint}
                                </Link>
                              </td>
                            </tr>
                          ))
                        }
                      </>
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', display: 'table-cell' }}>{mat.noOrderFound}</td>
                      </tr>
                    )

                }
              </tbody>
            </table>
          </div>
        </section>
      )}

      {showOrderView && orderobj && (
        <section className={styles.orderviewpage} style={{ display: showRequest ? 'none' : 'block' }}>
          <div className={styles.ordercomplete}>
            <p className="W-body-Large">
              {mat.ordername} #{orderobj.id} {mat.wasCaried} {orderDate} {mat.andIsCurrent} {orderobj.status}.
            </p>
          </div>
          <div className={styles.orderviewdetail}>
            <div className={styles.orderCard}>
              <h5>{mat.orderInfo}</h5>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.orderLabel}</p>
                <p className={styles.id}>#{orderobj.id}</p>
              </div>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.date}</p>
                <p className={styles.value}>{orderDate}</p>
              </div>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.delivery}</p>
                <p className={styles.value}>{deliveryDates && Object.keys(deliveryDates)[0]}</p>
              </div>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.status}</p>
                <p className={styles.value}>
                  {orderobj.status === "processing" ? "Behandlas" : orderobj.status}
                </p>
              </div>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.total}</p>
                <p className={styles.ordertotal}>
                  <span> {getCorrectPrice(orderobj.totals.total_price, orderobj.totals.currency_minor_unit)}</span>
                  {" "}{orderobj.totals.currency_symbol}
                </p>
              </div>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.actions}</p>
              </div>
              <div className={styles.orderbtn}>
                <button type="button" onClick={() => downloadInvoicePdf(orderobj.id)}>{mat.pDFInvoice}</button>
                <button type="submit" className={`${styles.requestbtn} ${styles.disabled}`} onClick={handleRequest}>
                  {mat.requestaComplaint}
                </button>
              </div>
            </div>

            <aside className={styles.rightContainer}>
              <h5>{mat.orderTotal}</h5>
              <div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.firstHeading}>{mat.product}</th>
                      <th>{mat.total}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderobj.items.map(item => (
                      <tr className={styles.topRow} key={item.id}>
                        <td>
                          {item.name} <span>x {item.quantity}</span>
                        </td>
                        <td>
                          {getCorrectPrice(parseInt(item.totals.line_subtotal) + parseInt(item.totals.line_subtotal_tax), item.totals.currency_minor_unit)}
                          {" "}{orderobj.totals.currency_symbol}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>{mat.subTotal}</td>
                      <td>
                        {getCorrectPrice((parseInt(orderobj.totals.total_items) + parseInt(orderobj.totals.total_items_tax)), orderobj.totals.currency_minor_unit)}
                        {" "}{orderobj.totals.currency_symbol}
                        <span>
                          {" "}({ct.include}
                          {getCorrectPrice(orderobj?.totals?.total_tax, orderobj.totals.currency_minor_unit)}
                          {" "}{orderobj.totals.currency_symbol}
                          {" "}{ct.tax}.)
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>{mat.shipment}</td>
                      <td>
                        {getCorrectPrice((parseInt(orderobj.totals.total_shipping) + parseInt(orderobj.totals.total_shipping_tax)), orderobj.totals.currency_minor_unit)}
                        {" "}{orderobj.totals.currency_symbol}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>{mat.total}</label>
                      </td>
                      <td>
                        {getCorrectPrice(orderobj.totals.total_price, orderobj.totals.currency_minor_unit)}
                        {" "}{orderobj.totals.currency_symbol}
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <label>{orderTrs.tax}</label>
                      </td>
                      <td>
                        {getCorrectPrice(orderobj?.totals?.total_tax, orderobj.totals.currency_minor_unit)}
                        {" "}{orderobj.totals.currency_symbol}
                      </td>
                    </tr> */}
                    {totalRabat ? (
                      <tr>
                        <td>
                          <label>{orderTrs.rabat}</label>
                        </td>
                        <td>
                          {totalRabat}
                          {" "}{orderobj.totals.currency_symbol}
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </aside>
          </div>

          <div className={styles.viewtabledetail}>
            <div className={styles.addresscontent}>
              <div>
                <p className={`W-Body-Regular ${styles.followingpage}`}>
                  {mat.theFollowingAddresses}
                </p>
              </div>
              <div className={styles.addresscontainer}>
                <div>
                  <h4>{mat.billingAddress}</h4>
                  <div>
                    {orderobj.billing_address && (
                      <AddressInfo address={orderobj.billing_address} email={orderobj.billing_address?.email} />
                    )}
                  </div>
                </div>
                <div>
                  <h4>{mat.deliveryAddress}</h4>
                  <div>
                    {orderobj.shipping_address && <AddressInfo address={orderobj.shipping_address} email={orderobj.billing_address?.email} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className={styles.mobileviewtableCards}>
        {!showOrderView && orders && orders.length > 0 && orders.map((od, i) => (
          <div key={i} className={styles.mobileviewtable} onClick={() => handleViewClick(od.order_number)}>
            <div className={styles.tablecard}>
              <div className={styles.ordercarddetail}>
                <div className={styles.order_number}>
                  <p>{mat.orderNo} <span className={styles.status}>#{od.order_number}</span></p>
                  <p className={styles.status}>{od.order_status}</p>
                </div>
                <div className={styles.date}>
                  <p>{od.order_date}</p>
                  <p>{od.order_total}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!showOrderView && !(orders && orders.length > 0) && (
          <div className={styles.mobileviewtable}>
            {mat.noOrderFound}
          </div>
        )}
      </div>
      <button style={{ display: showRequest ? 'block' : 'none' }} onClick={handleGoBack} className={styles.gobackbtn}><i className="fa-solid fa-circle-arrow-left"></i></button>

      {showRequest && <OrderProcess />}
    </>
  );
}

export default Orderaccount;
