import React, { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from "../../../assets/bg-img2.jpg";
import image2 from "../../../assets/image.jpg";
import image3 from "../../../assets/people-travels.jpg";

const Destinations = () => {

    const swiperRef = useRef(null);
    const staticImages = [image1, image2, image3];

    return (
        <>
            <div>
                <div className='flex flex-row justify-center items-center p-10 w-full font-bold text-[30px] text-red-500'>Top International Packages</div>
                <div className='2xl:container 2xl:mx-auto p-5'>
                    <div className='grid grid-cols-2 gap-8 w-full'>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 h-fit'>
                                <div className='w-[100%] h-[100%]'>
                                    <img src={image1} alt='image' width={800} height={800} className='object-fill' />
                                </div>
                                <div className='p-3'>
                                    <p className='text-black text-xl font-bold'>9 Ways to Become a Successful Travel Blogger</p>
                                    <p className='text-gray-400 text-base text-justify'>9 Ways to Become a Successful Travel Blogger 9 Ways to Become a Successful Travel Blogger</p>
                                </div>
                                <div className='flex flex-row justify-between items-center p-2'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <p className='text-xl font-bold text-gray-500'>Price:-</p>
                                        <p className='text-red-400 font-semibold text-xl'>19000/-</p>
                                    </div>
                                    <p className='w-auto bg-red-400 hover:bg-red-500 text-white font-semibold text-sm p-2 rounded-lg cursor-pointer'>View More</p>
                                </div>
                            </div>
                            <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 h-fit'>
                                <div className='w-[100%] h-[100%]'>
                                    <img src={image1} alt='image' width={800} height={800} className='object-fill' />
                                </div>
                                <div className='p-3'>
                                    <p className='text-black text-xl font-bold'>9 Ways to Become a Successful Travel Blogger</p>
                                    <p className='text-gray-400 text-base text-justify'>9 Ways to Become a Successful Travel Blogger 9 Ways to Become a Successful Travel Blogger</p>
                                </div>
                                <div className='flex flex-row justify-between items-center p-2'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <p className='text-xl font-bold text-gray-500'>Price:-</p>
                                        <p className='text-red-400 font-semibold text-xl'>19000/-</p>
                                    </div>
                                    <p className='w-auto bg-red-400 hover:bg-red-500 text-white font-semibold text-sm p-2 rounded-lg cursor-pointer'>View More</p>
                                </div>
                            </div>
                        </div>

                        <div className='relative w-full h-[400px]'>
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                loop={true}
                                modules={[Autoplay]}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                            >
                                {staticImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='relative w-full h-[430px]'>
                                            <img
                                                src={image}
                                                alt={`Slide ${index + 1}`}
                                                className='object-cover w-full h-full'
                                            />
                                            <div className='absolute top-0 left-0 w-[40%] h-full bg-black bg-opacity-70'>
                                                <div className='p-2'>
                                                    <p className='text-white font-bold text-xl'>9 Ways to Become a Successful Travel Blogger</p>
                                                    <p className='text-white font-medium text-sm mt-2'>
                                                        9 Ways to Become a Successful Travel Blogger 9 Ways to Become a Successful Travel Blogger
                                                    </p>
                                                    <div className='flex flex-row gap-2 mt-2'>
                                                        <p className='text-white font-bold'>Price :-</p>
                                                        <p className='text-white'>19000 /-</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className='flex flex-row gap-3 absolute top-[97%] left-[3%]'>
                                <div
                                    className='transform -translate-y-1/2 border-2 text-xl text-white cursor-pointer z-10'
                                    style={{ lineHeight: 0 }}
                                    onClick={() => swiperRef.current.slidePrev()}
                                >
                                    <p className='text-3xl p-1'>
                                        ←
                                    </p>
                                </div>
                                <div
                                    className='transform -translate-y-1/2 border-2 text-xl text-white cursor-pointer z-10'
                                    style={{ lineHeight: 0 }}
                                    onClick={() => swiperRef.current.slideNext()}
                                >
                                    <p className='text-3xl p-1'>
                                        →
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Destinations;
