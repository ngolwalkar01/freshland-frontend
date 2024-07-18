import styles from "@/components/pages/faq-page/faq.module.css";
import Header from "@/components/atoms/Header/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Faqs = () => {


  return (
    <>
      <section className={styles.faqssection}>
        <Header />
        <div className={styles.faqscontainer}>
          <div className={styles.faqsdelivery}>
            <div className={styles.contactSkeleton}>
            <Skeleton height={20} width={300} />
            <Skeleton height={20} width={300} />
            <Skeleton height={20} width={300} />
            <Skeleton height={20} width={300} />
            </div>
            <div className={styles.delivery}>
             
              <div className={`${styles.contactSkeleton} ${styles.faqs}`}>
              <Skeleton height={60} width={400} />
              <Skeleton height={100} width={800} />
              <Skeleton height={100} width={800} />
              <Skeleton height={100} width={800} />
              <Skeleton height={100} width={800} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;
