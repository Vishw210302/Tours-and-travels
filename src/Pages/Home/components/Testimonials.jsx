import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetTestimonialQuery } from '../../../Api/Api';
import "../../../assets/custom.css";

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
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='testimonial-container'>
            {testimonialListing && testimonialListing?.length > 0 ? (
                <div className='testimonial-heading font-bold text-[18px] sm:text-[26px] text-red-500'>
                    Our Testimonial
                </div>
            ) : null}

            <Slider {...settings}>
                {testimonialListing && testimonialListing.map((testimonialList, index) => (
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
                ))}
            </Slider>
        </div>
    );
};

export default Testimonials;