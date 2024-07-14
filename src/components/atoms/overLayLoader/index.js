import React from 'react';
import styles from './loader.module.css';
import Image from 'next/image';

const OverLayLoader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <Image src={`/Images/overlayLoader.svg`} alt="Loading..." className={styles.loaderImage} />
    </div>
  );
};

export default OverLayLoader;
