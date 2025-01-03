import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetTestimonialHotelQuery } from '../../Api/Api';

const HotelTestimonial = () => {

    const { isError, error, data, isSuccess } = useGetTestimonialHotelQuery();
    const [testimonialHotelListing, setTestimonialHotelListing] = useState([])

    useEffect(() => {
        if (isSuccess) {
            setTestimonialHotelListing(data?.data);
        } else if (isError) {
            console.log("isError", isError);
        }
    }, [error, data, isSuccess, isError]);

    const settings = {
        dots: false,
        infinite: testimonialHotelListing?.length > 1,
        speed: 500,
        slidesToShow: testimonialHotelListing?.length < 5 ? testimonialHotelListing?.length : 3,
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
            {testimonialHotelListing && testimonialHotelListing.length > 0 ?
                <div>
                    <div className='flex flex-row justify-center p-5'>
                        <p className='lg:text-2xl text-xl font-extrabold text-red-400 p-0'>Our Clients' Feedback</p>
                    </div>
                </div>
                :
                <></>
            }
            <Slider {...settings}>

                {testimonialHotelListing && testimonialHotelListing.map((testimonialList, index) => {
                    return (
                        <div key={index} className='p-4'>
                            <div className='bg-gradient-to-r from-red-300 to-blue-300 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-3 w-[500px] h-[150px] mx-auto relative overflow-hidden'>
                                <div className='relative z-10'>
                                    <div className='text-center'>
                                        <p className='font-bold text-xl text-gray-900 mb-2'>{testimonialList?.reviewPersonName}</p>
                                        <p className='text-gray-700 font-medium text-lg leading-relaxed'>
                                            {testimonialList?.reviewDescription}
                                        </p>
                                        <div className="flex justify-center mb-4">
                                            {[...Array(parseInt(testimonialList?.numberOfReview))].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 mx-1 animate-pulse text-2xl" />
                                            ))}
                                        </div>
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