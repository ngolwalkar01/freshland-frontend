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
              <Skeleton height={50} width={500} />
              <Skeleton height={50} width={500} />
              <Skeleton height={50} width={500} />
              </div>
              <div className={styles.descriptionWrapper}>
              <Skeleton height={50} width={300} />
              <Skeleton height={20} width={300} />
              <Skeleton height={20} width={300} />
              </div>
              <div className={styles.detailBtn}>
              <Skeleton height={50} width={100} />
              <Skeleton height={50} width={200} className={styles.addbtn}/>
              </div>
          
            </div>
          </section>
        </div>



        <LazyLoad height={200} offset={100}>
          <div className={styles.wrapper}>
            <section className={styles.productDescription}>
              
              <div className={styles.mainDescription}>
              <div className={styles.SkeletonWrapper}>
              <Skeleton height={30} width={300} />
                <Skeleton height={70} width={990} />
                </div>
                <div className={styles.SkeletonWrapper}>
              <Skeleton height={30} width={300} />
                <Skeleton height={70} width={990} />
                </div>
                <div className={styles.SkeletonWrapper}>
              <Skeleton height={30} width={300} />
                <Skeleton height={70} width={990} />
                </div>

                <div className={styles.SkeletonWrapper}>
              <Skeleton height={30} width={300} />
                <Skeleton height={70} width={990} />
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
