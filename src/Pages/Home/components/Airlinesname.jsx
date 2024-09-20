import React, { useEffect, useState } from 'react';
import * as FeatherIcons from 'react-feather';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useGetBrandLogoQuery } from '../../../Api/Api';
import SkeletonPage from '../../Partials/SkeletonPage';

const Airlinesname = () => {

  const { isError, data, isLoading, isSuccess, error } = useGetBrandLogoQuery()

  const [brandData, setBrandData] = useState('');
  const [err, setErr] = useState('');
  let skeletonItems = [];
  let index = 0;

  useEffect(() => {
    if (isSuccess) {
      setBrandData(data?.data);
    } else if (isError) {
      setErr(error?.message || 'An error occurred');
    }
  }, [isSuccess, isError, data, error]);

  const imageUrl = 'http://192.168.1.45:7781/uploads/brands-logo/';

  const featherIcon = (iconName, className) => {
    const IconComponent = FeatherIcons[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  while (index < 5) {
    skeletonItems.push(<SkeletonPage key={index} w={40} h={40} />);
    index++;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div className="w-full h-[200px] bg-[#f3f4f7] px-10 pl-12 py-6 overflow-hidden">
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
            <Slider {...settings}>
              {brandData && brandData.length > 0 ? (
                brandData.map((image, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={`${imageUrl}${image?.brandsLogo}`}
                      alt={`Airline logo ${index + 1}`}
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                ))
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
  );
};

export default Airlinesname;
