import React from "react";
import styles from "@/components/pages/aboutUs/about.module.css";
import Header from "@/components/atoms/Header/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Freshness from "./freshness";
import Foodchain from "./foodchain";
import Ourmission from "./ourmission";
import Producttase from "./producttaste";
import Prices from "./price";
const About = () => {
  return (
    <>
      <main className={styles.aboutbg}>
        <Header />
        <section className={styles.aboutcontainer}>
        <div className={styles.disrupt}>
        <Skeleton width={500} height={40} />
      </div>
          <div className={styles.groupimg}>
            <div className={styles.flogoSkeleton}>
              <Skeleton  height={70} />
            </div>
            <div className={styles.flogoSkeleton}>
              <Skeleton width={1000} height={300} />
            </div>
          </div>
        </section>
        <Freshness />

        {/* just in time  section*/}
        <section className={styles.aboutcontainer}>
          <div className={styles.groupimg}>
          <div className={styles.disrupt}>
        <Skeleton width={500} height={40} />
      </div>
            <div className={`${styles.justtimeimg} ${styles.flogoSkeleton}`}>
              <Skeleton width={990} height={200} />
            </div>
          </div>
        </section>
        <Foodchain />
        <Ourmission />
        <Producttase />
        <Prices />
      </main>
    </>
  );
};

export default About;
