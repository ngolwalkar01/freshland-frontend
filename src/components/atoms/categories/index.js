import React, { useEffect, useState } from "react";
import styles from "./categories.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import productService from '@/services/product';

const Categories = () => {
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
            <h1>Categories</h1>
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
              >See All Products</button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Categories;
