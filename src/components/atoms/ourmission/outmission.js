import React from "react";
import styles from "./ourmission.module.css";
import { aboutTranslation} from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const Ourmission = () => {
  const mission = aboutTranslation[lang];

  return (
    <>
      <section className={styles.ourmission}>
        <div className={styles.mission}>
            <div className={styles.missioncontent}>
            <div className={styles.missionheading}>
            <p className={`W-body-Large`}>{mission.ourMission}</p>
            <h2>{mission.toBeacon}</h2>
          </div>
          <p className={`W-body-Large ${styles.content}`}>
           {mission.foreFront}
          </p>
            </div>
          
        </div>
      </section>
    </>
  );
};

export default Ourmission;
