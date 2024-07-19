import Header from "../Header/Header";
import styles from "./TopImage.module.css";
import Image from "next/image";
import { useRef } from "react"; // Import useRef hook
import ProductList from "@/components/atoms/ProductList/ProductList";
import Seeallbtn from "../seeallbtn/seeallbtn";
import { homepageTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';


const TopImage = ({ farmProductProps }) => {
  const hpt = homepageTranslation[lang];
  const productListRef = useRef(null); // Create a ref for the ProductList component

  const handleCircleClick = () => {
    // Scroll to the ProductList component when the circle is clicked
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={styles.topImageContainer}>
        <Image
          src="/Images/TinaHarvesting.png"
          alt="Harvesting Image"
          media="(min-width: 640px)"
          lazyload="lazy"
          fill
          priority
        />
        <Image
          src="/Images/TinaHarvestingMobile.webp"
          alt="Harvesting Image"
          media="(max-width: 639px)"
          fill
          priority
        />
        <Header />

        <div className={styles.topBarContent}>
          <h1>{hpt.freshlyHarvested}</h1>
          <p>{hpt.directlyFromFarm}</p>
          <div className={styles.circleBackground} onClick={handleCircleClick}>
            <Image
              src="/Images/circle.svg"
              alt="logo"
              width={25}
              height={25}
            ></Image>
          </div>
        </div>
      </div>
      <div ref={productListRef}>
        {" "}
        {/* Add a ref to the ProductList component */}
        {/* Render your ProductList component here */}
        <div>
          <ProductList
            cardHeading={hpt.cardHeading}
            {...farmProductProps}
          />

          <Seeallbtn />
        </div>
      </div>
    </>
  );
};

export default TopImage;
