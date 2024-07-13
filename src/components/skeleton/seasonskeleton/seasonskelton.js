import React from "react";
import Header from "@/components/atoms/Header/Header";
import styles from "@/components/pages/seasonoverview/seasonoverview.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SeasonOverview = () => {
  return (
    <>
      <section className={styles.seasonoverview}>
        <Header />
        <div className={styles.seasoncontainer}>
          <div>
            <div className={styles.imgcontainer}>
              <div>
                <Skeleton height={580} width={580} />
              </div>
              <div>
                <Skeleton height={580} width={580} />
              </div>
            </div>
          </div>

          <div>
            <div className={styles.avocado}>
              <Skeleton width={1214} height={554} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SeasonOverview;
