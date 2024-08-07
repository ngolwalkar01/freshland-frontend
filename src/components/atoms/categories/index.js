import React, { useEffect, useState } from "react";
import styles from "./categories.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import productService from '@/services/product';
import { commonTranslation} from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';
const Categories = () => {
  const cmt = commonTranslation[lang];

  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await productService.getCategories();
        setCategories(categories)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {
        categories && categories.length > 0 && (
          <div className={styles.mainContainer}>
            <h1>{cmt.categories}</h1>
            <div className={styles.categoriesName}>
              {
                categories && categories.length > 0 && categories.map((x, i) => {
                  return (
                    <div key={i} className={styles.fruitCategories} onClick={() => router.push(`/category/${x.name}`)}>
                      <p>{x.name}</p>
                      <Image
                        src={`${x.image}`}
                        alt="citrusfruit"
                        width={306}
                        height={196}
                      />
                    </div>
                  )
                })
              }
            </div>
            <div>
              <button
                className={styles.seeAllButton}
                onClick={() => router.push(`/shop`)}
              >{cmt.seeAllProducts}</button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Categories;
