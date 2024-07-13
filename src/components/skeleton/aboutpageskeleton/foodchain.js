import React from "react";
import styles from "@/components/atoms/foodchain/foodchain.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Foodchain = () => {


  return (
    <>
      <section className={styles.foodchain}>
        <div className={styles.supplychaincontainer}>
          <div className={styles.supplychain}>
            <div className={styles.phoneimg}>
        
              <Skeleton  width={720}
                height={375}/>
            </div>
            <div>
              <p className="W-body-Large">
              <Skeleton  width={320}
                height={375}/>
              </p>
            </div>
          </div>
          <div className={`${styles.foodmodel} ${styles.supplychain}`}>
          <p className="W-body-Large">
          <Skeleton  width={320}
                height={375}/>
            </p>
            <div className="foodmodelimg">
               <Skeleton width={720}
                height={375}/>
            </div>
           
          </div>
        </div>
      </section>
    </>
  );
};

export default Foodchain;
