import Header from "@/components/atoms/Header/Header";
import styles from "@/components/atoms/TopImage/TopImage.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopImage = () => {
  return (
    <>

      <div className={styles.skeletonImage}>
      <div className={styles.sklheading}>
        <Skeleton height={60} width={500} />
        <Skeleton height={60} width={500} />
       
        </div>
      
      </div>
     
    </>
  );
};

export default TopImage;
