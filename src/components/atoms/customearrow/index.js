import React from "react";
import styles from './CustomArrows.module.css';
import Image from "next/image";
const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <>
    <div
       className={`${className} ${styles.arrowContainer}`}
      style={{ ...style, display: "block", zIndex: 1 }}
      onClick={onClick}

    
    />
          </>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <>
    <div
      className={`${className} ${styles.arrowContainer}`}
      style={{ ...style, display: "block", zIndex: 1 }}
      onClick={onClick}
    />
    </>
  );
};

export { CustomPrevArrow, CustomNextArrow };
