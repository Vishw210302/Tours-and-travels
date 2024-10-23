import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetTestimonialQuery } from '../../../Api/Api';

const Testimonials = () => {

    const { isError, error, data, isSuccess } = useGetTestimonialQuery();
    const [testimonialListing, setTestimonialListing] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setTestimonialListing(data?.data);
        } else if (isError) {
            console.log("error", isError);
        }
    }, [error, data, isSuccess, isError]);

    const settings = {
        dots: false,
        infinite: testimonialListing?.length > 1,
        speed: 1500,
        slidesToShow: testimonialListing?.length < 2 ? testimonialListing?.length : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <div className='bg-[#f7f7f7]'>
                {testimonialListing && testimonialListing?.length > 0 ?
                    <div>
                        <div className='flex flex-row justify-center items-center p-5 w-full font-bold text-[30px] text-red-500'>
                            Our Testimonial
                        </div>
                    </div> :
                    <></>
                }

                <Slider {...settings}>
                    {testimonialListing && testimonialListing.map((testimonialList, index) => {
                        return (
                            <div key={index} className='p-4'>
                                <div className='bg-gradient-to-r from-red-300 to-blue-300 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-3 w-[500px] mx-auto relative overflow-hidden'>
                                    <div className='relative z-10'>
                                        <div className='text-center'>
                                            <p className='font-bold text-lg text-gray-900 mb-2'>{testimonialList?.reviewPersonName}</p>
                                            <p className='text-gray-700 font-medium text-sm leading-relaxed'>
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

            </div>
        </>
    );
};

export default Testimonials;