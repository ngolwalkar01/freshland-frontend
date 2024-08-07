import React from "react";
import styles from "./prices.module.css";
import Image from "next/image";
import { aboutTranslation} from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Prices = () => {
  const price = aboutTranslation[lang];

  return (
    <>
      <section className={styles.prices}>
        <div className={styles.pricescontainer}>
          <div className={styles.pricesheading}>
            <div className={styles.pricecontent}>
              <h2>{price.priceTag}</h2>
              <p className={`M-Body`}>
              {price.prestiGious}
              </p>
            </div>

            <p className={`W-body-Large ${styles.consumers}`}>
            {price.beatThe}
            </p>
          </div>
          <div className={styles.priceslog}>
            <div>
                <Image
                   src="/Images/ecosummit.jpg"
                   alt="check-circle"
                   width={346}
                   height={186}
                />
            </div>
            <div>
                <Image
                   src="/Images/eya.jpg"
                   alt="check-circle"
                   width={346}
                   height={186}
                />
            </div>
            <div>
                <Image
                   src="/Images/nordic.jpg"
                   alt="check-circle"
                   width={346}
                   height={186}
                />
            </div>
            <div>
                <Image
                   src="/Images/climatesolver.jpg"
                   alt="check-circle"
                   width={346}
                   height={186}
                />
            </div>
            <div>
                <Image
                   src="/Images/greentech.jpg"
                   alt="check-circle"
                   width={346}
                   height={186}
                />
            </div>
            <div>
                <Image
                   src="/Images/ibm.jpg"
                   alt="check-circle"
                   width={346}
                   height={186}
                />
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Prices;
