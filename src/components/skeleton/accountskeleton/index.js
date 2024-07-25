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
        <div className={styles.accountPage}>
      <header className={styles.accountHeader}>
        <Skeleton height={50} width={200} />
      </header>
      <nav className={styles.accountNav}>
        <Skeleton height={30} width={100} className={styles.navItem} />
        <Skeleton height={30} width={100} className={styles.navItem} />
        <Skeleton height={30} width={150} className={styles.navItem} />
        <Skeleton height={30} width={100} className={styles.navItem} />
      </nav>
      <section className={styles.accountOrders}>
        <div className={styles.orderHeader}>
          <Skeleton height={40} />
        </div>
        <div className={styles.orderList}>
          {Array(5).fill().map((_, index) => (
            <div key={index} className={styles.orderItem}>
              <Skeleton height={30} width={100} />
              <Skeleton height={30} width={100} />
              <Skeleton height={30} width={100} />
              <Skeleton height={30} width={100} />
              <Skeleton height={30} width={100} />
              <Skeleton height={30} width={100} />
            </div>
          ))}
        </div>
      </section>
    </div>

    {/* mobile menu*/}

    <div className={styles.accountMenu}>
      <nav className={styles.navMenu}>
        <div className={styles.navItem}>
          <Skeleton className={styles.skeletonNavItem} height={30}/>
          
        </div>
        <div className={styles.navItem}>
          <Skeleton className={styles.skeletonNavItem} height={30}/>
        </div>
        <div className={styles.navItem}>
          <Skeleton className={styles.skeletonNavItem} height={30}/>
        </div>
        <div className={styles.navItem}>
          <Skeleton className={styles.skeletonNavItem} height={30}/>
        </div>
        <div className={styles.navItem}>
          <Skeleton className={styles.skeletonNavItem} height={30}/>
        </div>

        
      </nav>
    </div>


      </div>
    </>
  );
};

export default Faqs;
