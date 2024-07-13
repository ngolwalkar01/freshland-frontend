import styles from "@/components/pages/product/detail/detail.module.css";
import Header from "@/components/atoms/Header/Header";
import LazyLoad from "react-lazyload"; 
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Description = () => {
  

  return (
    <>
      <div className={styles.containerBody}>
        <Header />
        <div className={styles.container}>
      
          <section className={styles.productSection}>
        
            <div className={styles.leftSide}>
            <Skeleton height={400} width={400} />
            </div>
            <div className={styles.rightSide}>
           
              <div className={styles.featuresWrapper}>
              <Skeleton height={500} width={500} />
              </div>
              <div className={styles.descriptionWrapper}>
          

              </div>
          
            </div>
          </section>
        </div>
        <LazyLoad height={200} offset={100}>
          <div className={styles.wrapper}>
            <section className={styles.productDescription}>
              
              <div className={styles.mainDescription}>
                <div className={styles.storageWrapper}>
                <Skeleton height={200} width={990} />
              

                </div>

                <div className={styles.storageWrapper}>
                <Skeleton height={200} width={990} />
                </div>

                <div className={styles.storageWrapper}>
                <Skeleton height={200} width={990} />
                </div>
                <div className={styles.nutriWrapper}>
                <Skeleton height={200} width={990} />
                </div>
              </div>
            </section>
          </div>
        </LazyLoad>
      </div>
    </>
  );
};

export default Description;
