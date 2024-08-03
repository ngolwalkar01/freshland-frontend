import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { seasonproductslider } from "@/mockdata/seasonproductslider";
import styles from "./ProductSlider.module.css";
import Image from 'next/image'
import { CustomPrevArrow, CustomNextArrow } from "@/components/atoms/customearrow"

const ProductSlider = () => {
  const sliderRef = useRef(null);
  const images = seasonproductslider;
   const [showPrevArrow, setShowPrevArrow] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    prevArrow: <CustomPrevArrow visible={showPrevArrow}/>,
    nextArrow: <CustomNextArrow setShowPrevArrow={setShowPrevArrow}/>,
    
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
          slidesToShow: 1, // Show 2 slides on mobile screens
          slidesToScroll: 1,
          initialSlide: 1,
        },
        
      },

       {
        breakpoint: 400,
        settings: {
          slidesToShow: 1, // Show 2 slides on mobile screens
          slidesToScroll: 1,
          
        },
        
      },
    ],
  };



  return (
    <div className={styles.boxContainer}>
      <h1>What our customers say</h1>
      <div className={styles.slidercontainer}>
        <Slider {...settings} ref={sliderRef} className={styles.slickslider}>
          {images[0].imagesData.map((data, index) => (
            <div key={index}>
              <div className={styles.slide}>
                <div className={styles.customername}>
                  <Image
                   src={`/${data.profile}`}
                  width={40}
                  height={40}
                  alt="testimonial"
                  />
                  <p>{data.name}</p>
                </div>
              <Image
                className={styles.image}
                src={`/${data.image}`}
                alt={`Slide ${index}`}
                width={345}
                height={345}
                
              />
              <div className={styles.groupicon}>
              <i class="fa-regular fa-heart"></i>
               <Image
               src="/Images/message.svg"
               width={21}
               height={21}
                  alt="testimonial"
               />
                 <Image
               src="/Images/send.svg"
               width={21}
               height={21}
                  alt="testimonial"
               />
              </div>
              <p className={styles.testimonialspeech}>{data.testimonials}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
