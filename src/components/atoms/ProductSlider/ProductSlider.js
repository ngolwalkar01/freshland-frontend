import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { seasonproductslider } from "@/mockdata/seasonproductslider";
import styles from "./ProductSlider.module.css";
import Image from 'next/image'

const ProductSlider = () => {
  const sliderRef = useRef(null);
  const prevArrowRef = useRef(null); // Ref for previous arrow
  const nextArrowRef = useRef(null); // Ref for next arrow
  const images = seasonproductslider;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    arrow: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Show 2 slides on mobile screens
          slidesToScroll: 1,
          initialSlide: 0, // Ensure the first slide is fully visible
          variableWidth: true
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className={styles.boxContainer}>
      <div className={styles.slidercontainer}>
        <Slider {...settings} ref={sliderRef} className={styles.slickslider}>
          {images[0].imagesData.map((data, index) => (
            <div key={index} className={styles.slide}>
              <Image
                className={styles.image}
                src={`/${data.image}`}
                alt={`Slide ${index}`}
                width={430}
                height={430}
                
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.arrowContainer}>
        <div className={styles.arrowStyle} onClick={handlePrev} ref={prevArrowRef}>
          <Image
            src="Images/chevron-left.svg"
            alt="Back"
            className={styles.arrowIcon}
            width={21}
            height={21}
          />
        </div>
        <div className={styles.arrowStyle} onClick={handleNext} ref={nextArrowRef}>
          <Image
            src="Images/chevron-down.svg"
            alt="Forward"
            className={styles.arrowIcon}
            width={21}
            height={21}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
