import React, { useEffect, useState } from "react";
import Header from "@/components/atoms/Header/Header";
import styles from "@/components/pages/OrderConfirmation/Order.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Order = () => {


  return (
    <>
    
        <div className={styles.orderpage}>
          <Header />
          <section className={styles.ordersection}>
            <h2 className={styles.orderhedaing}>
            
            </h2>
            <div className={styles.ordercontainer}>
             
              <Skeleton height={200} width={318} />
             
              <aside className={styles.rightContainer}>
             
                <table className={styles.table}>
                <Skeleton height={400} width={318} />
                 
                </table>
              </aside>
            </div>
       
           
          </section>
        </div>
     
    </>
  );
};

export default Order;
