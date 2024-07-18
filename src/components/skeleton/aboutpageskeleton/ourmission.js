import React from "react";
import styles from "@/components/atoms/ourmission/ourmission.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Ourmission = () => {
  

  return (
    <>
      <section className={styles.ourmission}>
        <div className={styles.mission}>
            <div className={styles.missioncontent}>
            <div className={styles.missionheading}>
            <Skeleton width={400} height={50} />
          </div>
          <p className={styles.Ourmissionskl}>
          <Skeleton width={800} height={30} />
          <Skeleton width={800} height={30} />
          <Skeleton width={800} height={30} />
          </p>
            </div>
          
        </div>
      </section>
    </>
  );
};

export default Ourmission;
