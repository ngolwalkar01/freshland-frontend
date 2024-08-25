import styles from "@/components/atoms/AddSignUp/Signup.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Addsignup = () => {
  return (
    <>
    <div className={styles.container}>
   
      <div className={styles.signupSkeleton}>
       
        <div className={styles.skldiv}>
          <Skeleton height={300} width={300} />
          <Skeleton height={30} width={300} />

          <Skeleton height={50} width={300} className={styles.sklbtn} />
        </div>

        <div className={styles.skldiv}>
          <Skeleton height={300} width={300} />
          <Skeleton height={30} width={300} />

          <Skeleton height={50} width={300} className={styles.sklbtn} />
        </div>
        <div className={styles.skldiv}>
          <Skeleton height={300} width={300} />
          <Skeleton height={30} width={300} />

          <Skeleton height={50} width={300} className={styles.sklbtn} />
        </div>

      </div>
      </div>

    </>
  );
};

export default Addsignup;
