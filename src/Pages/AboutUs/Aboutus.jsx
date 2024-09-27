import React from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import travelsImage from "../../assets/people-travels.jpg";
import travelsImage2 from "../../assets/people-travels2.jpg";
import travelsImage3 from "../../assets/people-travels3.jpg";
import AboutUsPeople from './AboutUsPeople';

const Aboutus = () => {

  const images = [
    { image: travelsImage, alt: "Travel 1" },
    { image: travelsImage2, alt: "Travel 2" },
    { image: travelsImage3, alt: "Travel 3" }
  ];

  return (
    <>
      <div className="w-full h-[500px] flex flex-col justify-center items-center bg-[url('https://as2.ftcdn.net/v2/jpg/02/70/36/79/1000_F_270367957_mZ2HNmTtQeQHQH4MkUDTXBf3fM8xq2mS.jpg')] bg-cover bg-center relative"></div>
      <div className='2xl:container 2xl:mx-auto p-5'>
        <div className='grid grid-cols-2 gap-4 w-full'>
          <div>
            <p className='text-xl text-red-400 font-medium'>Our History</p>
            <p className='text-[30px] text-red-400 font-bold'>A Few Words About Us</p>
            <p>
              SkyBooking is the world’s first inspirational travel search service that focuses on what’s really important: your Interests and your Budget!
            </p>
            <p>
              How practical is an amazing weekend break for skiing if what you really look forward is relaxing on a sandy beach? How good a great destination can be, if it’s too expensive to get there? SkyBooking offers an innovative and useful online experience, so you can find your perfect destination in just a couple of clicks!
            </p>
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
              {images && images.map((items, index) => {
                return (
                  <SwiperSlide key={index + "key"}>
                    <div className='w-[100%] h-[100%]'>
                      <img src={items?.image} alt={index} width={800} height={800} className='object-fill' />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
        <div className='mt-5'>
          <AboutUsPeople />
        </div>
      </div>
    </>
  );
};

export default Aboutus;