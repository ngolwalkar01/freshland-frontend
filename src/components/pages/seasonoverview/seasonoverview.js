import React from "react";
import Header from "@/components/atoms/Header/Header";
import styles from "./seasonoverview.module.css";
import Image from "next/image";
import Link from "next/link";
import { seasonTranslation} from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';
const SeasonOverview = () => {
  const sea = seasonTranslation[lang];

  return (
    <>
      <section className={styles.seasonoverview}>
        <Header />
        <div className={styles.seasoncontainer}>
          <div>
            <div>
              <h2>{sea.seas}</h2>
            </div>
            <div className={styles.imgcontainer}>
              <div>
                <Image
                  src="/Images/seasonone.png"
                  alt="Flogo"
                  width={580}
                  height={580}
                  priority
                />
              </div>
              <div>
                <Image
                  src="/Images/seasontwo.png"
                  alt="Flogo"
                  width={580}
                  height={580}
                  priority
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <h3>{sea.europ}</h3>
            </div>

            <div className={styles.avocado}>
              <Image
                src="/Images/Avocadoseason.png"
                alt="Flogo"
                width={1214}
                height={554}
               loading="lazy"
              //  srcSet="/Images/Avocadoseason.png.png 600w, /Images/Avocadoseason.png 1214w"

               sizes="(max-width: 600px) 100vw, (max-width: 1214px) 80vw"
              />
            </div>
          </div>

          <div className={styles.benefit}>
            <h3>{sea.get}</h3>
            <p className={`W-body-Large`}>
             {sea.youLike} &#39;{sea.first}
             
              <br></br>{sea.click}
            </p>
             <Link href="/" className={styles.vipbtn}>{sea.getvip}</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SeasonOverview;
