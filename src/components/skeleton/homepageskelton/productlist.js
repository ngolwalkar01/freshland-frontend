import styles from "@/components/atoms/ProductList/Product.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductList = () => {
  return (
    <>
      <div className={styles.skeletonContainer}>
        <Skeleton height={200} width={220} />
        <Skeleton height={200} width={220} />
        <Skeleton height={200} width={220} />
        <Skeleton height={200} width={220} />
     </div>
     
    </>
  );
};

export default ProductList;
