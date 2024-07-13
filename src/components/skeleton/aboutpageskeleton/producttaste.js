import React from "react";
import styles from "@/components/atoms/producttaste/producttaste.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Producttase = () => {
  return (
    <>
      <section className={styles.producttase}>
        <div className={styles.tastecontainer}>
          <div className={styles.allcontent}>
            <div className={styles.tastepng}>
              <Skeleton width={406} height={405} />
            </div>
            <div className={styles.paracontainer}>
              <p className={`W-body-Large`}>
              <Skeleton width={406} height={400} />
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Producttase;
