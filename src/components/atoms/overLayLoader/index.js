import React from 'react';
import styles from './loader.module.css';

const OverLayLoader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <img src={`/Images/overlayLoader.svg`} alt="Loading..." className={styles.loaderImage} />
    </div>
  );
};

export default OverLayLoader;
