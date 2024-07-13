import React, { useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

const Loader = ({ progress }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (progress >= 100) {
      loaderRef.current.complete();
      
    } else {
      loaderRef.current.continuousStart();
    }
  }, [progress]);

  useEffect(() => {
    if (progress < 100) {
      loaderRef.current.staticStart();
    }
  }, [progress]);

  return (
    <div>
      <LoadingBar
        color='#219029'
        ref={loaderRef}
         waitingTime={3000}
       
         loaderSpeed={3000}
         duration={2500}
      />
    </div>
  );
};

export default Loader;
