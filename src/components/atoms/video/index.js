import LazyYoutube from "../LazyYoutube/LazyYoutube";
import videoStyles from "./VideoComponent.module.css";
import Image from "next/image";
import { homepageTranslation } from "@/locales";
import Link from "next/link";
const lang = process.env.NEXT_PUBLIC_LANG || "dk";

const VideoComponent = () => {
  const hpt = homepageTranslation[lang];
  return (
    <div className={videoStyles.containerbgcolor}>
      <div className={videoStyles.container}>
        <div className={videoStyles.card}>
          <div className={videoStyles.content}>
            <h1 className={videoStyles.heading}>{hpt.commonFront}</h1>
            <div className={videoStyles.textContainer}>
              <p className={`W-body-Large ${videoStyles.text}`}>
                {hpt.weCanAllHelp}
              </p>
              <p className={`W-body-Large ${videoStyles.text}`}>
                {hpt.thankYouTommorow}
              </p>
            </div>
            <Link href="#" className={videoStyles.learnmore}>
              Learn more
            </Link>
          </div>
          <div className={videoStyles.videoContainer}>
            <div className={videoStyles.videoPosition}>
            <LazyYoutube videoId="MrvUKufzTXA" />
            </div>
           
     

            <div className={videoStyles.giftsvgmobile}>
            <Image
                src="/Images/mobileviewimg.png"
                alt=""
                width={343}
                height={100}
                //  className={videoStyles.desktopimg}
              />
              <Image
                src="/Images/mobilesvgimg.svg"
                alt=""
               fill
                //  className={videoStyles.desktopimg}
              />
            </div>
          </div>
        </div>
        <div className={videoStyles.commonfrontImg}>
          <Image
            src="/Images/svgcommonfront.png"
            alt=""
            width={1100}
            height={680}
            className={videoStyles.desktopimg}
          />
        </div>
        <div className={videoStyles.giftsvg}>
          <Image
            src="/Images/gifsvg.svg"
            alt=""
            fill
            //  className={videoStyles.desktopimg}
          />
        </div>
        {/* <LazyYoutube videoId="MrvUKufzTXA" /> */}
      </div>
    </div>
  );
};

export default VideoComponent;
