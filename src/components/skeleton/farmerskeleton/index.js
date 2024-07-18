import { useState } from "react";
import styles from "@/components/pages/farmer-page/farmer.module.css";
import Header from "@/components/atoms/Header/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Farmers = () => {
 return (
    <>
 
     <div className={styles.farmercontainer}>
     <Header/>
     <main className={styles.farmercontent}>
     <div className={styles.videocontainer} >
        <div className={`${styles.videoSkeleton} ${styles.videocontent}`} >
        <Skeleton height={200} width={400} />
        <Skeleton height={30} width={300} />
        <Skeleton height={70} width={400} />
        </div>
        <div className={`${styles.videoSkeleton} ${styles.videocontent}`} >
        <Skeleton height={200} width={400} />
        <Skeleton height={30} width={300} />
        <Skeleton height={70} width={400} />
        </div>
        <div className={`${styles.videoSkeleton} ${styles.videocontent}`} >
        <Skeleton height={200} width={400} />
        <Skeleton height={30} width={300} />
        <Skeleton height={70} width={400} />
        </div>
        <div className={`${styles.videoSkeleton} ${styles.videocontent}`} >
        <Skeleton height={200} width={400} />
        <Skeleton height={30} width={300} />
        <Skeleton height={70} width={400} />
        </div>
        
        </div>
     </main>
     </div>
    </>
  );
};

export default Farmers;
