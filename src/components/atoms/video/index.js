import LazyYoutube from "../LazyYoutube/LazyYoutube";
import videoStyles from "./VideoComponent.module.css";
import Image from "next/image";
import { homepageTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const VideoComponent = () => {
  const hpt = homepageTranslation[lang];
  return (
    <div className={videoStyles.containerbgcolor}>
      <div className={videoStyles.container}>
      
        <div className={videoStyles.card}>
        <div className={videoStyles.ellipse}>
        <Image
                  src="/Images/videoellipse.svg"
                  alt="logo"
                  width={153}
                  height={165}
                ></Image>
        </div>
          <div className={videoStyles.content}>
            <h1 className={videoStyles.heading}>{hpt.commonFront}</h1>
            <div className={videoStyles.textContainer}>
              <p className={videoStyles.text}>{hpt.weCanAllHelp}</p>
              <p className={videoStyles.text}>{hpt.thankYouTommorow}</p>
            </div>
            <LazyYoutube videoId="MrvUKufzTXA" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
