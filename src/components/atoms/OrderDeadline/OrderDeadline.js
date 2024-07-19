import React, { Fragment, useEffect, useState } from "react";
import styles from "./Order.module.css";
import Image from "next/image";
import { headingsData } from "@/mockdata/headingData";
import { homepageTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';


const OrderDeadline = ({ shippingMethods, enableMockData, cutOffDaysDetail }) => {
  const hpt = homepageTranslation[lang];
  const data = headingsData[0];
  const [timer, setTimer] = useState('');

  useEffect(() => {
    if (cutOffDaysDetail) {
      const endDateString = cutOffDaysDetail && cutOffDaysDetail.cutoffday ? cutOffDaysDetail.cutoffday : "2027-05-25";
      const endDate = new Date(endDateString.replace(/-/g, '/'));
      const interval = startTimer(endDate);

      return () => clearInterval(interval);
    }
  }, [cutOffDaysDetail]);

  const startTimer = (endDate) => {
    const targetDate = endDate;

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimer("Timer ended");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

    //   const newTimer = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    //   setTimer(newTimer);
    // }, 1000);
    const newTimer = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      setTimer(newTimer);
    }, 1000);

    return interval;
  }

  return (
    <>
      <div className={styles.order_card}>
      <Image
          src="/Images/Deadlinebgimg.png"
          alt="Background Image"
          fill
          
        />
        <div className={styles.next_order}>
          <div className={styles.nextorder_deadline}>
            <div>
              <div className={styles.deadlinedata}>
                <h2 className={styles.next}>{data.orderCard1?.headCard1}</h2>
                {/* <h3 className={`W-H3 ${styles.contentCard1}`}>{timer}</h3> */}
                <h2 className={`W-H3 ${styles.contentCard1}`}>{timer}</h2>
                <p className={`W-Body-Large-Regular ${styles.timeCard1}`}>{data.orderCard1?.timeCard1}</p>
              </div>
            </div>
          </div>
          <div className={styles.Freight}>
            {enableMockData ? (
              <div>
                <h2>{data.orderCard2?.head1}</h2>
                <p className="W-Body-Large-Regular">{data.orderCard2?.detail1}</p>
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
              <div>
                <h2>{hpt.freight}</h2>
                <p className="W-Body-Large-Regular">{hpt.weDeliverTo}</p>
                {shippingMethods && shippingMethods.map((x, i) => {
                  return <Fragment key={i}>
                    <h3 className="W-H3">DKK {x.cost}</h3>
                    <p>{x.title}</p>
                    {i < (shippingMethods.length - 1) && (<hr className={styles.hr} />)}
                  </Fragment>
                })}
              </div>
            )}


          </div>
        </div>

      </div>

    </>
  );
};

export default OrderDeadline;
