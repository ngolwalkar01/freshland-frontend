import React from "react";
import styles from './CustomArrows.module.css';
const CustomPrevArrow = (props) => {
  const { className, style, onClick,visible } = props;
  return (
    <>
    <div
       className={`${className} ${styles.arrowprevContainer}`}
       style={{ ...style, display: visible ? "block" : "none", zIndex: 1 }}
      onClick={onClick}

    
    />
          </>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick, setShowPrevArrow } = props;
  return (
    <div
      className={`${className} ${styles.arrowContainer}`}
      style={{ ...style, display: "block", zIndex: 1 }}
      onClick={() => {
        console.log('Next arrow clicked');
        setShowPrevArrow(true);
        onClick();
      }}
      
    />
  );
};

export { CustomPrevArrow, CustomNextArrow };
