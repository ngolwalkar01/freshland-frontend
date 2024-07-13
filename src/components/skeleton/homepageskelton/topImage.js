import Header from "@/components/atoms/Header/Header";
import styles from "@/components/atoms/TopImage/TopImage.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopImage = () => {
  return (
    <>
      <div className={styles.topImageContainer}>
        <Skeleton height={500} width={900} />
        <Header />

      
      </div>
     
    </>
  );
};

export default TopImage;
