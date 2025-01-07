import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetTestimonialHotelQuery } from '../../Api/Api';
import "../../assets/custom.css";

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
                        <div key={index} className='testimonial-item'>
                            <div className='testimonial-card'>
                                <div className='testimonial-content'>
                                    <p className='testimonial-name'>{testimonialList?.reviewPersonName}</p>
                                    <p className='testimonial-description'>{testimonialList?.reviewDescription}</p>
                                    <div className="testimonial-rating">
                                        {[...Array(parseInt(testimonialList?.numberOfReview))].map((_, i) => (
                                            <FaStar key={i} className="star-icon" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </>
    );
};

export default HotelTestimonial;