import styles from "@/components/pages/MyAccount/Account.module.css";
import Header from "@/components/atoms/Header/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Faqs = () => {


  return (
    <>
      <div className={styles.myaccount}>
        <div className={styles.Headeraccount}>
          <Header />
        </div>
        <div className={styles.accountSkeleton}>
        <Skeleton width={800} height={100}/>
        <Skeleton width={800} height={200}/>
        </div>

       
      
      </div>
    </>
  );
};

export default Faqs;
