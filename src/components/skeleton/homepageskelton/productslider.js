import styles from "@/components/atoms/CustomTestimonial/CustomTestimonial.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductList = () => {
  return (
    <>
       <div className={styles.testmonialSkeleton}>
        <Skeleton height={400} width={300} />
        <Skeleton height={400} width={300} />
        <Skeleton height={400} width={300} />
     </div>
     
    </>
  );
};

export default ProductList;
