import React from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from "../../../assets/bg-img2.jpg";

const DomesticFamousPackages = () => {

    const staticImages = [
        image1,
        image1,
        image1,
    ];

    return (
        <>
            <div className='2xl:container 2xl:mx-auto p-5'>
                <div className='grid grid-cols-2 gap-8 w-full'>
                    <div className='swiper-container relative'>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            loop={true}
                            modules={[Autoplay, Navigation]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                        >
                            {staticImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className='w-[100%] h-[100%]'>
                                        <img src={image} alt={`Slide ${index + 1}`} width={800} height={800} className='object-fill' />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className='border border-zinc-700 bg-white'>
                            <div className='swiper-button-prev absolute top-[90%] left-5 transform -translate-y-1/2 text-white p-2 rounded-full'></div>
                        </div>
                        <div className='border border-zinc-700 bg-white'>
                            <div className='swiper-button-next absolute top-[90%] left-[10%] transform -translate-y-1/2 text-white p-2 rounded-full'></div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-10 my-2 h-fit'>
                            Vishw Prajapati
                        </div>
                        <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-10 my-2 h-fit'>
                            Vishw Prajapati
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DomesticFamousPackages;