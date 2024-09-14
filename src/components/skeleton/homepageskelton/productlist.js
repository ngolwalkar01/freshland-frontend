import styles from "@/components/atoms/ProductList/Product.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductList = () => {
  const skeletonCount = 4; 
  const skeletons = Array.from({ length: skeletonCount });

  return (
    <div className={styles.skeletonContainer}>
      {skeletons.map((x, index) => (
        <div key={index} className={styles.skeletonCard}>
            <div className={styles.newskl}>
              <div>
          <Skeleton className={`${styles.skeletonText} ${styles.skldiv}`} height={20} width={130}/>
          <Skeleton className={`${styles.skeletonText} ${styles.skldiv}`} height={20} width={100}/>
          </div>
          <Skeleton className={`${styles.skeletonText} ${styles.skeletonTop}`} height={30} width={40}/>
          </div>
          <div className={styles.cardSkeleton}>
         
          <Skeleton className={styles.skeletonImage} height={150}/>
          </div>
          
       
          <Skeleton className={styles.skeletonButton} height={40} />
         
         
        </div>
      ))}
    </div>
  );
};

export default ProductList;
