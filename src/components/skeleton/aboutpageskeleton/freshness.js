import React from "react";
import styles from "@/components/atoms/freshness/freshness.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Freshness = () => {
  return (
    <>
      <section className={styles.freshness}>
        <div className={styles.freshnesscontainer}>
          <div className={styles.aboutcontent}>
            <div className={styles.headingcontainer}>
            </div>
            <div className={styles.content}>
              <div className={styles.harvestdate}>
                <div>
                  <Skeleton width={428} height={459} />
                </div>
                <div>
             
                  <p className={`W-body-Large ${styles.contentpara}`}>
                  <Skeleton width={428} height={459} />
                  </p>
                </div>
              </div>
              {/* ----- */}
              <div className={styles.harvestdate}>
                <div className={styles.goalimg}>
                <Skeleton width={428} height={459} />
                </div>
                <div>
                
                  <p className={`W-body-Large ${styles.contentpara}`}>
                  <Skeleton width={428} height={459} />
                  </p>
                </div>
              </div>
              {/* ---- */}
              <div className={styles.harvestdate}>
                <div className={styles.goalimg}>
                <Skeleton width={428} height={459} />
                </div>
                <div>
                 
                  <p className={`W-body-Large ${styles.contentpara}`}>
                  <Skeleton width={428} height={459} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Freshness;
