import styles from "@/components/atoms/ProductList/Product.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Goods = () => {
  return (
    <>
     <div className={styles.gridContainer}>
        <Skeleton height={400} width={300} />
        <Skeleton height={400} width={300} />
        <Skeleton height={400} width={300} />
     </div>
     
    </>
  );
};

export default Goods;
