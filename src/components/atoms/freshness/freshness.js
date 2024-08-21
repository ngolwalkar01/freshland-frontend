import React from "react";
import styles from "./freshness.module.css";
import Header from "@/components/atoms/Header/Header";
import Image from "next/image";
import { aboutTranslation} from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Freshness = () => {
  const fresh = aboutTranslation[lang];

  return (
    <>
      <section className={styles.freshness}>
        <div className={styles.freshnesscontainer}>
          <div className={styles.aboutcontent}>
            <div className={styles.headingcontainer}>
              <h2>{fresh.freshNess}</h2>
              <p className={`W-body-Large ${styles.makesADiff}`}>{fresh.makesADiff}</p>
            </div>
            <div className={styles.content}>
              <p className={`W-body-Large ${styles.paragraph}`}>
             {fresh.freshContent}
              </p>
              <div className={styles.harvestdate}>
                <div>
                  <Image
                    src="/Images/Harvestimg.png"
                    alt={fresh.harvestImg}
                    width={428}
                    height={459}
                    priority
                  />
                </div>
                <div>
                  <h3 className={styles.harvestheading}>{fresh.harvestDate}</h3>
                  <p className={`W-body-Large ${styles.contentpara}`}>
                  {fresh.startedWith}&#39;{fresh.algarveFarm}
                  </p>
                </div>
              </div>
              {/* ----- */}
              <div className={styles.harvestdate}>
                <div className={styles.goalimg}>
                  <Image
                    src="/Images/goal.png"
                    alt={fresh.goalImg}
                    width={428}
                    height={461}
                    priority
                  />
                </div>
                <div>
                  <h4>{fresh.ourGoal}</h4>
                  <p className={`W-body-Large ${styles.contentpara}`}>
                    {fresh.foodindustry}&#39;{fresh.emissionWasted}
                  </p>
                </div>
              </div>
              {/* ---- */}
              <div className={styles.harvestdate}>
                <div className={styles.goalimg}>
                  <Image
                    src="/Images/freshnessimg.png"
                    alt={fresh.freshnessImg}
                    width={428}
                    height={422}
                    priority
                  />
                </div>
                <div>
                  <h4>{fresh.theTaste}</h4>
                  <p className={`W-body-Large ${styles.contentpara}`}>
                    {fresh.canDifficult}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Freshness;
