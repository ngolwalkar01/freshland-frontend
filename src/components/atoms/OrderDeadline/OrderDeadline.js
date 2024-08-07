import React, { Fragment, useEffect, useState } from "react";
import styles from "./Order.module.css";
import Image from "next/image";
import { headingsData } from "@/mockdata/headingData";
import { homepageTranslation } from '@/locales';
import Link from "next/link";
const lang = process.env.NEXT_PUBLIC_LANG || 'se';


const OrderDeadline = ({ shippingMethods, enableMockData, cutOffDaysDetail }) => {
  const hpt = homepageTranslation[lang];
  const data = headingsData[0];
  const [timer, setTimer] = useState('');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  useEffect(() => {
    if (cutOffDaysDetail) {
      const endDateString = cutOffDaysDetail && cutOffDaysDetail.cutoffday ? cutOffDaysDetail.cutoffday : "2027-05-25";
      const endDate = new Date(endDateString.replace(/-/g, '/'));
      const interval = startTimer(endDate);

      return () => clearInterval(interval);
    }
  }, [cutOffDaysDetail]);

  const startTimer = (endDate) => {
    const stockholmFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Stockholm',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const interval = setInterval(() => {
      const now = new Date(stockholmFormatter.format(new Date()));
      const differenceInMillis = endDate - now;

      if (differenceInMillis <= 0) {
        clearInterval(interval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        return;
      }

      const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));
      const days = Math.floor(differenceInMinutes / (60 * 24));
      const hours = Math.floor((differenceInMinutes % (60 * 24)) / 60);
      const minutes = differenceInMinutes % 60;

      setDays(days);
      setHours(hours.toString().padStart(2, '0'));
      setMinutes(minutes.toString().padStart(2, '0'));

    }, 1000);

    return interval;
  }

  return (
    <>
      <div className={styles.order_card}>

        <div className={styles.next_order}>
          <Image
            className={styles.deadlineImg}
            src="/Images/Deadlinebgimg.png"
            alt="Background Image"
            fill

          />
          <div className={styles.nextorder_deadline}>
            <div>
              <div className={styles.deadlinedata}>
                <div className={styles.deadlineContainer}>
                  <h2 className={styles.next}>{data.orderCard1?.headCard1}</h2>
                  <p className={styles.deliveryweek}>{hpt.forNextDelivery}</p>
                  {/* <h3 className={`W-H3 ${styles.contentCard1}`}>{timer}</h3> */}
                  <div className={styles.contentCard1}>
                    {/* <h1 className={``}>{timer}</h1> */}
                    <div className={styles.timer}>
                      <div className={styles.timeUnit}>
                        <span>{days}</span>
                        <span className={styles.hurstime}>{hpt.days}</span>
                      </div>
                      <div className={styles.timeUnit}>
                        <span className={styles.coln}>:</span>

                      </div>
                      <div className={styles.timeUnit}>
                        <span>{hours}</span>
                        <span className={styles.hurstime}>{hpt.hours}</span>
                      </div>
                      <div className={styles.timeUnit}>
                        <span className={styles.coln}>:</span>

                      </div>
                      <div className={styles.timeUnit}>
                        <span>{minutes}</span>
                        <span className={styles.hurstime}>{hpt.minutes}</span>
                      </div>

                    </div>
                    {/* <h4 className={`W-Body-Regular ${styles.timeCard1}`}>{data.orderCard1?.timeCard1}</h4> */}
                  </div>
                </div>
                <Link href="/shop" className={styles.orderNow}>{hpt.orderNow}</Link>
              </div>
            </div>
          </div>


        </div>

        <div className={styles.freightConatiner}>
          <div className={styles.Freight}>
            {enableMockData ? (
              <div>
                <div>
                  <h2>{data.orderCard2?.head1}</h2>
                  <p className="W-Body-Large-Regular">{data.orderCard2?.detail1}</p>
                </div>
                <h3 className="W-H3">{data.orderCard2?.head2}</h3>
                <p>{data.orderCard2?.detail2}</p>
                <hr className={styles.hr} />
                <h3 className="W-H3">{data.orderCard2?.head3}</h3>
                <p className="W-Body-Large-Regular">{data.orderCard2?.detail3}</p>
                <hr className={styles.hr} />
                <h3 className="W-H3">{data.orderCard2?.head4}</h3>
                <p className="W-Body-Large-Regular">{data.orderCard2?.detail4}</p>
              </div>
            ) : (
              <div className={styles.mainFreight}>
                <div className={styles.freightdiv}>
                  <h2>{hpt.freight}</h2>
                  <p className="W-Body-Large-Regular">{hpt.weDeliverTo}</p>
                </div>
                <div className={styles.shippingPrice}>
                  <div className={styles.dkcost}>
                    <h4>Fri frakt</h4>
                    <p>För beställningar över 699 kr</p>
                  </div>
                  <div className={styles.dkcost}>
                    <h4>59 kr</h4>
                    <p>Standardfrakt</p>
                  </div>
                  {/* {shippingMethods && shippingMethods.map((x, i) => {
                  return <Fragment key={i}>

                    <div className={styles.dkcost}>
                    <h4 className="W-H3">SEK {x.cost}</h4>
                    <p>{x.title}</p>
                    
                    </div>

                    {i < (shippingMethods.length - 1) && (<hr className={styles.hr} />)}
                  </Fragment>
                })} */}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>

    </>
  );
};

export default OrderDeadline;
