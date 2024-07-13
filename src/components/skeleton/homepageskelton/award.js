import styles from "@/components/atoms/Award/Award.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Goods = () => {
  return (
    <>
    <div className={styles.bgcontainer}>
      <div className={styles.awardSkeleton}>
        <Skeleton height={200} width={800} />
        <Skeleton height={200} width={800} />
     </div>
     </div>
     
    </>
  );
};

export default Goods;
