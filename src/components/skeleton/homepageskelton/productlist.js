import styles from "@/components/atoms/ProductList/Product.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductList = () => {
  const skeletonCount = 4; 
  const skeletons = Array.from({ length: skeletonCount });

  return (
    <div className={styles.skeletonContainer}>
      {skeletons.map((index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.cardSkeleton}>
           {/* <Skeleton  width={40} height={30} className={styles.topImage}/> */}
          <Skeleton className={styles.skeletonImage} height={77} width={140}/>
          </div>
          <Skeleton className={styles.skeletonText} height={30} />
          <Skeleton className={styles.skeletonText} height={30} />
       
          <Skeleton className={styles.skeletonButton} height={40} />
         
         
        </div>
      ))}
    </div>
  );
};

export default ProductList;
