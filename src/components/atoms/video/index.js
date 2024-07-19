import LazyYoutube from "../LazyYoutube/LazyYoutube";
import videoStyles from "./VideoComponent.module.css";
import Image from "next/image";
import { homepageTranslation } from '@/locales';
import Link from "next/link";
const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const VideoComponent = () => {
  const hpt = homepageTranslation[lang];
  return (
    <div className={videoStyles.containerbgcolor}>
      <div className={videoStyles.container}>
      
        <div className={videoStyles.card}>
          <div className={videoStyles.content}>
            <h1 className={videoStyles.heading}>{hpt.commonFront}</h1>
            <div className={videoStyles.textContainer}>
              <p className={`W-body-Large ${videoStyles.text}`}>{hpt.weCanAllHelp}</p>
              <p className={`W-body-Large ${videoStyles.text}`}>{hpt.thankYouTommorow}</p>
            </div>
           <Link href="#" className={videoStyles.learnmore}>Learn more</Link>
          </div>
          <div className={videoStyles.videoContainer}><LazyYoutube videoId="MrvUKufzTXA" /></div>
        </div>
        <div className={videoStyles.commonfrontImg}>
        <Image
            src="/Images/commonfront.png"
            alt=""
           width={1100}
           height={680}
           className={videoStyles.desktopimg}
          />
          <Image
          src="/Images/mobileview.png"
          width={343}
          height={82}
          alt="mobileview"
          className={videoStyles.mobileviewimg}
          />
          </div>
        {/* <LazyYoutube videoId="MrvUKufzTXA" /> */}
      </div>
    </div>
  );
};

export default VideoComponent;
