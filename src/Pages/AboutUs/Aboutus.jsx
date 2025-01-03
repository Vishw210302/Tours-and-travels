import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetAboutUsContentQuery } from '../../Api/Api';
import "../../assets/custom.css";
import AboutUsPeople from './AboutUsPeople';

const Aboutus = () => {

  const { isError, error, data, isLoading, isSuccess } = useGetAboutUsContentQuery();
  const [allAboutUsContentDetails, setAllAboutUsContentDetails] = useState([])
  const aboutUsImage = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (isSuccess) {
      setAllAboutUsContentDetails(data?.data);
    } else if (isError) {
      console.log("error", isError);
    }
  }, [error, data, isSuccess, isError]);

  return (
    <>
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] flex flex-col justify-center items-center bg-[url('https://as2.ftcdn.net/v2/jpg/02/70/36/79/1000_F_270367957_mZ2HNmTtQeQHQH4MkUDTXBf3fM8xq2mS.jpg')] bg-cover bg-center relative">
      </div>
      <div className='2xl:container 2xl:mx-auto p-5'>
        <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 w-full'>
          {allAboutUsContentDetails && allAboutUsContentDetails.map((items, index) => {
            return (
              <>
                <div key={index + "key"}>
                  <p className='text-xl font-bold leading-relaxed text-red-400 text-justify mb-2'>{items?.aboutUsTitle}</p>
                  <p className='text-sm md:text-sm lg:text-lg leading-relaxed text-black font-medium text-justify'>{items?.aboutUsContent}</p>
                </div>
                <div className='swiper-container'>
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                  >
                    {items?.aboutUsContentImages && items?.aboutUsContentImages.map((items, index) => {
                      return (
                        <SwiperSlide key={index + "key"}>
                          <div className='w-[100%] h-[100%]'>
                            <img
                              src={items ? `${aboutUsImage}${items}` : `${aboutUsImage}${items}`}
                              alt={index}
                              width={800}
                              height={800}
                              className='object-fill'
                            />
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </>
            )
          })}
        </div>
        <div className='mt-5'>
          <AboutUsPeople />
        </div>
      </div>
    </>
  );
};

export default Aboutus;