import React from "react";
import styles from "./vip.module.css";
import Header from '@/components/atoms/Header/Header'
import Image from "next/image";


const Gifts = () => {

  return (
    <>
      {" "}
      <Header />
      <section className={styles.vipContainer}>
      <div className={styles.mainHeading}>
     <h1>VIP-Listor</h1>
     <p>Vill du ha ett försprång och få information som en av de allra första, när en ny härlig råvara är på väg? Skriv upp dig på en av VIP-listorna nedan och få möjlighet att handla 24 timmar innan alla andra</p>
    </div>
    <div className={styles.listConatiner}>
     <div className={styles.vipCategory}>
     <Image width={511} height={606} src="/mockImage/avocadovip.png" alt="avocadovip"></Image>
     <div className={styles.textConatiner}>
        <h2>Avokado VIP-lista</h2>
        <p>Var en av de första att beställa säsongens avokado</p>
     </div>
     </div>
     <div className={styles.vipCategory}>
     <Image width={511} height={606} src="/mockImage/avocadovip.png" alt="avocadovip"></Image>
     <div className={styles.textConatiner}>
        <h2>Avokado VIP-lista</h2>
        <p>Var en av de första att beställa säsongens avokado</p>
     </div>
     </div>
     <div className={styles.vipCategory}>
     <Image width={511} height={606} src="/mockImage/avocadovip.png" alt="avocadovip"></Image>
     <div className={styles.textConatiner}>
        <h2>Avokado VIP-lista</h2>
        <p>Var en av de första att beställa säsongens avokado</p>
     </div>
     </div>
     <div className={styles.vipCategory}>
     <Image width={511} height={606} src="/mockImage/avocadovip.png" alt="avocadovip"></Image>
     <div className={styles.textConatiner}>
        <h2>Avokado VIP-lista</h2>
        <p>Var en av de första att beställa säsongens avokado</p>
     </div>
     </div>
     <div className={styles.vipCategory}>
     <Image width={511} height={606} src="/mockImage/avocadovip.png" alt="avocadovip"></Image>
     <div className={styles.textConatiner}>
        <h2>Avokado VIP-lista</h2>
        <p>Var en av de första att beställa säsongens avokado</p>
     </div>
     </div>
     <div className={styles.vipCategory}>
     <Image width={511} height={606} src="/mockImage/avocadovip.png" alt="avocadovip"></Image>
     <div className={styles.textConatiner}>
        <h2>Avokado VIP-lista</h2>
        <p>Var en av de första att beställa säsongens avokado</p>
     </div>
     </div>
    </div>
      </section>
   
    </>
  );
};

export default Gifts;
