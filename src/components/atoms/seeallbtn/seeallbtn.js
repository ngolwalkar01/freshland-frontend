import styles from "./seeallbtn.module.css"
import Image from "next/image";
import Link from "next/link";
import { commonTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const Seeallbtn = () => {
  const cmt = commonTranslation[lang];

  return (
    <>
      

          <Link href="/shop" className={styles.seeAllButton}>
            {cmt.seeAllProducts}
          </Link>
      
    </>
  );
};

export default Seeallbtn;
