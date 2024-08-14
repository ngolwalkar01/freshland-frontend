import React from "react";
import styles from "./vip.module.css";
import Header from '@/components/atoms/Header/Header'
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Gifts = ({ vipPageData }) => {
   const router = useRouter();
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
               {vipPageData && vipPageData.length > 0 && vipPageData.map((x, i) => {
                  return (
                     <div key={i} className={styles.vipCategory} onClick={() => router.push(`/viplist/${x.id}`)}>
                        <Image width={511} height={606} src={x.thumbnail} alt="vip page"></Image>
                        <div className={styles.textConatiner}>
                           <h2>{x.title}</h2>
                           {/* <p>Var en av de första att beställa säsongens avokado</p> */}
                        </div>
                     </div>
                  )
               })}
            </div>
         </section>

      </>
   );
};

export default Gifts;
