import React from 'react';
import styles from './loader.module.css';
import Image from 'next/image';

const OverLayLoader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <Image width={100}
        height={100}
        src={`/Images/overlayLoader.svg`}
        alt="Loading..."
        className={styles.loaderImage} />
    </div>
  );
};

export default OverLayLoader;
