import styles from "@/components/atoms/AddSignUp/Signup.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Addsignup = () => {
  return (
    <>
      <div className={styles.signupSkeleton}>
        <Skeleton height={200} width={300} />
        <Skeleton height={200} width={300} />
        <Skeleton height={200} width={300} />
    
     </div>
     
    </>
  );
};

export default Addsignup;
