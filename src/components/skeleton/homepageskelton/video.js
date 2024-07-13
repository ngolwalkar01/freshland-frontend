import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/components/atoms/video/VideoComponent.module.css";

const Video = () => {
 
  return (
    <>
    <div className={styles.containerbgcolor}>
      <div className={styles.videoSkeleton}>
      <Skeleton height={500} width={800} />

      </div>
      </div>

    </>
  );
};

export default Video;
