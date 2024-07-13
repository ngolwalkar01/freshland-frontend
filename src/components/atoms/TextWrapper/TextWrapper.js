import React from "react";
import styles from "./TextWrapper.module.css";

const TextWrapper = ({ text }) => {
  return (
    <div className={styles.textWrapper}>
      <span>{text}</span>
    </div>
  );
};

export default TextWrapper;
