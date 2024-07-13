import React, { useState, useEffect, useCallback } from "react";
import styles from "./mysubscription.module.css";
import Link from "next/link";
import { myaccountTranslation } from "@/locales";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Subscription from "../subscriptionstore";
import subscriptionService from "@/services/subscriptions";
import { getLocalStorage } from '@/services/local-storage';
import { toast } from 'react-toastify';

const toastTimer = parseInt(process.env.NEXT_PUBLIC_TOAST_TIMER);
const lang = process.env.NEXT_PUBLIC_LANG || "dk";

function Mysubscription({ showOrderView, setShowOrderView, isUserLoggedIn, setLoading, showOrderViewTab }) {
  const [subscriptionshow, setSubscriptionShow] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [subscriptionDetail, setSubDetail] = useState(null);
  const [newNextDate, setNewDate] = useState(null);
  const [skipNewDate, setSkipNewDate] = useState(null)
  const [subscriptionOrders, setSubscriptionOrders] = useState([])
  const [newsubscriptionProducts, setNewSubscriptionProducts] = useState([]);

  const handleButtonClick = () => {
    setSubscriptionShow(!subscriptionshow);
  };
  const handleClose = () => {
    setSubscriptionShow(false);
  };

  const [showpopup, setShowPopup] = useState(false);
  const [calenderpopup, setCalenderPopup] = useState(false);
  const [date, setDate] = useState(new Date());
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);

  const token = isUserLoggedIn();
  const userId = getLocalStorage('userId');

  const getSubData = useCallback(async () => {
    if (token) {
      setLoading(true);
      const subData = await subscriptionService.getSubscriptions(userId, token);
      setSubscriptionData(subData && subData.length > 0 ? subData : [])
      setLoading(false);
    }
  }, [token, userId, setLoading, setSubscriptionData])

  useEffect(() => {
    getSubData();
  }, [getSubData]);

  const onChange = (date) => {
    setDate(date);
  };
  const onActiveStartDateChange = ({ activeStartDate, view }) => {
    // Enable the previous button only if the active start date is after the initial date
    setPrevButtonDisabled(activeStartDate <= new Date());
  };

  const formatDt = (date) => {
    const d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}/${month}/${year}`;
  }

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatDateToLongForm = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().substring(2);

    return `${dayOfWeek} ${dayOfMonth}/${month}/${year}`;
  }

  const handlecalenderpopup = () => {
    setCalenderPopup(!calenderpopup);
  };

  const handleanotherDate = () => {
    setCalenderPopup(!calenderpopup);
    setShowPopup(false);
  }
  const handleclosecalenderpopup = () => {
    setCalenderPopup(false);
  };

  const handlepayment = () => {
    setShowPopup(!showpopup);
  };
  const handleClosepopup = () => {
    setShowPopup(false);
  };
  const mat = myaccountTranslation[lang];
  // const [showOrderView, setShowOrderView] = useState(false);

  const handleViewClick = (id) => {
    setShowOrderView(id, true);
  };

  const toggleSubView = async (id, val) => {
    if (token) {
      setLoading(true);
      const subDetail = await subscriptionService.getSubscriptionById(id, token);
      const nextDate = subDetail?.next_payment_date_gmt ? new Date(subDetail.next_payment_date_gmt) : new Date();
      const nextDt = formatDateToLongForm(nextDate);
      const subOrders = await subscriptionService.getOrdersBySubscriptionId(id, token)
      const newSubProducts = await subscriptionService.getNewPRoductsBySubscription(id);
      setNewSubscriptionProducts(newSubProducts);
      setSubscriptionOrders(subOrders);
      setDate(new Date());
      setNewDate(nextDt);
      setSkipNewDate(nextDt)
      setSubDetail(subDetail);
      setShowOrderView(val);
      setLoading(false);
    }
  }

  const onChangeCalDate = async (e) => {
    setLoading(true);
    const data = await subscriptionService.getNextDeliveryDate(e, token);
    if (data && data?.next_date)
      setNewDate(data?.next_date);
    setDate(e);
    setLoading(false);
  }

  const skipNextDeliveryDate = async () => {
    const data = await subscriptionService.skipNextDeliveryDate(subscriptionDetail.id, token);
    await toggleSubView(subscriptionDetail.id, true);
    handleClosepopup();
    toast.success("Your subscription is now suspended and will be activated on the date selected.", { autoClose: toastTimer });
  }

  const setDeliveryDate = async () => {
    setLoading(true);
    const data = await subscriptionService.setDeliveryDate(subscriptionDetail.id, date, newNextDate, token);
    await toggleSubView(subscriptionDetail.id, true);
    handleclosecalenderpopup();
    setLoading(false);
    toast.success("Your subscription has been put on hold.", { autoClose: toastTimer });
  }

  const findMetaDataValue = (metaData, key) => {
    const item = metaData.find(item => item.key === key);
    return item ? item.value : null;
  }

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
                  <th>{mat.amount}</th>
                  <th>{mat.actions}</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData && subscriptionData.map((order, i) => {
                  const orderNo = order.number;
                  const date = order.date_created ? formatDt(order.date_created) : null;
                  const delivery = '16/02/2024';
                  const status = order.status;
                  const amount = `${order.currency} ${order.total}`;
                  return (
                    <tr key={i}>
                      <td>{orderNo}</td>
                      <td>{date}</td>
                      <td>16/02/2024</td>
                      <td>{status}</td>
                      <td>{amount}</td>
                      <td className={styles.btnlink}>
                        <Link
                          href="#"
                          className={styles.view}
                          onClick={() => { toggleSubView(order.id, true); }}
                        >
                          {mat.view}
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {showOrderView && subscriptionDetail && (
        <section className={styles.orderviewpage}>
          <div className={styles.orderviewdetail}>
            <div className={styles.orderCard}>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.status}</p>
                <p className={`${styles.id} ${styles.upperCase}`}>{subscriptionDetail.status}</p>
              </div>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.startDate}</p>
                <p className={styles.value}>{formatDt(subscriptionDetail.date_created)}</p>
              </div>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.nextDelivery}</p>
                <p className={styles.value}>{formatDt(subscriptionDetail.next_payment_date_gmt)}</p>
              </div>
              <div className={styles.orderDetail}>
                <p className={styles.label}>{mat.actions}</p>
                <p className={`M-Caption-Bold ${styles.skip}`}>
                  <div className={styles.linkbtn}>
                    <Link href="#">{mat.cancelHeading}</Link>
                    <Link href="#" onClick={handlecalenderpopup}>
                      Break
                    </Link>
                    <Link href="#">{mat.changeAddress}</Link>
                    <Link href="#">{mat.changePay}</Link>
                    <Link href="#">{mat.RenewNow}</Link>
                    <Link href="#" onClick={handleButtonClick}>
                      {mat.aadProduct}
                    </Link>
                  </div>
                  <div className={styles.skippayment}>
                    <Link href="#" onClick={handlepayment}>
                      {mat.skipPay}
                    </Link>
                  </div>
                </p>
              </div>
              {subscriptionshow && <Subscription
                newsubscriptionProducts={newsubscriptionProducts}
                onClose={handleClose}
                subDetail={subscriptionDetail}
                token={token} />}
              {/* calender popup  */}
              {calenderpopup && (
                <div>
                  <div className={styles.skipoveraly}>
                    <div className={styles.calender}>
                      <div>
                        <i
                          className="fa-solid fa-xmark"
                          onClick={handleclosecalenderpopup}
                        ></i>
                        <h1>{mat.subscriptionHeading}</h1>
                        <div className={styles.Calendardiv}>
                          <p>{mat.reactivationDate}</p>

                          <Calendar
                            className={styles.reactcalendar}
                            onChange={onChangeCalDate}
                            value={date}
                            onActiveStartDateChange={onActiveStartDateChange}
                            prevLabel={
                              <button disabled={prevButtonDisabled}>
                                &lt;
                              </button>
                            }
                            nextLabel={<button>&gt;</button>}
                            next2Label={false}
                            prev2Label={false}
                          />
                          <p>
                            {mat.yourNextdelivery}:{" "}
                            <strong>{newNextDate}</strong>
                          </p>

                          <div className={styles.btndate}>
                            <button className={styles.confirm} onClick={handleclosecalenderpopup}>
                              {mat.donotSet}
                            </button>
                            <button className={styles.confirm} onClick={setDeliveryDate}>{mat.conf}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* calender popup end */}
              {showpopup && (
                <div>
                  <div className={styles.skipoveraly}>
                    <div className={styles.skippaymentpopup}>
                      <i
                        className="fa-solid fa-xmark"
                        onClick={handleClosepopup}
                      ></i>
                      <h1>{mat.subscriptionHeading}</h1>
                      <div className={styles.skiptext}>
                        <p>{mat.youSkip}:</p>
                        <p>{mat.yourNextdelivery}: <strong>{skipNewDate}</strong></p>
                        <button className={styles.confirm} onClick={skipNextDeliveryDate}>{mat.conf}</button>
                        <Link href="#" onClick={handleanotherDate} className={styles.anotherdate}>{mat.chooseDate}</Link>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            <aside className={styles.rightContainer}>
              <h5>{mat.subscriptionTotal}</h5>
              <div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.firstHeading}>{mat.product}</th>
                      <th>{mat.total}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionDetail.line_items.map(item => (
                      <tr className={styles.topRow} key={item.id}>
                        <td>
                          <span className={styles.cross}>
                            <i className="fa-solid fa-xmark"></i>
                          </span>
                          {item.name} <span>x {item.quantity}</span>
                        </td>
                        <td>
                          {subscriptionDetail.currency}{item.total} / <span>{mat.week}</span> {/* Assuming weekly subscription */}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>{mat.subTotal}</td>
                      <td>{subscriptionDetail.currency}{subscriptionDetail.total}</td>
                    </tr>
                    <tr>
                      <td>
                        <label>{mat.total}</label>
                      </td>
                      <td>
                        {subscriptionDetail.currency}{subscriptionDetail.total} / <span>{mat.week}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </aside>
          </div>
          <div className={styles.subscriptiontable}>
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
                  subscriptionOrders && subscriptionOrders.length > 0 && subscriptionOrders.map((od, i) => {
                    return (
                      <tr key={i}>
                        <td onClick={() => { showOrderViewTab(od.id, true); }} style={{ cursor: 'pointer' }}>#{od.number}</td>
                        <td>{od.date_created}</td>
                        <td>{findMetaDataValue(od.meta_data, "delivery_date")}</td>
                        <td>{od.status}</td>
                        <td>{od.total}</td>
                        <td className={styles.btnlink}>
                          <Link
                            href="#"
                            className={styles.view}
                            onClick={() => { showOrderViewTab(od.id, true); }}
                          >
                            {mat.view}
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <div className={styles.addresscontainer}>
            <div>
              <h4>{mat.billingAddress}</h4>
              <div>
                <p>{subscriptionDetail.billing.first_name} {subscriptionDetail.billing.last_name}</p>
                <p>{subscriptionDetail.billing.address_1}, {subscriptionDetail.billing.city}</p>
                <p>{subscriptionDetail.billing.email} | {subscriptionDetail.billing.phone}</p>
                <p>{subscriptionDetail.billing.state}, {subscriptionDetail.billing.postcode} {subscriptionDetail.billing.country}</p>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* for mobile view */}
      {!showOrderView && (
        <div className={styles.mobileviewtable} onClick={handleViewClick}>
          <div className={styles.tablecard}>
            {subscriptionData && subscriptionData.map((order, i) => (
              <div key={i} className={styles.ordercarddetail}>
                <div>
                  <p className="M-Caption-Bold">#{order.number}</p>
                </div>
                <div className={styles.orderid}>
                  <p className="M-Caption-Bold">
                    {mat.nextDelivery}{" "}
                    <span className={styles.status}>{formatDt(order.next_payment_date)}</span>
                  </p>
                  <p className={styles.status}>{order.status}</p>
                </div>
                <div className={styles.date}>
                  <p>
                    {mat.startDate}<span>{formatDt(order.date_created)}</span>
                  </p>
                </div>
                <div className={styles.orderid}>
                  <p className="M-Caption">{order.currency} {order.total}/{mat.week}</p>
                  <p>{mat.everyWeek}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Mysubscription;
