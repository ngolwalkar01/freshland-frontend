import React from "react";
import styles from './payment.module.css'
import Link from "next/link";
import Image from "next/image";
import { myaccountTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Payment = () =>{
  const mat = myaccountTranslation[lang];
    return(
        <>
        <div className={styles.payment}>
           
        <Image
              src="/Images/Payment.png"
              alt="freh4"
              width={296}
              height={220}
              loading="eager"
            ></Image>
             <h1>{mat.commingSoon}</h1>
        <h4>{mat.stayTuned}</h4>
        <Link href="mailto:info@fresh.land.com" className={styles.notify}>{mat.notifyMe}</Link>
        </div>
        </>
    )
}
export default Payment;