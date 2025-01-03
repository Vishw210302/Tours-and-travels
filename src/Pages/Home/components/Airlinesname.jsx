import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useGetBrandLogoQuery } from '../../../Api/Api';
import SkeletonPage from '../../Partials/SkeletonPage';

const Airlinesname = () => {
  const { isError, data, isLoading, isSuccess, error } = useGetBrandLogoQuery();
  const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/brands-logo/`;
  const [brandData, setBrandData] = useState('');
  const [err, setErr] = useState('');
  let skeletonItems = [];
  let index = 0;

  useEffect(() => {
    if (isSuccess) {
      setErr('');
      setBrandData(data?.data);
    } else if (isError) {
      setErr(error?.message || 'An error occurred');
    }
  }, [isSuccess, isError, data, error]);

  while (index < 5) {
    skeletonItems.push(
      <SkeletonPage key={index} w={40} h={40} />
    );
    index++;
  }

  const mainSliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const secondarySliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="w-full h-[200px] bg-[url('/src/assets/bg-image.png')] bg-cover bg-center px-10 pl-12 py-6 overflow-hidden">
        {isLoading ? (
          <div className='flex flex-row gap-16 justify-between'>
            {skeletonItems}
          </div>
        ) : (
          <>
            {err ? (
              <div className='flex flex-row gap-16 justify-between'>
                {skeletonItems}
              </div>
            ) : (
              <Slider {...mainSliderSettings}>
                {brandData && brandData?.length > 0 ? (
                  brandData.map((image, index) => {
                    return (
                      <div key={index} className="flex justify-center">
                        <img
                          src={`${imageUrl}${image?.brandsLogo}`}
                          alt={`Airline logo ${index + 1}`}
                          className="w-40 h-40 object-contain"
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <p className="text-gray-500">No brands available.</p>
                  </div>
                )}
              </Slider>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Airlinesname;
