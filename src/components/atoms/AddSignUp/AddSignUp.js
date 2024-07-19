import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { signUp } from "@/mockdata/signUp";
import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Signup.module.css';
import Image from 'next/image';
import { homepageTranslation } from '@/locales';
import Link from "next/link";

const lang = process.env.NEXT_PUBLIC_LANG || 'dk';


const AddSignUp = ({ vipPages, enableMockData }) => {
  const hpt = homepageTranslation[lang];
  const images = signUp;
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    arrows: true,
    responsive: [
     
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Show 2 slides on mobile screens
          slidesToScroll: 1,
          initialSlide: 0, // Ensure the first slide is fully visible
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  };

  const descriptionText = hpt.whenYouSignUp;

  return (
    <div className={styles.Boxconatiner}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{hpt.benefitsVIP}</h2>
        <p className={styles.description}>{descriptionText}</p>
        <Slider {...settings}>
          {vipPages && vipPages.map((data, index) => (
            <div key={index}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={data.thumbnail && false ? data.thumbnail : '/mockImage/viporange.png'}
                  alt={`Slide ${index}`}
                  width={340}
                  height={197}
                  priority 
                />
                <div className={styles.overlay}>
                  <h4 className={styles.text}>{data.title}</h4>
                  <button className={styles.button}>{hpt.signUp}</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <Link href ="/shop" className={styles.signupButton}>{hpt.seeVIP}</Link>
      </div>
    </div>
  );
};

export default AddSignUp;