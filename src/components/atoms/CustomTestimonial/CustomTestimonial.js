import { useEffect, useState } from "react";
import styles from "./CustomTestimonial.module.css"; // Import CSS module for styles
import { testimonialdata } from "@/mockdata/testimonialData";
import Image from "next/image";
import { homepageTranslation } from '@/locales';

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';

const Slider = () => {
  const hpt = homepageTranslation[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState("0px");
  // const numSlides = data.length; // Total number of slides
  // const slideWidth = 325; // Including margin
  // const updateSlider = (index) => {
  //   setCurrentIndex(index);
  // };

  const prevSlide = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  };

  const nextSlide = () => {
    setCurrentIndex((i) => (i == testimonialdata.length - 1 ? i : i + 1));
  };

  useEffect(() => {
    generatePixelValue(currentIndex);
  }, [currentIndex]);

  const generatePixelValue = (ci) => {
    let pv;
    const totalLength = testimonialdata.length;
 
    if (ci < 2) {
      pv = "0px";
    } else if (ci === 2) {
      pv = `${326 * (ci - 1)}px`;
    } else {
      pv = `${364 * (ci - 2) + 326}px`;
    }
    if (ci === totalLength - 1 && totalLength > 2) {
      pv = `${364 * (ci - 2) - 38}px`;
    }
    setSliderWidth(pv);
  };

  return (
    <>
     
      <div className={styles.testimonialcontainer}>
        <h2 className={styles.heading}>{hpt.testimonials}</h2>
        <div className={styles.container}>
          <div className={styles.sliderContainer}>
            <div
              className={styles.slider}
              style={{
                transform: `translateX(-${sliderWidth})`,
              }}
            >
              {testimonialdata.map((item, index) => (
                <div
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                  key={index}
                  className={`${styles.reviewContainer} ${
                    styles.overlayTransparent
                  } ${currentIndex === index ? styles.activeSlide : ""}`}
                >
                  <div className={styles.bg_image}>
                    <div className={styles.imgName}>
                      <div className={styles.circular_image}>
                        <Image
                          src={`/${item.image}`}
                          alt={item.name}
                          width={56}
                          height={56}
                        />
                      </div>
                      <div className={styles.overlay}></div>
                      <p className={styles.name}>{item.name}</p>
                    </div>
                    <Image
                      src={`/${item.bgImage}`}
                      alt={item.name}
                      width={400}
                      height={400}
                    />
                    {currentIndex !== index && (
                      <div className={styles.overlayContainer}></div>
                    )}
                  </div>
                  <div
                    className={`${styles.reviewtext} ${
                      currentIndex === index ? styles.activeReviewText : ""
                    }`}
                  >
                    <p className={styles.description}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.prev} onClick={prevSlide}>
            <Image
              src="Images/chevron-left.svg"
              alt="Back"
              className={styles.arrowIcon}
              width={21}
              height={21}
            />
          </button>
          <button className={styles.next} onClick={nextSlide}>
            <Image
              src="/Images/chevron-down.svg"
              alt="Forward"
              className={styles.arrowIcon}
              width={21}
              height={21}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Slider;
