import { useState } from "react";
import styles from "./farmer.module.css";
import Header from "@/components/atoms/Header/Header";
 import { videodata } from "@/mockdata/videodata";
import Farmervideo from "@/components/atoms/farmervideo/farmervideo";
import Head from "next/head";
import { farmerTranslation} from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';

const Farmers = () => {
  const far = farmerTranslation[lang];

 const data = videodata;
  return (
    <>
    <Head>
        <title>{far.farmer}</title>
        <meta name="description" content="Shorten and digitize the food supply chain" />
      </Head>
     <div className={styles.farmercontainer}>
     <Header/>
     <main className={styles.farmercontent}>
        <div className={styles.farmers}>
            <h2>{far.farmer}</h2>
            <p className={`W-body-Large ${styles.shorten}`}>{far.weShorten}</p>
        </div>
        <div className={styles.videocontainer} >
        
         {data.map((video, index) => (
            <div key={index} className={styles.videocontent}>
                <div className={styles.innercontainer}>
                <div className={styles.yotubevideo}>
                     <Farmervideo  videoId={video.videoId} className={styles.iframeconatiner} />
                </div>
                
                <h2>{video.name}</h2>
                <p className={styles.text}>{video.text}</p>
               
                </div>
                
            </div>
         ))}
         
        </div>
     </main>
     </div>
    </>
  );
};

export default Farmers;
