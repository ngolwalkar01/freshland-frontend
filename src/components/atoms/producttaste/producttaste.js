import React from "react";
import styles from "./producttaste.module.css";
import Image from "next/image";
import { aboutTranslation} from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Producttase = () => {
  const taste = aboutTranslation[lang];

  return (
    <>
      <section className={styles.producttase}>
        <div className={styles.tastecontainer}>
          <div className={styles.allcontent}>
            <div className={styles.tastepng}>
              <Image
                src="/Images/taste.png"
                alt="Flogo"
                width={406}
                height={405}
                loading="lazy"
              />
            </div>
            <div className={styles.paracontainer}>
              <p className={`W-body-Large`}>
               {taste.theProduct}
              </p>
              <ul className={styles.cicleli}>
                <li>
                  <Image
                    src="/Images/check-circle.svg"
                    alt="check-circle"
                    width={20}
                    height={20}
                  />
                  <span className="W-Body-Regular">{taste.checkTaste}</span>
                </li>
                <li>
                  <Image
                    src="/Images/check-circle.svg"
                    alt="check-circle"
                    width={20}
                    height={20}
                  />
                  <span className="W-Body-Regular">{taste.freshlyHarvest}</span>
                </li>
                <li>
                  <Image
                    src="/Images/check-circle.svg"
                    alt="check-circle"
                    width={20}
                    height={20}
                  />
                  <span className="W-Body-Regular">{taste.chemicalFree}</span>
                </li>
                <li>
                  <Image
                    src="/Images/check-circle.svg"
                    alt="check-circle"
                    width={20}
                    height={20}
                  />
                  <span className="W-Body-Regular">{taste.sustainAble}</span>
                </li>
                <li>
                  <Image
                    src="/Images/check-circle.svg"
                    alt="check-circle"
                    width={20}
                    height={20}
                  />
                  <span className="W-Body-Regular">{taste.competPrice}</span>
                </li>
                <li>
                  <Image
                    src="/Images/check-circle.svg"
                    alt="check-circle"
                    width={20}
                    height={20}
                  />
                  <span className="W-Body-Regular">{taste.freeFrom}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Producttase;
