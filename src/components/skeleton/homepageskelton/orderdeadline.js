import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/components/atoms/OrderDeadline/Order.module.css"
const OrderDeadline = () => {
 
  return (
    <>
      <div className={styles.OrderDeadlineSkeleton}>
        <div className={styles.deadlineTimer}>
      <div className={styles.skeletonContainer}>
        <div className={styles.headingSkl}>
        <Skeleton height={30} width={200}/>
        <Skeleton height={20} width={150} />
        </div>
    
      
      <div className={styles.skeletontimer}>
        <Skeleton height={100} width={200}  />
        <Skeleton height={100} width={200} />
        <Skeleton height={100} width={200}  />
      </div>
      <div className={`${styles.skltimeheading} ${styles.skeletontimer}`}>
        <Skeleton height={30} width={200}  />
        <Skeleton height={30} width={200} />
        <Skeleton height={30} width={200}  />
      </div>
    </div>

    </div>
      </div>

    </>
  );
};

export default OrderDeadline;
