import React, { useState } from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { homepageTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const Footer = () => {
  const hpt = homepageTranslation[lang];

  const [showcountry, setShowCountry] = useState(false);

  const handleChangeCountry = () => {
    setShowCountry(!showcountry);
  }
  const handleClosepopup = () => {
    setShowCountry(false);
  }
  return (
    <>
      <footer className={styles.footerwrap}>
        <div className={styles.footercontainer}>
          <div className={styles.footerlogo}>
            <div className={styles.footerlogoImg}>
              <Image
                src="/Images/footerlogo.png"
                alt="freh4"
               
                quality={100}
                sizes="none"
                width={158}
                height={48}
                loading="eager"
              ></Image>
            </div>
  
              <div className={styles.thelegalconutry}>
                  <button onClick={handleChangeCountry}>
                    <div className={styles.thelegalconutryImg}>
                    <Image
                      src="/Images/changecountry.svg"
                      alt="logo"
                      fill
                      // width={24}
                      // height={24}
                    ></Image>
                    </div>

                    {hpt.changeCountry}
                  </button>
                </div>

            <div className={styles.footercountries}>
              {showcountry && (
                <div className={`${styles.countrypopup}`}>
                  <i className="fa-solid fa-xmark" onClick={handleClosepopup}></i>
                  <ul>
                    {/* <li><Link href="#">Germany 🇩🇪 | {hpt.clickGermanPage}</Link></li> */}
                    <li><Link href="#">🇩🇰 Danmark</Link></li>
                    <li><Link href="#">🇫🇮 Suomi</Link></li>

                  </ul>
                </div>
              )}
              <button className={styles.changecountry} onClick={handleChangeCountry}>
                <Image
                  src="/Images/changecountry.svg"
                  alt="logo"
                  width={24}
                  height={24}
                ></Image>
               {hpt.changeCountry}
              </button>
            </div>
          </div>
          <hr className={styles.hrgradient}></hr>
          <div className={styles.footertext}>
            <div className={styles.footertextcontainer}>
              <div>
                <p>{hpt.FreshCountry}</p>
                <ul>
                  <li><Link href="/about">{hpt.aboutUs}</Link></li>
                  <li><Link href="/farmer">{hpt.farmers}</Link></li>
                  <li><Link href="/vip">{hpt.vip}</Link></li>
                </ul>
              </div>
              <div>
                <p>{hpt.customerService}</p>
                <ul>
                  <li><Link href="/se/faq">{hpt.faq}</Link></li>
                  <li><Link href="/reklamation">{hpt.complaint}</Link></li>
                  {/* <li><Link href="/media">{hpt.media}</Link></li> */}
                </ul>
              </div>
              <div>
                <p>{hpt.theLegal}</p>
                <ul>
                  <li><Link href="/se/kundvillkor">{hpt.terms}</Link></li>
                  <li><Link href="/se/sekretesspolicy">{hpt.personalData}</Link></li>
                  <li><Link href="/se/faq/#angerratt-och-reklamation">{hpt.rightWithdraw}</Link></li>
                </ul>

                
              </div>
              <div>
                <p>{hpt.weSupport}</p>
                <ul className={styles.carddataimg}>

                  <li>
                    <Image
                      src="/Images/Dkfooter.png"
                      alt="Dkfooter"
                      width={50}
                      height={31}
                    />
                  </li>
                  <li>
                    <Image
                      src="/Images/klarna.svg"
                      alt="Dkfooter"
                      width={50}
                      height={31}
                    />
                  </li>
                  <li>
                    <Image
                      src="/Images/visa.png"
                      alt="Dkfooter"
                      width={50}
                      height={31}
                    />
                  </li>
                  <li>
                    <Image
                      src="/Images/mastercard.png"
                      alt="Dkfooter"
                      width={50}
                      height={31}
                    />
                  </li>

                </ul>
              </div>
             
            </div>
            <div>
                <p>{hpt.socialMedia}</p>
                <ul className={styles.carddataimg}>

                  <li>
                    <Link href="https://www.facebook.com/p/FreshLandSverige-100063595824643/">
                      <Image
                        src="/Images/facebook.png"
                        alt="facebook"
                        width={48}
                        height={48}
                      /></Link>

                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/company/fresh-land/mycompany/verification/">
                      <Image
                        src="/Images/linkedinicon.png"
                        alt="linkedin"
                        width={48}
                        height={48}
                      /></Link>

                  </li>
                  <li>
                    <Link href='https://www.instagram.com/fresh.land.sverige/'>
                      <Image
                        src="/Images/insta.png"
                        alt="insta"
                        width={48}
                        height={48}
                      /></Link>

                  </li>
                  <li>
                    <Link href="https://www.youtube.com/channel/UCm5FT3cH5lthEYiWBZ_IgOQ">
                      <Image
                        src="/Images/youtubeicon.png"
                        alt="youtube"
                        width={48}
                        height={48}
                      /></Link>

                  </li>
                  <li>
                    <Link href="https://pin.it/1dSwCYsyd">
                      <Image
                        src="/Images/pinteresticon.png"
                        alt=" pinterest"
                        width={48}
                        height={48}
                      /></Link>

                  </li>
                 

                </ul>
              </div>
          </div>
          <div>
            <div className={styles.footercopyright}>
              <div>
                <Link href="https://www.findsmiley.dk/1448652">
                  <Image
                    src="/Images/footerimg.png"
                    alt="footerimg"
                    width={150}
                    height={50}
                    loading="lazy"
                  /></Link>

              </div>
              <div>
                <p>Fresh.Land © 2024</p>
                <p>CVR 43007106</p>
                <p>
                  <Link href="mailto:hej@fresh.land">{hpt.infoEmail}</Link> | <span><Link href="tel:+46 108 109 689">+46 108 109 689</Link></span></p>
                <p>{hpt.addressContent}  {hpt.addresName}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
