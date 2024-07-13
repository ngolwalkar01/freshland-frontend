import React from "react";
import styles from "./foodchain.module.css";
import Image from "next/image";
import { aboutTranslation} from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const Foodchain = () => {
  const food = aboutTranslation[lang];

  return (
    <>
      <section className={styles.foodchain}>
        <div className={styles.supplychaincontainer}>
          <div className={styles.supplychain}>
            <div className={styles.phoneimg}>
              <Image
                src="/Images/phone.png"
                alt={food.phoneImg}
                width={720}
                height={375}
                loading="lazy"
               
              />
            </div>
            <div>
              <h2>{food.reThink}</h2>
              <p className="W-body-Large">
               {food.buyDirectly}
              </p>
            </div>
          </div>
          <div className={`${styles.foodmodel} ${styles.supplychain}`}>
          <p className="W-body-Large">
            {food.foodModel}
            </p>
            <div className="foodmodelimg">
              <Image
                src="/Images/foodmodel.png"
                alt={food.foodImg}
                width={598}
                height={375}
                loading="lazy"
              />
            </div>
           
          </div>
        </div>
      </section>
    </>
  );
};

export default Foodchain;
