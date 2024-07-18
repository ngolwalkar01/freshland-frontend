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
          <div className={styles.headingSkeleton}>
          <Skeleton height={50} width={350} />
          </div>
        
          <div>
         
            <div className={styles.imgcontainer}>
          
              <div className={styles.seasonoverviewSkeleton}>
              <Skeleton height={100} width={530} />
              <Skeleton height={100} width={530} />
              <Skeleton height={100} width={530} />
              </div>
             
              <div className={styles.seasonoverviewSkeleton}>
              <Skeleton height={100} width={530} />
              <Skeleton height={100} width={530} />
              <Skeleton height={100} width={530} />
              </div>
            </div>
          </div>

          <div className={styles.SkeletonDiv}>
            <div>
              <Skeleton width={1170} height={554} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SeasonOverview;
