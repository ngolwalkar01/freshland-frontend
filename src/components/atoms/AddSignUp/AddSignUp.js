import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { signUp } from "@/mockdata/signUp";
import { useState,useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Signup.module.css';
import Image from 'next/image';
import { homepageTranslation } from '@/locales';
import Link from "next/link";
import { CustomPrevArrow, CustomNextArrow } from "@/components/atoms/customearrow"
import { useRouter } from 'next/navigation';

const lang = process.env.NEXT_PUBLIC_LANG || 'se';


const AddSignUp = ({ vipPages, enableMockData }) => {
  const hpt = homepageTranslation[lang];
  const images = signUp;
  const sliderRef = useRef(null);
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPrevArrow, setShowPrevArrow] = useState(true);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    adaptiveHeight: true,
    // beforeChange: (current, next) => {
    //   setCurrentSlide(next);
    //   setShowPrevArrow(next > 0); 
    // },
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

  const descriptionText = hpt.whenYouSignUp;

  return (
    <div className={styles.Boxconatiner}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{hpt.benefitsVIP}</h2>
        <p className={styles.description}>{hpt.beFirstToKnow}</p>
        <div className={styles.sliderContainer}>
          <Slider {...settings}>

            {vipPages && vipPages.map((data, index) => (
              <div key={index}>

                <div className={styles.imageContainer}>
                  <Image
                    className={styles.image}
                    src={data.thumbnail ? data.thumbnail : '/mockImage/viporange.png'}
                    alt={`Slide ${index}`}
                    width={343}
                    height={350}
                    priority
                  />

                  <h4 className={styles.text}>{data.title}</h4>

                  <button className={styles.button} onClick={() => router.push(`/viplist/${data.id}`)}>{hpt.signUp}</button>

                </div>
              </div>

            ))}

          </Slider>
        </div>
        <Link href ="/viplist" className={styles.signupButton}>{hpt.seeVIP}</Link>
      </div>
    </div>
  );
};

export default AddSignUp;