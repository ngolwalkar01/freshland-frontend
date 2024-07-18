import React from "react";
import styles from "@/components/atoms/prices/prices.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Prices = () => {
  return (
    <>
      <section className={styles.prices}>
        <div className={styles.pricescontainer}>
          <div className={styles.pricesheading}>
            <div className={styles.pricecontent}></div>
            <Skeleton width={400} height={50} />
            <p className={`W-body-Large ${styles.consumers}`}>
            <Skeleton width={550} height={50} />
            </p>
          </div>
          <div className={styles.priceslog}>
            <div>
              <Skeleton width={346} height={186} />
            </div>
            <div>
            <Skeleton width={346} height={186} />
            </div>
            <div>
            <Skeleton width={346} height={186} />
            </div>
            <div>
            <Skeleton width={346} height={186} />
            </div>
            <div>
            <Skeleton width={346} height={186} />
            </div>
            <div>
            <Skeleton width={346} height={186} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Prices;
