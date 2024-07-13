import React, { useState, useEffect, useRef } from "react";
import Styles from './farmervideo.module.css';

// Change the component name to PascalCase
const FarmerVideo = ({ videoId, className }) => {
  const [load, setLoad] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const currentRef = videoRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoad(true);
        observer.disconnect();
      }
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={videoRef} className={className}>
      {load ? (
        <iframe
          className={Styles.iframe}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default FarmerVideo;
