import styles from "@/components/atoms/Register/RegisterUser.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Register = () => {
  return (
    <>
    <div className={styles.registerBox}>
      <div className={styles.registerSkeleton}>
        <Skeleton height={600} width={400} />
        <Skeleton height={300} width={400} />
     </div>
     </div>
     
    </>
  );
};

export default Register;
