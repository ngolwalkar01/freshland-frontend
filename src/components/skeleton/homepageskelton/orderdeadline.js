import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/components/atoms/OrderDeadline/Order.module.css"
const OrderDeadline = () => {
 
  return (
    <>
      <div className={styles.OrderDeadlineSkeleton}>
      <Skeleton height={500} width={900} />

      </div>

    </>
  );
};

export default OrderDeadline;
