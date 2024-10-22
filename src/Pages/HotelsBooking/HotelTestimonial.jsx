import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetTestimonialHotelQuery } from '../../Api/Api';

const HotelTestimonial = () => {

    const { isError, error, data, isLoading, isSuccess } = useGetTestimonialHotelQuery();
    const [testimonialHotelListing, setTestimonialHotelListing] = useState([])

    useEffect(() => {
        if (isSuccess) {
            setTestimonialHotelListing(data?.data);
        } else if (isError) {
            console.log("error", isError);
        }
    }, [error, data, isSuccess, isError]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (

        <>
            <div className='text-center mb-6'>
                <div className='flex flex-1 justify-center p-4'>
                    <div className='border bg-red-400 p-2 rounded-md'>
                        <span className='text-white font-bold text-xl'>Team Members</span>
                    </div>
                </div>
            </div>

            <div className='text-center mb-8'>
                <p className='text-4xl font-extrabold text-gray-800 mb-4'>Our Clients' Feedback</p>
            </div>

            <Slider {...settings}>

                {testimonialHotelListing && testimonialHotelListing.map((testimonialList, index) => {

                    return (
                        <div key={index} className='p-4'>
                            <div className='bg-gradient-to-r from-red-300 to-blue-300 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-3 w-[500px] mx-auto relative overflow-hidden'>
                                <div className='relative z-10'>
                                    <div className='text-center'>
                                        <p className='font-bold text-lg text-gray-900 mb-2'>{testimonialList?.reviewPersonName}</p>
                                        <div className="flex justify-center mb-4">
                                            {[...Array(parseInt(testimonialList?.numberOfReview))].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 mx-1 animate-pulse text-2xl" />
                                            ))}
                                        </div>
                                        <p className='text-gray-700 font-medium text-sm leading-relaxed'>
                                            {testimonialList?.reviewDescription}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-10 transition duration-500 hover:scale-110 rounded-full blur-3xl"></div>
                            </div>
                        </div>
                    )

                })}

            </Slider>
        </>
    );
};

export default HotelTestimonial;