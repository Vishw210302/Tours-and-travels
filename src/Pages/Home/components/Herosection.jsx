import React, { useState, useEffect } from 'react';
import { useGetSliderQuery } from '../../../Api/Api';
import Loader from '../../Partials/Loader';
import SkeletonPage from '../../Partials/SkeletonPage';

const Herosection = () => {

  const { isError, isLoading, isSuccess, data, error } = useGetSliderQuery();
  const [sliderListing, setSliderListing] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [err, setErr] = useState(null);

  const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/Slider-Image/`;
 
  useEffect(() => {
    if (isSuccess) {
      setSliderListing(data.data);
    } else if (isError) {
      setErr(error?.message || 'An error occurred');
    }
  }, [isSuccess, isError, data, error]);

  useEffect(() => {

    if (sliderListing.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderListing.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [sliderListing.length]);


  return (
    <>
      {isLoading ? (
        <div className="flex w-full h-[600px] justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="relative w-full h-[600px] overflow-hidden">
          {err ? (
            <div className="flex w-full h-full justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {sliderListing && sliderListing.length > 0 ? (
                sliderListing.map((item, index) => (
                  <img
                    key={index}
                    src={`${imageUrl}${item.slider}`}
                    alt={`Slide ${index}`}
                    className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'
                      }`}
                  />
                ))
              ) : (
                <p>No slider images available</p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Herosection;
