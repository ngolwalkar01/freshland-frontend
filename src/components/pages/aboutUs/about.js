import React from 'react'
import styles from "./about.module.css";
import Header from '@/components/atoms/Header/Header'
import Image from 'next/image'
import Freshness from '@/components/atoms/freshness/freshness';
import Foodchain from '@/components/atoms/foodchain/foodchain';
import Ourmission from '@/components/atoms/ourmission/outmission';
import Producttase from '@/components/atoms/producttaste/producttaste';
import Prices from '@/components/atoms/prices/prices';
import { aboutTranslation } from '@/locales';
import ActiveUserKlaviyo from '@/components/atoms/activeUserKlaviyo';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const About = () => {
  const at = aboutTranslation[lang];
  return (
    <>
      <ActiveUserKlaviyo />
      <main className={styles.aboutbg}>
        <Header />
        <section className={styles.aboutcontainer}>
          <div className={styles.disrupt}>
            <h1>{at.disruptTheFoodIndustry}</h1>
            <p className={`W-body-Large`}>{at.foodSupplyChain}</p>
          </div>
          <div className={styles.groupimg}>
            <div className={styles.flogo}>
              <Image
                src="/Images/Flogo.png"
                alt={at.flogo}
                width={1081}
                height={119}
                priority
              />
            </div>
            <div className={styles.maskgroup}>
              <Image
                src="/Images/Maskgroup.png"
                alt={at.maskG}
                width={1193}
                height={94}
                sizes="(max-width: 600px) 100vw, (max-width: 1193px) 80vw"
                priority
              />
            </div>

          </div>

        </section>
        <Freshness />

        {/* just in time  section*/}
        <section className={styles.aboutcontainer}>
          <div className={styles.disrupt}>
            <h2>{at.justTime}</h2>
            <p className={`W-body-Large`}>{at.treesAct} “{at.naturalStorage}”</p>
          </div>
          <div className={styles.groupimg}>
            <div className={`${styles.justtimeimg} ${styles.maskgroup}`}>
              <Image
                src="/Images/justintime.png"
                alt={at.justtime}
                width={990}
                height={212}
                loading="lazy"
              />
            </div>

          </div>

        </section>
        <Foodchain />
        <Ourmission />
        <Producttase />
        <Prices />
      </main>


    </>
  )
}

export default About