import styles from "./Testimonial.module.css";
import { testimonialdata } from "@/mockdata/testimonialData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useRef } from "react";
import Image from "next/image";

const Testimonials = () => {
  const data = testimonialdata;
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          variableWidth: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Show 2 slides on mobile screens
          slidesToScroll: 1,
          initialSlide: 0, // Ensure the first slide is fully visible
          variableWidth: true,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <>
      <div className={styles.testimonialcontainer}>
        <h2 className={styles.heading}>Testimonials</h2>
        <div className={styles.container}>
          <Slider ref={sliderRef} {...settings} className={styles.slickslider}>
            {data.map((item, index) => (
              <div key={index} className={styles.reviewContainer}>
                {/* <div className={styles.ellipse}>
                  <Image
                    src="/Images/ellipse.svg"
                    alt="logo"
                    width={386}
                    height={287}
                  ></Image>
                </div> */}
                
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
                <p className={styles.name}>{item.name}</p>
                    </div>
                    <Image
                      src={`/${item.bgImage}`}
                      alt={item.name}
                      width={400}
                      height={400}
                    />
                  </div>
                {/* <hr className={styles.redHr} /> */}

                  
                  <div className={styles.reviewtext}>
                    {/* <h4 className={styles.reviewHeading}>
                      &#x275D;{item.heading}&#x275E;
                    </h4> */}
                    <p className={styles.description}>{item.description}</p>                    
                  </div>
                
              </div>
            ))}
          </Slider>
          <div className={styles.arrowContainer}>
            <div className={styles.arrowStyle} onClick={handlePrev}>
              <Image
                src="Images/chevron-left.svg"
                alt="Back"
                className={styles.arrowIcon}
                width={21}
                height={21}
              />
            </div>
            <div className={styles.arrowStyle} onClick={handleNext}>
              <Image
                src="/Images/chevron-down.svg"
                alt="Forward"
                className={styles.arrowIcon}
                width={21}
                height={21}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
